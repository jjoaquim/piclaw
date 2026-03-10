/**
 * remote/signature.ts – Canonical request signing and verification helpers.
 *
 * Builds deterministic canonical request strings used for remote interop
 * signatures and exposes lightweight wrappers around payload signing helpers.
 */
import { createHash } from "crypto";
import { signPayload, verifyPayload } from "./identity.js";
/** Hash request body bytes using SHA-256 (hex). */
export function hashBody(body) {
    return createHash("sha256").update(body).digest("hex");
}
/** Build the canonical newline-delimited request representation for signing. */
export function buildCanonicalRequest(params) {
    const lines = [
        params.method.toUpperCase(),
        params.pathWithQuery,
        params.contentType,
        params.bodyHash,
        params.timestamp,
        params.nonce,
        params.instanceId,
        params.sigVersion,
    ];
    if (params.trustEpoch !== undefined) {
        lines.push(params.trustEpoch);
    }
    return lines.join("\n");
}
/** Sign a canonical request string with the local interop identity. */
export function signRequest(identity, canonical) {
    return signPayload(identity, canonical);
}
/** Verify a canonical request signature using a remote peer public key. */
export function verifyRequestSignature(publicKey, canonical, signature) {
    return verifyPayload(publicKey, canonical, signature);
}
/** Parse epoch-seconds/epoch-ms/ISO timestamp values into epoch milliseconds. */
export function parseTimestamp(value) {
    if (!value)
        return null;
    const trimmed = value.trim();
    if (!trimmed)
        return null;
    if (/^\d+$/.test(trimmed)) {
        const numeric = Number(trimmed);
        if (!Number.isFinite(numeric))
            return null;
        return numeric > 10_000_000_000 ? numeric : numeric * 1000;
    }
    const parsed = Date.parse(trimmed);
    return Number.isNaN(parsed) ? null : parsed;
}
