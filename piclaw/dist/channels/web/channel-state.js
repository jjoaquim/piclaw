/**
 * web/channel-state.ts – Persistent state for the web channel.
 *
 * After moving cursor positions and failed-run records into the `chat_cursors`
 * DB table (db/chat-cursors.ts), this class is responsible only for
 * transient per-chat agent status payloads that the UI polls for.
 *
 * Most persisted agentStatuses are cleared on startup because they are just
 * ephemeral UI hints from the previous process. The one intentional exception
 * is the restart-restorable compaction indicator, whose original started_at
 * timestamp lets the web UI keep showing a meaningful elapsed timer while
 * recovery resumes the interrupted turn.
 *
 * Consumers: channels/web.ts reads/writes state during agent run
 *            orchestration and SSE broadcasting.
 */
import { getRouterState, setRouterState } from "../../db.js";
/** Persistent per-chat state manager for the web channel. */
export class WebChannelState {
    stateKey;
    agentStatuses = {};
    constructor(stateKey) {
        this.stateKey = stateKey;
    }
    load() {
        const data = getRouterState(this.stateKey);
        try {
            const parsed = data ? JSON.parse(data) : {};
            this.agentStatuses =
                parsed && typeof parsed === "object" && typeof parsed.agentStatuses === "object"
                    ? parsed.agentStatuses
                    : {};
        }
        catch {
            this.agentStatuses = {};
        }
    }
    save() {
        setRouterState(this.stateKey, JSON.stringify({ agentStatuses: this.agentStatuses }));
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
}
