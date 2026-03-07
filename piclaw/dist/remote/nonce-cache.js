export class RemoteNonceCache {
    ttlMs;
    maxEntries;
    entries = new Map();
    constructor(ttlMs, maxEntries) {
        this.ttlMs = ttlMs;
        this.maxEntries = maxEntries;
    }
    checkAndStore(peerId, nonce, now = Date.now()) {
        const peerMap = this.entries.get(peerId) ?? new Map();
        // prune expired
        for (const [key, ts] of peerMap) {
            if (now - ts > this.ttlMs)
                peerMap.delete(key);
        }
        if (peerMap.has(nonce))
            return false;
        peerMap.set(nonce, now);
        while (peerMap.size > this.maxEntries) {
            const oldest = peerMap.keys().next().value;
            if (!oldest)
                break;
            peerMap.delete(oldest);
        }
        this.entries.set(peerId, peerMap);
        return true;
    }
}
