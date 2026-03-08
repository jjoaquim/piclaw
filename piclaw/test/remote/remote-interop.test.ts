/**
 * test/remote/remote-interop.test.ts – Tests for remote interop API.
 */
import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import "../helpers.js";
import { generateKeyPairSync } from "crypto";
import { createTempWorkspace, setEnv, importFresh } from "../helpers.js";

interface InteropIdentity {
  instance_id: string;
  public_key: string;
  private_key: string;
  fingerprint: string;
  instance_name: string;
  created_at: string;
}

let service: any;
let restoreEnv: (() => void) | null = null;
let cleanupWorkspace: (() => void) | null = null;

let deriveInstanceId: (publicKey: string) => string;
let resetInteropIdentityForTests: () => void;
let signPayload: (identity: InteropIdentity, payload: string) => string;
let buildCanonicalRequest: (params: any) => string;
let hashBody: (body: Uint8Array) => string;
let signRequest: (identity: InteropIdentity, canonical: string) => string;
let getRemotePeer: (id: string) => any;
let getRemoteRequestById: (id: string) => any;
let updatePairRequestStatus: (id: string, status: string) => void;
let initDatabase: () => void;
let RemoteInteropService: any;

let originalFetch: typeof fetch | null = null;

function base64UrlEncode(buffer: Uint8Array): string {
  return Buffer.from(buffer)
    .toString("base64")
    .replace(/\+/g, "-")
    .replace(/\//g, "_")
    .replace(/=+$/, "");
}

function makeIdentity(): InteropIdentity {
  const { publicKey, privateKey } = generateKeyPairSync("ed25519");
  const publicDer = publicKey.export({ format: "der", type: "spki" }) as Buffer;
  const privateDer = privateKey.export({ format: "der", type: "pkcs8" }) as Buffer;
  const publicKeyEncoded = base64UrlEncode(publicDer);
  return {
    instance_id: deriveInstanceId(publicKeyEncoded),
    public_key: publicKeyEncoded,
    private_key: base64UrlEncode(privateDer),
    fingerprint: "test-fp",
    instance_name: "peer",
    created_at: new Date().toISOString(),
  };
}

function buildCallbackProofString(requestId: string, challenge: string, receiverInstanceId: string): string {
  return `${requestId}\n${challenge}\n${receiverInstanceId}`;
}

function installCallbackStub(peer: InteropIdentity): () => void {
  const original = globalThis.fetch;
  globalThis.fetch = async (_input, init) => {
    const bodyText = typeof init?.body === "string" ? init.body : "";
    const payload = bodyText ? JSON.parse(bodyText) : {};
    const requestId = String(payload.request_id || "");
    const challenge = String(payload.challenge || "");
    const receiverInstanceId = String(payload.receiver_instance_id || "");
    const proof = buildCallbackProofString(requestId, challenge, receiverInstanceId);
    const signature = signPayload(peer, proof);
    return new Response(
      JSON.stringify({
        request_id: requestId,
        challenge,
        instance_id: peer.instance_id,
        signature,
      }),
      { status: 200, headers: { "Content-Type": "application/json" } }
    );
  };
  return () => {
    globalThis.fetch = original;
  };
}

function buildSignedRequest(identity: InteropIdentity, method: string, path: string, body?: unknown) {
  const bodyText = body ? JSON.stringify(body) : "";
  const bodyBytes = new TextEncoder().encode(bodyText);
  const timestamp = new Date().toISOString();
  const nonce = `nonce-${Math.random().toString(36).slice(2, 8)}`;
  const contentType = body ? "application/json" : "";
  const canonical = buildCanonicalRequest({
    method,
    pathWithQuery: path,
    contentType,
    bodyHash: hashBody(bodyBytes),
    timestamp,
    nonce,
    instanceId: identity.instance_id,
    sigVersion: "v1",
    trustEpoch: "1",
  });
  const signature = signRequest(identity, canonical);

  const headers: Record<string, string> = {
    "X-Instance-Id": identity.instance_id,
    "X-Timestamp": timestamp,
    "X-Nonce": nonce,
    "X-Sig-Version": "v1",
    "X-Signature": signature,
    "X-Trust-Epoch": "1",
  };
  if (body) headers["Content-Type"] = "application/json";

  return new Request(`http://localhost${path}`, {
    method,
    headers,
    body: body ? bodyText : undefined,
  });
}

describe("remote interop", () => {
  beforeEach(async () => {
    const ws = createTempWorkspace("piclaw-interop-");
    cleanupWorkspace = ws.cleanup;
    restoreEnv = setEnv({
      PICLAW_WORKSPACE: ws.workspace,
      PICLAW_STORE: ws.store,
      PICLAW_DATA: ws.data,
      PICLAW_REMOTE_INTEROP_ENABLED: "1",
      PICLAW_REMOTE_INTEROP_DECISION_MODEL: "github-copilot/gpt-5-mini",
    });

    const identityMod = await importFresh("../src/remote/identity.js");
    deriveInstanceId = identityMod.deriveInstanceId;
    resetInteropIdentityForTests = identityMod.resetInteropIdentityForTests;
    signPayload = identityMod.signPayload;

    const signatureMod = await importFresh("../src/remote/signature.js");
    buildCanonicalRequest = signatureMod.buildCanonicalRequest;
    hashBody = signatureMod.hashBody;
    signRequest = signatureMod.signRequest;

    const dbMod = await importFresh("../src/db.js");
    initDatabase = dbMod.initDatabase;

    const remoteDbMod = await importFresh("../src/db/remote-interop.js");
    getRemotePeer = remoteDbMod.getRemotePeer;
    getRemoteRequestById = remoteDbMod.getRemoteRequestById;
    updatePairRequestStatus = remoteDbMod.updatePairRequestStatus;

    const serviceMod = await importFresh("../src/remote/service.js");
    RemoteInteropService = serviceMod.RemoteInteropService;

    resetInteropIdentityForTests();
    initDatabase();
    service = new RemoteInteropService();
    originalFetch = globalThis.fetch;
  });

  afterEach(() => {
    if (originalFetch) {
      globalThis.fetch = originalFetch;
      originalFetch = null;
    }
    restoreEnv?.();
    restoreEnv = null;
    cleanupWorkspace?.();
    cleanupWorkspace = null;
  });

  test("pair request rejects localhost callback", async () => {
    const peer = makeIdentity();
    const res = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "http://localhost:8080/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "abc",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );

    expect(res.status).toBe(400);
    const body = await res.json();
    expect(body.error).toContain("callback_url");
  });

  test("pair request requires protocol version", async () => {
    const peer = makeIdentity();
    const res = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          nonce: "abc",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );

    expect(res.status).toBe(400);
  });

  test("pair request rejects unsupported protocol", async () => {
    const peer = makeIdentity();
    const res = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "2",
          nonce: "abc",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );

    expect(res.status).toBe(400);
  });

  test("pair request requires JSON content type", async () => {
    const peer = makeIdentity();
    const res = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "text/plain" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "abc",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );

    expect(res.status).toBe(415);
  });

  test("pair request rejects oversized content-length", async () => {
    const peer = makeIdentity();
    const res = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json", "Content-Length": "999999" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "abc",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );

    expect(res.status).toBe(413);
  });

  test("pair request rate limit", async () => {
    const peer = makeIdentity();
    const payload = {
      instance_id: peer.instance_id,
      public_key: peer.public_key,
      display_name: "peer",
      callback_url: "https://example.com/api/remote/pair-confirm",
      protocol_version: "1",
      expires_at: new Date(Date.now() + 60_000).toISOString(),
    };

    let lastStatus = 0;
    for (let i = 0; i < 4; i += 1) {
      const res = await service.handleRequest(
        new Request("http://localhost/api/remote/pair-request", {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify({ ...payload, nonce: `nonce-${i}` }),
        })
      );
      lastStatus = res.status;
      if (res.status === 202) {
        const body = await res.json();
        updatePairRequestStatus(body.request_id, "expired");
      }
    }

    expect(lastStatus).toBe(429);
  });

  test("pair confirm rate limit", async () => {
    const peer = makeIdentity();
    const imposter = makeIdentity();
    const pairRes = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "challenge",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );
    const pairBody = await pairRes.json();

    let lastStatus = 0;
    for (let i = 0; i < 7; i += 1) {
      const res = await service.handleRequest(
        buildSignedRequest(imposter, "POST", "/api/remote/pair-confirm", {
          request_id: pairBody.request_id,
          challenge: "challenge",
        })
      );
      lastStatus = res.status;
    }

    expect(lastStatus).toBe(429);
  });

  test("pair request returns 409 when pending", async () => {
    const peer = makeIdentity();
    const res1 = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "abc",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );

    expect(res1.status).toBe(202);
    const res2 = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "def",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );

    expect(res2.status).toBe(409);
  });

  test("pair request + confirm establishes peer", async () => {
    const peer = makeIdentity();
    const pairRes = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "challenge",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );

    expect(pairRes.status).toBe(202);
    const pairBody = await pairRes.json();
    expect(pairBody.request_id).toBeTruthy();

    const restoreFetch = installCallbackStub(peer);
    const confirmReq = buildSignedRequest(peer, "POST", "/api/remote/pair-confirm", {
      request_id: pairBody.request_id,
      challenge: "challenge",
    });

    const confirmRes = await service.handleRequest(confirmReq);
    restoreFetch();
    expect(confirmRes.status).toBe(200);
    const confirmBody = await confirmRes.json();
    expect(confirmBody.status).toBe("paired");

    const stored = getRemotePeer(peer.instance_id);
    expect(stored?.status).toBe("paired");
  });

  test("pair confirm rejects invalid callback proof", async () => {
    const peer = makeIdentity();
    const pairRes = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "challenge",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );

    expect(pairRes.status).toBe(202);
    const pairBody = await pairRes.json();

    globalThis.fetch = async () =>
      new Response(
        JSON.stringify({
          request_id: pairBody.request_id,
          challenge: "challenge",
          instance_id: peer.instance_id,
          signature: "bad-signature",
        }),
        { status: 200, headers: { "Content-Type": "application/json" } }
      );

    const confirmReq = buildSignedRequest(peer, "POST", "/api/remote/pair-confirm", {
      request_id: pairBody.request_id,
      challenge: "challenge",
    });

    const confirmRes = await service.handleRequest(confirmReq);
    expect(confirmRes.status).toBe(400);
  });

  test("signed ping enforces nonce replay", async () => {
    const peer = makeIdentity();
    const pairRes = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "challenge",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );
    const pairBody = await pairRes.json();

    const restoreFetch = installCallbackStub(peer);
    await service.handleRequest(
      buildSignedRequest(peer, "POST", "/api/remote/pair-confirm", {
        request_id: pairBody.request_id,
        challenge: "challenge",
      })
    );
    restoreFetch();

    const pingReq = buildSignedRequest(peer, "GET", "/api/remote/ping");
    const pingRes = await service.handleRequest(pingReq);
    expect(pingRes.status).toBe(200);

    const replayReq = new Request("http://localhost/api/remote/ping", {
      method: "GET",
      headers: pingReq.headers,
    });
    const replayRes = await service.handleRequest(replayReq);
    expect(replayRes.status).toBe(401);
  });

  test("ping rate limit", async () => {
    const peer = makeIdentity();
    const pairRes = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "challenge",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );
    const pairBody = await pairRes.json();

    const restoreFetch = installCallbackStub(peer);
    await service.handleRequest(
      buildSignedRequest(peer, "POST", "/api/remote/pair-confirm", {
        request_id: pairBody.request_id,
        challenge: "challenge",
      })
    );
    restoreFetch();

    let lastStatus = 0;
    for (let i = 0; i < 61; i += 1) {
      const pingReq = buildSignedRequest(peer, "GET", "/api/remote/ping");
      const res = await service.handleRequest(pingReq);
      lastStatus = res.status;
    }

    expect(lastStatus).toBe(429);
  });

  test("proposal requires JSON content type", async () => {
    const peer = makeIdentity();
    const pairRes = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "challenge",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );
    const pairBody = await pairRes.json();

    const restoreFetch = installCallbackStub(peer);
    await service.handleRequest(
      buildSignedRequest(peer, "POST", "/api/remote/pair-confirm", {
        request_id: pairBody.request_id,
        challenge: "challenge",
      })
    );
    restoreFetch();

    const signed = buildSignedRequest(peer, "POST", "/api/remote/proposal", { prompt: "hi" });
    const headers = new Headers(signed.headers);
    headers.set("Content-Type", "text/plain");

    const proposalRes = await service.handleRequest(
      new Request("http://localhost/api/remote/proposal", {
        method: "POST",
        headers,
        body: JSON.stringify({ prompt: "hi" }),
      })
    );

    expect(proposalRes.status).toBe(415);
  });

  test("proposal creates remote request entry", async () => {
    const peer = makeIdentity();
    const pairRes = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "challenge",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );
    const pairBody = await pairRes.json();

    const restoreFetch = installCallbackStub(peer);
    await service.handleRequest(
      buildSignedRequest(peer, "POST", "/api/remote/pair-confirm", {
        request_id: pairBody.request_id,
        challenge: "challenge",
      })
    );
    restoreFetch();

    const proposalRes = await service.handleRequest(
      buildSignedRequest(peer, "POST", "/api/remote/proposal", {
        prompt: "Check disk usage",
      })
    );
    expect(proposalRes.status).toBe(200);
    const proposalBody = await proposalRes.json();
    expect(proposalBody.decision).toBe("human_required");
    expect(proposalBody.decision_model).toBe("github-copilot/gpt-5-mini");

    const stored = getRemoteRequestById(proposalBody.negotiation_id);
    expect(stored?.request_type).toBe("proposal");
  });

  test("execute requires JSON content type", async () => {
    const peer = makeIdentity();
    const pairRes = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "challenge",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );
    const pairBody = await pairRes.json();

    const restoreFetch = installCallbackStub(peer);
    await service.handleRequest(
      buildSignedRequest(peer, "POST", "/api/remote/pair-confirm", {
        request_id: pairBody.request_id,
        challenge: "challenge",
      })
    );
    restoreFetch();

    const signed = buildSignedRequest(peer, "POST", "/api/remote/execute", { prompt: "hello" });
    const headers = new Headers(signed.headers);
    headers.set("Content-Type", "text/plain");

    const blocked = await service.handleRequest(
      new Request("http://localhost/api/remote/execute", {
        method: "POST",
        headers,
        body: JSON.stringify({ prompt: "hello" }),
      })
    );
    expect(blocked.status).toBe(415);
  });

  test("execute is blocked without short-circuit enablement", async () => {
    const peer = makeIdentity();
    const pairRes = await service.handleRequest(
      new Request("http://localhost/api/remote/pair-request", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({
          instance_id: peer.instance_id,
          public_key: peer.public_key,
          display_name: "peer",
          callback_url: "https://example.com/api/remote/pair-confirm",
          protocol_version: "1",
          nonce: "challenge",
          expires_at: new Date(Date.now() + 60_000).toISOString(),
        }),
      })
    );
    const pairBody = await pairRes.json();

    const restoreFetch = installCallbackStub(peer);
    await service.handleRequest(
      buildSignedRequest(peer, "POST", "/api/remote/pair-confirm", {
        request_id: pairBody.request_id,
        challenge: "challenge",
      })
    );
    restoreFetch();

    const blocked = await service.handleRequest(
      buildSignedRequest(peer, "POST", "/api/remote/execute", { prompt: "hello" })
    );
    expect(blocked.status).toBe(403);
  });
});
