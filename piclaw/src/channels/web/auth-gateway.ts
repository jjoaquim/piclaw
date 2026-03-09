/**
 * channels/web/auth-gateway.ts – cohesive auth/session/passkey gateway for WebChannel.
 */

import {
  createTotpAuthContext,
  createWebauthnAuthContext,
  createWebauthnEnrolPageContext,
  isAuthEnabled,
  isAuthenticated,
  isInternalSecretEnabled,
  isPasskeyEnabled,
  isPasskeyOnly,
  isTotpEnabled,
  isTotpSession,
  verifyInternalSecret,
  type WebAuthRuntimeConfig,
} from "./auth-runtime.js";
import type { TotpAuthContext, TotpFailureTrackerLike } from "./totp-auth.js";
import type { WebauthnAuthContext } from "./webauthn-auth.js";
import type { WebauthnEnrolPageContext } from "./webauthn-enrol-page.js";
import type { WebauthnChallengeTracker } from "./webauthn-challenges.js";
import { getClientKey as getRequestClientKey } from "./http/client.js";

export interface WebAuthGatewayDeps {
  json(payload: unknown, status?: number): Response;
  challenges: WebauthnChallengeTracker;
  failureTracker: TotpFailureTrackerLike;
  logAuthWarning?(message: string): void;
}

export class WebAuthGateway {
  constructor(
    private readonly config: WebAuthRuntimeConfig,
    private readonly deps: WebAuthGatewayDeps
  ) {}

  isAuthEnabled(): boolean {
    return isAuthEnabled(this.config);
  }

  isInternalSecretEnabled(): boolean {
    return isInternalSecretEnabled(this.config);
  }

  isPasskeyEnabled(): boolean {
    return isPasskeyEnabled(this.config);
  }

  isPasskeyOnly(): boolean {
    return isPasskeyOnly(this.config);
  }

  isTotpEnabled(): boolean {
    return isTotpEnabled(this.config);
  }

  isTotpSession(req: Request): boolean {
    return isTotpSession(req, this.config);
  }

  verifyInternalSecret(req: Request): boolean {
    return verifyInternalSecret(req, this.config);
  }

  isAuthenticated(req: Request): boolean {
    return isAuthenticated(req, this.config);
  }

  createTotpContext(): TotpAuthContext {
    return createTotpAuthContext(this.config, {
      json: this.deps.json,
      getClientKey: (req) => this.getClientKey(req),
      logAuthEvent: (req, event) => this.logAuthEvent(req, event),
      failureTracker: this.deps.failureTracker,
    });
  }

  createWebauthnContext(): WebauthnAuthContext {
    return createWebauthnAuthContext(this.config, {
      json: this.deps.json,
      getClientKey: (req) => this.getClientKey(req),
      logAuthEvent: (req, event) => this.logAuthEvent(req, event),
      challenges: this.deps.challenges,
    });
  }

  createWebauthnEnrolPageContext(): WebauthnEnrolPageContext {
    return createWebauthnEnrolPageContext(this.config, {
      json: this.deps.json,
    });
  }

  private getClientKey(req: Request): string {
    return getRequestClientKey(req);
  }

  private logAuthEvent(req: Request, event: string): void {
    const message = `[auth] ${event} (ip=${this.getClientKey(req)})`;
    const logger = this.deps.logAuthWarning ?? ((entry: string) => console.warn(entry));
    logger(message);
  }
}
