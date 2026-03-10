/**
 * channels/web/followup-placeholders.ts – queued follow-up placeholder row ids.
 */
/** FIFO in-memory row-id queue for deferred follow-up placeholder replacement. */
export class FollowupPlaceholderStore {
    queuedFollowupPlaceholders = new Map();
    enqueue(chatJid, rowId) {
        const existing = this.queuedFollowupPlaceholders.get(chatJid) ?? [];
        existing.push(rowId);
        this.queuedFollowupPlaceholders.set(chatJid, existing);
    }
    consume(chatJid) {
        const queue = this.queuedFollowupPlaceholders.get(chatJid);
        if (!queue || queue.length === 0)
            return null;
        const next = queue.shift() ?? null;
        if (!queue.length)
            this.queuedFollowupPlaceholders.delete(chatJid);
        return next;
    }
}
