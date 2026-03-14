/**
 * test/db/db.test.ts – Tests for database initialisation and core operations.
 *
 * Verifies initDatabase(), schema migrations, message CRUD, media storage,
 * task management, and interaction queries.
 */

import { beforeAll, expect, test } from "bun:test";
import { getTestWorkspace, setEnv } from "../helpers.js";

let db: typeof import("../../src/db.js");

beforeAll(async () => {
  const ws = getTestWorkspace();
  setEnv({
    PICLAW_WORKSPACE: ws.workspace,
    PICLAW_STORE: ws.store,
    PICLAW_DATA: ws.data,
  });

  db = await import("../../src/db.js");
  db.initDatabase();
});

function makeMessage(chatJid: string, content: string, timestamp: string, isBot = false) {
  return {
    id: `msg-${Date.now()}-${Math.random().toString(36).slice(2, 8)}`,
    chat_jid: chatJid,
    sender: isBot ? "bot" : "user",
    sender_name: isBot ? "Bot" : "User",
    content,
    timestamp,
    is_from_me: false,
    is_bot_message: isBot,
  };
}

test("timeline returns oldest-first and hasOlderMessages works", () => {
  const chatJid = `test:${Date.now()}-timeline`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  db.storeMessage(makeMessage(chatJid, "first", "2024-01-01T00:00:00.000Z"));
  db.storeMessage(makeMessage(chatJid, "second", "2024-01-01T00:01:00.000Z"));
  db.storeMessage(makeMessage(chatJid, "third", "2024-01-01T00:02:00.000Z"));

  const timeline = db.getTimeline(chatJid, 2);
  expect(timeline.length).toBe(2);
  expect(timeline[0].data.content).toBe("second");
  expect(timeline[1].data.content).toBe("third");

  const oldestId = timeline[0].id;
  expect(db.hasOlderMessages(chatJid, oldestId)).toBe(true);
});

test("search and hashtag filters return matching messages", () => {
  const chatJid = `test:${Date.now()}-search`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  db.storeMessage(makeMessage(chatJid, "hello #world", "2024-02-01T00:00:00.000Z"));
  db.storeMessage(makeMessage(chatJid, "another message", "2024-02-01T00:01:00.000Z"));
  db.storeMessage(makeMessage(chatJid, "#world with hello", "2024-02-01T00:02:00.000Z"));

  const hashtag = db.getMessagesByHashtag(chatJid, "world", 10, 0);
  expect(hashtag.length).toBe(2);

  const results = db.searchMessages(chatJid, "hello", 10, 0);
  expect(results.length).toBe(2);
});

test("media attachments are stored and returned", () => {
  const chatJid = `test:${Date.now()}-media`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  const mediaId = db.createMedia(
    "note.txt",
    "text/plain",
    new TextEncoder().encode("hello"),
    null,
    { size: 5 }
  );

  const rowId = db.storeMessage(makeMessage(chatJid, "with media", "2024-03-01T00:00:00.000Z"));
  db.attachMediaToMessage(rowId, [mediaId]);

  const interaction = db.getMessageByRowId(chatJid, rowId);
  expect(interaction).not.toBeNull();
  expect(interaction?.data.media_ids).toEqual([mediaId]);
});

// --- New coverage: same-timestamp ordering & cursor filters ---

test("same-timestamp ordering is stable for timeline and cursor queries", () => {
  const chatJid = `test:${Date.now()}-same-ts`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  const ts = "2024-04-01T00:00:00.000Z";
  const rowA = db.storeMessage(makeMessage(chatJid, "A", ts));
  const rowB = db.storeMessage(makeMessage(chatJid, "B", ts));

  const timeline = db.getTimeline(chatJid, 10);
  const contents = timeline.map((t) => t.data.content);
  expect(contents).toEqual(["A", "B"]);

  const sinceMessages = db.getMessagesSince(chatJid, "2024-03-31T23:59:59.000Z", "Pi");
  expect(sinceMessages.map((m) => m.content)).toEqual(["A", "B"]);

  const { messages } = db.getNewMessages([chatJid], "2024-03-31T23:59:59.000Z", "Pi");
  expect(messages.map((m) => m.content)).toEqual(["A", "B"]);

  // Row IDs should be increasing with insertion order
  expect(rowB).toBeGreaterThan(rowA);
});

// --- Bot message filtering ---

