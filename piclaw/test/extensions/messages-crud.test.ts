/**
 * test/extensions/messages-crud.test.ts – Tests for the unified messages tool.
 */
import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import { createTempWorkspace, importFresh, setEnv } from "../helpers.js";
import { withChatContext } from "../../src/core/chat-context.js";

let restoreEnv: (() => void) | null = null;

function makeFakeApi() {
  const tools = new Map<string, any>();
  return {
    api: {
      on() {},
      registerTool(tool: any) {
        tools.set(tool.name, tool);
      },
      registerCommand() {},
      registerShortcut() {},
      registerFlag() {},
      getFlag() { return undefined; },
      registerMessageRenderer() {},
      sendMessage() {},
      sendUserMessage() {},
      appendEntry() {},
      setSessionName() {},
      getSessionName() { return undefined; },
      setLabel() {},
      exec: async () => ({ exitCode: 0, stdout: "", stderr: "" }),
      getActiveTools: () => [],
      getAllTools: () => [],
      setActiveTools() {},
      getCommands: () => [],
      setModel: async () => true,
      getThinkingLevel: () => "off" as const,
      setThinkingLevel() {},
      registerProvider() {},
      unregisterProvider() {},
    } as unknown as ExtensionAPI,
    tools,
  };
}

describe("messages tool extension", () => {
  let ws: ReturnType<typeof createTempWorkspace>;
  let db: typeof import("../../src/db.js");
  let chatJid = "web:test";

  beforeEach(async () => {
    ws = createTempWorkspace("piclaw-messages-crud-");
    chatJid = `web:test-${Math.random().toString(36).slice(2, 10)}`;
    restoreEnv = setEnv({
      PICLAW_WORKSPACE: ws.workspace,
      PICLAW_STORE: ws.store,
      PICLAW_DATA: ws.data,
      PICLAW_DB_IN_MEMORY: "1",
    });
    db = await importFresh<typeof import("../src/db.js")>("../src/db.js");
    db.initDatabase();
    db.storeChatMetadata(chatJid, new Date().toISOString(), "Web");
  });

  afterEach(() => {
    restoreEnv?.();
    restoreEnv = null;
    ws.cleanup();
  });

  function insertMessage(content: string, overrides: Record<string, any> = {}) {
    const id = `msg-${Math.random().toString(36).slice(2, 10)}`;
    return db.storeMessage({
      id,
      chat_jid: chatJid,
      sender: "user",
      sender_name: "Alice",
      content,
      timestamp: new Date().toISOString(),
      is_from_me: false,
      is_bot_message: false,
      ...overrides,
    });
  }

  async function getTool() {
    const { messagesCrud } = await importFresh<typeof import("../src/extensions/messages-crud.js")>("../src/extensions/messages-crud.js");
    const fake = makeFakeApi();
    messagesCrud(fake.api);
    return {
      tool: fake.tools.get("messages")!,
    };
  }

  async function runWithContext(tool: any, params: Record<string, unknown>) {
    return withChatContext(chatJid, "web", () => tool.execute("x", params));
  }

  test("registers the messages tool", async () => {
    const { tool } = await getTool();
    expect(tool).toBeDefined();
    expect(tool.name).toBe("messages");
  });

  test("search returns empty when no query", async () => {
    const { tool } = await getTool();
    const result = await runWithContext(tool, {});
    expect(result.content[0].text).toContain("Provide query for action=search");
    expect(result.details.count).toBe(0);
  });

  test("search supports FTS and returns created_at", async () => {
    insertMessage("The weather is sunny today");
    insertMessage("Another message with rain");

    const { tool } = await getTool();
    const result = await runWithContext(tool, { action: "search", query: "sunny" });
    expect(result.details.action).toBe("search");
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].created_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
    expect(result.details.results[0].content).toContain("sunny");
  });

  test("search supports hashtag lookup", async () => {
    insertMessage("Working on #project-alpha today");
    insertMessage("No hashtag here");

    const { tool } = await getTool();
    const result = await runWithContext(tool, { action: "search", query: "#project-alpha" });
    expect(result.details.count).toBe(1);
    expect(result.details.results[0].content).toContain("project-alpha");
  });

  test("search returns no match", async () => {
    const { tool } = await getTool();
    const result = await runWithContext(tool, { action: "search", query: "does-not-exist-xyz" });
    expect(result.content[0].text).toContain("No matching messages");
    expect(result.details.count).toBe(0);
  });

  test("search respects limit and role filter", async () => {
    insertMessage("Message number one", { sender_name: "User", is_bot_message: false });
    insertMessage("Message number two", { sender_name: "User", is_bot_message: false });
    insertMessage("Assistant says hi", { sender: "assistant", sender_name: "Pi", is_bot_message: true });

    const { tool } = await getTool();
    const result = await runWithContext(tool, {
      action: "search",
      query: "Message number",
      limit: 2,
      offset: 0,
      role: "user",
    });
    expect(result.details.count).toBe(2);
    expect(result.details.limit).toBe(2);
    expect(result.details.results.every((row: any) => row.is_bot_message === 0)).toBe(true);
  });

  test("search truncates content with details_max_chars", async () => {
    insertMessage("The quick brown fox ".repeat(25));
    const { tool } = await getTool();
    const result = await runWithContext(tool, { action: "search", query: "quick brown fox", details_max_chars: 50 });
    expect(result.details.results[0].content.length).toBeLessThanOrEqual(50);
    expect(result.details.results[0].content_truncated).toBe(true);
    expect(result.details.results[0].content_full_length).toBeGreaterThan(50);
  });

  test("get supports context_before/context_after", async () => {
    insertMessage("before message one");
    insertMessage("before message two");
    insertMessage("target message body");
    insertMessage("after message one");

    const { tool } = await getTool();
    const search = await runWithContext(tool, { action: "search", query: "target message body" });
    const rowId = search.details.results[0].rowid;

    const result = await runWithContext(tool, {
      action: "get",
      row_ids: [rowId],
      context_before: 2,
      context_after: 1,
      details_max_chars: 200,
    });

    expect(result.details.count).toBe(1);
    expect(result.details.messages[0].message.content).toContain("target message body");
    expect(result.details.messages[0].context_before).toHaveLength(2);
    expect(result.details.messages[0].context_after).toHaveLength(1);
    expect(result.details.messages[0].context_before[0].created_at).toMatch(/^\d{4}-\d{2}-\d{2}T/);
  });

  test("get missing row_ids are reported", async () => {
    const { tool } = await getTool();
    const result = await runWithContext(tool, { action: "get", row_ids: [999999] });
    expect(result.details.count).toBe(0);
    expect(result.details.missing_row_ids).toContain(999999);
  });

  test("add stores a new row", async () => {
    const content = "Newly added message";
    const { tool } = await getTool();
    const result = await runWithContext(tool, {
      action: "add",
      content,
      type: "agent",
    });

    expect(result.details.action).toBe("add");
    expect(result.details.inserted).toBe(1);

    const search = await runWithContext(tool, { action: "search", query: content, chat_jid: chatJid });
    expect(search.details.count).toBe(1);
  });

  test("delete supports dry_run and does not delete", async () => {
    const parent = insertMessage("Parent message");
    const child = insertMessage("Child message", { thread_id: parent });

    const { tool } = await getTool();
    const dry = await runWithContext(tool, {
      action: "delete",
      row_ids: [parent],
      dry_run: true,
      force: true,
    });

    expect(dry.details.action).toBe("delete");
    expect(dry.details.deleted_row_ids).toContain(parent);
    expect(dry.details.deleted_row_ids).toContain(child);
    expect(dry.details.count).toBe(2);

    const afterDry = await runWithContext(tool, { action: "search", query: "Parent message", chat_jid: chatJid });
    expect(afterDry.details.count).toBe(1);
  });

  test("delete removes threads when executed", async () => {
    const parent = insertMessage("Thread parent");
    const child = insertMessage("Thread child", { thread_id: parent });

    const { tool } = await getTool();
    const live = await runWithContext(tool, {
      action: "delete",
      row_ids: [parent],
      force: true,
    });
    expect(live.details.deleted_row_ids).toContain(parent);
    expect(live.details.deleted_row_ids).toContain(child);

    const verify = await runWithContext(tool, { action: "search", query: "Thread", chat_jid: chatJid });
    expect(verify.details.count).toBe(0);
  });

  test("delete skips media attached rows unless force", async () => {
    const rowId = insertMessage("Media protected");
    const mid = db.createMedia("test.txt", "text/plain", new TextEncoder().encode("hello"), null, { size: 5 });
    db.attachMediaToMessage(rowId, [mid]);

    const { tool } = await getTool();
    const result = await runWithContext(tool, { action: "delete", row_ids: [rowId] });

    expect(result.details.skipped_row_ids).toContain(rowId);
    expect(result.details.deleted_row_ids).not.toContain(rowId);

    const verify = await runWithContext(tool, { action: "search", query: "Media protected", chat_jid: chatJid });
    expect(verify.details.count).toBe(1);

    const forced = await runWithContext(tool, {
      action: "delete",
      row_ids: [rowId],
      force: true,
    });
    expect(forced.details.deleted_row_ids).toContain(rowId);
  });
});
