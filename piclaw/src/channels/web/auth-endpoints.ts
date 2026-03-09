/**
 * channels/web/auth-endpoints.ts – auth/passkey endpoint delegation helpers.
 */

import { handleAuthVerifyRequest, type TotpAuthContext } from "./totp-auth.js";
import {
  handleWebauthnLoginFinish as handleWebauthnLoginFinishRequest,
  handleWebauthnLoginStart as handleWebauthnLoginStartRequest,
  handleWebauthnRegisterFinish as handleWebauthnRegisterFinishRequest,
  handleWebauthnRegisterStart as handleWebauthnRegisterStartRequest,
  type WebauthnAuthContext,
} from "./webauthn-auth.js";
import {
  handleWebauthnEnrollPageRequest,
  type WebauthnEnrolPageContext,
} from "./webauthn-enrol-page.js";

/** Aggregated auth endpoint handlers/dependencies used by HTTP dispatch. */
export interface AuthEndpointsContext {
  createTotpContext(): TotpAuthContext;
  createWebauthnContext(): WebauthnAuthContext;
  createWebauthnEnrolPageContext(): WebauthnEnrolPageContext;
  serveStatic(relPath: string): Promise<Response>;
}

/** Delegate TOTP auth verification request handling. */
export async function handleAuthVerifyEndpoint(
  req: Request,
  ctx: AuthEndpointsContext
): Promise<Response> {
  return await handleAuthVerifyRequest(req, ctx.createTotpContext());
}

/** Delegate WebAuthn login start request handling. */
export async function handleWebauthnLoginStartEndpoint(
  req: Request,
  ctx: AuthEndpointsContext
): Promise<Response> {
  return await handleWebauthnLoginStartRequest(req, ctx.createWebauthnContext());
}

/** Delegate WebAuthn login finish request handling. */
export async function handleWebauthnLoginFinishEndpoint(
  req: Request,
  ctx: AuthEndpointsContext
): Promise<Response> {
  return await handleWebauthnLoginFinishRequest(req, ctx.createWebauthnContext());
}

/** Delegate WebAuthn register start request handling. */
export async function handleWebauthnRegisterStartEndpoint(
  req: Request,
  ctx: AuthEndpointsContext
): Promise<Response> {
  return await handleWebauthnRegisterStartRequest(req, ctx.createWebauthnContext());
}

/** Delegate WebAuthn register finish request handling. */
export async function handleWebauthnRegisterFinishEndpoint(
  req: Request,
  ctx: AuthEndpointsContext
): Promise<Response> {
  return await handleWebauthnRegisterFinishRequest(req, ctx.createWebauthnContext());
}

/** Delegate WebAuthn enrol-page request handling. */
export async function handleWebauthnEnrollPageEndpoint(
  ctx: AuthEndpointsContext
): Promise<Response> {
  return handleWebauthnEnrollPageRequest(ctx.createWebauthnEnrolPageContext());
}

/** Serve login page from static assets. */
export async function serveLoginPageResponse(ctx: AuthEndpointsContext): Promise<Response> {
  return await ctx.serveStatic("login.html");
}

/** Build an auth redirect response to /login. */
export function redirectToLoginResponse(): Response {
  return new Response(null, {
    status: 302,
    headers: {
      Location: "/login",
    },
  });
}
