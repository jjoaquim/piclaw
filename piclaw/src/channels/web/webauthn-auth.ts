/**
 * channels/web/webauthn-auth.ts – WebAuthn login/registration endpoint orchestration.
 */

import {
  generateAuthenticationOptions,
  generateRegistrationOptions,
  verifyAuthenticationResponse,
  verifyRegistrationResponse,
  type AuthenticationResponseJSON,
  type RegistrationResponseJSON,
  type VerifiedAuthenticationResponse,
  type VerifiedRegistrationResponse,
  type WebAuthnCredential,
} from "@simplewebauthn/server";
import {
  createWebSession,
  DEFAULT_WEB_USER_ID,
  consumeWebauthnEnrollment,
  getWebauthnCredentialById,
  getWebauthnCredentialsForRpId,
  getWebauthnEnrollment,
  storeWebauthnCredential,
  updateWebauthnCredentialCounter,
} from "../../db.js";
import { ASSISTANT_NAME, USER_NAME, WEB_SESSION_TTL } from "../../core/config.js";
import { randomSessionToken } from "./auth.js";
import {
  base64UrlToBuffer,
  bufferToBase64Url,
  resolveWebauthnRpInfo,
  type WebauthnChallengeTracker,
} from "./webauthn-challenges.js";

/** Context contract consumed by WebAuthn login/register endpoint handlers. */
export interface WebauthnAuthContext {
  isPasskeyEnabled(): boolean;
  json(payload: unknown, status?: number): Response;
  buildSessionCookie(token: string, req: Request): string;
  logAuthEvent(req: Request, event: string): void;
  getClientKey(req: Request): string;
  challenges: WebauthnChallengeTracker;
  now?: () => number;
  randomToken?: () => string;
}

function getTtlSeconds(): number {
  const rawTtl = Number.isFinite(WEB_SESSION_TTL) ? WEB_SESSION_TTL : 0;
  return Math.max(60, rawTtl || 0);
}

/** Start a passkey login ceremony and store a pending challenge token. */
export async function handleWebauthnLoginStart(req: Request, ctx: WebauthnAuthContext): Promise<Response> {
  if (!ctx.isPasskeyEnabled()) return ctx.json({ error: "Passkeys disabled" }, 404);

  const { rpId } = resolveWebauthnRpInfo(req);
  const credentials = getWebauthnCredentialsForRpId(DEFAULT_WEB_USER_ID, rpId);
  if (credentials.length === 0) {
    ctx.logAuthEvent(req, "WebAuthn login requested but no passkeys registered");
    return ctx.json({ error: "No passkeys registered" }, 404);
  }

  const allowCredentials = credentials.map((cred) => {
    const transports = cred.transports ? JSON.parse(cred.transports) : undefined;
    return {
      id: cred.credential_id,
      transports: Array.isArray(transports) ? transports : undefined,
    };
  });

  const options = await generateAuthenticationOptions({
    rpID: rpId,
    allowCredentials,
    userVerification: "preferred",
  });

  const now = (ctx.now ?? Date.now)();
  const challengeToken = (ctx.randomToken ?? randomSessionToken)();
  ctx.challenges.trackLogin(
    challengeToken,
    {
      challenge: options.challenge,
      rpId,
      userId: DEFAULT_WEB_USER_ID,
    },
    now
  );

  return ctx.json({ token: challengeToken, options });
}

