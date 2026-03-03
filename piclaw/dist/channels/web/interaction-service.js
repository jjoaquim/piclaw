export function withAgentProfile(interaction, agentName, agentAvatar, userName, userAvatar, userAvatarBackground) {
    return {
        ...interaction,
        agent_name: agentName,
        agent_avatar: agentAvatar ?? null,
        user_name: userName ?? null,
        user_avatar: userAvatar ?? null,
        user_avatar_background: userAvatarBackground ?? null,
    };
}
export function broadcastAgentResponse(channel, interaction, agentName, agentAvatar, userName, userAvatar, userAvatarBackground) {
    channel.broadcastEvent("agent_response", withAgentProfile(interaction, agentName, agentAvatar, userName, userAvatar, userAvatarBackground));
}
export function broadcastInteractionUpdated(channel, interaction, agentName, agentAvatar, userName, userAvatar, userAvatarBackground) {
    channel.broadcastEvent("interaction_updated", withAgentProfile(interaction, agentName, agentAvatar, userName, userAvatar, userAvatarBackground));
}
