/**
 * channels/web/auth-runtime.ts – web auth mode evaluation + auth context builders.
 */
import { buildSessionCookieHeader, isRequestAuthenticated, isRequestTotpSession, } from "./session-auth.js";
import { isInternalSecretRequestAuthorized } from "./internal-secret.js";
/** Return true when TOTP auth is configured with a non-empty shared secret. */
export function isTotpEnabled(config) {
    return Boolean(config.totpSecret && config.totpSecret.trim());
}
/** Return true when passkeys are enabled by mode/secret policy. */
export function isPasskeyEnabled(config) {
    const mode = (config.passkeyMode || "").toLowerCase();
    if (mode === "totp-only")
        return false;
    if (mode === "passkey-only")
        return true;
    return isTotpEnabled(config);
}
/** Return true when passkey-only mode is explicitly selected. */
export function isPasskeyOnly(config) {
    return (config.passkeyMode || "").toLowerCase() === "passkey-only";
}
/** Return true when either TOTP or passkey auth is active. */
export function isAuthEnabled(config) {
    return isTotpEnabled(config) || isPasskeyEnabled(config);
}
/** Return true when internal-secret authentication is configured. */
export function isInternalSecretEnabled(config) {
    return Boolean(config.internalSecret && config.internalSecret.trim());
}
/** Check whether a request is currently in the temporary TOTP session state. */
export function isTotpSession(req, config) {
    return isRequestTotpSession(req, isTotpEnabled(config));
}
/** Validate the request-level internal secret header/bearer token. */
export function verifyInternalSecret(req, config) {
    return isInternalSecretRequestAuthorized(req, config.internalSecret || "");
}
/** Check whether the request is authenticated for routes requiring web auth. */
export function isAuthenticated(req, config) {
    return isRequestAuthenticated(req, isAuthEnabled(config));
}
/** Build the session cookie header value using runtime TTL/TLS settings. */
export function buildSessionCookie(token, req, config) {
    return buildSessionCookieHeader(token, req, config.sessionTtlSeconds, config.hasTls);
}
/** Build the dependency context consumed by TOTP auth handlers. */
export function createTotpAuthContext(config, deps) {
    return {
        isAuthEnabled: () => isAuthEnabled(config),
        isTotpEnabled: () => isTotpEnabled(config),
        json: deps.json,
        getClientKey: deps.getClientKey,
        logAuthEvent: deps.logAuthEvent,
        buildSessionCookie: (token, req) => buildSessionCookie(token, req, config),
        failureTracker: deps.failureTracker,
    };
}
/** Build the dependency context consumed by WebAuthn auth endpoints. */
export function createWebauthnAuthContext(config, deps) {
    return {
        isPasskeyEnabled: () => isPasskeyEnabled(config),
        json: deps.json,
        buildSessionCookie: (token, req) => buildSessionCookie(token, req, config),
        logAuthEvent: deps.logAuthEvent,
        getClientKey: deps.getClientKey,
        challenges: deps.challenges,
    };
}
/** Build the dependency context consumed by the passkey enrol page route. */
export function createWebauthnEnrolPageContext(config, deps) {
    return {
        isPasskeyEnabled: () => isPasskeyEnabled(config),
        json: deps.json,
    };
}
