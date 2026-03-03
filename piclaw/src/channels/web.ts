import { AgentQueue } from "../queue.js";
import type { AgentPool } from "../agent-pool.js";
import { initTheme, type AgentSession } from "@mariozechner/pi-coding-agent";
import {
  ASSISTANT_AVATAR,
  ASSISTANT_NAME,
  USER_AVATAR,
  USER_AVATAR_BACKGROUND,
  USER_NAME,
  WEB_HOST,
  WEB_IDLE_TIMEOUT,
  WEB_PORT,
  WEB_TLS_CERT,
  WEB_TLS_KEY,
} from "../core/config.js";
import { handleMedia, handleMediaInfo, handleMediaUpload } from "./web/handlers/media.js";
import {
  handleWorkspaceAttach,
  handleWorkspaceDownload,
  handleWorkspaceFile,
  handleWorkspaceRaw,
  handleWorkspaceTree,
  handleWorkspaceUpload,
  startWorkspaceWatcher,
} from "./web/handlers/workspace.js";
import { SseHub } from "./web/sse-hub.js";
import { UiBridge } from "./web/ui-bridge.js";
import { ResponseService } from "./web/http/response-service.js";
import {
  getMessageRowIdById,
  getMessagesSince,
  replaceMessageContent,
} from "../db.js";
import type { InteractionRow } from "../db.js";
import { WebChannelState } from "./web/channel-state.js";
import { storeWebMessage } from "./web/message-store.js";
import {
  deletePostResponse,
  getHashtagResponse,
  getSearchResponse,
  getThreadResponse,
  getTimelineResponse,
} from "./web/timeline-service.js";
import { getAgentsResponse } from "./web/agents-service.js";
import { buildAvatarResponse, ensureAvatarCache, resolveAvatarUrl } from "./web/avatar-service.js";
import { broadcastAgentResponse, broadcastInteractionUpdated } from "./web/interaction-service.js";

const DEFAULT_CHAT_JID = "web:default";
const DEFAULT_AGENT_ID = "default";
const STATE_KEY = "last_agent_timestamp_web";

export interface WebChannelOpts {
  queue: AgentQueue;
  agentPool: AgentPool;
}

export class WebChannel {
  queue: AgentQueue;
  agentPool: AgentPool;
  server: ReturnType<typeof Bun.serve> | null = null;
  state = new WebChannelState(STATE_KEY);
  sse = new SseHub();
  uiBridge: UiBridge;
  responses = new ResponseService();
  pendingLinkPreviews = new Set<number>();
  workspaceWatcher: { close: () => Promise<void> } | null = null;
  workspaceVisible = false;
  workspaceShowHidden = false;
  pendingSteering = new Map<string, string[]>();
  activeAgentStatuses = new Map<string, Record<string, unknown>>();
  thoughtBuffers = new Map<string, { text: string; totalLines: number; updatedAt: number }>();
  draftBuffers = new Map<string, { text: string; totalLines: number; updatedAt: number }>();
  expandedPanels = new Map<string, { thought: boolean; draft: boolean }>();

  constructor(opts: WebChannelOpts) {
    this.queue = opts.queue;
    this.agentPool = opts.agentPool;
    this.uiBridge = new UiBridge(this);
    if (typeof (this.agentPool as any).setSessionBinder === "function") {
      (this.agentPool as any).setSessionBinder((session: AgentSession, chatJid: string) =>
        this.uiBridge.bindSession(session, chatJid)
      );
    }
  }

