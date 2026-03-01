export function resolveThreadId(explicit, fallback) {
    if (explicit !== null && explicit !== undefined)
        return explicit;
    return fallback ?? null;
}
export function resolveThreadRootId(channel, chatJid, messageId, explicitThreadId) {
    const fallback = channel.getThreadRootId(chatJid, messageId);
    return resolveThreadId(explicitThreadId, fallback);
}
