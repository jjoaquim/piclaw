/**
 * channels/web/content-endpoints.ts – timeline/search/thread/thought endpoint helpers.
 */
import { getHashtagResponse, getSearchResponse, getThreadResponse, getTimelineResponse, } from "./timeline-service.js";
/** Return the timeline response for the default web chat. */
export function handleTimelineRequest(limit, before, ctx) {
    const result = getTimelineResponse(ctx.defaultChatJid, limit, before);
    return ctx.json(result.body, result.status);
}
/** Return posts for a hashtag in the default web chat. */
export function handleHashtagRequest(tag, limit, offset, ctx) {
    const result = getHashtagResponse(ctx.defaultChatJid, tag, limit, offset);
    return ctx.json(result.body, result.status);
}
/** Return search results for a query in the default web chat. */
export function handleSearchRequest(query, limit, offset, ctx) {
    const result = getSearchResponse(ctx.defaultChatJid, query, limit, offset);
    return ctx.json(result.body, result.status);
}
/** Return a thread payload rooted at the provided interaction id. */
export function handleThreadRequest(id, ctx) {
    const result = getThreadResponse(ctx.defaultChatJid, id);
    return ctx.json(result.body, result.status);
}
/** Return persisted thought/draft buffer text for a streamed model turn. */
export function handleThoughtRequest(panel, turnId, ctx) {
    if (!turnId)
        return ctx.json({ error: "Missing turn_id" }, 400);
    const normalized = panel === "draft" ? "draft" : "thought";
    const buffer = ctx.getBuffer(turnId, normalized);
    if (!buffer)
        return ctx.json({ error: "Thought not found" }, 404);
    return ctx.json({ text: buffer.text, total_lines: buffer.totalLines }, 200);
}
