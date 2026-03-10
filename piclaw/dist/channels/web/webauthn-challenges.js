/**
 * channels/web/webauthn-challenges.ts – transient WebAuthn challenge tracking and helpers.
 */
import { getRequestOriginParts } from "./http/client.js";
const DEFAULT_CHALLENGE_TTL_MS = 10 * 60 * 1000;
/** Tracks pending login/registration WebAuthn challenges with TTL-based pruning. */
export class WebauthnChallengeTracker {
    ttlMs;
    pendingRegistrations = new Map();
    pendingLogins = new Map();
    constructor(ttlMs = DEFAULT_CHALLENGE_TTL_MS) {
        this.ttlMs = ttlMs;
    }
    prune(now = Date.now()) {
        const cutoff = now - this.ttlMs;
        for (const [token, entry] of this.pendingRegistrations.entries()) {
            if (entry.createdAt < cutoff)
                this.pendingRegistrations.delete(token);
        }
        for (const [token, entry] of this.pendingLogins.entries()) {
            if (entry.createdAt < cutoff)
                this.pendingLogins.delete(token);
        }
    }
    trackLogin(token, value, now = Date.now()) {
        this.prune(now);
        this.pendingLogins.set(token, { ...value, createdAt: now });
    }
    consumeLogin(token, now = Date.now()) {
        this.prune(now);
        const entry = this.pendingLogins.get(token);
        if (!entry)
            return null;
        this.pendingLogins.delete(token);
        return entry;
    }
    trackRegistration(token, value, now = Date.now()) {
        this.prune(now);
        this.pendingRegistrations.set(token, { ...value, createdAt: now });
    }
    consumeRegistration(token, now = Date.now()) {
        this.prune(now);
        const entry = this.pendingRegistrations.get(token);
        if (!entry)
            return null;
        this.pendingRegistrations.delete(token);
        return entry;
    }
}
/** Resolve RP ID and origin tuple for WebAuthn ceremony options. */
export function resolveWebauthnRpInfo(req) {
    const url = new URL(req.url);
    const originHeader = req.headers.get("origin");
    if (originHeader && originHeader !== "null") {
        try {
            const originUrl = new URL(originHeader);
            return { rpId: originUrl.hostname, origin: originUrl.origin };
        }
        catch {
            // Ignore invalid Origin header and fall back to request host/proto.
        }
    }
    const { proto, host } = getRequestOriginParts(req);
    const rpId = host ? host.split(":")[0] : url.hostname;
    const origin = `${proto}://${host || url.host}`;
    return { rpId, origin };
}
/** Encode binary data as base64url for WebAuthn JSON payloads. */
export function bufferToBase64Url(value) {
    return Buffer.from(value).toString("base64url");
}
/** Decode a base64url string into binary bytes for WebAuthn verification. */
export function base64UrlToBuffer(value) {
    return Buffer.from(value, "base64url");
}
