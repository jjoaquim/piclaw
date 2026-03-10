/**
 * remote/http-utils.ts – Shared HTTP/body parsing utilities for remote interop endpoints.
 */
/** Sliding-window rate limiter keyed by arbitrary client identifier. */
export class SlidingWindowLimiter {
    windowMs;
    limit;
    entries = new Map();
    constructor(limit, windowMs) {
        this.limit = limit;
        this.windowMs = windowMs;
    }
    allow(key, now = Date.now()) {
        const list = this.entries.get(key) ?? [];
        const filtered = list.filter((t) => now - t < this.windowMs);
        if (filtered.length >= this.limit) {
            this.entries.set(key, filtered);
            return false;
        }
        filtered.push(now);
        this.entries.set(key, filtered);
        return true;
    }
}
/** Build a JSON response with standard content-type headers. */
export function jsonResponse(body, status = 200) {
    return new Response(JSON.stringify(body), {
        status,
        headers: { "Content-Type": "application/json" },
    });
}
/** Validate JSON content-type requirements for remote API POST endpoints. */
export function requireJson(req) {
    const contentType = req.headers.get("content-type") || "";
    if (!contentType.toLowerCase().includes("application/json")) {
        return "Content-Type must be application/json.";
    }
    return null;
}
/** Validate request content-length against a strict byte cap. */
export function checkContentLength(req, maxBytes) {
    const raw = req.headers.get("content-length");
    if (!raw)
        return { ok: true };
    const length = Number(raw);
    if (!Number.isFinite(length) || length < 0) {
        return { ok: false, status: 400, error: "Invalid Content-Length." };
    }
    if (length > maxBytes) {
        return { ok: false, status: 413, error: "Request too large." };
    }
    return { ok: true };
}
function asJsonBody(value) {
    if (!value || typeof value !== "object" || Array.isArray(value))
        return {};
    return value;
}
/** Read a string field from a parsed JSON object. */
export function getStringField(data, key) {
    const value = data?.[key];
    return typeof value === "string" ? value : "";
}
/** Read and trim a required string field from a parsed JSON object. */
export function getTrimmedStringField(data, key) {
    return getStringField(data, key).trim();
}
/** Read and trim an optional string field from a parsed JSON object. */
export function getOptionalTrimmedStringField(data, key) {
    const value = getTrimmedStringField(data, key);
    return value.length > 0 ? value : null;
}
/** Parse JSON bytes with a strict payload size limit. */
export function parseJsonBytes(buffer, maxBytes) {
    if (buffer.length > maxBytes)
        return { error: "Request too large." };
    if (buffer.length === 0)
        return { data: {} };
    try {
        const text = new TextDecoder().decode(buffer);
        return { data: asJsonBody(JSON.parse(text)) };
    }
    catch {
        return { error: "Invalid JSON." };
    }
}
/** Read and parse JSON body content with a strict payload size limit. */
export async function readJsonBody(req, maxBytes) {
    let buffer;
    try {
        const arrayBuffer = await req.arrayBuffer();
        buffer = new Uint8Array(arrayBuffer);
    }
    catch {
        return { error: "Invalid body." };
    }
    return parseJsonBytes(buffer, maxBytes);
}
/** Read raw request body bytes, returning an empty buffer on read failure. */
export async function readBodyBytes(req) {
    try {
        return new Uint8Array(await req.arrayBuffer());
    }
    catch {
        return new Uint8Array();
    }
}
