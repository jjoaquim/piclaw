/**
 * channels/web/identity-endpoints.ts – agents/avatar endpoint helpers.
 */
import { getAgentsResponse } from "./agents-service.js";
import { buildAvatarResponse } from "./avatar-service.js";
/** Return serialized agent/user identity metadata for the web UI. */
export async function handleAgentsRequest(ctx) {
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
export async function handleAvatarRequest(kind, req, ctx) {
    const source = kind === "agent" ? ctx.assistantAvatar : ctx.userAvatar;
    if (!source)
        return ctx.json({ error: "Avatar not found" }, 404);
    const response = await buildAvatarResponse(kind, source, req);
    if (response)
        return response;
    return ctx.json({ error: "Avatar not found" }, 404);
}
