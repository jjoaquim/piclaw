/**
 * channels/web/auth-gateway.ts – cohesive auth/session/passkey gateway for WebChannel.
 */
import { createTotpAuthContext, createWebauthnAuthContext, createWebauthnEnrolPageContext, isAuthEnabled, isAuthenticated, isInternalSecretEnabled, isPasskeyEnabled, isPasskeyOnly, isTotpEnabled, isTotpSession, verifyInternalSecret, } from "./auth-runtime.js";
import { getClientKey as getRequestClientKey } from "./http/client.js";
/** Central auth capability gateway for web request guards and endpoint contexts. */
export class WebAuthGateway {
    config;
    deps;
    constructor(config, deps) {
        this.config = config;
        this.deps = deps;
    }
    isAuthEnabled() {
        return isAuthEnabled(this.config);
    }
    isInternalSecretEnabled() {
        return isInternalSecretEnabled(this.config);
    }
    isPasskeyEnabled() {
        return isPasskeyEnabled(this.config);
    }
    isPasskeyOnly() {
        return isPasskeyOnly(this.config);
    }
    isTotpEnabled() {
        return isTotpEnabled(this.config);
    }
    isTotpSession(req) {
        return isTotpSession(req, this.config);
    }
    verifyInternalSecret(req) {
        return verifyInternalSecret(req, this.config);
    }
    isAuthenticated(req) {
        return isAuthenticated(req, this.config);
    }
    createTotpContext() {
        return createTotpAuthContext(this.config, {
            json: this.deps.json,
            getClientKey: (req) => this.getClientKey(req),
            logAuthEvent: (req, event) => this.logAuthEvent(req, event),
            failureTracker: this.deps.failureTracker,
        });
    }
    createWebauthnContext() {
        return createWebauthnAuthContext(this.config, {
            json: this.deps.json,
            getClientKey: (req) => this.getClientKey(req),
            logAuthEvent: (req, event) => this.logAuthEvent(req, event),
            challenges: this.deps.challenges,
        });
    }
    createWebauthnEnrolPageContext() {
        return createWebauthnEnrolPageContext(this.config, {
            json: this.deps.json,
        });
    }
    getClientKey(req) {
        return getRequestClientKey(req);
    }
    logAuthEvent(req, event) {
        const message = `[auth] ${event} (ip=${this.getClientKey(req)})`;
        const logger = this.deps.logAuthWarning ?? ((entry) => console.warn(entry));
        logger(message);
    }
}
