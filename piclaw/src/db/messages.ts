/**
 * db/messages.ts – CRUD operations for the `messages` and `chats` tables.
 *
 * Provides all read/write access to stored chat messages, including:
 *   - Persisting inbound messages from any channel (storeMessage)
 *   - Timeline pagination for the web UI (getTimeline, hasOlderMessages)
 *   - Full-text and hashtag search (searchMessages, getMessagesByHashtag)
 *   - Message editing and deletion with media cleanup
 *   - Polling for new messages by the router (getNewMessages, getMessagesSince)
 *
 * Consumers:
 *   - router.ts calls getNewMessages() each poll cycle.
 *   - channels/web/message-store.ts wraps many functions for the web channel.
 *   - channels/web/handlers/posts.ts uses timeline/search/delete functions.
 *   - agent-control/handlers/info.ts uses searchMessages for `/search`.
 *   - channels/whatsapp.ts calls storeMessage() for inbound WhatsApp messages.
 *   - agent-pool.ts calls storeMessage() to persist agent responses.
 */

import { getDb } from "./connection.js";
import { clampWebContent } from "./web-content.js";
import type { InteractionRow } from "./types.js";
import type { NewMessage } from "../types.js";
import {
  attachMediaToMessage,
  deleteUnreferencedMedia,
  getMediaIdsForMessage,
  getMediaIdsForMessages,
} from "./media.js";

/**
 * Internal representation of a raw row from the `messages` table.
 * JSON columns (content_blocks, link_previews) are still serialised strings.
 */
interface StoredMessageRow {
  rowid: number;
  chat_jid: string;
  sender: string;
  sender_name: string;
  content: string;
  content_blocks: string | null;
  link_previews: string | null;
  thread_id: number | null;
  timestamp: string;
  is_bot_message: number;
}

/** Column list used in SELECT queries to ensure a consistent shape. */
const MESSAGE_COLUMNS = "rowid, chat_jid, sender, sender_name, content, content_blocks, link_previews, thread_id, timestamp, is_bot_message";

/** Safely parse a JSON string into an array, returning undefined on failure. */
function parseJsonArray(value: string | null | undefined): unknown[] | undefined {
  if (!value) return undefined;
  try {
    const parsed = JSON.parse(value);
    return Array.isArray(parsed) ? parsed : undefined;
  } catch {
    return undefined;
  }
}

/**
 * Convert a raw StoredMessageRow into the InteractionRow shape expected by
 * the web timeline and other consumers. Clamps overly-long content and
 * attaches parsed content_blocks / link_previews / media_ids.
 */
function buildInteraction(row: StoredMessageRow, mediaIds: number[] = []): InteractionRow {
  const { content, meta } = clampWebContent(row.content);
  const contentBlocks = parseJsonArray(row.content_blocks);
  const linkPreviews = parseJsonArray(row.link_previews);
  const data: InteractionRow["data"] = {
    type: row.is_bot_message ? "agent_response" : "user_message",
    content,
    content_meta: meta,
    agent_id: "default",
    media_ids: mediaIds,
  };
  if (contentBlocks?.length) data.content_blocks = contentBlocks;
  if (linkPreviews?.length) data.link_previews = linkPreviews;
  if (row.thread_id !== null && row.thread_id !== undefined) data.thread_id = row.thread_id;
  return {
    id: row.rowid,
    timestamp: row.timestamp,
    data,
  };
}

/**
 * Insert or update the `chats` table with the latest message timestamp and
 * optionally the chat's display name. Called by the router whenever a message
 * arrives or chat metadata changes.
 */
export function storeChatMetadata(chatJid: string, timestamp: string, name?: string): void {
  const db = getDb();
  if (name) {
    db.prepare(
      `INSERT INTO chats (jid, name, last_message_time) VALUES (?, ?, ?)
       ON CONFLICT(jid) DO UPDATE SET
         name = excluded.name,
         last_message_time = MAX(last_message_time, excluded.last_message_time)`
    ).run(chatJid, name, timestamp);
  } else {
    db.prepare(
      `INSERT INTO chats (jid, name, last_message_time) VALUES (?, ?, ?)
       ON CONFLICT(jid) DO UPDATE SET
         last_message_time = MAX(last_message_time, excluded.last_message_time)`
    ).run(chatJid, chatJid, timestamp);
  }
}

