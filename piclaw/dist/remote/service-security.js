/**
 * remote/service-security.ts – Callback proof verification and audit helpers.
 */
import { logRemoteAudit } from "../db/remote-interop.js";
import { DEFAULT_MAX_PROMPT_BYTES } from "./limits.js";
import { validateCallbackUrl } from "./ssrf.js";
import { verifyPayload } from "./identity.js";
import { getStringField, parseJsonBytes } from "./http-utils.js";
/** Build canonical callback-proof payload text for signature verification. */
export function buildCallbackProofString(requestId, challenge, receiverInstanceId) {
    return `${requestId}\n${challenge}\n${receiverInstanceId}`;
}
/** Verify a remote peer callback proof before establishing trust. */
export async function verifyCallbackProof(pending, peer, identity) {
    if (!pending.callback_url) {
        return { ok: false, error: "Missing callback_url." };
    }
    if (!pending.nonce) {
        return { ok: false, error: "Missing nonce." };
    }
    const callbackCheck = await validateCallbackUrl(pending.callback_url);
    if (!callbackCheck.ok || !callbackCheck.url) {
        return { ok: false, error: callbackCheck.error || "Invalid callback_url." };
    }
    const payload = {
        request_id: pending.id,
        challenge: pending.nonce,
        receiver_instance_id: identity.instance_id,
        receiver_public_key: identity.public_key,
        receiver_fingerprint: identity.fingerprint,
        timestamp: new Date().toISOString(),
    };
    let response;
    try {
        response = await fetch(callbackCheck.url.toString(), {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(payload),
            signal: typeof AbortSignal !== "undefined" && "timeout" in AbortSignal ? AbortSignal.timeout(5000) : undefined,
        });
    }
    catch {
        return { ok: false, error: "Callback verification failed.", status: 502 };
    }
    if (!response.ok) {
        return { ok: false, error: "Callback verification failed.", status: 502 };
    }
    let responseBytes;
    try {
        responseBytes = new Uint8Array(await response.arrayBuffer());
    }
    catch {
        return { ok: false, error: "Invalid callback response." };
    }
    const parsed = parseJsonBytes(responseBytes, DEFAULT_MAX_PROMPT_BYTES);
    if (parsed.error) {
        return { ok: false, error: parsed.error };
    }
    const data = parsed.data ?? {};
    const responseRequestId = getStringField(data, "request_id");
    const responseChallenge = getStringField(data, "challenge");
    const responseInstanceId = getStringField(data, "instance_id");
    const responseSignature = getStringField(data, "signature");
    if (!responseRequestId || !responseChallenge || !responseInstanceId || !responseSignature) {
        return { ok: false, error: "Invalid callback response." };
    }
    if (responseRequestId !== pending.id || responseChallenge !== pending.nonce) {
        return { ok: false, error: "Callback response mismatch." };
    }
    if (responseInstanceId !== peer.instance_id) {
        return { ok: false, error: "Callback response mismatch." };
    }
    const proof = buildCallbackProofString(pending.id, pending.nonce, identity.instance_id);
    if (!verifyPayload(peer.public_key, proof, responseSignature)) {
        return { ok: false, error: "Callback signature invalid." };
    }
    return { ok: true };
}
/** Persist a remote interop audit row for endpoint decisions/outcomes. */
export function logAudit(peer, endpoint, status, decision, error) {
    logRemoteAudit({
        peer_instance_id: peer?.instance_id ?? null,
        endpoint,
        decision: decision ?? null,
        status,
        error: error ?? null,
        created_at: new Date().toISOString(),
    });
}
