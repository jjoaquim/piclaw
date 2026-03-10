/**
 * channels/web/auth-endpoints.ts – auth/passkey endpoint delegation helpers.
 */
import { handleAuthVerifyRequest } from "./totp-auth.js";
import { handleWebauthnLoginFinish as handleWebauthnLoginFinishRequest, handleWebauthnLoginStart as handleWebauthnLoginStartRequest, handleWebauthnRegisterFinish as handleWebauthnRegisterFinishRequest, handleWebauthnRegisterStart as handleWebauthnRegisterStartRequest, } from "./webauthn-auth.js";
import { handleWebauthnEnrollPageRequest, } from "./webauthn-enrol-page.js";
/** Delegate TOTP auth verification request handling. */
export async function handleAuthVerifyEndpoint(req, ctx) {
    return await handleAuthVerifyRequest(req, ctx.createTotpContext());
}
/** Delegate WebAuthn login start request handling. */
export async function handleWebauthnLoginStartEndpoint(req, ctx) {
    return await handleWebauthnLoginStartRequest(req, ctx.createWebauthnContext());
}
/** Delegate WebAuthn login finish request handling. */
export async function handleWebauthnLoginFinishEndpoint(req, ctx) {
    return await handleWebauthnLoginFinishRequest(req, ctx.createWebauthnContext());
}
/** Delegate WebAuthn register start request handling. */
export async function handleWebauthnRegisterStartEndpoint(req, ctx) {
    return await handleWebauthnRegisterStartRequest(req, ctx.createWebauthnContext());
}
/** Delegate WebAuthn register finish request handling. */
export async function handleWebauthnRegisterFinishEndpoint(req, ctx) {
    return await handleWebauthnRegisterFinishRequest(req, ctx.createWebauthnContext());
}
/** Delegate WebAuthn enrol-page request handling. */
export async function handleWebauthnEnrollPageEndpoint(ctx) {
    return handleWebauthnEnrollPageRequest(ctx.createWebauthnEnrolPageContext());
}
/** Serve login page from static assets. */
export async function serveLoginPageResponse(ctx) {
    return await ctx.serveStatic("login.html");
}
/** Build an auth redirect response to /login. */
export function redirectToLoginResponse() {
    return new Response(null, {
        status: 302,
        headers: {
            Location: "/login",
        },
    });
}
