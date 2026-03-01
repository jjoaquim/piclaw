import type { WebChannel } from "../web.js";
import type { AttachmentInfo } from "../../agent-pool/attachments.js";
import type { AgentEventEmitter } from "./agent-events.js";
import { formatOutbound, type ChatChannel } from "../../router.js";

function buildAttachmentBlocks(attachments: AttachmentInfo[]): {
  mediaIds: number[];
  contentBlocks: Array<Record<string, unknown>>;
} {
  const mediaIds = attachments.map((a) => a.id);
  const contentBlocks = attachments.map((a) => ({
    type: a.kind === "image" ? "image" : "file",
    name: a.name,
    filename: a.name,
    mime_type: a.contentType,
    size: a.size,
  }));
  return { mediaIds, contentBlocks };
}

export function storeAgentTurn(
  channel: WebChannel,
  emitter: AgentEventEmitter,
  params: {
    chatJid: string;
    text: string;
    attachments: AttachmentInfo[];
    channelName: ChatChannel;
    threadId?: number | null;
  }
): void {
  const { mediaIds, contentBlocks } = buildAttachmentBlocks(params.attachments);
  const formatted = formatOutbound(params.text, params.channelName);
  const resolvedThreadId = params.threadId ?? undefined;

  const placeholderId = channel.consumeQueuedFollowupPlaceholder(params.chatJid);
  if (placeholderId) {
    const updated = channel.replaceQueuedFollowupPlaceholder(
      params.chatJid,
      placeholderId,
      formatted,
      mediaIds,
      contentBlocks.length > 0 ? contentBlocks : undefined,
      resolvedThreadId
    );
    if (updated) return;
  }

  const interaction = channel.storeMessage(params.chatJid, formatted, true, mediaIds, {
    contentBlocks: contentBlocks.length > 0 ? contentBlocks : undefined,
    threadId: resolvedThreadId,
  });
  if (interaction) {
    emitter.response(interaction);
  }
}
