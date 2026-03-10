/**
 * remote/service-pairing.ts – Pair-request and pair-confirm endpoint handlers.
 */
import { createUuid } from "../utils/ids.js";
import { getClientKey } from "../utils/request-client.js";
import { createPairRequest, getPairRequestById, getPendingPairRequest, getRemotePeer, updatePairRequestStatus, upsertRemotePeer, } from "../db/remote-interop.js";
import { deriveFingerprint, deriveInstanceId, loadOrCreateIdentity } from "./identity.js";
import { validateCallbackUrl } from "./ssrf.js";
import { verifySignedRequest } from "./auth.js";
import { DEFAULT_MAX_PROMPT_BYTES } from "./limits.js";
import { checkContentLength, getOptionalTrimmedStringField, getTrimmedStringField, jsonResponse, parseJsonBytes, readBodyBytes, readJsonBody, requireJson, } from "./http-utils.js";
import { logAudit, verifyCallbackProof } from "./service-security.js";
/** Handle `/api/remote/pair-request` validation and pending request creation. */
export async function handlePairRequest(req, context) {
    const jsonError = requireJson(req);
    if (jsonError)
        return jsonResponse({ error: jsonError }, 415);
    const lengthCheck = checkContentLength(req, DEFAULT_MAX_PROMPT_BYTES);
    if (!lengthCheck.ok)
        return jsonResponse({ error: lengthCheck.error }, lengthCheck.status);
    const { data, error } = await readJsonBody(req, DEFAULT_MAX_PROMPT_BYTES);
    if (error)
        return jsonResponse({ error }, 400);
    const instanceId = getTrimmedStringField(data, "instance_id");
    const publicKey = getTrimmedStringField(data, "public_key");
    const displayName = getOptionalTrimmedStringField(data, "display_name");
    const callbackUrl = getTrimmedStringField(data, "callback_url");
    const protocolVersion = getTrimmedStringField(data, "protocol_version");
    const nonce = getOptionalTrimmedStringField(data, "nonce");
    const expiresAtRaw = getTrimmedStringField(data, "expires_at");
    if (!instanceId || !publicKey || !callbackUrl || !expiresAtRaw || !nonce || !protocolVersion) {
        return jsonResponse({ error: "Missing required fields." }, 400);
    }
    if (!new Set(["1", "v1"]).has(protocolVersion)) {
        return jsonResponse({ error: "Unsupported protocol version." }, 400);
    }
    const derivedId = deriveInstanceId(publicKey);
    if (derivedId !== instanceId) {
        return jsonResponse({ error: "instance_id does not match public_key." }, 400);
    }
    const callbackCheck = await validateCallbackUrl(callbackUrl);
    if (!callbackCheck.ok) {
        return jsonResponse({ error: callbackCheck.error }, 400);
    }
    const expiresAt = Date.parse(expiresAtRaw);
    if (Number.isNaN(expiresAt)) {
        return jsonResponse({ error: "Invalid expires_at." }, 400);
    }
    const now = Date.now();
    const maxExpiry = now + 24 * 60 * 60 * 1000;
    if (expiresAt <= now || expiresAt > maxExpiry) {
        return jsonResponse({ error: "expires_at is out of range." }, 400);
    }
    const peer = getRemotePeer(instanceId);
    if (peer?.status === "blocked") {
        logAudit(peer, "/api/remote/pair-request", "blocked", "blocked");
        return jsonResponse({ error: "Peer is blocked." }, 403);
    }
    const pending = getPendingPairRequest(instanceId);
    if (pending) {
        const pendingExpiry = Date.parse(pending.expires_at);
        if (!Number.isNaN(pendingExpiry) && pendingExpiry > Date.now()) {
            return jsonResponse({
                error: "Pair request already pending.",
                request_id: pending.id,
                expires_at: pending.expires_at,
            }, 409);
        }
        updatePairRequestStatus(pending.id, "expired");
    }
    const rateKey = `${getClientKey(req)}:${instanceId}`;
    if (!context.pairLimiter.allow(rateKey)) {
        return jsonResponse({ error: "Pairing rate limit exceeded." }, 429);
    }
    const requestId = createUuid("pair");
    const createdAt = new Date().toISOString();
    createPairRequest({
        id: requestId,
        instance_id: instanceId,
        public_key: publicKey,
        display_name: displayName,
        callback_url: callbackUrl,
        protocol_version: protocolVersion,
        nonce,
        expires_at: new Date(expiresAt).toISOString(),
        status: "pending",
        created_at: createdAt,
        source_ip: getClientKey(req),
    });
    logAudit(peer, "/api/remote/pair-request", "pending", "pending");
    const identity = loadOrCreateIdentity();
    return jsonResponse({
        status: "pending",
        request_id: requestId,
        expires_at: new Date(expiresAt).toISOString(),
        receiver_instance_id: identity.instance_id,
        receiver_public_key: identity.public_key,
        receiver_fingerprint: identity.fingerprint,
    }, 202);
}
/** Handle `/api/remote/pair-confirm` verification and peer activation. */
export async function handlePairConfirm(req, context) {
    const jsonError = requireJson(req);
    if (jsonError)
        return jsonResponse({ error: jsonError }, 415);
    const lengthCheck = checkContentLength(req, DEFAULT_MAX_PROMPT_BYTES);
    if (!lengthCheck.ok)
        return jsonResponse({ error: lengthCheck.error }, lengthCheck.status);
    const bodyBytes = await readBodyBytes(req);
    const { data, error } = parseJsonBytes(bodyBytes, DEFAULT_MAX_PROMPT_BYTES);
    if (error)
        return jsonResponse({ error }, 400);
    const requestId = getTrimmedStringField(data, "request_id");
    const challenge = getTrimmedStringField(data, "challenge");
    if (!requestId || !challenge) {
        return jsonResponse({ error: "Missing request_id or challenge." }, 400);
    }
    const pending = getPairRequestById(requestId);
    if (!pending || pending.status !== "pending") {
        return jsonResponse({ error: "Pair request not found." }, 404);
    }
    const blockedPeer = getRemotePeer(pending.instance_id);
    if (blockedPeer?.status === "blocked") {
        logAudit(blockedPeer, "/api/remote/pair-confirm", "blocked", "blocked");
        return jsonResponse({ error: "Peer is blocked." }, 403);
    }
    if (Date.parse(pending.expires_at) <= Date.now()) {
        updatePairRequestStatus(requestId, "expired");
        return jsonResponse({ error: "Pair request expired." }, 410);
    }
    const rateKey = `${getClientKey(req)}:${pending.instance_id}`;
    if (!context.pairConfirmLimiter.allow(rateKey)) {
        return jsonResponse({ error: "Pair confirmation rate limit exceeded." }, 429);
    }
    const peer = {
        instance_id: pending.instance_id,
        public_key: pending.public_key,
        display_name: pending.display_name,
        status: "pending",
        mode: "mediated",
        profile: "restricted",
        trust_epoch: 1,
        created_at: pending.created_at,
        updated_at: pending.created_at,
        last_seen_at: null,
        blocked_reason: null,
    };
    const sigResult = verifySignedRequest(req, bodyBytes, peer, context.nonceCache);
    if (!sigResult.ok) {
        logAudit(peer, "/api/remote/pair-confirm", "denied", undefined, sigResult.error);
        return jsonResponse({ error: sigResult.error }, 401);
    }
    if (pending.nonce && pending.nonce !== challenge) {
        return jsonResponse({ error: "Challenge mismatch." }, 400);
    }
    const identity = loadOrCreateIdentity();
    const callbackProof = await verifyCallbackProof(pending, peer, identity);
    if (!callbackProof.ok) {
        updatePairRequestStatus(requestId, "verification_failed");
        logAudit(peer, "/api/remote/pair-confirm", "denied", undefined, callbackProof.error);
        return jsonResponse({ error: callbackProof.error }, callbackProof.status ?? 400);
    }
    const now = new Date().toISOString();
    upsertRemotePeer({
        instance_id: pending.instance_id,
        public_key: pending.public_key,
        display_name: pending.display_name,
        status: "paired",
        mode: "mediated",
        profile: "restricted",
        trust_epoch: 1,
        created_at: pending.created_at,
        updated_at: now,
        last_seen_at: now,
        blocked_reason: null,
    });
    updatePairRequestStatus(requestId, "accepted");
    logAudit(peer, "/api/remote/pair-confirm", "paired", "paired");
    return jsonResponse({
        status: "paired",
        peer_instance_id: pending.instance_id,
        peer_fingerprint: deriveFingerprint(pending.instance_id),
        receiver_instance_id: identity.instance_id,
        receiver_public_key: identity.public_key,
        trust_epoch: 1,
    });
}
