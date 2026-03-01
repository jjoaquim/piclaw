import type { AgentPool } from "../../agent-pool.js";

export async function getAgentsResponse(
  agentPool: AgentPool,
  options: {
    chatJid: string;
    agentId: string;
    agentName: string;
    agentAvatar?: string | null;
  }
): Promise<{ status: number; body: unknown }> {
  const model = await agentPool.getCurrentModelLabel(options.chatJid).catch(() => null);
  return {
    status: 200,
    body: {
      agents: [
        {
          id: options.agentId,
          name: options.agentName,
          description: `${options.agentName} agent`,
          status: "running",
          actions: [],
          avatar_url: options.agentAvatar || null,
          model: model ?? null,
        },
      ],
    },
  };
}
