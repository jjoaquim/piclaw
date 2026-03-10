/**
 * channels/web/agent-pool-binder.ts – safely bind UI session bridge to AgentPool.
 */
function hasSessionBinder(agentPool) {
    const candidate = agentPool;
    return typeof candidate.setSessionBinder === "function";
}
/** Attach the web UI context binder when agent-pool supports session binding. */
export function bindWebUiSessionBinder(agentPool, binder) {
    if (!hasSessionBinder(agentPool))
        return;
    agentPool.setSessionBinder(binder);
}
