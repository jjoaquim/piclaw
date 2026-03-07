import { REMOTE_INTEROP_ALLOW_HTTP } from "../core/config.js";
function isIpLiteral(hostname) {
    return /^[\d.]+$/.test(hostname) || hostname.includes(":");
}
function isPrivateIpv4(host) {
    const parts = host.split(".").map((p) => parseInt(p, 10));
    if (parts.length !== 4 || parts.some((n) => Number.isNaN(n)))
        return false;
    const [a, b] = parts;
    if (a === 10)
        return true;
    if (a === 127)
        return true;
    if (a === 0)
        return true;
    if (a === 169 && b === 254)
        return true;
    if (a === 172 && b >= 16 && b <= 31)
        return true;
    if (a === 192 && b === 168)
        return true;
    return false;
}
function isBlockedHostname(hostname) {
    const lower = hostname.toLowerCase();
    if (lower === "localhost" || lower.endsWith(".local") || lower === "0.0.0.0")
        return true;
    if (lower === "::1" || lower.startsWith("[::1"))
        return true;
    return false;
}
export function validateCallbackUrl(raw) {
    if (!raw || typeof raw !== "string") {
        return { ok: false, error: "Missing callback_url." };
    }
    let url;
    try {
        url = new URL(raw);
    }
    catch {
        return { ok: false, error: "Invalid callback_url." };
    }
    if (url.protocol !== "https:" && !(REMOTE_INTEROP_ALLOW_HTTP && url.protocol === "http:")) {
        return { ok: false, error: "callback_url must use https." };
    }
    if (isBlockedHostname(url.hostname)) {
        return { ok: false, error: "callback_url hostname is not allowed." };
    }
    if (isIpLiteral(url.hostname) && isPrivateIpv4(url.hostname)) {
        return { ok: false, error: "callback_url points to a private or loopback address." };
    }
    return { ok: true, url };
}
