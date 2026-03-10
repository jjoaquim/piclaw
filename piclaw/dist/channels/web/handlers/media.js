/**
 * web/handlers/media.ts – HTTP handlers for media upload and retrieval.
 *
 * Handles POST /media/upload (file upload) and GET /media/:id (download/thumbnail).
 * Media uploads are validated by MediaService (size + content-type checks).
 * Downloads use Content-Disposition: attachment for non-image types to
 * prevent stored XSS via HTML/SVG file uploads.
 *
 * Consumers: web/http/dispatch-media.ts routes media paths here.
 */
import { MediaService } from "../media-service.js";
const mediaService = new MediaService();
/** Handle POST /media: file upload. */
export async function handleMediaUpload(channel, req) {
    let form;
    try {
        form = await req.formData();
    }
    catch {
        return channel.json({ error: "Invalid form data" }, 400);
    }
    const file = form.get("file");
    if (!(file instanceof File))
        return channel.json({ error: "Missing file" }, 400);
    const result = await mediaService.createFromFile(file);
    return channel.json(result.body, result.status);
}
/**
 * Content types safe to serve inline (rendered by the browser).
 * All other types get Content-Disposition: attachment to force download
 * and prevent stored XSS (e.g., an uploaded HTML file executing JS).
 */
const INLINE_SAFE_TYPES = new Set([
    "image/png",
    "image/jpeg",
    "image/gif",
    "image/webp",
    "image/svg+xml",
    "image/bmp",
    "image/x-icon",
]);
/** Route media requests to upload, download, or info handlers. */
export function handleMedia(channel, id, thumbnail) {
    const result = mediaService.getMedia(id, thumbnail);
    if (result.status !== 200)
        return channel.json({ error: "Media not found" }, result.status);
    const contentType = result.contentType || "application/octet-stream";
    const headers = {
        "Content-Type": contentType,
    };
    // Force download for non-image types to prevent stored XSS via HTML/SVG uploads
    if (!INLINE_SAFE_TYPES.has(contentType)) {
        headers["Content-Disposition"] = "attachment";
    }
    return new Response(result.body, { headers });
}
/** Handle GET /media/:id/info: metadata query. */
export function handleMediaInfo(channel, id) {
    const result = mediaService.getInfo(id);
    return channel.json(result.body, result.status);
}
