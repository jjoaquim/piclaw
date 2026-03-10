/**
 * channels/web/totp-failure-tracker.ts – TOTP failure/lockout bookkeeping.
 */
const DEFAULT_FAILURE_WINDOW_MS = 5 * 60 * 1000;
const DEFAULT_FAILURE_LIMIT = 5;
const DEFAULT_LOCKOUT_MS = 5 * 60 * 1000;
const DEFAULT_PRUNE_INTERVAL_MS = 10 * 60 * 1000;
/** In-memory tracker that enforces TOTP lockouts by client key. */
export class TotpFailureTracker {
    entries = new Map();
    lastPrune = Date.now();
    failureWindowMs;
    failureLimit;
    lockoutMs;
    pruneIntervalMs;
    constructor(config = {}) {
        this.failureWindowMs = config.failureWindowMs ?? DEFAULT_FAILURE_WINDOW_MS;
        this.failureLimit = config.failureLimit ?? DEFAULT_FAILURE_LIMIT;
        this.lockoutMs = config.lockoutMs ?? DEFAULT_LOCKOUT_MS;
        this.pruneIntervalMs = config.pruneIntervalMs ?? DEFAULT_PRUNE_INTERVAL_MS;
    }
    getFailureLimit() {
        return this.failureLimit;
    }
    prune(now = Date.now()) {
        if (now - this.lastPrune < this.pruneIntervalMs)
            return;
        this.lastPrune = now;
        const cutoff = now - Math.max(this.failureWindowMs, this.lockoutMs);
        for (const [key, entry] of this.entries.entries()) {
            const failures = entry.failures.filter((ts) => ts > cutoff);
            if (failures.length === 0 && entry.lockedUntil <= now) {
                this.entries.delete(key);
            }
            else {
                this.entries.set(key, { failures, lockedUntil: entry.lockedUntil });
            }
        }
    }
    isLocked(clientKey, now = Date.now()) {
        this.prune(now);
        const entry = this.entries.get(clientKey);
        return Boolean(entry && entry.lockedUntil > now);
    }
    recordFailure(clientKey, now = Date.now()) {
        this.prune(now);
        const prior = this.entries.get(clientKey);
        const cutoff = now - this.failureWindowMs;
        const failures = (prior?.failures || []).filter((ts) => ts > cutoff);
        failures.push(now);
        const locked = failures.length >= this.failureLimit;
        const lockedUntil = locked ? now + this.lockoutMs : prior?.lockedUntil || 0;
        this.entries.set(clientKey, { failures, lockedUntil });
        return {
            failures: failures.length,
            locked,
            lockedUntil,
        };
    }
    clear(clientKey) {
        this.entries.delete(clientKey);
    }
}
