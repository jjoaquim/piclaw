export async function getAgentsResponse(agentPool, options) {
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
            user: {
                name: options.userName || null,
                avatar_url: options.userAvatar || null,
                avatar_background: options.userAvatarBackground || null,
            },
        },
    };
}
