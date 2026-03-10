/**
 * web/http/client.ts – Web-channel client/origin helpers.
 *
 * Re-exports shared request helpers under the web/http namespace for
 * consistent module boundaries inside the web channel.
 */
export { firstHeaderValue, getClientKey, getRequestOriginParts, } from "../../../utils/request-client.js";
