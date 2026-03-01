import type { WebChannel } from "../web.js";

export function resolveThreadId(
  explicit: number | null | undefined,
  fallback: number | null | undefined
): number | null {
  if (explicit !== null && explicit !== undefined) return explicit;
  return fallback ?? null;
}

export function resolveThreadRootId(
  channel: WebChannel,
  chatJid: string,
  messageId: string,
  explicitThreadId?: number | null
): number | null {
  const fallback = channel.getThreadRootId(chatJid, messageId);
  return resolveThreadId(explicitThreadId, fallback);
}
