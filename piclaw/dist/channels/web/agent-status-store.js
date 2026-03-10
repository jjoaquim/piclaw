/**
 * channels/web/agent-status-store.ts – in-memory + persisted web agent status state.
 */
/** In-memory + persisted lifecycle store for active web agent statuses. */
export class AgentStatusStore {
    state;
    activeAgentStatuses = new Map();
    constructor(state) {
        this.state = state;
    }
    load() {
        this.state.load();
        // Clear any persisted agent statuses from the previous process.
        // After a restart no agents are running, so stale "intent" or "tool_call"
        // statuses would otherwise be served to the UI indefinitely.
        const restored = this.state.getAgentStatuses();
        if (Object.keys(restored).length > 0) {
            for (const jid of Object.keys(restored)) {
                this.state.setAgentStatus(jid, null);
            }
            this.state.save();
        }
        this.activeAgentStatuses = new Map();
    }
    update(chatJid, status) {
        const type = status?.type;
        if (type === "done" || type === "error") {
            const removed = this.activeAgentStatuses.delete(chatJid);
            if (removed) {
                this.state.setAgentStatus(chatJid, null);
                this.state.save();
            }
            return;
        }
        this.activeAgentStatuses.set(chatJid, status);
        this.state.setAgentStatus(chatJid, status);
        this.state.save();
    }
    get(chatJid) {
        return this.activeAgentStatuses.get(chatJid) ?? null;
    }
}
