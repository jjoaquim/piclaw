/**
 * channels/web/agent-buffers.ts – in-memory thought/draft buffers and panel expansion state.
 */
const DEFAULT_BUFFER_LIMIT = 50;
/** Stores bounded thought/draft buffers plus per-turn panel expansion state. */
export class AgentBuffers {
    limit;
    thoughtBuffers = new Map();
    draftBuffers = new Map();
    expandedPanels = new Map();
    constructor(limit = DEFAULT_BUFFER_LIMIT) {
        this.limit = limit;
    }
    setPanelExpanded(turnId, panel, expanded) {
        if (!turnId)
            return;
        const current = this.expandedPanels.get(turnId) ?? { thought: false, draft: false };
        current[panel] = expanded;
        if (!current.thought && !current.draft) {
            this.expandedPanels.delete(turnId);
        }
        else {
            this.expandedPanels.set(turnId, current);
        }
    }
    isPanelExpanded(turnId, panel) {
        return this.expandedPanels.get(turnId)?.[panel] ?? false;
    }
    updateBuffer(turnId, panel, text, totalLines) {
        if (!turnId)
            return;
        const target = panel === "draft" ? this.draftBuffers : this.thoughtBuffers;
        target.set(turnId, { text, totalLines, updatedAt: Date.now() });
        this.prune(target);
    }
    getBuffer(turnId, panel) {
        return panel === "draft" ? this.draftBuffers.get(turnId) : this.thoughtBuffers.get(turnId);
    }
    prune(map) {
        if (map.size <= this.limit)
            return;
        const entries = Array.from(map.entries()).sort((a, b) => a[1].updatedAt - b[1].updatedAt);
        for (let i = 0; i < entries.length - this.limit; i += 1) {
            map.delete(entries[i][0]);
        }
    }
}