/**
 * Persist a message into the `messages` table (INSERT OR REPLACE).
 * Returns the SQLite rowid of the inserted row (used as the interaction id
 * in the web timeline and for media attachment linking).
 */
export function storeMessage(msg: NewMessage): number {
  const db = getDb();
  const contentBlocks = msg.content_blocks ? JSON.stringify(msg.content_blocks) : null;
  const linkPreviews = msg.link_previews ? JSON.stringify(msg.link_previews) : null;

  db.prepare(
    `INSERT OR REPLACE INTO messages (id, chat_jid, sender, sender_name, content, content_blocks, link_previews, thread_id, timestamp, is_from_me, is_bot_message)
     VALUES (?, ?, ?, ?, ?, ?, ?, ?, ?, ?, ?)`
  ).run(
    msg.id,
    msg.chat_jid,
    msg.sender,
    msg.sender_name,
    msg.content,
    contentBlocks,
    linkPreviews,
    msg.thread_id ?? null,
    msg.timestamp,
    msg.is_from_me ? 1 : 0,
    msg.is_bot_message ? 1 : 0
  );

  const row = db
    .prepare("SELECT rowid as rowid FROM messages WHERE id = ? AND chat_jid = ?")
    .get(msg.id, msg.chat_jid) as { rowid: number } | undefined;
  return row?.rowid ?? 0;
}

/**
 * Look up the rowid for a message by its chat JID and message id.
 * Used by the web channel when it needs to reference a specific message.
 */
export function getMessageRowIdById(chatJid: string, messageId: string): number | null {
  const db = getDb();
  const row = db
    .prepare("SELECT rowid as rowid FROM messages WHERE chat_jid = ? AND id = ?")
    .get(chatJid, messageId) as { rowid: number } | undefined;
  return row?.rowid ?? null;
}

/**
 * Fetch a single message by its rowid, returning it as an InteractionRow.
 * Used by replaceMessageContent and the web channel's post-detail views.
 */
