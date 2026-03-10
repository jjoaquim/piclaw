/**
 * remote/service-operations.ts – Signed remote peer operation endpoint handlers.
 */
import { createUuid } from "../utils/ids.js";
import { getRemotePeer, storeRemoteRequest, updateRemotePeer } from "../db/remote-interop.js";
import { REMOTE_SHORT_CIRCUIT_ENABLED } from "../core/config.js";
import { verifySignedRequest } from "./auth.js";
import { DEFAULT_MAX_PROMPT_BYTES, DEFAULT_MAX_RESPONSE_BYTES, DEFAULT_REQUEST_HOP_LIMIT, } from "./limits.js";
import { checkContentLength, getTrimmedStringField, jsonResponse, parseJsonBytes, readBodyBytes, requireJson, } from "./http-utils.js";
import { logAudit } from "./service-security.js";
import { loadOrCreateIdentity } from "./identity.js";
/** Resolve and validate paired remote peer identity from request headers. */
export function requirePeer(req) {
    const instanceId = req.headers.get("x-instance-id") || "";
    if (!instanceId)
        return jsonResponse({ error: "Missing X-Instance-Id." }, 401);
    const peer = getRemotePeer(instanceId);
    if (!peer)
        return jsonResponse({ error: "Unknown peer." }, 401);
    if (peer.status !== "paired")
        return jsonResponse({ error: "Peer not paired." }, 403);
    return peer;
}
/** Handle `/api/remote/ping` signed liveness checks. */
export async function handlePing(req, context) {
    const peer = requirePeer(req);
    if (peer instanceof Response)
        return peer;
    if (!context.pingLimiter.allow(peer.instance_id)) {
        return jsonResponse({ error: "Ping rate limit exceeded." }, 429);
    }
    const bodyBytes = await readBodyBytes(req);
    const sig = verifySignedRequest(req, bodyBytes, peer, context.nonceCache);
    if (!sig.ok) {
        logAudit(peer, "/api/remote/ping", "denied", undefined, sig.error);
        return jsonResponse({ error: sig.error }, 401);
    }
    updateRemotePeer(peer.instance_id, { last_seen_at: new Date().toISOString() });
    const identity = loadOrCreateIdentity();
    logAudit(peer, "/api/remote/ping", "ok");
    return jsonResponse({
        status: "ok",
        instance_id: identity.instance_id,
        instance_name: identity.instance_name,
        fingerprint: identity.fingerprint,
        time: new Date().toISOString(),
        mode: peer.mode,
        profile: peer.profile,
    });
}
/** Handle `/api/remote/proposal` signed mediated proposal submissions. */
export async function handleProposal(req, context) {
    const peer = requirePeer(req);
    if (peer instanceof Response)
        return peer;
    const jsonError = requireJson(req);
    if (jsonError)
        return jsonResponse({ error: jsonError }, 415);
    const lengthCheck = checkContentLength(req, DEFAULT_MAX_PROMPT_BYTES);
    if (!lengthCheck.ok)
        return jsonResponse({ error: lengthCheck.error }, lengthCheck.status);
    const bodyBytes = await readBodyBytes(req);
    const sig = verifySignedRequest(req, bodyBytes, peer, context.nonceCache);
    if (!sig.ok) {
        logAudit(peer, "/api/remote/proposal", "denied", undefined, sig.error);
        return jsonResponse({ error: sig.error }, 401);
    }
    if (!context.proposalLimiter.allow(peer.instance_id)) {
        return jsonResponse({ error: "Proposal rate limit exceeded." }, 429);
    }
    const payload = parseJsonBytes(bodyBytes, DEFAULT_MAX_PROMPT_BYTES);
    if (payload.error)
        return jsonResponse({ error: payload.error }, 400);
    const prompt = getTrimmedStringField(payload.data, "prompt");
    if (!prompt)
        return jsonResponse({ error: "Missing prompt." }, 400);
    const hop = Number(req.headers.get("x-request-hop") || "0");
    if (hop > DEFAULT_REQUEST_HOP_LIMIT) {
        return jsonResponse({ error: "Request hop limit exceeded." }, 400);
    }
    const requestId = createUuid("proposal");
    storeRemoteRequest({
        id: requestId,
        peer_instance_id: peer.instance_id,
        request_type: "proposal",
        status: "pending",
        prompt,
        created_at: new Date().toISOString(),
        decision: null,
        remote_mode: peer.mode,
        error: null,
    });
    logAudit(peer, "/api/remote/proposal", "queued", "human_required");
    return jsonResponse({
        decision: "human_required",
        reason: "Proposal queued for review.",
        negotiation_id: requestId,
        remote_mode: peer.mode,
        decision_model: context.getDecisionModel() || null,
    });
}
/** Handle `/api/remote/execute` short-circuit execution requests. */
export async function handleExecute(req, context) {
    const peer = requirePeer(req);
    if (peer instanceof Response)
        return peer;
    const jsonError = requireJson(req);
    if (jsonError)
        return jsonResponse({ error: jsonError }, 415);
    const lengthCheck = checkContentLength(req, DEFAULT_MAX_PROMPT_BYTES);
    if (!lengthCheck.ok)
        return jsonResponse({ error: lengthCheck.error }, lengthCheck.status);
    const bodyBytes = await readBodyBytes(req);
    const sig = verifySignedRequest(req, bodyBytes, peer, context.nonceCache);
    if (!sig.ok) {
        logAudit(peer, "/api/remote/execute", "denied", undefined, sig.error);
        return jsonResponse({ error: sig.error }, 401);
    }
    if (!REMOTE_SHORT_CIRCUIT_ENABLED || peer.mode !== "short-circuit" || peer.profile !== "full") {
        return jsonResponse({ error: "Short-circuit execution not allowed." }, 403);
    }
    const hop = Number(req.headers.get("x-request-hop") || "0");
    if (hop > DEFAULT_REQUEST_HOP_LIMIT) {
        return jsonResponse({ error: "Request hop limit exceeded." }, 400);
    }
    if (!context.executeLimiter.allow(peer.instance_id)) {
        return jsonResponse({ error: "Execute rate limit exceeded." }, 429);
    }
    if (context.executeConcurrency.isAtLimit(peer.instance_id)) {
        return jsonResponse({ error: "Remote execution concurrency limit reached." }, 429);
    }
    const payload = parseJsonBytes(bodyBytes, DEFAULT_MAX_PROMPT_BYTES);
    if (payload.error)
        return jsonResponse({ error: payload.error }, 400);
    const prompt = getTrimmedStringField(payload.data, "prompt");
    if (!prompt)
        return jsonResponse({ error: "Missing prompt." }, 400);
    if (!context.agentPool) {
        return jsonResponse({ error: "Agent pool not available." }, 500);
    }
    context.executeConcurrency.acquire(peer.instance_id);
    const start = Date.now();
    try {
        const chatJid = `remote:${peer.instance_id}`;
        const output = await context.agentPool.runAgent(prompt, chatJid, { timeoutMs: 60_000 });
        const duration = Date.now() - start;
        if (output.status === "error") {
            logAudit(peer, "/api/remote/execute", "error", "error", output.error);
            return jsonResponse({ decision: "deny", error: output.error || "Execution failed." }, 500);
        }
        const resultText = output.result || "";
        if (Buffer.byteLength(resultText, "utf8") > DEFAULT_MAX_RESPONSE_BYTES) {
            return jsonResponse({ decision: "deny", error: "Response too large." }, 413);
        }
        logAudit(peer, "/api/remote/execute", "ok", "accept_execute");
        return jsonResponse({
            decision: "accept_execute",
            result: resultText,
            usage: {
                duration_ms: duration,
                tool_calls: null,
            },
            scope_applied: { profile: peer.profile },
        });
    }
    finally {
        context.executeConcurrency.release(peer.instance_id);
    }
}
/** Handle `/api/remote/revoke` signed trust revocation requests. */
export async function handleRevoke(req, context) {
    const peer = requirePeer(req);
    if (peer instanceof Response)
        return peer;
    const jsonError = requireJson(req);
    if (jsonError)
        return jsonResponse({ error: jsonError }, 415);
    const lengthCheck = checkContentLength(req, DEFAULT_MAX_PROMPT_BYTES);
    if (!lengthCheck.ok)
        return jsonResponse({ error: lengthCheck.error }, lengthCheck.status);
    if (!context.revokeLimiter.allow(peer.instance_id)) {
        return jsonResponse({ error: "Revoke rate limit exceeded." }, 429);
    }
    const bodyBytes = await readBodyBytes(req);
    const sig = verifySignedRequest(req, bodyBytes, peer, context.nonceCache);
    if (!sig.ok) {
        logAudit(peer, "/api/remote/revoke", "denied", undefined, sig.error);
        return jsonResponse({ error: sig.error }, 401);
    }
    const nextEpoch = (peer.trust_epoch || 1) + 1;
    updateRemotePeer(peer.instance_id, {
        status: "revoked",
        trust_epoch: nextEpoch,
        updated_at: new Date().toISOString(),
    });
    logAudit(peer, "/api/remote/revoke", "revoked", "revoked");
    return jsonResponse({ status: "revoked", trust_epoch: nextEpoch });
}
