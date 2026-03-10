/**
 * web/http/rate-limit-rules.ts – Route-to-limit mapping for web endpoint throttling.
 */
/** Sliding-window duration for passkey enrol endpoints. */
export const ENROLL_RATE_WINDOW_MS = 5 * 60 * 1000;
/** Request cap for passkey enrol endpoints per window. */
export const ENROLL_RATE_LIMIT = 20;
/** Sliding-window duration for auth endpoints. */
export const AUTH_RATE_WINDOW_MS = 5 * 60 * 1000;
/** Request cap for auth endpoints per window. */
export const AUTH_RATE_LIMIT = 10;
/** Sliding-window duration for data-mutating endpoints. */
export const DATA_RATE_WINDOW_MS = 60 * 1000;
const DATA_POST_LIMIT = 30;
const DATA_REPLY_LIMIT = 30;
const DATA_AGENT_MESSAGE_LIMIT = 30;
const DATA_MEDIA_UPLOAD_LIMIT = 20;
const DATA_WORKSPACE_UPLOAD_LIMIT = 20;
const DATA_DELETE_LIMIT = 60;
const DATA_WRITE_LIMIT = 30;
/**
 * Return data rate-limit rule for the current request, if any.
 */
export function getDataRateLimitRule(method, pathname) {
    if (method === "POST" && pathname === "/post") {
        return { bucket: "data/post", limit: DATA_POST_LIMIT, message: "Too many posts. Slow down." };
    }
    if (method === "POST" && pathname === "/reply") {
        return { bucket: "data/reply", limit: DATA_REPLY_LIMIT, message: "Too many replies. Slow down." };
    }
    if (method === "POST" && pathname.endsWith("/message")) {
        return { bucket: "data/agent_message", limit: DATA_AGENT_MESSAGE_LIMIT, message: "Too many agent messages. Slow down." };
    }
    if (method === "POST" && pathname === "/media/upload") {
        return { bucket: "data/media_upload", limit: DATA_MEDIA_UPLOAD_LIMIT, message: "Too many media uploads. Slow down." };
    }
    if (method === "POST" && pathname === "/workspace/upload") {
        return {
            bucket: "data/workspace_upload",
            limit: DATA_WORKSPACE_UPLOAD_LIMIT,
            message: "Too many workspace uploads. Slow down.",
        };
    }
    if (method === "DELETE" && pathname.startsWith("/post/")) {
        return { bucket: "data/delete_post", limit: DATA_DELETE_LIMIT, message: "Too many deletions. Slow down." };
    }
    if (((method === "PUT" || method === "DELETE" || method === "POST") && pathname === "/workspace/file") ||
        (method === "POST" && pathname === "/workspace/rename") ||
        (method === "POST" && pathname === "/workspace/move")) {
        return { bucket: "data/write", limit: DATA_WRITE_LIMIT, message: "Too many file writes. Slow down." };
    }
    return null;
}
