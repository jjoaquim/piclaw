/**
 * web/http/dispatch-auth.ts – WebAuthn/TOTP auth route dispatch helpers.
 */

import {
  handleWebauthnEnrollPageEndpoint,
  handleWebauthnLoginFinishEndpoint,
  handleWebauthnLoginStartEndpoint,
  handleWebauthnRegisterFinishEndpoint,
  handleWebauthnRegisterStartEndpoint,
  redirectToLoginResponse,
  type AuthEndpointsContext,
} from "../auth-endpoints.js";
import type { RouteFlags } from "./route-flags.js";

/** Channel contract required by auth-route HTTP dispatcher. */
export interface AuthDispatchChannel {
  authGateway: {
    isTotpSession(req: Request): boolean;
  };
  endpointContexts: {
    auth(): AuthEndpointsContext;
  };
  json(payload: unknown, status?: number): Response;
}

/**
 * Handle auth routes when the request matches; otherwise return null.
 */
export async function handleAuthRoutes(
  channel: AuthDispatchChannel,
  req: Request,
  flags: RouteFlags
): Promise<Response | null> {
  if (flags.isWebauthnEnrollPage) {
    if (!channel.authGateway.isTotpSession(req)) {
      if (flags.isGetOrHead) {
        return redirectToLoginResponse();
      }
      return channel.json({ error: "TOTP session required" }, 401);
    }
    return await handleWebauthnEnrollPageEndpoint(channel.endpointContexts.auth());
  }

  if (flags.isWebauthnLoginStart) {
    return await handleWebauthnLoginStartEndpoint(req, channel.endpointContexts.auth());
  }

  if (flags.isWebauthnLoginFinish) {
    return await handleWebauthnLoginFinishEndpoint(req, channel.endpointContexts.auth());
  }

  if (flags.isWebauthnRegisterStart) {
    return await handleWebauthnRegisterStartEndpoint(req, channel.endpointContexts.auth());
  }

  if (flags.isWebauthnRegisterFinish) {
    return await handleWebauthnRegisterFinishEndpoint(req, channel.endpointContexts.auth());
  }

  return null;
}
