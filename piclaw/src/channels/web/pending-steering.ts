/**
 * channels/web/pending-steering.ts – in-memory queue for pending steering timestamps.
 */

/** Per-chat pending steering timestamp queue used by run-control sequencing. */
export class PendingSteeringStore {
  private pendingSteering = new Map<string, string[]>();

  queue(chatJid: string, timestamp: string | undefined): void {
    if (!timestamp) return;
    const existing = this.pendingSteering.get(chatJid) ?? [];
    existing.push(timestamp);
    this.pendingSteering.set(chatJid, existing);
  }

  consumeLatest(chatJid: string): string | null {
    const entries = this.pendingSteering.get(chatJid);
    if (!entries || entries.length === 0) return null;
    this.pendingSteering.delete(chatJid);
    entries.sort();
    return entries[entries.length - 1] ?? null;
  }
}