  async start(): Promise<void> {
    this.loadState();
    try { initTheme(); } catch {}
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

  async stop(): Promise<void> {
    this.sse.closeAll();
    this.uiBridge.stop();
    this.server?.stop(true);
    this.server = null;
    if (this.workspaceWatcher) {
      await this.workspaceWatcher.close();
      this.workspaceWatcher = null;
    }
  }

  async sendMessage(chatJid: string, text: string, threadId?: number | null): Promise<void> {
    const interaction = this.storeMessage(chatJid, text, true, [], threadId ? { threadId } : undefined);
    if (interaction) {
      broadcastAgentResponse(
        this,
        interaction,
        ASSISTANT_NAME,
        resolveAvatarUrl("agent", ASSISTANT_AVATAR),
        USER_NAME || null,
        resolveAvatarUrl("user", USER_AVATAR),
        USER_AVATAR_BACKGROUND || null
      );
    }
  }

  queueFollowupPlaceholder(chatJid: string, text: string, threadId?: number): InteractionRow | null {
    const interaction = this.storeMessage(chatJid, text, true, [], { threadId });
    if (!interaction) return null;

    this.state.enqueueFollowupPlaceholder(chatJid, interaction.id);

    broadcastAgentResponse(
      this,
      interaction,
      ASSISTANT_NAME,
      resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      USER_NAME || null,
      resolveAvatarUrl("user", USER_AVATAR),
      USER_AVATAR_BACKGROUND || null
    );

    return interaction;
  }

  consumeQueuedFollowupPlaceholder(chatJid: string): number | null {
    return this.state.consumeFollowupPlaceholder(chatJid);
  }

  queuePendingSteering(chatJid: string, timestamp: string | undefined): void {
    if (!timestamp) return;
    const existing = this.pendingSteering.get(chatJid) ?? [];
    existing.push(timestamp);
    this.pendingSteering.set(chatJid, existing);
  }

  consumePendingSteering(chatJid: string): string | null {
    const entries = this.pendingSteering.get(chatJid);
    if (!entries || entries.length === 0) return null;
    this.pendingSteering.delete(chatJid);
    entries.sort();
    return entries[entries.length - 1] ?? null;
  }

  updateAgentStatus(chatJid: string, status: Record<string, unknown>): void {
    const type = status?.type;
    if (type === "done" || type === "error") {
      this.activeAgentStatuses.delete(chatJid);
      return;
    }
    this.activeAgentStatuses.set(chatJid, status);
  }

  getAgentStatus(chatJid: string): Record<string, unknown> | null {
    return this.activeAgentStatuses.get(chatJid) ?? null;
  }

  replaceQueuedFollowupPlaceholder(
    chatJid: string,
    rowId: number,
    text: string,
    mediaIds: number[],
    contentBlocks: Array<Record<string, unknown>> | undefined,
    threadId?: number
  ): InteractionRow | null {
    const updated = replaceMessageContent(chatJid, rowId, text, {
      contentBlocks,
      mediaIds,
    });
    if (!updated) return null;

    updated.data.agent_id = DEFAULT_AGENT_ID;
    if (threadId) updated.data.thread_id = threadId;

    broadcastInteractionUpdated(
      this,
      updated,
      ASSISTANT_NAME,
      resolveAvatarUrl("agent", ASSISTANT_AVATAR),
      USER_NAME || null,
      resolveAvatarUrl("user", USER_AVATAR),
      USER_AVATAR_BACKGROUND || null
    );

    return updated;
  }

  getThreadRootId(chatJid: string, messageId: string): number | null {
    return getMessageRowIdById(chatJid, messageId);
  }

  resumeChat(chatJid: string, prevTimestamp?: string, threadRootId?: number | null): void {
    if (typeof prevTimestamp === "string") {
      this.state.lastAgentTimestamp[chatJid] = prevTimestamp;
      this.saveState();
    }
    this.queue.enqueue(async () => {
      await this.processChat(chatJid, DEFAULT_AGENT_ID, threadRootId ?? undefined);
    }, `resume:${chatJid}:${Date.now()}`);
  }

  resumePendingChats(chatJid?: string): void {
    const pending = this.state.getPendingResumes();
    const entries = chatJid && chatJid !== "all" ? { [chatJid]: pending[chatJid] } : pending;

    for (const [jid, info] of Object.entries(entries)) {
      if (!info) continue;
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

  loadState(): void {
    this.state.load();
  }

  saveState(): void {
    this.state.save();
  }

  setPanelExpanded(turnId: string, panel: "thought" | "draft", expanded: boolean): void {
    if (!turnId) return;
    const current = this.expandedPanels.get(turnId) ?? { thought: false, draft: false };
    current[panel] = expanded;
    if (!current.thought && !current.draft) {
      this.expandedPanels.delete(turnId);
    } else {
      this.expandedPanels.set(turnId, current);
    }
  }

  isPanelExpanded(turnId: string, panel: "thought" | "draft"): boolean {
    return this.expandedPanels.get(turnId)?.[panel] ?? false;
  }

  updateThoughtBuffer(turnId: string, text: string, totalLines: number): void {
    if (!turnId) return;
    this.thoughtBuffers.set(turnId, { text, totalLines, updatedAt: Date.now() });
    this.pruneBuffers(this.thoughtBuffers);
  }

  updateDraftBuffer(turnId: string, text: string, totalLines: number): void {
    if (!turnId) return;
    this.draftBuffers.set(turnId, { text, totalLines, updatedAt: Date.now() });
    this.pruneBuffers(this.draftBuffers);
  }

  getBuffer(turnId: string, panel: "thought" | "draft") {
    return panel === "draft" ? this.draftBuffers.get(turnId) : this.thoughtBuffers.get(turnId);
  }

  pruneBuffers(map: Map<string, { text: string; totalLines: number; updatedAt: number }>): void {
    const limit = 50;
    if (map.size <= limit) return;
    const entries = Array.from(map.entries()).sort((a, b) => a[1].updatedAt - b[1].updatedAt);
    for (let i = 0; i < entries.length - limit; i += 1) {
      map.delete(entries[i][0]);
    }
  }

  private async loadTlsOptions(): Promise<{ cert: string; key: string } | null> {
    if (!WEB_TLS_CERT || !WEB_TLS_KEY) return null;
    try {
      const [cert, key] = await Promise.all([
        Bun.file(WEB_TLS_CERT).text(),
        Bun.file(WEB_TLS_KEY).text(),
      ]);
      return { cert, key };
    } catch (error) {
      console.error("[web] Failed to load TLS cert/key:", error);
      return null;
    }
  }

  async handleRequest(req: Request): Promise<Response> {
    const { RequestRouterService } = await import("./web/request-router-service.js");
    const router = new RequestRouterService(this);
    return router.handle(req);
  }

  async handleAgents(): Promise<Response> {
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

  async handleManifest(req: Request): Promise<Response> {
    const encoder = new TextEncoder();
    const baseName = ASSISTANT_NAME || "PiClaw";
    const icons: Array<{ src: string; sizes: string; type: string; purpose?: string }> = [
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
      } catch (err) {
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
    const headers: Record<string, string> = {
      "Content-Type": "application/manifest+json; charset=utf-8",
      "Cache-Control": "no-store",
      "Content-Length": String(encoder.encode(body).length),
    };

    if (req.method === "HEAD") {
      return new Response(null, { status: 200, headers });
    }

    return new Response(body, { status: 200, headers });
  }

  async handleAvatar(kind: "agent" | "user", req: Request): Promise<Response> {
    const source = kind === "agent" ? ASSISTANT_AVATAR : USER_AVATAR;
    if (!source) return this.json({ error: "Avatar not found" }, 404);
    const response = await buildAvatarResponse(kind, source, req);
    if (response) return response;
    return this.json({ error: "Avatar not found" }, 404);
  }

  async handleWorkspaceVisibility(req: Request): Promise<Response> {
    let data: { visible?: boolean; show_hidden?: boolean; showHidden?: boolean };
    try {
      data = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }
    if (typeof data.visible === "boolean") {
      this.workspaceVisible = data.visible;
    } else {
      this.workspaceVisible = Boolean(data.visible);
    }
    if (typeof data.show_hidden === "boolean") {
      this.workspaceShowHidden = data.show_hidden;
    } else if (typeof data.showHidden === "boolean") {
      this.workspaceShowHidden = data.showHidden;
    }
    return this.json({ status: "ok", visible: this.workspaceVisible, show_hidden: this.workspaceShowHidden });
  }

  handleTimeline(limit: number, before?: number): Response {
    const result = getTimelineResponse(DEFAULT_CHAT_JID, limit, before);
    return this.json(result.body, result.status);
  }

  handleHashtag(tag: string, limit: number, offset: number): Response {
    const result = getHashtagResponse(DEFAULT_CHAT_JID, tag, limit, offset);
    return this.json(result.body, result.status);
  }

  handleSearch(query: string, limit: number, offset: number): Response {
    const result = getSearchResponse(DEFAULT_CHAT_JID, query, limit, offset);
    return this.json(result.body, result.status);
  }

  handleThread(id: number | null): Response {
    const result = getThreadResponse(DEFAULT_CHAT_JID, id);
    return this.json(result.body, result.status);
  }

  handleThought(panel: string | null, turnId: string | null): Response {
    if (!turnId) return this.json({ error: "Missing turn_id" }, 400);
    const normalized = panel === "draft" ? "draft" : "thought";
    const buffer = this.getBuffer(turnId, normalized);
    if (!buffer) return this.json({ error: "Thought not found" }, 404);
    return this.json({ text: buffer.text, total_lines: buffer.totalLines }, 200);
  }

  async handleThoughtVisibility(req: Request): Promise<Response> {
    let data: { turn_id?: string; turnId?: string; panel?: string; expanded?: boolean };
    try {
      data = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }
    const turnId = (data.turn_id || data.turnId || "").trim();
    const panel = data.panel === "draft" ? "draft" : "thought";
    const expanded = Boolean(data.expanded);
    if (!turnId) return this.json({ error: "Missing turn_id" }, 400);
    this.setPanelExpanded(turnId, panel, expanded);
    return this.json({ status: "ok", turn_id: turnId, panel, expanded });
  }

  handleDeletePost(id: number | null, cascade = false): Response {
    const result = deletePostResponse(DEFAULT_CHAT_JID, id, cascade);
    if (result.deletedIds.length > 0) {
      this.broadcastEvent("interaction_deleted", { ids: result.deletedIds });
    }
    return this.json(result.body, result.status);
  }

  handleSse(): Response {
    return this.sse.handleRequest();
  }

  broadcastEvent(eventType: string, data: unknown): void {
    this.sse.broadcast(eventType, data);
  }

  async handlePost(req: Request, isReply: boolean): Promise<Response> {
    const { handlePost } = await import("./web/handlers/posts.js");
    return handlePost(this, req, isReply, DEFAULT_CHAT_JID);
  }

  handleAgentStatus(req: Request): Response {
    const url = new URL(req.url);
    const chatJid = (url.searchParams.get("chat_jid") || DEFAULT_CHAT_JID).trim() || DEFAULT_CHAT_JID;
    const status = this.getAgentStatus(chatJid);
    return this.json({ status: status ? "active" : "idle", data: status });
  }

  async handleAgentRespond(req: Request): Promise<Response> {
    let data: { request_id?: string; outcome?: unknown };
    try {
      data = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }

    if (!data.request_id) return this.json({ error: "Missing request_id" }, 400);

    const status = this.uiBridge.handleUiResponse(data.request_id, data.outcome);
    return this.json(status);
  }

  async handleAgentMessage(req: Request, pathname: string): Promise<Response> {
    const { handleAgentMessage } = await import("./web/handlers/agent.js");
    return handleAgentMessage(this, req, pathname, DEFAULT_CHAT_JID, DEFAULT_AGENT_ID);
  }

  async processChat(chatJid: string, agentId: string, threadRootId?: number | null): Promise<void> {
    const { processChat } = await import("./web/handlers/agent.js");
    return processChat(this, chatJid, agentId, threadRootId ?? undefined);
  }

  storeMessage(
    chatJid: string,
    content: string,
    isBot: boolean,
    mediaIds: number[],
    options: { contentBlocks?: unknown[]; linkPreviews?: unknown[]; threadId?: number } = {}
  ): InteractionRow | null {
    return storeWebMessage(
      this,
      {
        chatJid,
        content,
        isBot,
        mediaIds,
        agentId: DEFAULT_AGENT_ID,
        agentName: ASSISTANT_NAME,
      },
      {
        contentBlocks: options.contentBlocks,
        linkPreviews: options.linkPreviews,
        threadId: options.threadId ?? null,
      }
    );
  }

  async handleMediaUpload(req: Request): Promise<Response> {
    return handleMediaUpload(this, req);
  }

  handleMedia(id: number, thumbnail: boolean): Response {
    return handleMedia(this, id, thumbnail);
  }

  handleMediaInfo(id: number): Response {
    return handleMediaInfo(this, id);
  }

  handleWorkspaceTree(req: Request): Response {
    return handleWorkspaceTree(this, req);
  }

  handleWorkspaceFile(req: Request): Response {
    return handleWorkspaceFile(this, req);
  }

  handleWorkspaceRaw(req: Request): Response {
    return handleWorkspaceRaw(this, req);
  }

  async handleWorkspaceAttach(req: Request): Promise<Response> {
    return handleWorkspaceAttach(this, req);
  }

  async handleWorkspaceUpload(req: Request): Promise<Response> {
    return handleWorkspaceUpload(this, req);
  }

  async handleWorkspaceDownload(req: Request): Promise<Response> {
    return handleWorkspaceDownload(this, req);
  }

  async serveStatic(relPath: string): Promise<Response> {
    return this.responses.serveStatic(relPath);
  }

  async serveDocsStatic(relPath: string): Promise<Response> {
    return this.responses.serveDocsStatic(relPath);
  }

  json(data: unknown, status = 200): Response {
    return this.responses.json(data, status);
  }

  clampInt(value: string | null, fallback: number, min: number, max: number): number {
    return this.responses.clampInt(value, fallback, min, max);
  }

  parseOptionalInt(value: string | null): number | null {
    return this.responses.parseOptionalInt(value);
  }
}
