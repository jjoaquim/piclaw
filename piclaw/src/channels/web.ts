import { AgentQueue } from "../queue.js";
import type { AgentPool } from "../agent-pool.js";
import { initTheme, type AgentSession } from "@mariozechner/pi-coding-agent";
import { ASSISTANT_AVATAR, ASSISTANT_NAME, WEB_HOST, WEB_IDLE_TIMEOUT, WEB_PORT } from "../config.js";
import { handleMedia, handleMediaInfo, handleMediaUpload } from "./web/handlers/media.js";
import { handleSse, broadcastEvent, type PendingClient } from "./web/sse.js";
import { serveDocsStatic, serveStatic } from "./web/static.js";
import { clampInt, jsonResponse, parseOptionalInt } from "./web/http-utils.js";
import { createFallbackTheme } from "./web/theme.js";
import { bindSessionUiContext } from "./web/ui-context.js";
import { scheduleLinkPreviews } from "./web/link-previews.js";
import {
  attachMediaToMessage,
  clampWebContent,
  deleteMessageByRowId,
  getMessageByRowId,
  getMessagesByHashtag,
  getRouterState,
  getTimeline,
  hasOlderMessages,
  searchMessages,
  setRouterState,
  storeChatMetadata,
  storeMessage,
} from "../db.js";
import type { InteractionRow } from "../db.js";
import type { NewMessage } from "../types.js";

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
  lastAgentTimestamp: Record<string, string> = {};
  clients: Set<PendingClient> = new Set();
  pendingUiRequests = new Map<string, { resolve: (value: any) => void; reject: (err: Error) => void; timeoutId: ReturnType<typeof setTimeout>; kind: string }>();
  uiRequestCounter = 0;
  editorTextByChat = new Map<string, string>();
  pendingLinkPreviews = new Set<number>();
  fallbackTheme = createFallbackTheme();

  constructor(opts: WebChannelOpts) {
    this.queue = opts.queue;
    this.agentPool = opts.agentPool;
    if (typeof (this.agentPool as any).setSessionBinder === "function") {
      (this.agentPool as any).setSessionBinder((session: AgentSession, chatJid: string) =>
        bindSessionUiContext(this, session, chatJid)
      );
    }
  }

  async start(): Promise<void> {
    this.loadState();
    try { initTheme(); } catch {}
    this.server = Bun.serve({
      hostname: WEB_HOST,
      port: WEB_PORT,
      idleTimeout: WEB_IDLE_TIMEOUT,
      fetch: (req) => this.handleRequest(req),
    });
    console.log(`[web] UI listening on http://${WEB_HOST}:${WEB_PORT}`);
  }

  async stop(): Promise<void> {
    for (const client of this.clients) {
      clearInterval(client.heartbeat);
      try { client.controller.close(); } catch {}
    }
    this.clients.clear();
    for (const pending of this.pendingUiRequests.values()) {
      clearTimeout(pending.timeoutId);
      try { pending.reject(new Error("Web channel stopped")); } catch {}
    }
    this.pendingUiRequests.clear();
    this.server?.stop(true);
    this.server = null;
  }

  async sendMessage(chatJid: string, text: string): Promise<void> {
    const interaction = this.storeMessage(chatJid, text, true, []);
    if (interaction) {
      this.broadcastEvent("agent_response", {
        ...interaction,
        agent_name: ASSISTANT_NAME,
        agent_avatar: ASSISTANT_AVATAR || null,
      });
    }
  }

  loadState(): void {
    const data = getRouterState(STATE_KEY);
    try {
      this.lastAgentTimestamp = data ? JSON.parse(data) : {};
    } catch {
      this.lastAgentTimestamp = {};
    }
  }

  saveState(): void {
    setRouterState(STATE_KEY, JSON.stringify(this.lastAgentTimestamp));
  }

  async handleRequest(req: Request): Promise<Response> {
    const { handleWebRequest } = await import("./web/request-router.js");
    return handleWebRequest(this, req);
  }

  handleAgents(): Response {
    return this.json({
      agents: [
        {
          id: DEFAULT_AGENT_ID,
          name: ASSISTANT_NAME,
          description: `${ASSISTANT_NAME} agent`,
          status: "running",
          actions: [],
          avatar_url: ASSISTANT_AVATAR || null,
        },
      ],
    });
  }

  handleTimeline(limit: number, before?: number): Response {
    const posts = getTimeline(DEFAULT_CHAT_JID, limit, before ?? undefined);
    const oldestId = posts.length > 0 ? posts[0].id : null;
    const hasMore = oldestId !== null && posts.length === limit && hasOlderMessages(DEFAULT_CHAT_JID, oldestId);
    return this.json({ posts, limit, has_more: hasMore });
  }

  handleHashtag(tag: string, limit: number, offset: number): Response {
    const posts = getMessagesByHashtag(DEFAULT_CHAT_JID, tag, limit, offset);
    return this.json({ hashtag: tag, posts, limit, offset });
  }

  handleSearch(query: string, limit: number, offset: number): Response {
    if (!query) return this.json({ error: "Missing 'q' parameter" }, 400);
    const results = searchMessages(DEFAULT_CHAT_JID, query, limit, offset);
    return this.json({ query, results, limit, offset });
  }

  handleThread(id: number | null): Response {
    if (!id) return this.json({ error: "Thread not found" }, 404);
    const thread = getMessageByRowId(DEFAULT_CHAT_JID, id);
    if (!thread) return this.json({ error: "Thread not found" }, 404);
    return this.json({ thread: [thread] });
  }

  handleDeletePost(id: number | null): Response {
    if (!id) return this.json({ error: "Post not found" }, 404);
    const deleted = deleteMessageByRowId(DEFAULT_CHAT_JID, id);
    if (deleted) {
      this.broadcastEvent("interaction_deleted", { ids: [id] });
    }
    return this.json({ deleted: deleted ? 1 : 0, ids: deleted ? [id] : [] });
  }

  handleSse(): Response {
    return handleSse(this);
  }

  broadcastEvent(eventType: string, data: unknown): void {
    broadcastEvent(this, eventType, data);
  }

  async handlePost(req: Request, isReply: boolean): Promise<Response> {
    const { handlePost } = await import("./web/handlers/posts.js");
    return handlePost(this, req, isReply, DEFAULT_CHAT_JID);
  }

  async handleAgentRespond(req: Request): Promise<Response> {
    let data: { request_id?: string; outcome?: unknown };
    try {
      data = await req.json();
    } catch {
      return this.json({ error: "Invalid JSON" }, 400);
    }

    if (!data.request_id) return this.json({ error: "Missing request_id" }, 400);

    const pending = this.pendingUiRequests.get(data.request_id);
    if (pending) {
      clearTimeout(pending.timeoutId);
      this.pendingUiRequests.delete(data.request_id);
      pending.resolve(data.outcome);
      return this.json({ status: "ok" });
    }

    return this.json({ status: "unknown_request" });
  }

  async handleAgentMessage(req: Request, pathname: string): Promise<Response> {
    const { handleAgentMessage } = await import("./web/handlers/agent.js");
    return handleAgentMessage(this, req, pathname, DEFAULT_CHAT_JID, DEFAULT_AGENT_ID);
  }

  async processChat(chatJid: string, agentId: string): Promise<void> {
    const { processChat } = await import("./web/handlers/agent.js");
    return processChat(this, chatJid, agentId);
  }

  storeMessage(
    chatJid: string,
    content: string,
    isBot: boolean,
    mediaIds: number[],
    options: { contentBlocks?: unknown[]; linkPreviews?: unknown[]; threadId?: number } = {}
  ): InteractionRow | null {
    const timestamp = new Date().toISOString();
    const msg: NewMessage = {
      id: `web-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
      chat_jid: chatJid,
      sender: isBot ? "web-agent" : "web-user",
      sender_name: isBot ? ASSISTANT_NAME : "You",
      content,
      timestamp,
      is_from_me: false,
      is_bot_message: isBot,
      content_blocks: options.contentBlocks,
      link_previews: options.linkPreviews,
    };

    const rowId = storeMessage(msg);
    if (rowId <= 0) return null;

    if (mediaIds.length > 0) {
      attachMediaToMessage(rowId, mediaIds);
    }

    storeChatMetadata(chatJid, timestamp, "Web");

    const interaction = getMessageByRowId(chatJid, rowId);
    if (interaction) {
      interaction.data.agent_id = DEFAULT_AGENT_ID;
      if (options.threadId) interaction.data.thread_id = options.threadId;
      scheduleLinkPreviews(this, chatJid, rowId, content, options.linkPreviews);
      return interaction;
    }

    const { content: safeContent, meta } = clampWebContent(content);
    const data: InteractionRow["data"] = {
      type: isBot ? "agent_response" : "user_message",
      content: safeContent,
      content_meta: meta,
      agent_id: DEFAULT_AGENT_ID,
      media_ids: mediaIds,
    };
    if (options.threadId) data.thread_id = options.threadId;
    if (options.contentBlocks?.length) data.content_blocks = options.contentBlocks;
    if (options.linkPreviews?.length) data.link_previews = options.linkPreviews;
    scheduleLinkPreviews(this, chatJid, rowId, content, options.linkPreviews);
    return {
      id: rowId,
      timestamp,
      data,
    };
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

  async serveStatic(relPath: string): Promise<Response> {
    return serveStatic(relPath, () => this.json({ error: "Not found" }, 404));
  }

  async serveDocsStatic(relPath: string): Promise<Response> {
    return serveDocsStatic(relPath, () => this.json({ error: "Not found" }, 404));
  }

  json(data: unknown, status = 200): Response {
    return jsonResponse(data, status);
  }

  clampInt(value: string | null, fallback: number, min: number, max: number): number {
    return clampInt(value, fallback, min, max);
  }

  parseOptionalInt(value: string | null): number | null {
    return parseOptionalInt(value);
  }
}
