/**
 * remote/auth.ts – Signed-request verification for remote interop endpoints.
 *
 * Validates required signature headers, timestamp skew, trust epoch, nonce
 * replay protection, and Ed25519 signature correctness against the stored peer
 * public key.
 */

import type { RemotePeerRecord } from "../db/remote-interop.js";
import { buildCanonicalRequest, hashBody, parseTimestamp, verifyRequestSignature } from "./signature.js";
import { RemoteNonceCache } from "./nonce-cache.js";
import { DEFAULT_TIMESTAMP_SKEW_MS } from "./limits.js";

/** Result returned by signed-request verification. */
export type SignatureCheckResult =
  | { ok: true; canonical: string }
  | { ok: false; error: string };

/** Validate and verify all signature inputs for a remote interop request. */
export function verifySignedRequest(
  req: Request,
  bodyBytes: Uint8Array,
  peer: RemotePeerRecord,
  nonceCache: RemoteNonceCache
): SignatureCheckResult {
  const instanceId = req.headers.get("x-instance-id") || "";
  if (!instanceId || instanceId !== peer.instance_id) {
    return { ok: false, error: "Unknown or mismatched instance id." };
  }

  const timestamp = req.headers.get("x-timestamp");
  const nonce = req.headers.get("x-nonce");
  const sigVersion = req.headers.get("x-sig-version") || "";
  const signature = req.headers.get("x-signature") || "";
  const trustEpochHeader = req.headers.get("x-trust-epoch");

  if (!timestamp || !nonce || !sigVersion || !signature) {
    return { ok: false, error: "Missing signature headers." };
  }

  if (sigVersion !== "v1") {
    return { ok: false, error: "Unsupported signature version." };
  }

  const parsedTs = parseTimestamp(timestamp);
  if (parsedTs === null) return { ok: false, error: "Invalid timestamp." };
  const skew = Math.abs(Date.now() - parsedTs);
  if (skew > DEFAULT_TIMESTAMP_SKEW_MS) {
    return { ok: false, error: "Timestamp skew too large." };
  }

  if (peer.trust_epoch !== undefined && peer.trust_epoch !== null) {
    if (!trustEpochHeader) return { ok: false, error: "Missing trust epoch." };
    if (Number(trustEpochHeader) !== peer.trust_epoch) {
      return { ok: false, error: "Stale trust epoch." };
    }
  }

  if (!nonceCache.checkAndStore(peer.instance_id, nonce)) {
    return { ok: false, error: "Replay detected (nonce reused)." };
  }

  const contentType = req.headers.get("content-type") || "";
  const pathWithQuery = new URL(req.url).pathname + new URL(req.url).search;
  const canonical = buildCanonicalRequest({
    method: req.method,
    pathWithQuery,
    contentType,
    bodyHash: hashBody(bodyBytes),
    timestamp,
    nonce,
    instanceId,
    sigVersion,
    trustEpoch: trustEpochHeader ?? undefined,
  });

  if (!verifyRequestSignature(peer.public_key, canonical, signature)) {
    return { ok: false, error: "Signature verification failed." };
  }

  return { ok: true, canonical };
}
