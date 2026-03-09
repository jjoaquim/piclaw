/**
 * channels/web/identity-endpoints.ts – agents/avatar endpoint helpers.
 */

import type { AgentPool } from "../../agent-pool.js";
import { getAgentsResponse } from "./agents-service.js";
import { buildAvatarResponse } from "./avatar-service.js";

/** Context contract for serving the agent/user identity payload endpoint. */
export interface AgentsEndpointContext {
  agentPool: AgentPool;
  defaultChatJid: string;
  defaultAgentId: string;
  agentName: string;
  agentAvatar: string | null;
  userName: string | null;
  userAvatar: string | null;
  userAvatarBackground: string | null;
  json(payload: unknown, status?: number): Response;
}

/** Context contract for serving agent/user avatar image endpoints. */
export interface AvatarEndpointContext {
  assistantAvatar: string | null;
  userAvatar: string | null;
  json(payload: unknown, status?: number): Response;
}

/** Return serialized agent/user identity metadata for the web UI. */
export async function handleAgentsRequest(ctx: AgentsEndpointContext): Promise<Response> {
  const result = await getAgentsResponse(ctx.agentPool, {
    chatJid: ctx.defaultChatJid,
    agentId: ctx.defaultAgentId,
    agentName: ctx.agentName,
    agentAvatar: ctx.agentAvatar,
    userName: ctx.userName,
    userAvatar: ctx.userAvatar,
    userAvatarBackground: ctx.userAvatarBackground,
  });
  return ctx.json(result.body, result.status);
}

/** Return a rendered avatar response for agent/user avatars when configured. */
export async function handleAvatarRequest(
  kind: "agent" | "user",
  req: Request,
  ctx: AvatarEndpointContext
): Promise<Response> {
  const source = kind === "agent" ? ctx.assistantAvatar : ctx.userAvatar;
  if (!source) return ctx.json({ error: "Avatar not found" }, 404);
  const response = await buildAvatarResponse(kind, source, req);
  if (response) return response;
  return ctx.json({ error: "Avatar not found" }, 404);
}
