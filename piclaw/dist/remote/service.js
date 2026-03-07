import { createUuid } from "../utils/ids.js";
import { loadOrCreateIdentity, deriveFingerprint, deriveInstanceId, verifyPayload } from "./identity.js";
import { createPairRequest, getPairRequestById, getPendingPairRequest, getRemotePeer, logRemoteAudit, storeRemoteRequest, updatePairRequestStatus, updateRemotePeer, upsertRemotePeer, } from "../db/remote-interop.js";
import { REMOTE_INTEROP_ENABLED, REMOTE_INTEROP_DECISION_MODEL, REMOTE_SHORT_CIRCUIT_ENABLED } from "../core/config.js";
import { validateCallbackUrl } from "./ssrf.js";
import { RemoteNonceCache } from "./nonce-cache.js";
import { verifySignedRequest } from "./auth.js";
import { DEFAULT_MAX_PROMPT_BYTES, DEFAULT_MAX_RESPONSE_BYTES, DEFAULT_REQUEST_HOP_LIMIT, DEFAULT_NONCE_CACHE_SIZE, DEFAULT_NONCE_TTL_MS, PAIR_REQUEST_LIMIT, PAIR_REQUEST_WINDOW_MS, PAIR_CONFIRM_LIMIT, PAIR_CONFIRM_WINDOW_MS, PROPOSAL_LIMIT, PROPOSAL_WINDOW_MS, PING_LIMIT, PING_WINDOW_MS, EXECUTE_LIMIT, EXECUTE_WINDOW_MS, REVOKE_LIMIT, REVOKE_WINDOW_MS, } from "./limits.js";
class SlidingWindowLimiter {
    windowMs;
    limit;
    entries = new Map();
    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
    }
    allow(key, now = Date.now()) {
        const list = this.entries.get(key) ?? [];
        const filtered = list.filter((t) => now - t < this.windowMs);
        if (filtered.length >= this.limit) {
            this.entries.set(key, filtered);
            return false;
        }
        filtered.push(now);
        this.entries.set(key, filtered);
        return true;
    }
}
function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}
function buildCallbackProofString(requestId, challenge, receiverInstanceId) {
    return `${requestId}\n${challenge}\n${receiverInstanceId}`;
}
function requireJson(req) {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
        return "Content-Type must be application/json.";
    }
    return null;
}
function checkContentLength(req, maxBytes) {
    const raw = req.headers.get("content-length");
    if (!raw)
        return { ok: true };
    const length = Number(raw);
    if (!Number.isFinite(length) || length < 0) {
        return { ok: false, status: 400, error: "Invalid Content-Length." };
    }
    if (length > maxBytes) {
        return { ok: false, status: 413, error: "Request too large." };
    }
    return { ok: true };
}
function getClientKey(req) {
    const forwarded = req.headers.get("x-forwarded-for");
    if (forwarded) {
        const first = forwarded.split(",")[0]?.trim();
        if (first)
            return first;
    }
    const realIp = req.headers.get("x-real-ip");
    if (realIp)
        return realIp.trim();
    return "unknown";
}
function parseJsonBytes(buffer, maxBytes) {
    if (buffer.length > maxBytes)
        return { error: "Request too large." };
    if (buffer.length === 0)
        return { data: {} };
    try {
        const text = new TextDecoder().decode(buffer);
        return { data: JSON.parse(text) };
    }
    catch {
        return { error: "Invalid JSON." };
    }
}
async function readJsonBody(req, maxBytes) {
    let buffer;
    try {
        const arrayBuffer = await req.arrayBuffer();
        buffer = new Uint8Array(arrayBuffer);
    }
    catch {
        return { error: "Invalid body." };
    }
    return parseJsonBytes(buffer, maxBytes);
}
async function readBodyBytes(req) {
    try {
        return new Uint8Array(await req.arrayBuffer());
    }
    catch {
        return new Uint8Array();
    }
}
async function verifyCallbackProof(pending, peer, identity) {
    if (!pending.callback_url) {
        return { ok: false, error: "Missing callback_url." };
    }
    if (!pending.nonce) {
        return { ok: false, error: "Missing nonce." };
    }
    const callbackCheck = validateCallbackUrl(pending.callback_url);
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
    const responseRequestId = typeof data.request_id === "string" ? data.request_id : "";
    const responseChallenge = typeof data.challenge === "string" ? data.challenge : "";
    const responseInstanceId = typeof data.instance_id === "string" ? data.instance_id : "";
    const responseSignature = typeof data.signature === "string" ? data.signature : "";
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
function logAudit(peer, endpoint, status, decision, error) {
    logRemoteAudit({
        peer_instance_id: peer?.instance_id ?? null,
        endpoint,
        decision: decision ?? null,
        status,
        error: error ?? null,
        created_at: new Date().toISOString(),
    });
}
export class RemoteInteropService {
    agentPool;
    nonceCache = new RemoteNonceCache(DEFAULT_NONCE_TTL_MS, DEFAULT_NONCE_CACHE_SIZE);
    pairLimiter = new SlidingWindowLimiter(PAIR_REQUEST_LIMIT, PAIR_REQUEST_WINDOW_MS);
    pairConfirmLimiter = new SlidingWindowLimiter(PAIR_CONFIRM_LIMIT, PAIR_CONFIRM_WINDOW_MS);
    proposalLimiter = new SlidingWindowLimiter(PROPOSAL_LIMIT, PROPOSAL_WINDOW_MS);
    pingLimiter = new SlidingWindowLimiter(PING_LIMIT, PING_WINDOW_MS);
    executeLimiter = new SlidingWindowLimiter(EXECUTE_LIMIT, EXECUTE_WINDOW_MS);
    revokeLimiter = new SlidingWindowLimiter(REVOKE_LIMIT, REVOKE_WINDOW_MS);
    inflightByPeer = new Map();
    inflightTotal = 0;
    constructor(agentPool) {
        this.agentPool = agentPool;
    }
    async handleRequest(req) {
        if (!REMOTE_INTEROP_ENABLED) {
            return jsonResponse({ error: "Not found" }, 404);
        }
        const url = new URL(req.url);
        const pathname = url.pathname;
        if (req.method === "POST" && pathname === "/api/remote/pair-request") {
            return this.handlePairRequest(req);
        }
        if (req.method === "POST" && pathname === "/api/remote/pair-confirm") {
            return this.handlePairConfirm(req);
        }
        if (req.method === "POST" && pathname === "/api/remote/revoke") {
            return this.handleRevoke(req);
        }
        if (req.method === "GET" && pathname === "/api/remote/ping") {
            return this.handlePing(req);
        }
        if (req.method === "POST" && pathname === "/api/remote/proposal") {
            return this.handleProposal(req);
        }
        if (req.method === "POST" && pathname === "/api/remote/execute") {
            return this.handleExecute(req);
        }
        return jsonResponse({ error: "Not found" }, 404);
    }
    async handlePairRequest(req) {
        const jsonError = requireJson(req);
        if (jsonError)
            return jsonResponse({ error: jsonError }, 415);
        const lengthCheck = checkContentLength(req, DEFAULT_MAX_PROMPT_BYTES);
        if (!lengthCheck.ok)
            return jsonResponse({ error: lengthCheck.error }, lengthCheck.status);
        const { data, error } = await readJsonBody(req, DEFAULT_MAX_PROMPT_BYTES);
        if (error)
            return jsonResponse({ error }, 400);
        const instanceId = typeof data?.instance_id === "string" ? data.instance_id.trim() : "";
        const publicKey = typeof data?.public_key === "string" ? data.public_key.trim() : "";
        const displayName = typeof data?.display_name === "string" ? data.display_name.trim() : null;
        const callbackUrl = typeof data?.callback_url === "string" ? data.callback_url.trim() : "";
        const protocolVersion = typeof data?.protocol_version === "string" ? data.protocol_version.trim() : "";
        const nonce = typeof data?.nonce === "string" ? data.nonce.trim() : null;
        const expiresAtRaw = typeof data?.expires_at === "string" ? data.expires_at.trim() : "";
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
        const callbackCheck = validateCallbackUrl(callbackUrl);
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
        if (!this.pairLimiter.allow(rateKey)) {
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
    async handlePairConfirm(req) {
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
        const requestId = typeof data?.request_id === "string" ? data.request_id.trim() : "";
        const challenge = typeof data?.challenge === "string" ? data.challenge.trim() : "";
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
        if (!this.pairConfirmLimiter.allow(rateKey)) {
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
        const sigResult = verifySignedRequest(req, bodyBytes, peer, this.nonceCache);
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
    async handlePing(req) {
        const peer = this.requirePeer(req);
        if (peer instanceof Response)
            return peer;
        if (!this.pingLimiter.allow(peer.instance_id)) {
            return jsonResponse({ error: "Ping rate limit exceeded." }, 429);
        }
        const bodyBytes = await readBodyBytes(req);
        const sig = verifySignedRequest(req, bodyBytes, peer, this.nonceCache);
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
    async handleProposal(req) {
        const peer = this.requirePeer(req);
        if (peer instanceof Response)
            return peer;
        const jsonError = requireJson(req);
        if (jsonError)
            return jsonResponse({ error: jsonError }, 415);
        const lengthCheck = checkContentLength(req, DEFAULT_MAX_PROMPT_BYTES);
        if (!lengthCheck.ok)
            return jsonResponse({ error: lengthCheck.error }, lengthCheck.status);
        const bodyBytes = await readBodyBytes(req);
        const sig = verifySignedRequest(req, bodyBytes, peer, this.nonceCache);
        if (!sig.ok) {
            logAudit(peer, "/api/remote/proposal", "denied", undefined, sig.error);
            return jsonResponse({ error: sig.error }, 401);
        }
        if (!this.proposalLimiter.allow(peer.instance_id)) {
            return jsonResponse({ error: "Proposal rate limit exceeded." }, 429);
        }
        const payload = parseJsonBytes(bodyBytes, DEFAULT_MAX_PROMPT_BYTES);
        if (payload.error)
            return jsonResponse({ error: payload.error }, 400);
        const prompt = typeof payload.data?.prompt === "string" ? payload.data.prompt.trim() : "";
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
            decision_model: REMOTE_INTEROP_DECISION_MODEL || null,
        });
    }
    async handleExecute(req) {
        const peer = this.requirePeer(req);
        if (peer instanceof Response)
            return peer;
        const jsonError = requireJson(req);
        if (jsonError)
            return jsonResponse({ error: jsonError }, 415);
        const lengthCheck = checkContentLength(req, DEFAULT_MAX_PROMPT_BYTES);
        if (!lengthCheck.ok)
            return jsonResponse({ error: lengthCheck.error }, lengthCheck.status);
        const bodyBytes = await readBodyBytes(req);
        const sig = verifySignedRequest(req, bodyBytes, peer, this.nonceCache);
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
        if (!this.executeLimiter.allow(peer.instance_id)) {
            return jsonResponse({ error: "Execute rate limit exceeded." }, 429);
        }
        if (this.inflightTotal >= 4 || (this.inflightByPeer.get(peer.instance_id) || 0) >= 1) {
            return jsonResponse({ error: "Remote execution concurrency limit reached." }, 429);
        }
        const payload = parseJsonBytes(bodyBytes, DEFAULT_MAX_PROMPT_BYTES);
        if (payload.error)
            return jsonResponse({ error: payload.error }, 400);
        const prompt = typeof payload.data?.prompt === "string" ? payload.data.prompt.trim() : "";
        if (!prompt)
            return jsonResponse({ error: "Missing prompt." }, 400);
        if (!this.agentPool) {
            return jsonResponse({ error: "Agent pool not available." }, 500);
        }
        this.inflightTotal += 1;
        this.inflightByPeer.set(peer.instance_id, (this.inflightByPeer.get(peer.instance_id) || 0) + 1);
        const start = Date.now();
        try {
            const chatJid = `remote:${peer.instance_id}`;
            const output = await this.agentPool.runAgent(prompt, chatJid, { timeoutMs: 60_000 });
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
            this.inflightTotal = Math.max(0, this.inflightTotal - 1);
            const count = (this.inflightByPeer.get(peer.instance_id) || 1) - 1;
            if (count <= 0)
                this.inflightByPeer.delete(peer.instance_id);
            else
                this.inflightByPeer.set(peer.instance_id, count);
        }
    }
    async handleRevoke(req) {
        const peer = this.requirePeer(req);
        if (peer instanceof Response)
            return peer;
        const jsonError = requireJson(req);
        if (jsonError)
            return jsonResponse({ error: jsonError }, 415);
        const lengthCheck = checkContentLength(req, DEFAULT_MAX_PROMPT_BYTES);
        if (!lengthCheck.ok)
            return jsonResponse({ error: lengthCheck.error }, lengthCheck.status);
        if (!this.revokeLimiter.allow(peer.instance_id)) {
            return jsonResponse({ error: "Revoke rate limit exceeded." }, 429);
        }
        const bodyBytes = await readBodyBytes(req);
        const sig = verifySignedRequest(req, bodyBytes, peer, this.nonceCache);
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
    requirePeer(req) {
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
}
