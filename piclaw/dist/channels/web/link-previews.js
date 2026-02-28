import { getMessageByRowId, updateMessageLinkPreviews } from "../../db.js";
const MAX_URLS = 3;
const FETCH_TIMEOUT_MS = 8000;
const MAX_HTML_CHARS = 200_000;
const URL_REGEX = /https?:\/\/[\w\d#%/.:?@\[\]-]+/gi;
function trimUrl(raw) {
    return raw.replace(/[),.;!?]+$/g, "");
}
export function extractUrls(text, limit = MAX_URLS) {
    if (!text)
        return [];
    const matches = text.match(URL_REGEX) ?? [];
    const unique = [];
    for (const raw of matches) {
        const cleaned = trimUrl(raw);
        if (!cleaned)
            continue;
        if (!unique.includes(cleaned))
            unique.push(cleaned);
        if (unique.length >= limit)
            break;
    }
    return unique;
}
function extractMetaContent(html, key) {
    const attrMatch = html.match(new RegExp(`<meta[^>]+(?:property|name)=["']${key}["'][^>]*>`, "i"));
    if (!attrMatch)
        return undefined;
    const contentMatch = attrMatch[0].match(/content=["']([^"']+)["']/i);
    return contentMatch?.[1];
}
function extractTitle(html) {
    const titleMatch = html.match(/<title[^>]*>([^<]+)<\/title>/i);
    return titleMatch?.[1]?.trim();
}
function normalizeImage(url, baseUrl) {
    try {
        return new URL(url, baseUrl).toString();
    }
    catch {
        return url;
    }
}
export async function fetchLinkPreview(url) {
    const controller = new AbortController();
    const timeoutId = setTimeout(() => controller.abort(), FETCH_TIMEOUT_MS);
    try {
        const res = await fetch(url, {
            headers: {
                "User-Agent": "piclaw/1.0",
                Accept: "text/html,application/xhtml+xml",
            },
            signal: controller.signal,
        });
        if (!res.ok)
            return null;
        const contentType = res.headers.get("content-type") || "";
        if (!contentType.includes("text/html"))
            return null;
        const html = (await res.text()).slice(0, MAX_HTML_CHARS);
        const title = extractMetaContent(html, "og:title") ||
            extractMetaContent(html, "twitter:title") ||
            extractTitle(html);
        const description = extractMetaContent(html, "og:description") ||
            extractMetaContent(html, "twitter:description") ||
            extractMetaContent(html, "description");
        const imageRaw = extractMetaContent(html, "og:image") ||
            extractMetaContent(html, "twitter:image") ||
            extractMetaContent(html, "og:image:url");
        const siteName = extractMetaContent(html, "og:site_name") || new URL(url).hostname;
        const image = imageRaw ? normalizeImage(imageRaw, url) : undefined;
        if (!title && !description && !image)
            return null;
        return {
            url,
            title: title || undefined,
            description: description || undefined,
            image,
            site_name: siteName || undefined,
        };
    }
    catch {
        return null;
    }
    finally {
        clearTimeout(timeoutId);
    }
}
export async function fetchLinkPreviews(urls) {
    const previews = [];
    for (const url of urls) {
        const preview = await fetchLinkPreview(url);
        if (preview)
            previews.push(preview);
    }
    return previews;
}
export function scheduleLinkPreviews(channel, chatJid, rowId, content, existingPreviews) {
    if (existingPreviews && existingPreviews.length > 0)
        return;
    const urls = extractUrls(content);
    if (urls.length === 0)
        return;
    if (channel.pendingLinkPreviews.has(rowId))
        return;
    channel.pendingLinkPreviews.add(rowId);
    void (async () => {
        try {
            const previews = await fetchLinkPreviews(urls);
            if (!previews.length)
                return;
            updateMessageLinkPreviews(chatJid, rowId, previews);
            const interaction = getMessageByRowId(chatJid, rowId);
            if (interaction)
                channel.broadcastEvent("interaction_updated", interaction);
        }
        catch (err) {
            console.warn("[web] Link preview fetch failed:", err);
        }
        finally {
            channel.pendingLinkPreviews.delete(rowId);
        }
    })();
}
