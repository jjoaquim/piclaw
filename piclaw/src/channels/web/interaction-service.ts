import type { InteractionRow } from "../../db.js";
import type { WebChannel } from "../web.js";

export function withAgentProfile(
  interaction: InteractionRow,
  agentName: string,
  agentAvatar?: string | null
): InteractionRow & { agent_name: string; agent_avatar: string | null } {
  return {
    ...interaction,
    agent_name: agentName,
    agent_avatar: agentAvatar ?? null,
  };
}

export function broadcastAgentResponse(
  channel: WebChannel,
  interaction: InteractionRow,
  agentName: string,
  agentAvatar?: string | null
): void {
  channel.broadcastEvent("agent_response", withAgentProfile(interaction, agentName, agentAvatar));
}

export function broadcastInteractionUpdated(
  channel: WebChannel,
  interaction: InteractionRow,
  agentName: string,
  agentAvatar?: string | null
): void {
  channel.broadcastEvent("interaction_updated", withAgentProfile(interaction, agentName, agentAvatar));
}
