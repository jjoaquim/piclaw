/**
 * remote/service.ts – Remote interop request router and stateful limiter composition.
 */
import { REMOTE_INTEROP_DECISION_MODEL, REMOTE_INTEROP_ENABLED } from "../core/config.js";
import { DEFAULT_NONCE_CACHE_SIZE, DEFAULT_NONCE_TTL_MS, EXECUTE_LIMIT, EXECUTE_WINDOW_MS, PAIR_CONFIRM_LIMIT, PAIR_CONFIRM_WINDOW_MS, PAIR_REQUEST_LIMIT, PAIR_REQUEST_WINDOW_MS, PING_LIMIT, PING_WINDOW_MS, PROPOSAL_LIMIT, PROPOSAL_WINDOW_MS, REVOKE_LIMIT, REVOKE_WINDOW_MS, } from "./limits.js";
import { RemoteNonceCache } from "./nonce-cache.js";
import { SlidingWindowLimiter, jsonResponse } from "./http-utils.js";
import { RemoteExecuteConcurrency } from "./execute-concurrency.js";
import { handlePairConfirm, handlePairRequest } from "./service-pairing.js";
import { handleExecute, handlePing, handleProposal, handleRevoke, } from "./service-operations.js";
function isRemoteInteropEnabled() {
    if (REMOTE_INTEROP_ENABLED)
        return true;
    const raw = (process.env.PICLAW_REMOTE_INTEROP_ENABLED || "").trim().toLowerCase();
    return raw === "1" || raw === "true" || raw === "yes" || raw === "on";
}
function getRemoteInteropDecisionModel() {
    const raw = (process.env.PICLAW_REMOTE_INTEROP_DECISION_MODEL || "").trim();
    if (raw)
        return raw;
    return REMOTE_INTEROP_DECISION_MODEL || "";
}
/**
 * RemoteInteropService validates and serves `/api/remote/*` endpoint requests.
 *
 * This service owns nonce replay protection, per-endpoint sliding-window
 * limiters, and execute concurrency accounting while delegating endpoint logic
 * to dedicated handler modules.
 */
export class RemoteInteropService {
    agentPool;
    nonceCache = new RemoteNonceCache(DEFAULT_NONCE_TTL_MS, DEFAULT_NONCE_CACHE_SIZE);
    pairLimiter = new SlidingWindowLimiter(PAIR_REQUEST_LIMIT, PAIR_REQUEST_WINDOW_MS);
    pairConfirmLimiter = new SlidingWindowLimiter(PAIR_CONFIRM_LIMIT, PAIR_CONFIRM_WINDOW_MS);
    proposalLimiter = new SlidingWindowLimiter(PROPOSAL_LIMIT, PROPOSAL_WINDOW_MS);
    pingLimiter = new SlidingWindowLimiter(PING_LIMIT, PING_WINDOW_MS);
    executeLimiter = new SlidingWindowLimiter(EXECUTE_LIMIT, EXECUTE_WINDOW_MS);
    revokeLimiter = new SlidingWindowLimiter(REVOKE_LIMIT, REVOKE_WINDOW_MS);
    executeConcurrency = new RemoteExecuteConcurrency(4, 1);
    constructor(agentPool) {
        this.agentPool = agentPool;
    }
    pairingContext() {
        return {
            pairLimiter: this.pairLimiter,
            pairConfirmLimiter: this.pairConfirmLimiter,
            nonceCache: this.nonceCache,
        };
    }
    operationContext() {
        return {
            nonceCache: this.nonceCache,
            pingLimiter: this.pingLimiter,
            proposalLimiter: this.proposalLimiter,
            executeLimiter: this.executeLimiter,
            revokeLimiter: this.revokeLimiter,
            executeConcurrency: this.executeConcurrency,
            agentPool: this.agentPool,
            getDecisionModel: getRemoteInteropDecisionModel,
        };
    }
    /** Route an incoming `/api/remote/*` request to the appropriate handler. */
    async handleRequest(req) {
        if (!isRemoteInteropEnabled()) {
            return jsonResponse({ error: "Not found" }, 404);
        }
        const url = new URL(req.url);
        const pathname = url.pathname;
        if (req.method === "POST" && pathname === "/api/remote/pair-request") {
            return handlePairRequest(req, this.pairingContext());
        }
        if (req.method === "POST" && pathname === "/api/remote/pair-confirm") {
            return handlePairConfirm(req, this.pairingContext());
        }
        if (req.method === "POST" && pathname === "/api/remote/revoke") {
            return handleRevoke(req, this.operationContext());
        }
        if (req.method === "GET" && pathname === "/api/remote/ping") {
            return handlePing(req, this.operationContext());
        }
        if (req.method === "POST" && pathname === "/api/remote/proposal") {
            return handleProposal(req, this.operationContext());
        }
        if (req.method === "POST" && pathname === "/api/remote/execute") {
            return handleExecute(req, this.operationContext());
        }
        return jsonResponse({ error: "Not found" }, 404);
    }
}
