import { initTheme } from "@mariozechner/pi-coding-agent";
import { randomSessionToken, verifyTotp } from "./web/auth.js";
import { ASSISTANT_AVATAR, ASSISTANT_NAME, USER_AVATAR, USER_AVATAR_BACKGROUND, USER_NAME, WEB_HOST, WEB_IDLE_TIMEOUT, WEB_PORT, WEB_TLS_CERT, WEB_TLS_KEY, WEB_SESSION_TTL, WEB_TOTP_SECRET, WEB_TOTP_WINDOW, WEB_INTERNAL_SECRET, } from "../core/config.js";
import { handleMedia, handleMediaInfo, handleMediaUpload } from "./web/handlers/media.js";
import { handleWorkspaceAttach, handleWorkspaceDownload, handleWorkspaceFile, handleWorkspaceRaw, handleWorkspaceTree, handleWorkspaceUpload, startWorkspaceWatcher, } from "./web/handlers/workspace.js";
import { SseHub } from "./web/sse-hub.js";
import { UiBridge } from "./web/ui-bridge.js";
import { ResponseService } from "./web/http/response-service.js";
import { getMessageRowIdById, getMessagesSince, replaceMessageContent, } from "../db.js";
import { WebChannelState } from "./web/channel-state.js";
import { storeWebMessage } from "./web/message-store.js";
import { deletePostResponse, getHashtagResponse, getSearchResponse, getThreadResponse, getTimelineResponse, } from "./web/timeline-service.js";
import { getAgentsResponse } from "./web/agents-service.js";
import { buildAvatarResponse, ensureAvatarCache, resolveAvatarUrl } from "./web/avatar-service.js";
import { broadcastAgentResponse, broadcastInteractionUpdated } from "./web/interaction-service.js";
const DEFAULT_CHAT_JID = "web:default";
const DEFAULT_AGENT_ID = "default";
const STATE_KEY = "last_agent_timestamp_web";
export class WebChannel {
    queue;
    agentPool;
    server = null;
    state = new WebChannelState(STATE_KEY);
    sse = new SseHub();
    uiBridge;
    responses = new ResponseService();
    pendingLinkPreviews = new Set();
    workspaceWatcher = null;
    workspaceVisible = false;
    workspaceShowHidden = false;
    pendingSteering = new Map();
    activeAgentStatuses = new Map();
    lastCommandInteractionId = null;
    authSessions = new Map();
    thoughtBuffers = new Map();
    draftBuffers = new Map();
    expandedPanels = new Map();
    constructor(opts) {
        this.queue = opts.queue;
        this.agentPool = opts.agentPool;
        this.uiBridge = new UiBridge(this);
        if (typeof this.agentPool.setSessionBinder === "function") {
            this.agentPool.setSessionBinder((session, chatJid) => this.uiBridge.bindSession(session, chatJid));
        }
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
    async sendMessage(chatJid, text, threadId) {
        const interaction = this.storeMessage(chatJid, text, true, [], threadId ? { threadId } : undefined);
        if (interaction) {
            broadcastAgentResponse(this, interaction, ASSISTANT_NAME, resolveAvatarUrl("agent", ASSISTANT_AVATAR), USER_NAME || null, resolveAvatarUrl("user", USER_AVATAR), USER_AVATAR_BACKGROUND || null);
        }
    }
    queueFollowupPlaceholder(chatJid, text, threadId) {
        const interaction = this.storeMessage(chatJid, text, true, [], { threadId });
        if (!interaction)
            return null;
        this.state.enqueueFollowupPlaceholder(chatJid, interaction.id);
        broadcastAgentResponse(this, interaction, ASSISTANT_NAME, resolveAvatarUrl("agent", ASSISTANT_AVATAR), USER_NAME || null, resolveAvatarUrl("user", USER_AVATAR), USER_AVATAR_BACKGROUND || null);
        return interaction;
    }
    consumeQueuedFollowupPlaceholder(chatJid) {
        return this.state.consumeFollowupPlaceholder(chatJid);
    }
    queuePendingSteering(chatJid, timestamp) {
        if (!timestamp)
            return;
        const existing = this.pendingSteering.get(chatJid) ?? [];
        existing.push(timestamp);
        this.pendingSteering.set(chatJid, existing);
    }
    consumePendingSteering(chatJid) {
        const entries = this.pendingSteering.get(chatJid);
        if (!entries || entries.length === 0)
            return null;
        this.pendingSteering.delete(chatJid);
        entries.sort();
        return entries[entries.length - 1] ?? null;
    }
    updateAgentStatus(chatJid, status) {
        const type = status?.type;
        if (type === "done" || type === "error") {
            const removed = this.activeAgentStatuses.delete(chatJid);
            if (removed) {
                this.state.setAgentStatus(chatJid, null);
                this.saveState();
            }
            return;
        }
        this.activeAgentStatuses.set(chatJid, status);
        this.state.setAgentStatus(chatJid, status);
        this.saveState();
    }
    getAgentStatus(chatJid) {
        return this.activeAgentStatuses.get(chatJid) ?? null;
    }
    replaceQueuedFollowupPlaceholder(chatJid, rowId, text, mediaIds, contentBlocks, threadId) {
        const updated = replaceMessageContent(chatJid, rowId, text, {
            contentBlocks,
            mediaIds,
        });
        if (!updated)
            return null;
        updated.data.agent_id = DEFAULT_AGENT_ID;
        if (threadId)
            updated.data.thread_id = threadId;
        broadcastInteractionUpdated(this, updated, ASSISTANT_NAME, resolveAvatarUrl("agent", ASSISTANT_AVATAR), USER_NAME || null, resolveAvatarUrl("user", USER_AVATAR), USER_AVATAR_BACKGROUND || null);
        return updated;
    }
    getThreadRootId(chatJid, messageId) {
        return getMessageRowIdById(chatJid, messageId);
    }
    resumeChat(chatJid, prevTimestamp, threadRootId) {
        if (typeof prevTimestamp === "string") {
            this.state.lastAgentTimestamp[chatJid] = prevTimestamp;
            this.saveState();
        }
        this.queue.enqueue(async () => {
            await this.processChat(chatJid, DEFAULT_AGENT_ID, threadRootId ?? undefined);
        }, `resume:${chatJid}:${Date.now()}`);
    }
    resumePendingChats(chatJid) {
        const pending = this.state.getPendingResumes();
        const entries = chatJid && chatJid !== "all" ? { [chatJid]: pending[chatJid] } : pending;
        for (const [jid, info] of Object.entries(entries)) {
            if (!info)
                continue;
            const prevTimestamp = typeof info.prevTimestamp === "string" ? info.prevTimestamp : "";
            const messages = getMessagesSince(jid, prevTimestamp, ASSISTANT_NAME);
            if (messages.length === 0) {
                this.state.clearPendingResume(jid);
                continue;
            }
            const threadRootId = info.threadRootId ?? getMessageRowIdById(jid, info.messageId);
            this.resumeChat(jid, prevTimestamp, threadRootId ?? undefined);
        }
        this.saveState();
    }
    loadState() {
        this.state.load();
        const restored = this.state.getAgentStatuses();
        this.activeAgentStatuses = new Map(Object.entries(restored));
    }
    saveState() {
        this.state.save();
    }
    setPanelExpanded(turnId, panel, expanded) {
        if (!turnId)
            return;
        const current = this.expandedPanels.get(turnId) ?? { thought: false, draft: false };
        current[panel] = expanded;
        if (!current.thought && !current.draft) {
            this.expandedPanels.delete(turnId);
        }
        else {
            this.expandedPanels.set(turnId, current);
        }
    }
    isPanelExpanded(turnId, panel) {
        return this.expandedPanels.get(turnId)?.[panel] ?? false;
    }
    updateThoughtBuffer(turnId, text, totalLines) {
        if (!turnId)
            return;
        this.thoughtBuffers.set(turnId, { text, totalLines, updatedAt: Date.now() });
        this.pruneBuffers(this.thoughtBuffers);
    }
    updateDraftBuffer(turnId, text, totalLines) {
        if (!turnId)
            return;
        this.draftBuffers.set(turnId, { text, totalLines, updatedAt: Date.now() });
        this.pruneBuffers(this.draftBuffers);
    }
    getBuffer(turnId, panel) {
        return panel === "draft" ? this.draftBuffers.get(turnId) : this.thoughtBuffers.get(turnId);
    }
    pruneBuffers(map) {
        const limit = 50;
        if (map.size <= limit)
            return;
        const entries = Array.from(map.entries()).sort((a, b) => a[1].updatedAt - b[1].updatedAt);
        for (let i = 0; i < entries.length - limit; i += 1) {
            map.delete(entries[i][0]);
        }
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
    isAuthEnabled() {
        return Boolean(WEB_TOTP_SECRET && WEB_TOTP_SECRET.trim());
    }
    isInternalSecretEnabled() {
        return Boolean(WEB_INTERNAL_SECRET && WEB_INTERNAL_SECRET.trim());
    }
    cleanupAuthSessions(now = Date.now()) {
        for (const [token, expiresAt] of this.authSessions.entries()) {
            if (expiresAt <= now)
                this.authSessions.delete(token);
        }
    }
    parseCookies(req) {
        const header = req.headers.get("cookie") || "";
        if (!header)
            return {};
        return header.split(";").reduce((acc, part) => {
            const [rawKey, ...rest] = part.trim().split("=");
            if (!rawKey)
                return acc;
            acc[rawKey] = decodeURIComponent(rest.join("=") || "");
            return acc;
        }, {});
    }
    verifyInternalSecret(req) {
        const secret = (WEB_INTERNAL_SECRET || "").trim();
        if (!secret)
            return false;
        const header = req.headers.get("x-piclaw-internal-secret") || "";
        if (header && header === secret)
            return true;
        const auth = req.headers.get("authorization") || "";
        if (auth.toLowerCase().startsWith("bearer ")) {
            const token = auth.slice(7).trim();
            if (token === secret)
                return true;
        }
        return false;
    }
    getSessionToken(req) {
        const cookies = this.parseCookies(req);
        return cookies.piclaw_session || null;
    }
    isAuthenticated(req) {
        if (!this.isAuthEnabled())
            return true;
        this.cleanupAuthSessions();
        const token = this.getSessionToken(req);
        if (!token)
            return false;
        const expiresAt = this.authSessions.get(token);
        if (!expiresAt || expiresAt <= Date.now()) {
            this.authSessions.delete(token);
            return false;
        }
        return true;
    }
    buildSessionCookie(token, req) {
        const rawTtl = Number.isFinite(WEB_SESSION_TTL) ? WEB_SESSION_TTL : 0;
        const ttl = Math.max(60, rawTtl || 0);
        const secure = req.url.startsWith("https://") || Boolean(WEB_TLS_CERT && WEB_TLS_KEY);
        const parts = [
            `piclaw_session=${encodeURIComponent(token)}`,
            `Max-Age=${ttl}`,
            "Path=/",
            "HttpOnly",
            "SameSite=Strict",
        ];
        if (secure)
            parts.push("Secure");
        return parts.join("; ");
    }
    async handleAuthVerify(req) {
        if (!this.isAuthEnabled())
            return this.json({ error: "Auth disabled" }, 404);
        let body;
        try {
            body = await req.json();
        }
        catch {
            return this.json({ error: "Invalid JSON" }, 400);
        }
        const code = (body.code || "").trim();
        const windowSteps = Number.isFinite(WEB_TOTP_WINDOW) ? Math.max(0, WEB_TOTP_WINDOW) : 1;
        if (!code)
            return this.json({ error: "Missing code" }, 400);
        if (!verifyTotp(WEB_TOTP_SECRET, code, windowSteps)) {
            return this.json({ error: "Invalid code" }, 401);
        }
        const rawTtl = Number.isFinite(WEB_SESSION_TTL) ? WEB_SESSION_TTL : 0;
        const ttlSeconds = Math.max(60, rawTtl || 0);
        const token = randomSessionToken();
        this.authSessions.set(token, Date.now() + ttlSeconds * 1000);
        const payload = JSON.stringify({ ok: true });
        return new Response(payload, {
            status: 200,
            headers: {
                "Content-Type": "application/json",
                "Set-Cookie": this.buildSessionCookie(token, req),
            },
        });
    }
    async serveLoginPage() {
        return this.serveStatic("login.html");
    }
    redirectToLogin() {
        return new Response(null, {
            status: 302,
            headers: {
                Location: "/login",
            },
        });
    }
    async handleRequest(req) {
        const { RequestRouterService } = await import("./web/request-router-service.js");
        const router = new RequestRouterService(this);
        return router.handle(req);
    }
    async handleAgents() {
        const result = await getAgentsResponse(this.agentPool, {
            chatJid: DEFAULT_CHAT_JID,
            agentId: DEFAULT_AGENT_ID,
            agentName: ASSISTANT_NAME,
            agentAvatar: resolveAvatarUrl("agent", ASSISTANT_AVATAR),
            userName: USER_NAME || null,
            userAvatar: resolveAvatarUrl("user", USER_AVATAR),
            userAvatarBackground: USER_AVATAR_BACKGROUND || null,
        });
        return this.json(result.body, result.status);
    }
    async handleManifest(req) {
        const encoder = new TextEncoder();
        const baseName = ASSISTANT_NAME || "PiClaw";
        const icons = [
            { src: "/static/icon-192.png", sizes: "192x192", type: "image/png", purpose: "any" },
            { src: "/static/icon-512.png", sizes: "512x512", type: "image/png", purpose: "any" },
            { src: "/static/icon-192.png", sizes: "192x192", type: "image/png", purpose: "maskable" },
            { src: "/static/icon-512.png", sizes: "512x512", type: "image/png", purpose: "maskable" },
        ];
        if (ASSISTANT_AVATAR) {
            try {
                const meta = await ensureAvatarCache("agent", ASSISTANT_AVATAR);
                if (meta) {
                    const versionSource = meta.updatedAt || new Date().toISOString();
                    const version = encodeURIComponent(versionSource);
                    icons.unshift({
                        src: `/avatar/agent?v=${version}`,
                        sizes: "any",
                        type: meta.contentType || "image/png",
                        purpose: "any maskable",
                    });
                }
            }
            catch (err) {
                console.warn("[web] Failed to prepare agent avatar for manifest:", err);
            }
        }
        const manifest = {
            name: baseName,
            short_name: baseName,
            description: "Slack-like interface for coding agents",
            start_url: "/",
            display: "standalone",
            display_override: ["window-controls-overlay"],
            background_color: "#ffffff",
            theme_color: "#ffffff",
            color_scheme: "dark light",
            icons,
        };
        const body = `${JSON.stringify(manifest, null, 2)}\n`;
        const headers = {
            "Content-Type": "application/manifest+json; charset=utf-8",
            "Cache-Control": "no-store",
            "Content-Length": String(encoder.encode(body).length),
        };
        if (req.method === "HEAD") {
            return new Response(null, { status: 200, headers });
        }
        return new Response(body, { status: 200, headers });
    }
    async handleAvatar(kind, req) {
        const source = kind === "agent" ? ASSISTANT_AVATAR : USER_AVATAR;
        if (!source)
            return this.json({ error: "Avatar not found" }, 404);
        const response = await buildAvatarResponse(kind, source, req);
        if (response)
            return response;
        return this.json({ error: "Avatar not found" }, 404);
    }
    async handleWorkspaceVisibility(req) {
        let data;
        try {
            data = await req.json();
        }
        catch {
            return this.json({ error: "Invalid JSON" }, 400);
        }
        if (typeof data.visible === "boolean") {
            this.workspaceVisible = data.visible;
        }
        else {
            this.workspaceVisible = Boolean(data.visible);
        }
        if (typeof data.show_hidden === "boolean") {
            this.workspaceShowHidden = data.show_hidden;
        }
        else if (typeof data.showHidden === "boolean") {
            this.workspaceShowHidden = data.showHidden;
        }
        return this.json({ status: "ok", visible: this.workspaceVisible, show_hidden: this.workspaceShowHidden });
    }
    handleTimeline(limit, before) {
        const result = getTimelineResponse(DEFAULT_CHAT_JID, limit, before);
        return this.json(result.body, result.status);
    }
    handleHashtag(tag, limit, offset) {
        const result = getHashtagResponse(DEFAULT_CHAT_JID, tag, limit, offset);
        return this.json(result.body, result.status);
    }
    handleSearch(query, limit, offset) {
        const result = getSearchResponse(DEFAULT_CHAT_JID, query, limit, offset);
        return this.json(result.body, result.status);
    }
    handleThread(id) {
        const result = getThreadResponse(DEFAULT_CHAT_JID, id);
        return this.json(result.body, result.status);
    }
    handleThought(panel, turnId) {
        if (!turnId)
            return this.json({ error: "Missing turn_id" }, 400);
        const normalized = panel === "draft" ? "draft" : "thought";
        const buffer = this.getBuffer(turnId, normalized);
        if (!buffer)
            return this.json({ error: "Thought not found" }, 404);
        return this.json({ text: buffer.text, total_lines: buffer.totalLines }, 200);
    }
    async handleThoughtVisibility(req) {
        let data;
        try {
            data = await req.json();
        }
        catch {
            return this.json({ error: "Invalid JSON" }, 400);
        }
        const turnId = (data.turn_id || data.turnId || "").trim();
        const panel = data.panel === "draft" ? "draft" : "thought";
        const expanded = Boolean(data.expanded);
        if (!turnId)
            return this.json({ error: "Missing turn_id" }, 400);
        this.setPanelExpanded(turnId, panel, expanded);
        return this.json({ status: "ok", turn_id: turnId, panel, expanded });
    }
    handleDeletePost(id, cascade = false) {
        const result = deletePostResponse(DEFAULT_CHAT_JID, id, cascade);
        if (result.deletedIds.length > 0) {
            this.broadcastEvent("interaction_deleted", { ids: result.deletedIds });
        }
        return this.json(result.body, result.status);
    }
    async handleUpdatePost(req, id) {
        if (!id)
            return this.json({ error: "Missing post id" }, 400);
        let body;
        try {
            body = await req.json();
        }
        catch {
            return this.json({ error: "Invalid JSON" }, 400);
        }
        if (!body.content && body.content !== "") {
            return this.json({ error: "Missing content" }, 400);
        }
        const updated = replaceMessageContent(DEFAULT_CHAT_JID, id, body.content, {});
        if (!updated)
            return this.json({ error: "Post not found" }, 404);
        if (body.thread_id) {
            const { getDb } = await import("../db/connection.js");
            getDb().prepare("UPDATE messages SET thread_id = ? WHERE rowid = ?").run(body.thread_id, id);
            updated.data.thread_id = body.thread_id;
        }
        broadcastInteractionUpdated(this, updated, ASSISTANT_NAME, resolveAvatarUrl("agent", ASSISTANT_AVATAR), USER_NAME || null, resolveAvatarUrl("user", USER_AVATAR), USER_AVATAR_BACKGROUND || null);
        return this.json({ ok: true, id: updated.id });
    }
    async handleInternalPost(req) {
        let body;
        try {
            body = await req.json();
        }
        catch {
            return this.json({ error: "Invalid JSON" }, 400);
        }
        if (!body.content)
            return this.json({ error: "Missing content" }, 400);
        const threadId = body.thread_id || this.lastCommandInteractionId || undefined;
        const interaction = this.storeMessage(DEFAULT_CHAT_JID, body.content, true, [], threadId ? { threadId } : undefined);
        if (!interaction)
            return this.json({ error: "Failed to store" }, 500);
        broadcastAgentResponse(this, interaction, ASSISTANT_NAME, resolveAvatarUrl("agent", ASSISTANT_AVATAR), USER_NAME || null, resolveAvatarUrl("user", USER_AVATAR), USER_AVATAR_BACKGROUND || null);
        return this.json({ ok: true, id: interaction.id }, 201);
    }
    handleSse() {
        return this.sse.handleRequest();
    }
    broadcastEvent(eventType, data) {
        this.sse.broadcast(eventType, data);
    }
    async handlePost(req, isReply) {
        const { handlePost } = await import("./web/handlers/posts.js");
        return handlePost(this, req, isReply, DEFAULT_CHAT_JID);
    }
    handleAgentStatus(req) {
        const url = new URL(req.url);
        const chatJid = (url.searchParams.get("chat_jid") || DEFAULT_CHAT_JID).trim() || DEFAULT_CHAT_JID;
        const status = this.getAgentStatus(chatJid);
        return this.json({ status: status ? "active" : "idle", data: status });
    }
    async handleAgentRespond(req) {
        let data;
        try {
            data = await req.json();
        }
        catch {
            return this.json({ error: "Invalid JSON" }, 400);
        }
        if (!data.request_id)
            return this.json({ error: "Missing request_id" }, 400);
        const status = this.uiBridge.handleUiResponse(data.request_id, data.outcome);
        return this.json(status);
    }
    async handleAgentMessage(req, pathname) {
        const { handleAgentMessage } = await import("./web/handlers/agent.js");
        return handleAgentMessage(this, req, pathname, DEFAULT_CHAT_JID, DEFAULT_AGENT_ID);
    }
    async processChat(chatJid, agentId, threadRootId) {
        const { processChat } = await import("./web/handlers/agent.js");
        return processChat(this, chatJid, agentId, threadRootId ?? undefined);
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
    async handleMediaUpload(req) {
        return handleMediaUpload(this, req);
    }
    handleMedia(id, thumbnail) {
        return handleMedia(this, id, thumbnail);
    }
    handleMediaInfo(id) {
        return handleMediaInfo(this, id);
    }
    handleWorkspaceTree(req) {
        return handleWorkspaceTree(this, req);
    }
    handleWorkspaceFile(req) {
        return handleWorkspaceFile(this, req);
    }
    handleWorkspaceRaw(req) {
        return handleWorkspaceRaw(this, req);
    }
    async handleWorkspaceAttach(req) {
        return handleWorkspaceAttach(this, req);
    }
    async handleWorkspaceUpload(req) {
        return handleWorkspaceUpload(this, req);
    }
    async handleWorkspaceDownload(req) {
        return handleWorkspaceDownload(this, req);
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
