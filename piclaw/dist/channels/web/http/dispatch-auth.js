/**
 * web/http/dispatch-auth.ts – WebAuthn/TOTP auth route dispatch helpers.
 */
import { handleWebauthnEnrollPageEndpoint, handleWebauthnLoginFinishEndpoint, handleWebauthnLoginStartEndpoint, handleWebauthnRegisterFinishEndpoint, handleWebauthnRegisterStartEndpoint, redirectToLoginResponse, } from "../auth-endpoints.js";
/**
 * Handle auth routes when the request matches; otherwise return null.
 */
export async function handleAuthRoutes(channel, req, flags) {
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