export function getMessageByRowId(chatJid: string, rowId: number): InteractionRow | undefined {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? AND rowid = ?`
    )
    .get(chatJid, rowId) as StoredMessageRow | undefined;
  if (!row) return undefined;
  const mediaIds = getMediaIdsForMessage(row.rowid);
  return buildInteraction(row, mediaIds);
}

/**
 * Update just the link_previews JSON column for a message.
 * Called by the link-preview enrichment pipeline after OpenGraph data is fetched.
 */
export function updateMessageLinkPreviews(
  chatJid: string,
  rowId: number,
  linkPreviews: unknown[]
): boolean {
  const db = getDb();
  const payload = linkPreviews.length > 0 ? JSON.stringify(linkPreviews) : null;
  const res = db
    .prepare("UPDATE messages SET link_previews = ? WHERE chat_jid = ? AND rowid = ?")
    .run(payload, chatJid, rowId);
  return res.changes > 0;
}

/**
 * Replace the content (and optionally content_blocks, link_previews, media)
 * of an existing message. Used by the web channel's edit-post feature.
 * Returns the updated InteractionRow, or undefined if the row didn't exist.
 */
export function replaceMessageContent(
  chatJid: string,
  rowId: number,
  content: string,
  options: { contentBlocks?: unknown[]; linkPreviews?: unknown[]; mediaIds?: number[] } = {}
): InteractionRow | undefined {
  const db = getDb();
  const contentBlocks = options.contentBlocks ? JSON.stringify(options.contentBlocks) : null;
  const linkPreviews = options.linkPreviews ? JSON.stringify(options.linkPreviews) : null;
  const res = db
    .prepare(
      "UPDATE messages SET content = ?, content_blocks = ?, link_previews = ? WHERE chat_jid = ? AND rowid = ?"
    )
    .run(content, contentBlocks, linkPreviews, chatJid, rowId);

  if (res.changes <= 0) return undefined;

  // Re-link media: remove old associations and attach the new set.
  db.prepare("DELETE FROM message_media WHERE message_rowid = ?").run(rowId);
  if (options.mediaIds && options.mediaIds.length > 0) {
    attachMediaToMessage(rowId, options.mediaIds);
  }

  return getMessageByRowId(chatJid, rowId);
}

/**
 * Delete a single message by rowid, cleaning up associated media.
 * Used by the web channel's delete-post endpoint.
 */
export function deleteMessageByRowId(chatJid: string, rowId: number): boolean {
  const db = getDb();
  const mediaIds = getMediaIdsForMessage(rowId);
  db.prepare("DELETE FROM message_media WHERE message_rowid = ?").run(rowId);
  const res = db.prepare("DELETE FROM messages WHERE chat_jid = ? AND rowid = ?").run(chatJid, rowId);
  if (res.changes > 0) {
    deleteUnreferencedMedia(mediaIds);
  }
  return res.changes > 0;
}

/**
 * Delete a message and all its thread replies. Returns the list of deleted
 * rowids. Used by the web channel when deleting a parent post that has replies.
 */
export function deleteThreadByRowId(chatJid: string, rowId: number): number[] {
  const db = getDb();
  // Find the parent message and all replies whose thread_id points to it.
  const rows = db
    .prepare("SELECT rowid FROM messages WHERE chat_jid = ? AND (rowid = ? OR thread_id = ?)")
    .all(chatJid, rowId, rowId) as Array<{ rowid: number }>;
  const ids = Array.from(new Set(rows.map((row) => row.rowid)));
  if (ids.length === 0) return [];

  const mediaIds = getMediaIdsForMessages(ids);
  const placeholders = ids.map(() => "?").join(",");
  db.prepare(`DELETE FROM message_media WHERE message_rowid IN (${placeholders})`).run(...ids);
  db.prepare(`DELETE FROM messages WHERE chat_jid = ? AND rowid IN (${placeholders})`).run(chatJid, ...ids);
  deleteUnreferencedMedia(mediaIds);
  return ids;
}

/**
 * Paginated timeline fetch – returns up to `limit` messages, optionally
 * before a given rowid, in chronological order (oldest first).
 * Used by the web channel's GET /timeline endpoint.
 */
export function getTimeline(chatJid: string, limit: number, beforeId?: number): InteractionRow[] {
  const db = getDb();
  const rows = beforeId
    ? (db
        .prepare(
          `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? AND rowid < ? ORDER BY rowid DESC LIMIT ?`
        )
        .all(chatJid, beforeId, limit) as StoredMessageRow[])
    : (db
        .prepare(
          `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? ORDER BY rowid DESC LIMIT ?`
        )
        .all(chatJid, limit) as StoredMessageRow[]);

  const interactions = rows.map((row) => buildInteraction(row, getMediaIdsForMessage(row.rowid)));
  return interactions.reverse();
}

/** Check whether there are messages older than the given rowid in a chat. */
export function hasOlderMessages(chatJid: string, oldestId: number): boolean {
  const db = getDb();
  const row = db
    .prepare("SELECT rowid FROM messages WHERE chat_jid = ? AND rowid < ? LIMIT 1")
    .get(chatJid, oldestId) as { rowid: number } | undefined;
  return Boolean(row);
}

/**
 * Fetch messages whose content contains a given #hashtag (case-insensitive LIKE).
 * Used by the web channel's hashtag filter feature.
 */
export function getMessagesByHashtag(chatJid: string, hashtag: string, limit: number, offset: number): InteractionRow[] {
  const db = getDb();
  const pattern = `%#${hashtag}%`;
  const rows = db
    .prepare(
      `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? AND content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`
    )
    .all(chatJid, pattern, limit, offset) as StoredMessageRow[];

  return rows.map((row) => buildInteraction(row, getMediaIdsForMessage(row.rowid)));
}

/**
 * Full-text search over messages using FTS5 MATCH, with a LIKE fallback
 * if the FTS query syntax is invalid. Hashtag queries (starting with #)
 * are routed to a simpler LIKE search.
 *
 * Used by the web channel's search bar and agent-control /search command.
 */