test("getMessagesSince and getNewMessages filter bot messages, bot-prefixed content, and steering-only rows", () => {
  const chatJid = `test:${Date.now()}-bot-filter`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  db.storeMessage(makeMessage(chatJid, "Pi: should be filtered", "2024-05-01T00:00:00.000Z", false));
  db.storeMessage(makeMessage(chatJid, "bot message", "2024-05-01T00:01:00.000Z", true));
  db.storeMessage({
    ...makeMessage(chatJid, "steering-only", "2024-05-01T00:01:30.000Z", false),
    is_steering_message: true,
  });
  db.storeMessage(makeMessage(chatJid, "user message", "2024-05-01T00:02:00.000Z", false));

  const sinceMessages = db.getMessagesSince(chatJid, "", "Pi");
  expect(sinceMessages.map((m) => m.content)).toEqual(["user message"]);

  const { messages } = db.getNewMessages([chatJid], "", "Pi");
  expect(messages.map((m) => m.content)).toEqual(["user message"]);
});

// --- Delete cascade & media cleanup ---

test("deleteMessageByRowId cleans up media only when unreferenced", () => {
  const chatJid = `test:${Date.now()}-delete-media`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  const mediaId = db.createMedia(
    "shared.txt",
    "text/plain",
    new TextEncoder().encode("shared"),
    null,
    { size: 6 }
  );

  const rowA = db.storeMessage(makeMessage(chatJid, "A", "2024-06-01T00:00:00.000Z"));
  const rowB = db.storeMessage(makeMessage(chatJid, "B", "2024-06-01T00:01:00.000Z"));
  db.attachMediaToMessage(rowA, [mediaId]);
  db.attachMediaToMessage(rowB, [mediaId]);

  expect(db.getMediaById(mediaId)).toBeTruthy();

  db.deleteMessageByRowId(chatJid, rowA);
  expect(db.getMediaById(mediaId)).toBeTruthy();

  db.deleteMessageByRowId(chatJid, rowB);
  expect(db.getMediaById(mediaId)).toBeUndefined();
});

test("deleteThreadByRowId removes thread replies and cleans up media", () => {
  const chatJid = `test:${Date.now()}-delete-thread`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  const mediaParent = db.createMedia(
    "parent.txt",
    "text/plain",
    new TextEncoder().encode("parent"),
    null,
    { size: 6 }
  );
  const mediaChild = db.createMedia(
    "child.txt",
    "text/plain",
    new TextEncoder().encode("child"),
    null,
    { size: 5 }
  );

  const parentId = db.storeMessage(makeMessage(chatJid, "parent", "2024-07-01T00:00:00.000Z"));
  const childId = db.storeMessage({
    ...makeMessage(chatJid, "child", "2024-07-01T00:01:00.000Z"),
    thread_id: parentId,
  } as any);

  db.attachMediaToMessage(parentId, [mediaParent]);
  db.attachMediaToMessage(childId, [mediaChild]);

  const deleted = db.deleteThreadByRowId(chatJid, parentId);
  expect(deleted.length).toBe(2);
  expect(db.getTimeline(chatJid, 10).length).toBe(0);
  expect(db.getMediaById(mediaParent)).toBeUndefined();
  expect(db.getMediaById(mediaChild)).toBeUndefined();
});

// --- Link previews preserve content_blocks ---

test("updateMessageLinkPreviews preserves existing content blocks", () => {
  const chatJid = `test:${Date.now()}-link-preview`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  const rowId = db.storeMessage({
    ...makeMessage(chatJid, "preview", "2024-08-01T00:00:00.000Z"),
    content_blocks: [{ type: "file", name: "note.txt", size: 4 }],
  } as any);

  const ok = db.updateMessageLinkPreviews(chatJid, rowId, [{ url: "https://example.com" }]);
  expect(ok).toBe(true);

  const message = db.getMessageByRowId(chatJid, rowId);
  expect(message?.data.content_blocks?.length).toBe(1);
  expect(message?.data.link_previews?.length).toBe(1);
});

// --- Corrupt JSON in content_blocks/link_previews should not crash ---

test("invalid JSON in content_blocks/link_previews is handled gracefully", () => {
  const chatJid = `test:${Date.now()}-bad-json`;
  db.storeChatMetadata(chatJid, new Date().toISOString(), "Test");

  const rowId = db.storeMessage(makeMessage(chatJid, "bad json", "2024-09-01T00:00:00.000Z"));
  const conn = db.getDb();
  conn.prepare("UPDATE messages SET content_blocks = ?, link_previews = ? WHERE rowid = ?")
    .run("{not json", "[invalid", rowId);

  expect(() => db.getMessageByRowId(chatJid, rowId)).not.toThrow();
  const message = db.getMessageByRowId(chatJid, rowId);
  expect(message?.data.content_blocks).toBeUndefined();
  expect(message?.data.link_previews).toBeUndefined();
});
