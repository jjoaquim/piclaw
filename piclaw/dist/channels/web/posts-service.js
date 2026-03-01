export function parsePostPayload(body) {
    if (!body || typeof body !== "object")
        return { ok: false, error: "Invalid JSON" };
    const data = body;
    if (!data.content)
        return { ok: false, error: "Missing 'content' field" };
    return { ok: true, data };
}
export function normalizeMediaIds(ids) {
    if (!Array.isArray(ids))
        return [];
    return ids.map((id) => Number(id)).filter((id) => Number.isFinite(id));
}
export function storePost(channel, chatJid, data, options) {
    if (options.isReply && !data.thread_id) {
        return { status: 400, body: { error: "Missing 'thread_id' field" } };
    }
    const mediaIds = normalizeMediaIds(data.media_ids);
    const contentBlocks = Array.isArray(data.content_blocks) ? data.content_blocks : undefined;
    const linkPreviews = Array.isArray(data.link_previews) ? data.link_previews : undefined;
    const interaction = channel.storeMessage(chatJid, data.content || "", false, mediaIds, {
        contentBlocks,
        linkPreviews,
    });
    if (!interaction)
        return { status: 500, body: { error: "Failed to store message" } };
    if (options.isReply && data.thread_id)
        interaction.data.thread_id = Number(data.thread_id);
    channel.broadcastEvent(options.isReply ? "new_reply" : "new_post", interaction);
    return { status: 201, body: interaction };
}
