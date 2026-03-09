/**
 * channels/web/recovery.ts – crash recovery and pending-resume orchestration.
 */

import {
  clearInflightMarker,
  getAllChatCursors,
  getDb,
  getInflightRuns,
  getMessagesSince,
  hasAgentRepliesAfter,
  rollbackInflightRun,
  type InflightRun,
} from "../../db.js";

/** Runtime callbacks required for inflight recovery/pending resume orchestration. */
export interface WebRecoveryContext {
  assistantName: string;
  defaultAgentId: string;
  enqueue(task: () => Promise<void>, key: string): void;
  processChat(chatJid: string, agentId: string, threadRootId?: number): Promise<void>;
  now?: () => number;
}

/** Persistence contract used by web recovery helpers. */
export interface WebRecoveryStore {
  getInflightRuns(): InflightRun[];
  transaction(run: () => void): void;
  hasAgentRepliesAfter(chatJid: string, prevTs: string): boolean;
  clearInflightMarker(chatJid: string): void;
  rollbackInflightRun(chatJid: string, prevTs: string): void;
  getAllChatCursors(): Record<string, string>;
  getMessagesSince(chatJid: string, since: string, assistantName: string): unknown[];
}

const defaultStore: WebRecoveryStore = {
  getInflightRuns,
  transaction: (run) => {
    getDb().transaction(run)();
  },
  hasAgentRepliesAfter,
  clearInflightMarker,
  rollbackInflightRun,
  getAllChatCursors,
  getMessagesSince,
};

/** Recover interrupted runs left inflight after a restart. */
export function recoverInflightRuns(
  ctx: WebRecoveryContext,
  store: WebRecoveryStore = defaultStore
): void {
  const inflights = store.getInflightRuns();
  if (inflights.length === 0) return;

  try {
    store.transaction(() => {
      for (const inflight of inflights) {
        // Check if agent already stored replies after the inflight message.
        // If so, the run completed successfully but endChatRun() wasn't
        // reached before the process was killed. In that case, just clear
        // the inflight marker — do NOT roll back the cursor, as that would
        // cause the same user message to be re-processed (duplicate reply).
        if (store.hasAgentRepliesAfter(inflight.chatJid, inflight.prevTs)) {
          console.log(
            `[web] Inflight run for ${inflight.chatJid} (started ${inflight.startedAt}) ` +
              "already has agent replies — clearing marker without rollback"
          );
          store.clearInflightMarker(inflight.chatJid);
        } else {
          store.rollbackInflightRun(inflight.chatJid, inflight.prevTs);
        }
      }
    });
  } catch (err) {
    console.error("[web] Failed to roll back inflight runs; will retry on next startup:", err);
    return;
  }

  for (const inflight of inflights) {
    // Only re-enqueue if the cursor was actually rolled back (no agent replies existed)
    if (!store.hasAgentRepliesAfter(inflight.chatJid, inflight.prevTs)) {
      console.log(`[web] Recovering interrupted run for ${inflight.chatJid} (started ${inflight.startedAt})`);
      ctx.enqueue(async () => {
        await ctx.processChat(inflight.chatJid, ctx.defaultAgentId);
      }, `inflight-recovery:${inflight.chatJid}`);
    }
  }
}

/** Resume chats with pending messages after a restart. */
export function resumePendingChats(
  ctx: WebRecoveryContext,
  chatJid?: string,
  store: WebRecoveryStore = defaultStore
): void {
  const cursors = store.getAllChatCursors();
  const jids = chatJid && chatJid !== "all" ? [chatJid] : Object.keys(cursors);

  const now = ctx.now ?? Date.now;

  for (const jid of jids) {
    const since = cursors[jid];
    if (since === undefined) continue; // No cursor → never processed, skip
    const messages = store.getMessagesSince(jid, since, ctx.assistantName);
    if (messages.length === 0) continue;
    ctx.enqueue(async () => {
      await ctx.processChat(jid, ctx.defaultAgentId);
    }, `resume:${jid}:${now()}`);
  }
}
