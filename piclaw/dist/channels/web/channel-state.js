import { getRouterState, setRouterState } from "../../db.js";
export class WebChannelState {
    stateKey;
    lastAgentTimestamp = {};
    pendingResumes = {};
    agentStatuses = {};
    queuedFollowupPlaceholders = new Map();
    constructor(stateKey) {
        this.stateKey = stateKey;
    }
    load() {
        const data = getRouterState(this.stateKey);
        try {
            const parsed = data ? JSON.parse(data) : {};
            if (parsed && typeof parsed === "object" && "lastAgentTimestamp" in parsed) {
                const record = parsed;
                this.lastAgentTimestamp = record.lastAgentTimestamp && typeof record.lastAgentTimestamp === "object"
                    ? record.lastAgentTimestamp
                    : {};
                this.pendingResumes = record.pendingResumes && typeof record.pendingResumes === "object"
                    ? record.pendingResumes
                    : {};
                this.agentStatuses = record.agentStatuses && typeof record.agentStatuses === "object"
                    ? record.agentStatuses
                    : {};
            }
            else if (parsed && typeof parsed === "object") {
                this.lastAgentTimestamp = parsed;
                this.pendingResumes = {};
                this.agentStatuses = {};
            }
            else {
                this.lastAgentTimestamp = {};
                this.pendingResumes = {};
                this.agentStatuses = {};
            }
        }
        catch {
            this.lastAgentTimestamp = {};
            this.pendingResumes = {};
            this.agentStatuses = {};
        }
    }
    save() {
        setRouterState(this.stateKey, JSON.stringify({
            lastAgentTimestamp: this.lastAgentTimestamp,
            pendingResumes: this.pendingResumes,
            agentStatuses: this.agentStatuses,
        }));
    }
    setPendingResume(chatJid, info) {
        this.pendingResumes[chatJid] = info;
    }
    clearPendingResume(chatJid) {
        delete this.pendingResumes[chatJid];
    }
    getPendingResume(chatJid) {
        return this.pendingResumes[chatJid];
    }
    getPendingResumes() {
        return { ...this.pendingResumes };
    }
    setAgentStatus(chatJid, status) {
        if (!status) {
            delete this.agentStatuses[chatJid];
            return;
        }
        this.agentStatuses[chatJid] = status;
    }
    getAgentStatuses() {
        return { ...this.agentStatuses };
    }
    enqueueFollowupPlaceholder(chatJid, rowId) {
        const existing = this.queuedFollowupPlaceholders.get(chatJid) ?? [];
        existing.push(rowId);
        this.queuedFollowupPlaceholders.set(chatJid, existing);
    }
    consumeFollowupPlaceholder(chatJid) {
        const queue = this.queuedFollowupPlaceholders.get(chatJid);
        if (!queue || queue.length === 0)
            return null;
        const next = queue.shift() ?? null;
        if (!queue.length)
            this.queuedFollowupPlaceholders.delete(chatJid);
        return next;
    }
}
