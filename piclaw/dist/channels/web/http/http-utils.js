/**
 * web/http/http-utils.ts – Low-level HTTP response helpers.
 *
 * Provides jsonResponse(), parseOptionalInt(), clampInt(), and other
 * small utilities for building API responses.
 *
 * Consumers: All web/handlers/*.ts modules and web/http/response-service.ts.
 */
/** Build a JSON HTTP response with consistent content-type headers. */
export function jsonResponse(data, status = 200) {
    return new Response(JSON.stringify(data), {
        status,
        headers: {
            "Content-Type": "application/json",
        },
    });
}
/** Clamp an integer value between min and max bounds. */
export function clampInt(value, fallback, min, max) {
    const parsed = value ? parseInt(value, 10) : fallback;
    if (Number.isNaN(parsed))
        return fallback;
    return Math.min(Math.max(parsed, min), max);
}
/** Parse a string to an integer, returning undefined if invalid. */
export function parseOptionalInt(value) {
    if (!value)
        return null;
    const parsed = parseInt(value, 10);
    return Number.isNaN(parsed) ? null : parsed;
}
