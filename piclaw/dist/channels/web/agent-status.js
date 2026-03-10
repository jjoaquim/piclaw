/**
 * channels/web/agent-status.ts – Agent status/context/models endpoint helpers.
 */
function resolveChatJid(req, defaultChatJid) {
    const url = new URL(req.url);
    return (url.searchParams.get("chat_jid") || defaultChatJid).trim() || defaultChatJid;
}
/** Return active/idle agent status plus streamed thought/draft buffers when available. */
export function handleAgentStatusRequest(req, ctx) {
    const chatJid = resolveChatJid(req, ctx.defaultChatJid);
    const status = ctx.getAgentStatus(chatJid);
    if (!status) {
        return ctx.json({ status: "idle", data: null });
    }
    const turnId = (status.turn_id || status.turnId);
    let thought;
    let draft;
    if (turnId) {
        const tb = ctx.getBuffer(turnId, "thought");
        if (tb)
            thought = { text: tb.text, totalLines: tb.totalLines };
        const db = ctx.getBuffer(turnId, "draft");
        if (db)
            draft = { text: db.text, totalLines: db.totalLines };
    }
    return ctx.json({ status: "active", data: status, thought, draft });
}
/** Return context window usage metrics for the requested/default chat. */
export async function handleAgentContextRequest(req, ctx) {
    const chatJid = resolveChatJid(req, ctx.defaultChatJid);
    const usage = await ctx.getContextUsageForChat(chatJid);
    if (!usage) {
        return ctx.json({ tokens: null, contextWindow: null, percent: null });
    }
    return ctx.json({
        tokens: usage.tokens,
        contextWindow: usage.contextWindow,
        percent: usage.percent,
    });
}
/** Return available model options for the requested/default chat. */
export async function handleAgentModelsRequest(req, ctx) {
    const chatJid = resolveChatJid(req, ctx.defaultChatJid);
    const payload = await ctx.getAvailableModels(chatJid);
    return ctx.json(payload, 200);
}
