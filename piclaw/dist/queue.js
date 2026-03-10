/**
 * queue.ts – Serial execution queue with retry for agent runs.
 *
 * Ensures only one agent task runs at a time per queue instance. Failed tasks
 * are retried with exponential back-off up to DEFAULT_MAX_RETRIES times.
 * Items can be deduplicated by an optional string `id` (useful for scheduled
 * tasks that shouldn't stack up).
 *
 * Consumers:
 *   - runtime.ts creates a single AgentQueue and passes it to the router
 *     and task scheduler.
 *   - router.ts calls enqueue() for each inbound message that needs processing.
 *   - task-scheduler.ts calls enqueueTask() for due scheduled tasks.
 *   - channels/web.ts calls enqueue() for web channel interactions.
 */
import { DEFAULT_BASE_RETRY_MS, DEFAULT_MAX_RETRIES, getRetryDelay, shouldRetry } from "./queue/retry-policy.js";
/**
 * A serial execution queue: items run one at a time, in FIFO order.
 * If an item fails, it is re-enqueued after an exponential delay.
 */
export class AgentQueue {
    running = false;
    pending = [];
    current = null;
    shuttingDown = false;
    runningPromise = null;
    metrics = {
        enqueued: 0,
        deduplicated: 0,
        started: 0,
        succeeded: 0,
        failed: 0,
        retriesScheduled: 0,
    };
    /**
     * Add a work item to the queue. If the queue is idle, execution starts
     * immediately; otherwise the item is appended to the pending list.
     * Items with the same `id` are deduplicated (skipped if already queued).
     */
    enqueue(fn, id) {
        if (this.shuttingDown)
            return;
        // Deduplicate by id if provided
        if (id) {
            if (this.current?.id === id) {
                this.metrics.deduplicated += 1;
                return;
            }
            if (this.pending.some((p) => p.id === id)) {
                this.metrics.deduplicated += 1;
                return;
            }
        }
        const item = { id, fn, retries: 0 };
        this.metrics.enqueued += 1;
        if (this.running) {
            this.pending.push(item);
            return;
        }
        this.runItem(item);
    }
    /** Convenience wrapper that prefixes the id with "task:" for scheduled tasks. */
    enqueueTask(taskId, fn) {
        this.enqueue(fn, `task:${taskId}`);
    }
    /** Start executing an item (sets running state, stores the promise). */
    runItem(item) {
        this.running = true;
        this.current = item;
        this.metrics.started += 1;
        this.runningPromise = this.executeItem(item);
    }
    /** Run the item's function, handle errors with retry, and advance to the next item. */
    async executeItem(item) {
        try {
            await item.fn();
            this.metrics.succeeded += 1;
        }
        catch (err) {
            this.metrics.failed += 1;
            console.error("[queue] Error:", err);
            this.scheduleRetry(item);
        }
        finally {
            this.running = false;
            this.current = null;
            this.runningPromise = null;
            // Advance to next pending item if available.
            if (this.pending.length > 0 && !this.shuttingDown) {
                const next = this.pending.shift();
                this.runItem(next);
            }
        }
    }
    /** Schedule an exponential-backoff retry for a failed item. */
    scheduleRetry(item) {
        if (!shouldRetry(item.retries, DEFAULT_MAX_RETRIES, this.shuttingDown))
            return;
        item.retries++;
        this.metrics.retriesScheduled += 1;
        const delay = getRetryDelay(item.retries, DEFAULT_BASE_RETRY_MS);
        console.log(`[queue] Retry ${item.retries}/${DEFAULT_MAX_RETRIES} in ${delay}ms${item.id ? ` (${item.id})` : ""}`);
        setTimeout(() => {
            if (this.shuttingDown)
                return;
            if (this.running) {
                this.pending.push(item);
            }
            else {
                this.runItem(item);
            }
        }, delay);
    }
    /**
     * Gracefully shut down the queue: clear pending items and wait up to `ms`
     * milliseconds for the currently running item to finish.
     */
    async shutdown(ms = 5000) {
        this.shuttingDown = true;
        this.pending = [];
        if (this.runningPromise) {
            await Promise.race([this.runningPromise, Bun.sleep(ms)]);
        }
    }
    /** Snapshot queue counters for diagnostics and tests. */
    getMetrics() {
        return { ...this.metrics };
    }
}
