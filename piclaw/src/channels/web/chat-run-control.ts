/**
 * channels/web/chat-run-control.ts – chat run control helpers (resume/cursor/failure handling).
 */

import {
  clearFailedRun,
  getChatCursor,
  getFailedRun,
  getMessageRowIdById,
  setChatCursor,
} from "../../db.js";

interface FailedRunLike {
  failedTs: string;
}

/** Persistence contract used by chat run control helpers. */
export interface ChatRunControlStore {
  getThreadRootId(chatJid: string, messageId: string): number | null;
  getFailedRun(chatJid: string): FailedRunLike | undefined;
  getChatCursor(chatJid: string): string;
  setChatCursor(chatJid: string, ts: string): void;
  clearFailedRun(chatJid: string): void;
}

/** Runtime callbacks required to resume a queued chat run. */
export interface ResumeChatContext {
  defaultAgentId: string;
  enqueue(task: () => Promise<void>, key: string): void;
  processChat(chatJid: string, agentId: string, threadRootId?: number | null): Promise<void>;
  now?: () => number;
}

const defaultStore: ChatRunControlStore = {
  getThreadRootId: getMessageRowIdById,
  getFailedRun,
  getChatCursor,
  setChatCursor,
  clearFailedRun,
};

/** Resolve a persisted thread root id for a chat/message pair. */
export function getThreadRootId(
  chatJid: string,
  messageId: string,
  store: ChatRunControlStore = defaultStore
): number | null {
  return store.getThreadRootId(chatJid, messageId);
}

/** Enqueue chat reprocessing for interrupted/pending web chats. */
export function resumeChat(
  chatJid: string,
  threadRootId: number | null | undefined,
  ctx: ResumeChatContext
): void {
  const now = ctx.now ?? Date.now;
  ctx.enqueue(async () => {
    await ctx.processChat(chatJid, ctx.defaultAgentId, threadRootId ?? undefined);
  }, `resume:${chatJid}:${now()}`);
}

/** Skip the failed cursor marker after a model switch to avoid replay loops. */
export function skipFailedOnModelSwitch(
  chatJid: string,
  store: ChatRunControlStore = defaultStore
): void {
  const failed = store.getFailedRun(chatJid);
  if (!failed) return;

  const current = store.getChatCursor(chatJid);
  if (!current || current < failed.failedTs) {
    store.setChatCursor(chatJid, failed.failedTs);
  }
  store.clearFailedRun(chatJid);
}
