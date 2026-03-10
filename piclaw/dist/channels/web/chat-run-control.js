/**
 * channels/web/chat-run-control.ts – chat run control helpers (resume/cursor/failure handling).
 */
import { clearFailedRun, getChatCursor, getFailedRun, getMessageRowIdById, setChatCursor, } from "../../db.js";
const defaultStore = {
    getThreadRootId: getMessageRowIdById,
    getFailedRun,
    getChatCursor,
    setChatCursor,
    clearFailedRun,
};
/** Resolve a persisted thread root id for a chat/message pair. */
export function getThreadRootId(chatJid, messageId, store = defaultStore) {
    return store.getThreadRootId(chatJid, messageId);
}
/** Enqueue chat reprocessing for interrupted/pending web chats. */
export function resumeChat(chatJid, threadRootId, ctx) {
    const now = ctx.now ?? Date.now;
    ctx.enqueue(async () => {
        await ctx.processChat(chatJid, ctx.defaultAgentId, threadRootId ?? undefined);
    }, `resume:${chatJid}:${now()}`);
}
/** Skip the failed cursor marker after a model switch to avoid replay loops. */
export function skipFailedOnModelSwitch(chatJid, store = defaultStore) {
    const failed = store.getFailedRun(chatJid);
    if (!failed)
        return;
    const current = store.getChatCursor(chatJid);
    if (!current || current < failed.failedTs) {
        store.setChatCursor(chatJid, failed.failedTs);
    }
    store.clearFailedRun(chatJid);
}
