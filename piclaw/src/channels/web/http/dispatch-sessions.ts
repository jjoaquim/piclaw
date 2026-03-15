/**
 * web/http/dispatch-sessions.ts – Chat session route dispatch helpers.
 *
 * Handles CRUD operations for chat sessions (multiple conversations).
 * Routes: GET/POST /sessions, PATCH/DELETE /sessions/{id}
 */

import { createUuid } from "../../../utils/ids.js";
import {
  listChatSessions,
  createChatSession,
  renameChatSession,
  deleteChatSession,
  ensureDefaultSession,
} from "../../../db/chat-sessions.js";

/** Minimal channel contract needed by session dispatch. */
export interface SessionDispatchChannel {
  json(data: unknown, status?: number): Response;
}

/**
 * Handle /sessions routes when the request matches; otherwise return null.
 */
export async function handleSessionRoutes(
  channel: SessionDispatchChannel,
  req: Request,
  pathname: string
): Promise<Response | null> {
  if (req.method === "GET" && pathname === "/sessions") {
    ensureDefaultSession();
    const sessions = listChatSessions();
    return channel.json({ sessions });
  }

  if (req.method === "POST" && pathname === "/sessions") {
    let body: { name?: string };
    try {
      body = await req.json();
    } catch {
      return channel.json({ error: "Invalid JSON" }, 400);
    }
    const name = (body.name || "").trim();
    if (!name || name.length > 100) {
      return channel.json({ error: "Session name must be 1-100 characters" }, 400);
    }
    const id = createUuid("session");
    const chatJid = `web:${id}`;
    const session = createChatSession(id, chatJid, name);
    return channel.json({ session }, 201);
  }

  if (req.method === "PATCH" && pathname.startsWith("/sessions/")) {
    const sessionId = decodeURIComponent(pathname.replace("/sessions/", ""));
    let body: { name?: string };
    try {
      body = await req.json();
    } catch {
      return channel.json({ error: "Invalid JSON" }, 400);
    }
    const name = (body.name || "").trim();
    if (!name || name.length > 100) {
      return channel.json({ error: "Session name must be 1-100 characters" }, 400);
    }
    const updated = renameChatSession(sessionId, name);
    if (!updated) return channel.json({ error: "Session not found" }, 404);
    return channel.json({ ok: true });
  }

  if (req.method === "DELETE" && pathname.startsWith("/sessions/")) {
    const sessionId = decodeURIComponent(pathname.replace("/sessions/", ""));
    if (sessionId === "default") {
      return channel.json({ error: "Cannot delete the default session" }, 400);
    }
    const deleted = deleteChatSession(sessionId);
    if (!deleted) return channel.json({ error: "Session not found" }, 404);
    return channel.json({ ok: true });
  }

  return null;
}