/** Finish a passkey login ceremony and issue a web session cookie on success. */
export async function handleWebauthnLoginFinish(req: Request, ctx: WebauthnAuthContext): Promise<Response> {
  if (!ctx.isPasskeyEnabled()) return ctx.json({ error: "Passkeys disabled" }, 404);

  let body: { token?: string; credential?: AuthenticationResponseJSON };
  try {
    body = await req.json();
  } catch {
    return ctx.json({ error: "Invalid JSON" }, 400);
  }

  const token = body.token || "";
  const credential = body.credential;
  if (!token || !credential) {
    ctx.logAuthEvent(req, "WebAuthn login missing credential payload");
    return ctx.json({ error: "Missing credential" }, 400);
  }

  const pending = ctx.challenges.consumeLogin(token, (ctx.now ?? Date.now)());
  if (!pending) {
    ctx.logAuthEvent(req, "WebAuthn login expired or unknown token");
    return ctx.json({ error: "Login expired" }, 400);
  }

  const stored = getWebauthnCredentialById(credential.id);
  if (!stored || stored.rp_id !== pending.rpId) {
    ctx.logAuthEvent(req, "WebAuthn login unknown credential");
    return ctx.json({ error: "Unknown credential" }, 400);
  }

  const credentialRecord: WebAuthnCredential = {
    id: stored.credential_id,
    publicKey: base64UrlToBuffer(stored.public_key),
    counter: stored.sign_count || 0,
    transports: stored.transports ? JSON.parse(stored.transports) : undefined,
  };

  const { origin } = resolveWebauthnRpInfo(req);
  let result: VerifiedAuthenticationResponse;
  try {
    result = await verifyAuthenticationResponse({
      response: credential,
      expectedChallenge: pending.challenge,
      expectedOrigin: origin,
      expectedRPID: pending.rpId,
      credential: credentialRecord,
      requireUserVerification: false,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Passkey verification failed";
    console.warn(`[webauthn] Login verification error (ip=${ctx.getClientKey(req)}):`, err);
    return ctx.json({ error: message }, 401);
  }

  if (!result.verified) {
    ctx.logAuthEvent(req, "WebAuthn login verification failed");
    return ctx.json({ error: "Passkey verification failed" }, 401);
  }

  updateWebauthnCredentialCounter(stored.credential_id, result.authenticationInfo.newCounter);

  const sessionToken = (ctx.randomToken ?? randomSessionToken)();
  createWebSession(sessionToken, DEFAULT_WEB_USER_ID, getTtlSeconds(), "passkey");

  return new Response(JSON.stringify({ ok: true }), {
    status: 200,
    headers: {
      "Content-Type": "application/json",
      "Set-Cookie": ctx.buildSessionCookie(sessionToken, req),
    },
  });
}

/** Start a passkey registration ceremony from a valid enrollment token. */
export async function handleWebauthnRegisterStart(req: Request, ctx: WebauthnAuthContext): Promise<Response> {
  if (!ctx.isPasskeyEnabled()) return ctx.json({ error: "Passkeys disabled" }, 404);

  let body: { token?: string };
  try {
    body = await req.json();
  } catch {
    return ctx.json({ error: "Invalid JSON" }, 400);
  }

  const token = (body.token || "").trim();
  if (!token) {
    ctx.logAuthEvent(req, "WebAuthn registration missing enrol token");
    return ctx.json({ error: "Missing enrol token" }, 400);
  }

  const enrollment = getWebauthnEnrollment(token);
  if (!enrollment) {
    ctx.logAuthEvent(req, "WebAuthn registration invalid or expired enrol token");
    return ctx.json({ error: "Invalid or expired enrol token" }, 400);
  }

  const { rpId } = resolveWebauthnRpInfo(req);
  const existing = getWebauthnCredentialsForRpId(enrollment.user_id, rpId);
  const excludeCredentials = existing.map((cred) => ({ id: cred.credential_id }));

  const options = await generateRegistrationOptions({
    rpName: ASSISTANT_NAME || "PiClaw",
    rpID: rpId,
    userID: new TextEncoder().encode(enrollment.user_id),
    userName: USER_NAME || enrollment.user_id,
    userDisplayName: USER_NAME || "User",
    attestationType: "none",
    excludeCredentials,
  });

  ctx.challenges.trackRegistration(
    token,
    {
      challenge: options.challenge,
      rpId,
      userId: enrollment.user_id,
    },
    (ctx.now ?? Date.now)()
  );

  return ctx.json({ token, options });
}

/** Finish passkey registration and persist the verified credential. */
export async function handleWebauthnRegisterFinish(req: Request, ctx: WebauthnAuthContext): Promise<Response> {
  if (!ctx.isPasskeyEnabled()) return ctx.json({ error: "Passkeys disabled" }, 404);

  let body: { token?: string; credential?: RegistrationResponseJSON };
  try {
    body = await req.json();
  } catch {
    return ctx.json({ error: "Invalid JSON" }, 400);
  }

  const token = (body.token || "").trim();
  const credential = body.credential;
  if (!token || !credential) {
    ctx.logAuthEvent(req, "WebAuthn registration missing credential payload");
    return ctx.json({ error: "Missing credential" }, 400);
  }

  const pending = ctx.challenges.consumeRegistration(token, (ctx.now ?? Date.now)());
  if (!pending) {
    ctx.logAuthEvent(req, "WebAuthn registration expired or unknown token");
    return ctx.json({ error: "Registration expired" }, 400);
  }

  const enrollment = consumeWebauthnEnrollment(token);
  if (!enrollment) {
    ctx.logAuthEvent(req, "WebAuthn registration invalid or expired enrol token");
    return ctx.json({ error: "Invalid or expired enrol token" }, 400);
  }
  if (enrollment.user_id !== pending.userId) {
    ctx.logAuthEvent(req, "WebAuthn registration enrollment mismatch");
    return ctx.json({ error: "Enrollment mismatch" }, 400);
  }

  const { origin } = resolveWebauthnRpInfo(req);
  let result: VerifiedRegistrationResponse;
  try {
    result = await verifyRegistrationResponse({
      response: credential,
      expectedChallenge: pending.challenge,
      expectedOrigin: origin,
      expectedRPID: pending.rpId,
    });
  } catch (err) {
    const message = err instanceof Error ? err.message : "Passkey verification failed";
    console.warn(`[webauthn] Registration verification error (ip=${ctx.getClientKey(req)}):`, err);
    return ctx.json({ error: message }, 401);
  }

  if (!result.verified || !result.registrationInfo) {
    ctx.logAuthEvent(req, "WebAuthn registration verification failed");
    return ctx.json({ error: "Passkey verification failed" }, 401);
  }

  const info = result.registrationInfo;
  const transports = Array.isArray(credential.response.transports)
    ? JSON.stringify(credential.response.transports)
    : null;

  storeWebauthnCredential({
    user_id: pending.userId,
    rp_id: pending.rpId,
    credential_id: info.credential.id,
    public_key: bufferToBase64Url(info.credential.publicKey),
    sign_count: info.credential.counter || 0,
    transports,
  });

  return ctx.json({ ok: true });
}
