/**
 * request-client.ts – Helpers for deriving client/request metadata safely.
 *
 * Forwarded headers are only trusted when TRUST_PROXY is enabled.
 */

import { TRUST_PROXY } from "../core/config.js";

/** Return first token from comma-separated forwarded header values. */
export function firstHeaderValue(value: string | null): string | null {
  if (!value) return null;
  return value.split(",")[0]?.trim() || null;
}

/** Derive a client key (IP-like token) for logging/rate limiting. */
export function getClientKey(req: Request, trustProxy = TRUST_PROXY): string {
  if (trustProxy) {
    const forwarded = firstHeaderValue(req.headers.get("x-forwarded-for"));
    if (forwarded) return forwarded;

    const realIp = firstHeaderValue(req.headers.get("x-real-ip"));
    if (realIp) return realIp;
  }

  return "unknown";
}

/**
 * Resolve externally-visible origin fields for URL generation.
 * Uses forwarded host/proto only when TRUST_PROXY is enabled.
 */
export function getRequestOriginParts(req: Request, trustProxy = TRUST_PROXY): { proto: string; host: string } {
  const url = new URL(req.url);

  const forwardedProto = trustProxy ? firstHeaderValue(req.headers.get("x-forwarded-proto")) : null;
  const forwardedHost = trustProxy ? firstHeaderValue(req.headers.get("x-forwarded-host")) : null;
  const forwardedPort = trustProxy ? firstHeaderValue(req.headers.get("x-forwarded-port")) : null;

  const proto = forwardedProto || url.protocol.replace(":", "") || "http";
  let host = forwardedHost || req.headers.get("host") || url.host;

  if (forwardedPort && host && !host.includes(":")) {
    if ((proto === "https" && forwardedPort !== "443") || (proto === "http" && forwardedPort !== "80")) {
      host = `${host}:${forwardedPort}`;
    }
  }

  return { proto, host };
}
