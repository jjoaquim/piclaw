/**
 * channels/web/endpoint-contexts.ts – shared builders for WebChannel endpoint context objects.
 */
/** Build the post-mutation endpoint context from live channel dependencies. */
export function createPostMutationsContext(deps) {
    return {
        defaultChatJid: deps.defaultChatJid,
        lastCommandInteractionId: deps.getLastCommandInteractionId(),
        json: deps.json,
        replaceMessageContent: deps.replaceMessageContent,
        setThreadId: deps.setThreadId,
        broadcastInteractionUpdated: deps.broadcastInteractionUpdated,
        storeMessage: deps.storeMessage,
        broadcastAgentResponse: deps.broadcastAgentResponse,
    };
}
/** Build the agent-status endpoint context from live channel dependencies. */
export function createAgentStatusContext(deps) {
    return {
        defaultChatJid: deps.defaultChatJid,
        json: deps.json,
        getAgentStatus: deps.getAgentStatus,
        getBuffer: deps.getBuffer,
        getContextUsageForChat: deps.getContextUsageForChat,
        getAvailableModels: deps.getAvailableModels,
    };
}
/** Build the content endpoint context from live channel dependencies. */
export function createContentEndpointsContext(deps) {
    return {
        defaultChatJid: deps.defaultChatJid,
        json: deps.json,
        getBuffer: deps.getBuffer,
    };
}
/** Build the UI endpoint context from live channel dependencies. */
export function createUiEndpointsContext(deps) {
    return {
        json: deps.json,
        getWorkspaceVisible: deps.getWorkspaceVisible,
        setWorkspaceVisible: deps.setWorkspaceVisible,
        getWorkspaceShowHidden: deps.getWorkspaceShowHidden,
        setWorkspaceShowHidden: deps.setWorkspaceShowHidden,
        setPanelExpanded: deps.setPanelExpanded,
        handleUiResponse: deps.handleUiResponse,
    };
}
/** Build the agents endpoint context from live channel dependencies. */
export function createAgentsEndpointContext(deps) {
    return {
        agentPool: deps.agentPool,
        defaultChatJid: deps.defaultChatJid,
        defaultAgentId: deps.defaultAgentId,
        agentName: deps.agentName,
        agentAvatar: deps.agentAvatar,
        userName: deps.userName,
        userAvatar: deps.userAvatar,
        userAvatarBackground: deps.userAvatarBackground,
        json: deps.json,
    };
}
/** Build the avatar endpoint context from live channel dependencies. */
export function createAvatarEndpointContext(deps) {
    return {
        assistantAvatar: deps.assistantAvatar,
        userAvatar: deps.userAvatar,
        json: deps.json,
    };
}
