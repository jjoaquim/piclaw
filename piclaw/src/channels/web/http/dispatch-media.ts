/**
 * web/http/dispatch-media.ts – Media route dispatch helpers.
 */

import {
  handleMedia,
  handleMediaInfo,
  handleMediaUpload,
  type MediaResponseContext,
} from "../handlers/media.js";

/** Channel contract required by media-route HTTP dispatcher. */
export interface MediaDispatchChannel extends MediaResponseContext {
  parseOptionalInt(value: string | null): number | null;
  handleMediaUpload?(req: Request): Promise<Response>;
  handleMedia?(id: number, thumbnail: boolean): Response;
  handleMediaInfo?(id: number): Response;
}

/**
 * Handle /media routes when the request matches; otherwise return null.
 */
export async function handleMediaRoutes(
  channel: MediaDispatchChannel,
  req: Request,
  pathname: string
): Promise<Response | null> {
  if (req.method === "POST" && pathname === "/media/upload") {
    return await (channel.handleMediaUpload?.(req) ?? handleMediaUpload(channel, req));
  }

  if (req.method === "GET" && pathname.startsWith("/media/") && pathname.endsWith("/thumbnail")) {
    const id = channel.parseOptionalInt(pathname.replace("/media/", "").replace("/thumbnail", ""));
    if (!id) return channel.json({ error: "Media not found" }, 404);
    return channel.handleMedia?.(id, true) ?? handleMedia(channel, id, true);
  }

  if (req.method === "GET" && pathname.startsWith("/media/") && pathname.endsWith("/info")) {
    const id = channel.parseOptionalInt(pathname.replace("/media/", "").replace("/info", ""));
    if (!id) return channel.json({ error: "Media not found" }, 404);
    return channel.handleMediaInfo?.(id) ?? handleMediaInfo(channel, id);
  }

  if (req.method === "GET" && pathname.startsWith("/media/")) {
    const id = channel.parseOptionalInt(pathname.replace("/media/", ""));
    if (!id) return channel.json({ error: "Media not found" }, 404);
    return channel.handleMedia?.(id, false) ?? handleMedia(channel, id, false);
  }

  return null;
}
