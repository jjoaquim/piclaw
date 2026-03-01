export function withAgentProfile(interaction, agentName, agentAvatar) {
    return {
        ...interaction,
        agent_name: agentName,
        agent_avatar: agentAvatar ?? null,
    };
}
export function broadcastAgentResponse(channel, interaction, agentName, agentAvatar) {
    channel.broadcastEvent("agent_response", withAgentProfile(interaction, agentName, agentAvatar));
}
export function broadcastInteractionUpdated(channel, interaction, agentName, agentAvatar) {
    channel.broadcastEvent("interaction_updated", withAgentProfile(interaction, agentName, agentAvatar));
}
