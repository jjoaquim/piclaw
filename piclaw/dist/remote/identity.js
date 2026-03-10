/**
 * remote/identity.ts – Local identity key material for remote interop.
 *
 * Handles loading/creating the container's interop identity, deriving stable
 * IDs/fingerprints, and signing/verifying payloads with stored Ed25519 keys.
 */
import { mkdirSync, readFileSync, writeFileSync, existsSync, chmodSync } from "fs";
import { join } from "path";
import { createHash, generateKeyPairSync, createPrivateKey, createPublicKey, sign, verify } from "crypto";
import { DATA_DIR, REMOTE_INSTANCE_NAME } from "../core/config.js";
let cachedIdentity = null;
const IDENTITY_PATH = join(DATA_DIR, "interop", "identity.json");
function base64UrlEncode(buffer) {
    return Buffer.from(buffer)
        .toString("base64")
        .replace(/\+/g, "-")
        .replace(/\//g, "_")
        .replace(/=+$/, "");
}
function base64UrlDecode(value) {
    const padded = value.replace(/-/g, "+").replace(/_/g, "/");
    return Buffer.from(padded, "base64");
}
function computeInstanceId(publicKeyDer) {
    const hash = createHash("sha256").update(publicKeyDer).digest();
    return base64UrlEncode(hash);
}
function computeFingerprint(instanceId) {
    return `${instanceId.slice(0, 6)}-${instanceId.slice(6, 12)}-${instanceId.slice(12, 18)}`;
}
/** Load the interop identity from disk, creating a new one if missing. */
export function loadOrCreateIdentity() {
    if (cachedIdentity)
        return cachedIdentity;
    if (existsSync(IDENTITY_PATH)) {
        const raw = readFileSync(IDENTITY_PATH, "utf8");
        const parsed = JSON.parse(raw);
        cachedIdentity = parsed;
        return parsed;
    }
    mkdirSync(join(DATA_DIR, "interop"), { recursive: true });
    const { publicKey, privateKey } = generateKeyPairSync("ed25519");
    const publicDer = publicKey.export({ format: "der", type: "spki" });
    const privateDer = privateKey.export({ format: "der", type: "pkcs8" });
    const instanceId = computeInstanceId(publicDer);
    const identity = {
        instance_id: instanceId,
        public_key: base64UrlEncode(publicDer),
        private_key: base64UrlEncode(privateDer),
        fingerprint: computeFingerprint(instanceId),
        instance_name: REMOTE_INSTANCE_NAME || "piclaw",
        created_at: new Date().toISOString(),
    };
    writeFileSync(IDENTITY_PATH, JSON.stringify(identity, null, 2), "utf8");
    try {
        chmodSync(IDENTITY_PATH, 0o600);
    }
    catch {
        // ignore chmod errors
    }
    cachedIdentity = identity;
    return identity;
}
/** Reset in-memory identity cache (test helper). */
export function resetInteropIdentityForTests() {
    cachedIdentity = null;
}
/** Decode and return the binary public key from an identity record. */
export function exportPublicKey(identity) {
    return Buffer.from(base64UrlDecode(identity.public_key));
}
/** Decode and return the binary private key from an identity record. */
export function exportPrivateKey(identity) {
    return Buffer.from(base64UrlDecode(identity.private_key));
}
/** Sign a UTF-8 payload using the identity's private key (base64url output). */
export function signPayload(identity, payload) {
    const key = createPrivateKey({ key: exportPrivateKey(identity), format: "der", type: "pkcs8" });
    const signature = sign(null, Buffer.from(payload, "utf8"), key);
    return base64UrlEncode(signature);
}
/** Verify a payload signature using a base64url-encoded public key. */
export function verifyPayload(publicKey, payload, signature) {
    try {
        const key = createPublicKey({ key: Buffer.from(base64UrlDecode(publicKey)), format: "der", type: "spki" });
        return verify(null, Buffer.from(payload, "utf8"), key, base64UrlDecode(signature));
    }
    catch {
        return false;
    }
}
/** Derive stable instance ID from a base64url public key. */
export function deriveInstanceId(publicKey) {
    return computeInstanceId(base64UrlDecode(publicKey));
}
/** Derive the short human-readable fingerprint from an instance ID. */
export function deriveFingerprint(instanceId) {
    return computeFingerprint(instanceId);
}
