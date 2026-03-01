import { attachMediaToMessage, clampWebContent, createMedia, getMessageByRowId, storeChatMetadata, storeMessage, } from "../../db.js";
import { getWebPreviewMaxChars, shouldPreviewWebContent } from "../../db/web-content.js";
import { scheduleLinkPreviews } from "./link-previews.js";
import { createUuid } from "../../utils/ids.js";
export function storeWebMessage(channel, params, options = {}) {
    const timestamp = new Date().toISOString();
    const messageId = createUuid("web");
    let contentBlocks = Array.isArray(options.contentBlocks)
        ? [...options.contentBlocks]
        : undefined;
    const allMediaIds = [...params.mediaIds];
    if (shouldPreviewWebContent(params.content)) {
        if (!contentBlocks && params.mediaIds.length > 0) {
            contentBlocks = params.mediaIds.map(() => ({ type: "image" }));
        }
        const maxChars = getWebPreviewMaxChars();
        const filename = `message-${messageId}.md`;
        const data = new TextEncoder().encode(params.content);
        const mediaId = createMedia(filename, "text/markdown", data, null, {
            size: data.length,
            kind: "file",
            source: "message",
            original_length: params.content.length,
            preview_limit: maxChars,
        });
        if (mediaId > 0) {
            allMediaIds.push(mediaId);
            const block = {
                type: "file",
                name: filename,
                filename,
                mime_type: "text/markdown",
                size: data.length,
            };
            if (contentBlocks)
                contentBlocks.push(block);
            else
                contentBlocks = [block];
        }
    }
    const msg = {
        id: messageId,
        chat_jid: params.chatJid,
        sender: params.isBot ? "web-agent" : "web-user",
        sender_name: params.isBot ? params.agentName : "You",
        content: params.content,
        timestamp,
        is_from_me: false,
        is_bot_message: params.isBot,
        content_blocks: contentBlocks,
        link_previews: options.linkPreviews,
        thread_id: options.threadId ?? null,
    };
    const rowId = storeMessage(msg);
    if (rowId <= 0)
        return null;
    if (allMediaIds.length > 0) {
        attachMediaToMessage(rowId, allMediaIds);
    }
    storeChatMetadata(params.chatJid, timestamp, "Web");
    const interaction = getMessageByRowId(params.chatJid, rowId);
    if (interaction) {
        interaction.data.agent_id = params.agentId;
        if (options.threadId)
            interaction.data.thread_id = options.threadId;
        scheduleLinkPreviews(channel, params.chatJid, rowId, params.content, options.linkPreviews);
        return interaction;
    }
    const { content: safeContent, meta } = clampWebContent(params.content);
    const data = {
        type: params.isBot ? "agent_response" : "user_message",
        content: safeContent,
        content_meta: meta,
        agent_id: params.agentId,
        media_ids: allMediaIds,
    };
    if (options.threadId)
        data.thread_id = options.threadId;
    if (contentBlocks?.length)
        data.content_blocks = contentBlocks;
    if (options.linkPreviews?.length)
        data.link_previews = options.linkPreviews;
    scheduleLinkPreviews(channel, params.chatJid, rowId, params.content, options.linkPreviews);
    return {
        id: rowId,
        timestamp,
        data,
    };
}
