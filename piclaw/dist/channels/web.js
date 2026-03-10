/**
 * channels/web.ts – Web channel: HTTP server, SSE, and API endpoints.
 *
 * The WebChannel class is the central coordinator for the web UI. It:
 *   - Starts the HTTP(S) server (Bun.serve) with TLS and auth support.
 *   - Routes requests to handlers (posts, media, agent, workspace).
 *   - Manages SSE connections for real-time event streaming to browsers.
 *   - Bridges agent events (drafts, thoughts, status) to the UI.
 *   - Handles inbound messages and control commands from the web compose box.
 *
 * Consumers:
 *   - runtime.ts creates and starts the WebChannel.
 *   - The web UI (web/src/) connects via SSE and REST API.
 */
import { initTheme } from "@mariozechner/pi-coding-agent";
import { WebauthnChallengeTracker } from "./web/webauthn-challenges.js";
import { TotpFailureTracker } from "./web/totp-failure-tracker.js";
import { ASSISTANT_AVATAR, ASSISTANT_NAME, USER_AVATAR, USER_AVATAR_BACKGROUND, USER_NAME, WEB_HOST, WEB_IDLE_TIMEOUT, WEB_PORT, WEB_TLS_CERT, WEB_TLS_KEY, WEB_SESSION_TTL, WEB_TOTP_SECRET, WEB_INTERNAL_SECRET, WEB_PASSKEY_MODE, } from "../core/config.js";
import { startWorkspaceWatcher } from "./web/handlers/workspace.js";
import { RequestRouterService } from "./web/request-router-service.js";
import { handlePost as handlePostRequest } from "./web/handlers/posts.js";
import { handleAgentMessage as handleAgentMessageRequest, processChat as processAgentChat, } from "./web/handlers/agent.js";
import { SseHub } from "./web/sse-hub.js";
import { UiBridge } from "./web/ui-bridge.js";
import { ResponseService } from "./web/http/response-service.js";
import { replaceMessageContent, getDb, } from "../db.js";
import { WebChannelState } from "./web/channel-state.js";
import { AgentStatusStore } from "./web/agent-status-store.js";
import { FollowupPlaceholderStore } from "./web/followup-placeholders.js";
import { PendingSteeringStore } from "./web/pending-steering.js";
import { storeWebMessage } from "./web/message-store.js";
import { queueFollowupPlaceholderMessage, replaceQueuedFollowupPlaceholderMessage, sendWebMessage, } from "./web/message-write-flows.js";
import { deletePostResponse } from "./web/timeline-service.js";
import { ensureAvatarCache, resolveAvatarUrl } from "./web/avatar-service.js";
import { handleAgentContextRequest, handleAgentModelsRequest, handleAgentStatusRequest, } from "./web/agent-status.js";
import { AgentBuffers } from "./web/agent-buffers.js";
import { bindWebUiSessionBinder } from "./web/agent-pool-binder.js";
import { handleHashtagRequest, handleSearchRequest, handleThoughtRequest, handleThreadRequest, handleTimelineRequest, } from "./web/content-endpoints.js";
import { handleAgentsRequest, handleAvatarRequest, } from "./web/identity-endpoints.js";
import { handleManifestRequest } from "./web/manifest.js";
import { getThreadRootId as getThreadRootIdForChat, resumeChat as resumeWebChat, skipFailedOnModelSwitch as skipFailedOnModelSwitchForChat, } from "./web/chat-run-control.js";
import { recoverInflightRuns as recoverWebInflightRuns, resumePendingChats as resumeWebPendingChats, } from "./web/recovery.js";
import { handleInternalPostRequest, handleUpdatePostRequest, } from "./web/post-mutations.js";
import { handleAgentRespondRequest, handleThoughtVisibilityRequest, handleWorkspaceVisibilityRequest, } from "./web/ui-endpoints.js";
import { createWebChannelEndpointContexts, } from "./web/channel-endpoint-context-factory.js";
import { createInteractionBroadcaster } from "./web/interaction-broadcaster.js";
import { WebAuthGateway } from "./web/auth-gateway.js";
import { RemoteInteropService } from "../remote/service.js";
const DEFAULT_CHAT_JID = "web:default";
const DEFAULT_AGENT_ID = "default";
const STATE_KEY = "last_agent_timestamp_web";
/** Web channel: HTTP/SSE server, API endpoints, and agent event bridge. */
export class WebChannel {
    queue;
    agentPool;
    server = null;
    state = new WebChannelState(STATE_KEY);
    sse = new SseHub();
    uiBridge;
    remoteInterop;
    responses = new ResponseService();
    requestRouter;
    endpointContexts;
    pendingLinkPreviews = new Set();
    workspaceWatcher = null;
    workspaceVisible = false;
    workspaceShowHidden = false;
    followupPlaceholderStore = new FollowupPlaceholderStore();
    pendingSteeringStore = new PendingSteeringStore();
    agentStatusStore;
    interactionBroadcaster;
    lastCommandInteractionId = null;
    webauthnChallenges = new WebauthnChallengeTracker();
    totpFailureTracker = new TotpFailureTracker();
    agentBuffers = new AgentBuffers();
    authGateway;
    constructor(opts) {
        this.queue = opts.queue;
        this.agentPool = opts.agentPool;
        this.uiBridge = new UiBridge(this);
        this.remoteInterop = new RemoteInteropService(this.agentPool);
        this.agentStatusStore = new AgentStatusStore(this.state);
        this.interactionBroadcaster = createInteractionBroadcaster(this, {
            agentName: ASSISTANT_NAME,
            agentAvatar: resolveAvatarUrl("agent", ASSISTANT_AVATAR),
            userName: USER_NAME || null,
            userAvatar: resolveAvatarUrl("user", USER_AVATAR),
            userAvatarBackground: USER_AVATAR_BACKGROUND || null,
        });
        this.authGateway = new WebAuthGateway({
            passkeyMode: WEB_PASSKEY_MODE || "",
            totpSecret: WEB_TOTP_SECRET || "",
            internalSecret: WEB_INTERNAL_SECRET || "",
            sessionTtlSeconds: WEB_SESSION_TTL,
            hasTls: Boolean(WEB_TLS_CERT && WEB_TLS_KEY),
        }, {
            json: (payload, status = 200) => this.json(payload, status),
            challenges: this.webauthnChallenges,
            failureTracker: this.totpFailureTracker,
        });
        this.requestRouter = new RequestRouterService(this);
        this.endpointContexts = createWebChannelEndpointContexts(this, {
            defaultChatJid: DEFAULT_CHAT_JID,
            defaultAgentId: DEFAULT_AGENT_ID,
            agentName: ASSISTANT_NAME,
            agentAvatar: resolveAvatarUrl("agent", ASSISTANT_AVATAR),
            userName: USER_NAME || null,
            userAvatar: resolveAvatarUrl("user", USER_AVATAR),
            userAvatarBackground: USER_AVATAR_BACKGROUND || null,
            assistantAvatarRaw: ASSISTANT_AVATAR || null,
            userAvatarRaw: USER_AVATAR || null,
        });
        bindWebUiSessionBinder(this.agentPool, (session, chatJid) => this.uiBridge.bindSession(session, chatJid));
    }
    async start() {
        this.loadState();
        try {
            initTheme();
        }
        catch { }
        const tls = await this.loadTlsOptions();
        this.server = Bun.serve({
            hostname: WEB_HOST,
            port: WEB_PORT,
            idleTimeout: WEB_IDLE_TIMEOUT,
            // Hard limit on request body size. Individual endpoints enforce tighter
            // limits (e.g., 10 MB for media uploads, 512 MB for workspace uploads,
            // 100 KB for message content).
            // This is the outermost safety net; Bun rejects bodies exceeding this
            // before any handler code runs.
            maxRequestBodySize: 512 * 1024 * 1024, // 512 MB hard cap
            fetch: (req) => this.handleRequest(req),
            ...(tls ? { tls } : {}),
        });
        this.workspaceWatcher = startWorkspaceWatcher(this);
        const scheme = tls ? "https" : "http";
        console.log(`[web] UI listening on ${scheme}://${WEB_HOST}:${WEB_PORT}`);
    }
    async stop() {
        this.sse.closeAll();
        this.uiBridge.stop();
        this.server?.stop(true);
        this.server = null;
        if (this.workspaceWatcher) {
            await this.workspaceWatcher.close();
            this.workspaceWatcher = null;
        }
    }
    getMessageWriteContext() {
        return {
            defaultAgentId: DEFAULT_AGENT_ID,
            store: {
                storeMessage: (chatJid, content, isBot, mediaIds, options) => this.storeMessage(chatJid, content, isBot, mediaIds, options),
                replaceMessageContent: (chatJid, rowId, text, mediaIds, contentBlocks) => replaceMessageContent(chatJid, rowId, text, { contentBlocks, mediaIds }) ?? null,
                setMessageThreadToSelf: (messageId) => {
                    getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(messageId, messageId);
                },
            },
            broadcaster: {
                broadcastAgentResponse: (interaction) => this.interactionBroadcaster.broadcastAgentResponse(interaction),
                broadcastInteractionUpdated: (interaction) => this.interactionBroadcaster.broadcastInteractionUpdated(interaction),
            },
            followups: {
                enqueue: (chatJid, rowId) => this.followupPlaceholderStore.enqueue(chatJid, rowId),
            },
        };
    }
    async sendMessage(chatJid, text, options) {
        sendWebMessage(chatJid, text, options, this.getMessageWriteContext());
    }
    queueFollowupPlaceholder(chatJid, text, threadId) {
        return queueFollowupPlaceholderMessage(chatJid, text, threadId, this.getMessageWriteContext());
    }
    consumeQueuedFollowupPlaceholder(chatJid) {
        return this.followupPlaceholderStore.consume(chatJid);
    }
    queuePendingSteering(chatJid, timestamp) {
        this.pendingSteeringStore.queue(chatJid, timestamp);
    }
    consumePendingSteering(chatJid) {
        return this.pendingSteeringStore.consumeLatest(chatJid);
    }
    updateAgentStatus(chatJid, status) {
        this.agentStatusStore.update(chatJid, status);
    }
    getAgentStatus(chatJid) {
        return this.agentStatusStore.get(chatJid);
    }
    replaceQueuedFollowupPlaceholder(chatJid, rowId, text, mediaIds, contentBlocks, threadId) {
        return replaceQueuedFollowupPlaceholderMessage(chatJid, rowId, text, mediaIds, contentBlocks, threadId, this.getMessageWriteContext());
    }
    getThreadRootId(chatJid, messageId) {
        return getThreadRootIdForChat(chatJid, messageId);
    }
    getResumeChatContext() {
        return {
            defaultAgentId: DEFAULT_AGENT_ID,
            enqueue: (task, key) => this.queue.enqueue(task, key),
            processChat: (chatJid, agentId, threadRootId) => this.processChat(chatJid, agentId, threadRootId),
        };
    }
    resumeChat(chatJid, threadRootId) {
        resumeWebChat(chatJid, threadRootId, this.getResumeChatContext());
    }
    skipFailedOnModelSwitch(chatJid) {
        skipFailedOnModelSwitchForChat(chatJid);
    }
    getRecoveryContext() {
        return {
            assistantName: ASSISTANT_NAME,
            defaultAgentId: DEFAULT_AGENT_ID,
            enqueue: (task, key) => this.queue.enqueue(task, key),
            processChat: (chatJid, agentId, threadRootId) => this.processChat(chatJid, agentId, threadRootId),
        };
    }
    /**
     * Check for inflight run markers left by a previous process that was killed
     * mid-turn. Rolls back all cursors in a single transaction (all-or-nothing),
     * then enqueues a retry for each. Only enqueues if the transaction succeeds –
     * if the rollback fails the inflight markers remain and will be retried on
     * the next startup.
     *
     * Called once at startup before the queue starts processing.
     */
    recoverInflightRuns() {
        recoverWebInflightRuns(this.getRecoveryContext());
    }
    /**
     * Scan all known chats (or a specific one) for messages that arrived after
     * their stored cursor and enqueue processChat() for each with pending work.
     * Called after a restart via the resume_pending IPC.
     */
    resumePendingChats(chatJid) {
        resumeWebPendingChats(this.getRecoveryContext(), chatJid);
    }
    loadState() {
        this.agentStatusStore.load();
    }
    saveState() {
        this.state.save();
    }
    setPanelExpanded(turnId, panel, expanded) {
        this.agentBuffers.setPanelExpanded(turnId, panel, expanded);
    }
    isPanelExpanded(turnId, panel) {
        return this.agentBuffers.isPanelExpanded(turnId, panel);
    }
    updateThoughtBuffer(turnId, text, totalLines) {
        this.agentBuffers.updateBuffer(turnId, "thought", text, totalLines);
    }
    updateDraftBuffer(turnId, text, totalLines) {
        this.agentBuffers.updateBuffer(turnId, "draft", text, totalLines);
    }
    getBuffer(turnId, panel) {
        return this.agentBuffers.getBuffer(turnId, panel);
    }
    async loadTlsOptions() {
        if (!WEB_TLS_CERT || !WEB_TLS_KEY)
            return null;
        try {
            const [cert, key] = await Promise.all([
                Bun.file(WEB_TLS_CERT).text(),
                Bun.file(WEB_TLS_KEY).text(),
            ]);
            return { cert, key };
        }
        catch (error) {
            console.error("[web] Failed to load TLS cert/key:", error);
            return null;
        }
    }
    async handleRequest(req) {
        return this.requestRouter.handle(req);
    }
    async handleAgents() {
        return await handleAgentsRequest(this.endpointContexts.agents());
    }
    async handleManifest(req) {
        return await handleManifestRequest(req, {
            assistantName: ASSISTANT_NAME,
            assistantAvatar: ASSISTANT_AVATAR,
            ensureAvatarCache,
        });
    }
    async handleAvatar(kind, req) {
        return await handleAvatarRequest(kind, req, this.endpointContexts.avatar());
    }
    async handleWorkspaceVisibility(req) {
        return await handleWorkspaceVisibilityRequest(req, this.endpointContexts.ui());
    }
    handleTimeline(limit, before) {
        return handleTimelineRequest(limit, before, this.endpointContexts.content());
    }
    handleHashtag(tag, limit, offset) {
        return handleHashtagRequest(tag, limit, offset, this.endpointContexts.content());
    }
    handleSearch(query, limit, offset) {
        return handleSearchRequest(query, limit, offset, this.endpointContexts.content());
    }
    handleThread(id) {
        return handleThreadRequest(id, this.endpointContexts.content());
    }
    handleThought(panel, turnId) {
        return handleThoughtRequest(panel, turnId, this.endpointContexts.content());
    }
    async handleThoughtVisibility(req) {
        return await handleThoughtVisibilityRequest(req, this.endpointContexts.ui());
    }
    handleDeletePost(id, cascade = false) {
        const result = deletePostResponse(DEFAULT_CHAT_JID, id, cascade);
        if (result.deletedIds.length > 0) {
            this.broadcastEvent("interaction_deleted", { ids: result.deletedIds });
        }
        return this.json(result.body, result.status);
    }
    /**
     * PATCH /post/:id – Update a post's content and optionally set thread_id.
     * Validates: id is a positive integer, content ≤ 100 KB, thread_id is a
     * positive integer if provided. Uses parameterized queries (no SQL injection).
     */
    async handleUpdatePost(req, id) {
        return await handleUpdatePostRequest(req, id, this.endpointContexts.postMutations());
    }
    /**
     * POST /internal/post – Create an internal agent message.
     * Requires internal secret when WEB_INTERNAL_SECRET is configured.
     * Content is capped at 100 KB to prevent DB bloat.
     */
    async handleInternalPost(req) {
        return await handleInternalPostRequest(req, this.endpointContexts.postMutations());
    }
    handleSse() {
        return this.sse.handleRequest();
    }
    broadcastEvent(eventType, data) {
        this.sse.broadcast(eventType, data);
    }
    async handlePost(req, isReply) {
        return handlePostRequest(this, req, isReply, DEFAULT_CHAT_JID);
    }
    handleAgentStatus(req) {
        return handleAgentStatusRequest(req, this.endpointContexts.agentStatus());
    }
    /** GET /agent/context — return context window usage for the compose box indicator. */
    async handleAgentContext(req) {
        return await handleAgentContextRequest(req, this.endpointContexts.agentStatus());
    }
    /** GET /agent/models — return available model labels and current selection. */
    async handleAgentModels(req) {
        return await handleAgentModelsRequest(req, this.endpointContexts.agentStatus());
    }
    /**
     * POST /agent/respond – Handle a UI response to an agent request (e.g., confirmation dialog).
     * Validates request_id is a non-empty string of ≤ 256 chars.
     */
    async handleAgentRespond(req) {
        return await handleAgentRespondRequest(req, this.endpointContexts.ui());
    }
    async handleAgentMessage(req, pathname) {
        return handleAgentMessageRequest(this, req, pathname, DEFAULT_CHAT_JID, DEFAULT_AGENT_ID);
    }
    async processChat(chatJid, agentId, threadRootId) {
        return processAgentChat(this, chatJid, agentId, threadRootId ?? undefined);
    }
    storeMessage(chatJid, content, isBot, mediaIds, options = {}) {
        return storeWebMessage(this, {
            chatJid,
            content,
            isBot,
            mediaIds,
            agentId: DEFAULT_AGENT_ID,
            agentName: ASSISTANT_NAME,
        }, {
            contentBlocks: options.contentBlocks,
            linkPreviews: options.linkPreviews,
            threadId: options.threadId ?? null,
        });
    }
    async handleRemote(req) {
        return this.remoteInterop.handleRequest(req);
    }
    async serveStatic(relPath) {
        return this.responses.serveStatic(relPath);
    }
    async serveDocsStatic(relPath) {
        return this.responses.serveDocsStatic(relPath);
    }
    json(data, status = 200) {
        return this.responses.json(data, status);
    }
    clampInt(value, fallback, min, max) {
        return this.responses.clampInt(value, fallback, min, max);
    }
    parseOptionalInt(value) {
        return this.responses.parseOptionalInt(value);
    }
}
