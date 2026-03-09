/**
 * web/interaction-service.ts – Builds InteractionRow payloads for SSE.
 *
 * Converts raw message/response data into the InteractionRow format
 * expected by the web UI timeline component.
 *
 * Consumers: web/agent-message-service.ts, web/posts-service.ts.
 */

import type { InteractionRow } from "../../db.js";

/** Minimal channel contract for broadcasting interaction updates to clients. */
export interface InteractionBroadcastChannel {
  broadcastEvent(eventType: string, data: unknown): void;
}

/** Decorate an interaction payload with agent name and avatar. */
export function withAgentProfile(
  interaction: InteractionRow,
  agentName: string,
  agentAvatar?: string | null,
  userName?: string | null,
  userAvatar?: string | null,
  userAvatarBackground?: string | null
): InteractionRow & {
  agent_name: string;
  agent_avatar: string | null;
  user_name: string | null;
  user_avatar: string | null;
  user_avatar_background: string | null;
} {
  return {
    ...interaction,
    agent_name: agentName,
    agent_avatar: agentAvatar ?? null,
    user_name: userName ?? null,
    user_avatar: userAvatar ?? null,
    user_avatar_background: userAvatarBackground ?? null,
  };
}

/** Broadcast a completed agent interaction to SSE clients. */
export function broadcastAgentResponse(
  channel: InteractionBroadcastChannel,
  interaction: InteractionRow,
  agentName: string,
  agentAvatar?: string | null,
  userName?: string | null,
  userAvatar?: string | null,
  userAvatarBackground?: string | null
): void {
  channel.broadcastEvent(
    "agent_response",
    withAgentProfile(interaction, agentName, agentAvatar, userName, userAvatar, userAvatarBackground)
  );
}

/** Broadcast an updated interaction (edit, link preview) to SSE clients. */
export function broadcastInteractionUpdated(
  channel: InteractionBroadcastChannel,
  interaction: InteractionRow,
  agentName: string,
  agentAvatar?: string | null,
  userName?: string | null,
  userAvatar?: string | null,
  userAvatarBackground?: string | null
): void {
  channel.broadcastEvent(
    "interaction_updated",
    withAgentProfile(interaction, agentName, agentAvatar, userName, userAvatar, userAvatarBackground)
  );
}
