/**
 * remote/execute-concurrency.ts – In-memory concurrency guard for remote execute requests.
 */
/**
 * Tracks global and per-peer execute concurrency limits.
 *
 * This helper encapsulates shared mutable counters so remote execute handlers can
 * enforce admission checks and release slots consistently.
 */
export class RemoteExecuteConcurrency {
    maxTotal;
    maxPerPeer;
    inflightByPeer = new Map();
    inflightTotal = 0;
    constructor(maxTotal, maxPerPeer) {
        this.maxTotal = maxTotal;
        this.maxPerPeer = maxPerPeer;
    }
    /** Return true when the peer cannot start another execute request right now. */
    isAtLimit(peerInstanceId) {
        return this.inflightTotal >= this.maxTotal || (this.inflightByPeer.get(peerInstanceId) || 0) >= this.maxPerPeer;
    }
    /** Reserve one execute slot for the given peer. */
    acquire(peerInstanceId) {
        this.inflightTotal += 1;
        this.inflightByPeer.set(peerInstanceId, (this.inflightByPeer.get(peerInstanceId) || 0) + 1);
    }
    /** Release one execute slot for the given peer. */
    release(peerInstanceId) {
        this.inflightTotal = Math.max(0, this.inflightTotal - 1);
        const count = (this.inflightByPeer.get(peerInstanceId) || 1) - 1;
        if (count <= 0)
            this.inflightByPeer.delete(peerInstanceId);
        else
            this.inflightByPeer.set(peerInstanceId, count);
    }
}
