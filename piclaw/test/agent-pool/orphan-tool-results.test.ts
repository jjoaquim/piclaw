/**
 * test/agent-pool/orphan-tool-results.test.ts – Unit tests for orphan tool-result pruning.
 */

import { describe, expect, test } from "bun:test";
import type { AgentSession } from "@mariozechner/pi-coding-agent";
import { pruneOrphanToolResults } from "../../src/agent-pool/orphan-tool-results.js";

type MessageRow = {
  role?: string;
  toolCallId?: string;
  content?: Array<{ type?: string; id?: string }>;
};

function createSession(messages: MessageRow[]) {
  const state = { messages: [...messages] };
  const session = {
    agent: {
      state,
      replaceMessages: (next: MessageRow[]) => {
        state.messages = [...next];
      },
    },
  };
  return { session: session as unknown as AgentSession, state };
}

describe("pruneOrphanToolResults", () => {
  test("keeps tool results linked to known assistant tool calls", () => {
    const { session, state } = createSession([
      { role: "assistant", content: [{ type: "toolCall", id: "call-1" }] },
      { role: "toolResult", toolCallId: "call-1" },
      { role: "toolResult", toolCallId: "call-orphan" },
    ]);

    pruneOrphanToolResults(session, "web:test");

    expect(state.messages.length).toBe(2);
    expect(state.messages.some((msg) => msg.role === "toolResult" && msg.toolCallId === "call-1")).toBe(true);
    expect(state.messages.some((msg) => msg.role === "toolResult" && msg.toolCallId === "call-orphan")).toBe(false);
  });

  test("removes all tool results when no assistant tool calls remain", () => {
    const { session, state } = createSession([
      { role: "assistant", content: [{ type: "text" }] },
      { role: "toolResult", toolCallId: "call-1" },
    ]);

    pruneOrphanToolResults(session, "web:test");

    expect(state.messages).toEqual([{ role: "assistant", content: [{ type: "text" }] }]);
  });

  test("is a no-op when session has no internal messages array", () => {
    const session = {} as AgentSession;
    pruneOrphanToolResults(session, "web:test");
    expect(true).toBe(true);
  });
});
