import { describe, expect, test } from "bun:test";
import type { AgentPool } from "../../../src/agent-pool.js";
import {
  handleAgentsRequest,
  handleAvatarRequest,
  type AgentsEndpointContext,
  type AvatarEndpointContext,
} from "../../../src/channels/web/identity-endpoints.js";

describe("web identity endpoint helpers", () => {
  test("handleAgentsRequest delegates to agents service payload", async () => {
    const agentPool = {
      getCurrentModelLabel: async () => "openai/gpt-5",
    } as unknown as AgentPool;

    const ctx: AgentsEndpointContext = {
      agentPool,
      defaultChatJid: "web:default",
      defaultAgentId: "default",
      agentName: "Pi",
      agentAvatar: "/avatar/agent",
      userName: "User",
      userAvatar: "/avatar/user",
      userAvatarBackground: "#123456",
      json: (payload, status = 200) =>
        new Response(JSON.stringify(payload), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
    };

    const res = await handleAgentsRequest(ctx);
    expect(res.status).toBe(200);
    const body = await res.json();
    expect(body.agents[0].name).toBe("Pi");
    expect(body.agents[0].model).toBe("openai/gpt-5");
    expect(body.user.name).toBe("User");
  });

  test("handleAvatarRequest returns 404 when avatar source is missing", async () => {
    const ctx: AvatarEndpointContext = {
      assistantAvatar: null,
      userAvatar: null,
      json: (payload, status = 200) =>
        new Response(JSON.stringify(payload), {
          status,
          headers: { "Content-Type": "application/json" },
        }),
    };

    const res = await handleAvatarRequest("agent", new Request("https://example.com/avatar/agent"), ctx);
    expect(res.status).toBe(404);
    expect(await res.json()).toEqual({ error: "Avatar not found" });
  });
});
