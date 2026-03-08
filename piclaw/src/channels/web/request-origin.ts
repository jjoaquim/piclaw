/**
 * channels/web/request-origin.ts – Track the last seen web origin per chat.
 *
 * Used to build absolute URLs (e.g. passkey enrol links) that match the
 * hostname used by the current browser session, even when behind proxies.
 */

import { getRequestOriginParts } from "../../utils/request-client.js";

const originByChatJid = new Map<string, string>();

export function rememberWebOrigin(chatJid: string, req: Request): void {
  try {
    const { proto, host } = getRequestOriginParts(req);
    if (!host) return;
    originByChatJid.set(chatJid, `${proto}://${host}`);
  } catch {
    // ignore parse failures
  }
}

export function getWebOrigin(chatJid: string): string | null {
  return originByChatJid.get(chatJid) || null;
}
