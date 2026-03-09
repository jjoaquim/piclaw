/**
 * channels/web/agent-status-store.ts – in-memory + persisted web agent status state.
 */

interface AgentStatusStateStore {
  load(): void;
  save(): void;
  setAgentStatus(chatJid: string, status: Record<string, unknown> | null): void;
  getAgentStatuses(): Record<string, Record<string, unknown>>;
}

/** In-memory + persisted lifecycle store for active web agent statuses. */
export class AgentStatusStore {
  private activeAgentStatuses = new Map<string, Record<string, unknown>>();

  constructor(private readonly state: AgentStatusStateStore) {}

  load(): void {
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

  update(chatJid: string, status: Record<string, unknown>): void {
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

  get(chatJid: string): Record<string, unknown> | null {
    return this.activeAgentStatuses.get(chatJid) ?? null;
  }
}
