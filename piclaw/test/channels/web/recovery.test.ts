import { describe, expect, test } from "bun:test";
import {
  recoverInflightRuns,
  resumePendingChats,
  type WebRecoveryContext,
  type WebRecoveryStore,
} from "../../../src/channels/web/recovery.js";

describe("web recovery helpers", () => {
  test("recoverInflightRuns clears or rolls back and enqueues retries", async () => {
    const inflights = [
      { chatJid: "web:1", prevTs: "t1", messageId: "m1", startedAt: "s1" },
      { chatJid: "web:2", prevTs: "t2", messageId: "m2", startedAt: "s2" },
    ];

    const cleared: string[] = [];
    const rolledBack: Array<{ chatJid: string; prevTs: string }> = [];
    const enqueued: Array<{ key: string; task: () => Promise<void> }> = [];
    const processed: Array<{ chatJid: string; agentId: string }> = [];

    const ctx: WebRecoveryContext = {
      assistantName: "Pi",
      defaultAgentId: "default",
      enqueue: (task, key) => {
        enqueued.push({ task, key });
      },
      processChat: async (chatJid, agentId) => {
        processed.push({ chatJid, agentId });
      },
    };

    const store: WebRecoveryStore = {
      getInflightRuns: () => inflights,
      transaction: (run) => run(),
      hasAgentRepliesAfter: (chatJid) => chatJid === "web:1",
      clearInflightMarker: (chatJid) => {
        cleared.push(chatJid);
      },
      rollbackInflightRun: (chatJid, prevTs) => {
        rolledBack.push({ chatJid, prevTs });
      },
      getAllChatCursors: () => ({}),
      getMessagesSince: () => [],
    };

    recoverInflightRuns(ctx, store);

    expect(cleared).toEqual(["web:1"]);
    expect(rolledBack).toEqual([{ chatJid: "web:2", prevTs: "t2" }]);
    expect(enqueued).toHaveLength(1);
    expect(enqueued[0].key).toBe("inflight-recovery:web:2");

    await enqueued[0].task();
    expect(processed).toEqual([{ chatJid: "web:2", agentId: "default" }]);
  });

  test("recoverInflightRuns stops when transaction fails", () => {
    const enqueued: string[] = [];

    const ctx: WebRecoveryContext = {
      assistantName: "Pi",
      defaultAgentId: "default",
      enqueue: (_task, key) => {
        enqueued.push(key);
      },
      processChat: async () => {},
    };

    const store: WebRecoveryStore = {
      getInflightRuns: () => [{ chatJid: "web:1", prevTs: "t1", messageId: "m1", startedAt: "s1" }],
      transaction: () => {
        throw new Error("boom");
      },
      hasAgentRepliesAfter: () => false,
      clearInflightMarker: () => {},
      rollbackInflightRun: () => {},
      getAllChatCursors: () => ({}),
      getMessagesSince: () => [],
    };

    recoverInflightRuns(ctx, store);
    expect(enqueued).toHaveLength(0);
  });

  test("resumePendingChats enqueues only chats with pending messages", async () => {
    const enqueued: Array<{ key: string; task: () => Promise<void> }> = [];
    const processed: Array<{ chatJid: string; agentId: string }> = [];

    const ctx: WebRecoveryContext = {
      assistantName: "Pi",
      defaultAgentId: "default",
      now: () => 123,
      enqueue: (task, key) => {
        enqueued.push({ key, task });
      },
      processChat: async (chatJid, agentId) => {
        processed.push({ chatJid, agentId });
      },
    };

    const store: WebRecoveryStore = {
      getInflightRuns: () => [],
      transaction: (run) => run(),
      hasAgentRepliesAfter: () => false,
      clearInflightMarker: () => {},
      rollbackInflightRun: () => {},
      getAllChatCursors: () => ({ "web:1": "t1", "web:2": "t2" }),
      getMessagesSince: (chatJid) => (chatJid === "web:2" ? [{ id: "m" }] : []),
    };

    resumePendingChats(ctx, undefined, store);

    expect(enqueued.map((item) => item.key)).toEqual(["resume:web:2:123"]);
    await enqueued[0].task();
    expect(processed).toEqual([{ chatJid: "web:2", agentId: "default" }]);
  });
});
