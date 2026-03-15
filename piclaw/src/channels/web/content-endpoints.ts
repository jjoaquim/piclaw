/**
 * channels/web/content-endpoints.ts – timeline/search/thread/thought endpoint helpers.
 */

import {
  getHashtagResponse,
  getSearchResponse,
  getThreadResponse,
  getTimelineResponse,
} from "./timeline-service.js";
import type { WebAgentBufferEntry } from "./agent-buffers.js";

/** Shared dependencies for timeline/search/thread/thought endpoint handlers. */
export interface ContentEndpointsContext {
  defaultChatJid: string;
  json(payload: unknown, status?: number): Response;
  getBuffer(turnId: string, panel: "thought" | "draft"): WebAgentBufferEntry | undefined;
}

/** Return the timeline response. Uses chatJid override when provided (session routing). */
export function handleTimelineRequest(
  limit: number,
  before: number | undefined,
  ctx: ContentEndpointsContext,
  chatJid?: string
): Response {
  const result = getTimelineResponse(chatJid || ctx.defaultChatJid, limit, before);
  return ctx.json(result.body, result.status);
}

/** Return posts for a hashtag. Uses chatJid override when provided (session routing). */
export function handleHashtagRequest(
  tag: string,
  limit: number,
  offset: number,
  ctx: ContentEndpointsContext,
  chatJid?: string
): Response {
  const result = getHashtagResponse(chatJid || ctx.defaultChatJid, tag, limit, offset);
  return ctx.json(result.body, result.status);
}

/** Return search results for a query. Uses chatJid override when provided (session routing). */
export function handleSearchRequest(
  query: string,
  limit: number,
  offset: number,
  ctx: ContentEndpointsContext,
  chatJid?: string
): Response {
  const result = getSearchResponse(chatJid || ctx.defaultChatJid, query, limit, offset);
  return ctx.json(result.body, result.status);
}

/** Return a thread payload rooted at the provided interaction id. */
export function handleThreadRequest(id: number | null, ctx: ContentEndpointsContext): Response {
  const result = getThreadResponse(ctx.defaultChatJid, id);
  return ctx.json(result.body, result.status);
}

/** Return persisted thought/draft buffer text for a streamed model turn. */
export function handleThoughtRequest(
  panel: string | null,
  turnId: string | null,
  ctx: ContentEndpointsContext
): Response {
  if (!turnId) return ctx.json({ error: "Missing turn_id" }, 400);
  const normalized = panel === "draft" ? "draft" : "thought";
  const buffer = ctx.getBuffer(turnId, normalized);
  if (!buffer) return ctx.json({ error: "Thought not found" }, 404);
  return ctx.json({ text: buffer.text, total_lines: buffer.totalLines }, 200);
}
