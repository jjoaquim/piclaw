/**
 * channels/web/followup-placeholders.ts – queued follow-up placeholder row ids.
 */

/** FIFO in-memory row-id queue for deferred follow-up placeholder replacement. */
export class FollowupPlaceholderStore {
  private queuedFollowupPlaceholders = new Map<string, number[]>();

  enqueue(chatJid: string, rowId: number): void {
    const existing = this.queuedFollowupPlaceholders.get(chatJid) ?? [];
    existing.push(rowId);
    this.queuedFollowupPlaceholders.set(chatJid, existing);
  }

  consume(chatJid: string): number | null {
    const queue = this.queuedFollowupPlaceholders.get(chatJid);
    if (!queue || queue.length === 0) return null;
    const next = queue.shift() ?? null;
    if (!queue.length) this.queuedFollowupPlaceholders.delete(chatJid);
    return next;
  }
}