export function searchMessages(chatJid: string, query: string, limit: number, offset: number): InteractionRow[] {
  const db = getDb();
  // Hashtag shortcut: use LIKE for simple #tag searches.
  if (query.startsWith("#")) {
    const tag = query.replace(/^#+/, "");
    if (!tag) return [];
    const pattern = `%#${tag}%`;
    const rows = db
      .prepare(
        `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? AND content LIKE ? COLLATE NOCASE ORDER BY rowid DESC LIMIT ? OFFSET ?`
      )
      .all(chatJid, pattern, limit, offset) as StoredMessageRow[];
    return rows.map((row) => buildInteraction(row, getMediaIdsForMessage(row.rowid)));
  }

  // Prepare the FTS query: join bare terms with AND unless the user
  // already includes FTS operators (AND, OR, NOT, NEAR, quotes, etc.).
  const rawQuery = query.trim();
  const hasOperators = /(?:\bAND\b|\bOR\b|\bNOT\b|\bNEAR\b|["():*])/i.test(rawQuery);
  const terms = rawQuery
    .split(/\s+/)
    .map((term) => term.replace(/^["']+|["']+$/g, ""))
    .filter(Boolean);
  const ftsQuery = !hasOperators && terms.length > 1 ? terms.join(" AND ") : rawQuery;

  try {
    const rows = db
      .prepare(
        `SELECT messages.rowid, messages.chat_jid, messages.sender, messages.sender_name, messages.content, messages.content_blocks, messages.link_previews, messages.thread_id, messages.timestamp, messages.is_bot_message
         FROM messages
         JOIN messages_fts ON messages_fts.rowid = messages.rowid
         WHERE messages.chat_jid = ? AND messages_fts MATCH ?
         ORDER BY messages.rowid DESC
         LIMIT ? OFFSET ?`
      )
      .all(chatJid, ftsQuery, limit, offset) as StoredMessageRow[];
    return rows.map((row) => buildInteraction(row, getMediaIdsForMessage(row.rowid)));
  } catch {
    // Fallback to LIKE search when FTS query syntax is invalid.
    const fallbackTerms = terms.length > 0 ? terms : rawQuery ? [rawQuery] : [];
    if (fallbackTerms.length === 0) return [];
    const clauses = fallbackTerms.map(() => "content LIKE ? COLLATE NOCASE").join(" AND ");
    const sql = `SELECT ${MESSAGE_COLUMNS} FROM messages WHERE chat_jid = ? AND ${clauses} ORDER BY rowid DESC LIMIT ? OFFSET ?`;
    const params = [chatJid, ...fallbackTerms.map((term) => `%${term}%`), limit, offset];
    const rows = db.prepare(sql).all(...params) as StoredMessageRow[];
    return rows.map((row) => buildInteraction(row, getMediaIdsForMessage(row.rowid)));
  }
}

/**
 * Polling query used by the router – fetch all non-bot messages newer than
 * `lastTimestamp` across the given chat JIDs. Returns the messages and the
 * new high-water-mark timestamp for the next poll cycle.
 */
export function getNewMessages(
  jids: string[],
  lastTimestamp: string,
  botPrefix: string
): { messages: NewMessage[]; newTimestamp: string } {
  if (jids.length === 0) return { messages: [], newTimestamp: lastTimestamp };
  const db = getDb();

  const placeholders = jids.map(() => "?").join(",");
  const sql = `
    SELECT id, chat_jid, sender, sender_name, content, timestamp
    FROM messages
    WHERE timestamp > ? AND chat_jid IN (${placeholders})
      AND is_bot_message = 0 AND content NOT LIKE ?
    ORDER BY timestamp
  `;

  const rows = db.prepare(sql).all(lastTimestamp, ...jids, `${botPrefix}:%`) as NewMessage[];

  let newTimestamp = lastTimestamp;
  for (const row of rows) {
    if (row.timestamp > newTimestamp) newTimestamp = row.timestamp;
  }

  return { messages: rows, newTimestamp };
}

/**
 * Fetch non-bot messages since a given timestamp for a single chat.
 * Used by the task scheduler when building context for a scheduled task run.
 */
export function getMessagesSince(
  chatJid: string,
  sinceTimestamp: string,
  botPrefix: string
): NewMessage[] {
  const db = getDb();
  const sql = `
    SELECT id, chat_jid, sender, sender_name, content, timestamp
    FROM messages
    WHERE chat_jid = ? AND timestamp > ?
      AND is_bot_message = 0 AND content NOT LIKE ?
    ORDER BY timestamp
  `;
  return db.prepare(sql).all(chatJid, sinceTimestamp, `${botPrefix}:%`) as NewMessage[];
}
