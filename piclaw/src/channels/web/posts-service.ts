import type { WebChannel } from "../web.js";

export interface PostPayload {
  content?: string;
  thread_id?: number | null;
  media_ids?: number[];
  content_blocks?: unknown[];
  link_previews?: unknown[];
}

export function parsePostPayload(body: unknown): { ok: boolean; error?: string; data?: PostPayload } {
  if (!body || typeof body !== "object") return { ok: false, error: "Invalid JSON" };
  const data = body as PostPayload;
  if (!data.content) return { ok: false, error: "Missing 'content' field" };
  return { ok: true, data };
}

export function normalizeMediaIds(ids: unknown): number[] {
  if (!Array.isArray(ids)) return [];
  return ids.map((id) => Number(id)).filter((id) => Number.isFinite(id));
}

export function storePost(
  channel: WebChannel,
  chatJid: string,
  data: PostPayload,
  options: { isReply: boolean }
): { status: number; body: unknown } {
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
  if (!interaction) return { status: 500, body: { error: "Failed to store message" } };

  if (options.isReply && data.thread_id) interaction.data.thread_id = Number(data.thread_id);

  channel.broadcastEvent(options.isReply ? "new_reply" : "new_post", interaction);
  return { status: 201, body: interaction };
}
