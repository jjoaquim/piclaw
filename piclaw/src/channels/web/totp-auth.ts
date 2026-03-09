/**
 * channels/web/totp-auth.ts – TOTP verification endpoint orchestration.
 */

import { WEB_SESSION_TTL, WEB_TOTP_SECRET, WEB_TOTP_WINDOW } from "../../core/config.js";
import { createWebSession, DEFAULT_WEB_USER_ID } from "../../db.js";
import { randomSessionToken, verifyTotp } from "./auth.js";

/** Minimal lockout-tracker contract consumed by TOTP auth handler logic. */
export interface TotpFailureTrackerLike {
  isLocked(clientKey: string, now: number): boolean;
  recordFailure(clientKey: string, now: number): { locked: boolean; failures: number };
  clear(clientKey: string): void;
  getFailureLimit(): number;
}

/** Runtime dependencies required by the TOTP verification endpoint. */
export interface TotpAuthContext {
  isAuthEnabled(): boolean;
  isTotpEnabled(): boolean;
  json(payload: unknown, status?: number): Response;
  getClientKey(req: Request): string;
  logAuthEvent(req: Request, event: string): void;
  buildSessionCookie(token: string, req: Request): string;
  failureTracker: TotpFailureTrackerLike;
}

function getTotpWindowSteps(): number {
  return Number.isFinite(WEB_TOTP_WINDOW) ? Math.max(0, WEB_TOTP_WINDOW) : 1;
}

function getSessionTtlSeconds(): number {
  const rawTtl = Number.isFinite(WEB_SESSION_TTL) ? WEB_SESSION_TTL : 0;
  return Math.max(60, rawTtl || 0);
}

/** Verify a submitted TOTP code, enforce lockout policy, and issue a web session. */
export async function handleAuthVerifyRequest(req: Request, ctx: TotpAuthContext): Promise<Response> {
  if (!ctx.isAuthEnabled() || !ctx.isTotpEnabled()) return ctx.json({ error: "Auth disabled" }, 404);

  let body: { code?: string };
  try {
    body = await req.json();
  } catch {
    return ctx.json({ error: "Invalid JSON" }, 400);
  }

  const code = (body.code || "").trim();
  if (!code) return ctx.json({ error: "Missing code" }, 400);

  const now = Date.now();
  const clientKey = ctx.getClientKey(req);
  if (ctx.failureTracker.isLocked(clientKey, now)) {
    ctx.logAuthEvent(req, "TOTP lockout active");
    return ctx.json({ error: "Too many failed attempts. Try again later." }, 429);
  }

  if (!verifyTotp(WEB_TOTP_SECRET, code, getTotpWindowSteps())) {
    const failure = ctx.failureTracker.recordFailure(clientKey, now);
    if (failure.locked) {
      ctx.logAuthEvent(req, `TOTP lockout triggered (${failure.failures} failures)`);
      return ctx.json({ error: "Too many failed attempts. Try again later." }, 429);
    }
    ctx.logAuthEvent(req, `TOTP failed (${failure.failures}/${ctx.failureTracker.getFailureLimit()})`);
    return ctx.json({ error: "Invalid code" }, 401);
  }

  ctx.failureTracker.clear(clientKey);

  const token = randomSessionToken();
  createWebSession(token, DEFAULT_WEB_USER_ID, getSessionTtlSeconds(), "totp");

  const payload = JSON.stringify({ ok: true });
  return new Response(payload, {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": ctx.buildSessionCookie(token, req),
    },
  });
}
