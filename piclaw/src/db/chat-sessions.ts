/**
 * db/chat-sessions.ts – CRUD operations for web chat sessions.
 *
 * Each session maps to a unique chat_jid (e.g., "web:default", "web:session-<uuid>").
 * Sessions track metadata like name, creation time, and last activity.
 *
 * Consumers:
 *   - channels/web.ts uses these for session management API endpoints.
 *   - The web UI lists/creates/switches sessions via REST calls.
 */

import { getDb } from "./connection.js";

export interface ChatSession {
  id: string;
  chat_jid: string;
  name: string;
  created_at: string;
  last_active_at: string;
}

/**
 * List all chat sessions ordered by last activity (most recent first).
 */
export function listChatSessions(): ChatSession[] {
  const db = getDb();
  return db
    .prepare("SELECT id, chat_jid, name, created_at, last_active_at FROM chat_sessions ORDER BY last_active_at DESC")
    .all() as ChatSession[];
}

/**
 * Get a single chat session by its ID.
 */
export function getChatSessionById(id: string): ChatSession | undefined {
  const db = getDb();
  return db
    .prepare("SELECT id, chat_jid, name, created_at, last_active_at FROM chat_sessions WHERE id = ?")
    .get(id) as ChatSession | undefined;
}

/**
 * Get a chat session by its chat_jid.
 */
export function getChatSessionByJid(chatJid: string): ChatSession | undefined {
  const db = getDb();
  return db
    .prepare("SELECT id, chat_jid, name, created_at, last_active_at FROM chat_sessions WHERE chat_jid = ?")
    .get(chatJid) as ChatSession | undefined;
}

/**
 * Create a new chat session. Returns the created session.
 */
export function createChatSession(id: string, chatJid: string, name: string): ChatSession {
  const db = getDb();
  const now = new Date().toISOString();
  db.prepare(
    "INSERT INTO chat_sessions (id, chat_jid, name, created_at, last_active_at) VALUES (?, ?, ?, ?, ?)"
  ).run(id, chatJid, name, now, now);
  return { id, chat_jid: chatJid, name, created_at: now, last_active_at: now };
}

/**
 * Update the last_active_at timestamp for a session.
 */
export function touchChatSession(id: string): void {
  const db = getDb();
  db.prepare("UPDATE chat_sessions SET last_active_at = ? WHERE id = ?").run(
    new Date().toISOString(),
    id
  );
}

/**
 * Rename a chat session.
 */
export function renameChatSession(id: string, name: string): boolean {
  const db = getDb();
  const res = db.prepare("UPDATE chat_sessions SET name = ? WHERE id = ?").run(name, id);
  return res.changes > 0;
}

/**
 * Delete a chat session by ID. Does NOT delete messages — they remain in the
 * messages table scoped by chat_jid for potential recovery.
 */
export function deleteChatSession(id: string): boolean {
  const db = getDb();
  const res = db.prepare("DELETE FROM chat_sessions WHERE id = ?").run(id);
  return res.changes > 0;
}

/**
 * Ensure the default session exists. Called at startup.
 */
export function ensureDefaultSession(): void {
  const db = getDb();
  const existing = db
    .prepare("SELECT id FROM chat_sessions WHERE chat_jid = ?")
    .get("web:default") as { id: string } | undefined;
  if (!existing) {
    const now = new Date().toISOString();
    db.prepare(
      "INSERT OR IGNORE INTO chat_sessions (id, chat_jid, name, created_at, last_active_at) VALUES (?, ?, ?, ?, ?)"
    ).run("default", "web:default", "Default", now, now);
  }
}
