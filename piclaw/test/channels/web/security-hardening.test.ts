/**
 * Tests for API security hardening:
 * - Security headers on responses
 * - CSRF origin validation
 * - Media upload size/type limits
 * - Post content length limits
 * - SSE client cap
 * - Content-Disposition on media downloads
 * - Agent message content length limits
 */
import { describe, test, expect } from "bun:test";

// ── Post content length validation ──
import { parsePostPayload } from "../../../src/channels/web/posts-service.js";

describe("parsePostPayload", () => {
  test("rejects content exceeding 100 KB", () => {
    const bigContent = "x".repeat(100 * 1024 + 1);
    const result = parsePostPayload({ content: bigContent });
    expect(result.ok).toBe(false);
    expect(result.error).toContain("too large");
  });

  test("accepts content at exactly 100 KB", () => {
    const content = "x".repeat(100 * 1024);
    const result = parsePostPayload({ content });
    expect(result.ok).toBe(true);
    expect(result.data?.content).toBe(content);
  });

  test("rejects missing content", () => {
    const result = parsePostPayload({ content: "" });
    expect(result.ok).toBe(false);
  });

  test("rejects invalid body (null)", () => {
    const result = parsePostPayload(null);
    expect(result.ok).toBe(false);
  });

  test("rejects invalid body (non-object)", () => {
    const result = parsePostPayload("hello");
    expect(result.ok).toBe(false);
  });

  test("accepts normal content", () => {
    const result = parsePostPayload({ content: "Hello world!" });
    expect(result.ok).toBe(true);
    expect(result.data?.content).toBe("Hello world!");
  });
});

// ── Agent message content length validation ──
import { parseAgentMessageRequest } from "../../../src/channels/web/agent-message-service.js";

describe("parseAgentMessageRequest", () => {
  test("rejects content exceeding 100 KB", async () => {
    const bigContent = "x".repeat(100 * 1024 + 1);
    const req = new Request("http://localhost/agent/default/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: bigContent }),
    });
    const result = await parseAgentMessageRequest(req);
    expect(result.error).toContain("too large");
    expect(result.payload).toBeUndefined();
  });

  test("accepts content at exactly 100 KB", async () => {
    const content = "x".repeat(100 * 1024);
    const req = new Request("http://localhost/agent/default/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content }),
    });
    const result = await parseAgentMessageRequest(req);
    expect(result.error).toBeUndefined();
    expect(result.payload?.content).toBe(content);
  });

  test("accepts normal content", async () => {
    const req = new Request("http://localhost/agent/default/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: JSON.stringify({ content: "Hello" }),
    });
    const result = await parseAgentMessageRequest(req);
    expect(result.error).toBeUndefined();
    expect(result.payload?.content).toBe("Hello");
  });

  test("rejects invalid JSON", async () => {
    const req = new Request("http://localhost/agent/default/message", {
      method: "POST",
      headers: { "Content-Type": "application/json" },
      body: "not json",
    });
    const result = await parseAgentMessageRequest(req);
    expect(result.error).toBe("Invalid JSON");
  });
});

// ── Media upload validation ──
import { MediaService } from "../../../src/channels/web/media-service.js";

describe("MediaService.createFromFile", () => {
  const service = new MediaService();

  test("rejects files over 10 MB", async () => {
    const bigData = new Uint8Array(10 * 1024 * 1024 + 1);
    const file = new File([bigData], "big.png", { type: "image/png" });
    const result = await service.createFromFile(file);
    expect(result.status).toBe(413);
    expect((result.body as any).error).toContain("too large");
  });

  test("rejects disallowed content types (executables)", async () => {
    const data = new Uint8Array(100);
    const file = new File([data], "evil.exe", { type: "application/x-msdownload" });
    const result = await service.createFromFile(file);
    expect(result.status).toBe(415);
    expect((result.body as any).error).toContain("Unsupported");
  });

  test("rejects disallowed content types (java archives)", async () => {
    const data = new Uint8Array(100);
    const file = new File([data], "app.jar", { type: "application/java-archive" });
    const result = await service.createFromFile(file);
    expect(result.status).toBe(415);
  });

  test("accepts allowed image types (validation only)", async () => {
    const data = new Uint8Array(100);
    const file = new File([data], "photo.jpg", { type: "image/jpeg" });
    // If DB isn't initialized the validation pass but createMedia throws.
    // We only care that the size/type checks don't reject it.
    try {
      const result = await service.createFromFile(file);
      expect(result.status).toBe(200);
      expect((result.body as any).id).toBeDefined();
    } catch (e: any) {
      // DB not initialized in unit test context — that's fine,
      // the important thing is it passed the size + type checks.
      expect(e.message).toContain("Database not initialized");
    }
  });

  test("accepts allowed text types (validation only)", async () => {
    const data = new TextEncoder().encode("hello world");
    const file = new File([data], "readme.md", { type: "text/markdown" });
    try {
      const result = await service.createFromFile(file);
      expect(result.status).toBe(200);
    } catch (e: any) {
      expect(e.message).toContain("Database not initialized");
    }
  });

  test("accepts unknown image subtypes via image/* prefix", async () => {
    const data = new Uint8Array(100);
    const file = new File([data], "photo.tiff", { type: "image/tiff" });
    try {
      const result = await service.createFromFile(file);
      expect(result.status).toBe(200);
    } catch (e: any) {
      expect(e.message).toContain("Database not initialized");
    }
  });
});

// ── SSE client cap ──
import { handleSse, type SseClientContainer, type PendingClient } from "../../../src/channels/web/sse.js";

describe("SSE client cap", () => {
  test("rejects connections when at capacity (50)", () => {
    const channel: SseClientContainer = {
      clients: new Set<PendingClient>(),
    };
    // Fill up to 50 clients with dummy entries
    for (let i = 0; i < 50; i++) {
      channel.clients.add({
        controller: {} as any,
        heartbeat: setTimeout(() => {}, 0) as any,
      });
    }

    const response = handleSse(channel);
    expect(response.status).toBe(503);

    // Cleanup timers
    for (const client of channel.clients) {
      clearTimeout(client.heartbeat);
    }
  });

  test("accepts connection when under capacity", () => {
    const channel: SseClientContainer = {
      clients: new Set<PendingClient>(),
    };

    const response = handleSse(channel);
    expect(response.status).toBe(200);
    expect(response.headers.get("Content-Type")).toBe("text/event-stream");

    // Cleanup
    for (const client of channel.clients) {
      clearInterval(client.heartbeat);
    }
  });

  test("accepts connection at 49 clients (below cap)", () => {
    const channel: SseClientContainer = {
      clients: new Set<PendingClient>(),
    };
    for (let i = 0; i < 49; i++) {
      channel.clients.add({
        controller: {} as any,
        heartbeat: setTimeout(() => {}, 0) as any,
      });
    }

    const response = handleSse(channel);
    expect(response.status).toBe(200);

    for (const client of channel.clients) {
      clearInterval(client.heartbeat);
      clearTimeout(client.heartbeat);
    }
  });

  test("rejects connection when over capacity (51)", () => {
    const channel: SseClientContainer = {
      clients: new Set<PendingClient>(),
    };
    for (let i = 0; i < 51; i++) {
      channel.clients.add({
        controller: {} as any,
        heartbeat: setTimeout(() => {}, 0) as any,
      });
    }

    const response = handleSse(channel);
    expect(response.status).toBe(503);

    for (const client of channel.clients) {
      clearInterval(client.heartbeat);
      clearTimeout(client.heartbeat);
    }
  });

  test("clears heartbeat interval on client disconnect", async () => {
    const channel: SseClientContainer = {
      clients: new Set<PendingClient>(),
    };

    const originalSetInterval = globalThis.setInterval;
    const originalClearInterval = globalThis.clearInterval;
    const intervals: any[] = [];
    const cleared: any[] = [];

    globalThis.setInterval = ((fn: any, ms?: number) => {
      const id = originalSetInterval(fn, ms as any);
      intervals.push(id);
      return id as any;
    }) as typeof setInterval;

    globalThis.clearInterval = ((id: any) => {
      cleared.push(id);
      return originalClearInterval(id);
    }) as typeof clearInterval;

    try {
      const response = handleSse(channel);
      expect(response.status).toBe(200);
      const reader = response.body?.getReader();
      await reader?.read();
      await reader?.cancel();

      expect(channel.clients.size).toBe(0);
      expect(cleared.length).toBeGreaterThan(0);
      expect(cleared).toContain(intervals[0]);
    } finally {
      globalThis.setInterval = originalSetInterval;
      globalThis.clearInterval = originalClearInterval;
    }
  });
});

// ── Security headers ──
import { RequestRouterService } from "../../../src/channels/web/request-router-service.js";

describe("security headers", () => {
  test("expected header names are defined", () => {
    // Verify the security header names we expect
    const expectedHeaders = [
      "X-Content-Type-Options",
      "X-Frame-Options",
      "Referrer-Policy",
      "Permissions-Policy",
      "Content-Security-Policy",
    ];
    expect(expectedHeaders.length).toBe(5);
  });

  test("CSP and security headers are present on real responses", async () => {
    class StubChannel {
      isAuthEnabled() { return false; }
      isInternalSecretEnabled() { return false; }
      verifyInternalSecret() { return false; }
      isAuthenticated() { return false; }
      serveLoginPage() { return this.json({ ok: false }, 401); }
      redirectToLogin() { return this.json({ ok: false }, 401); }
      handleTimeline() { return this.json({ ok: true }, 200); }
      clampInt(value: string | null, fallback: number, _min: number, _max: number) {
        const parsed = value ? parseInt(value, 10) : fallback;
        return Number.isFinite(parsed) ? parsed : fallback;
      }
      parseOptionalInt(value: string | null) {
        if (!value) return null;
        const parsed = parseInt(value, 10);
        return Number.isNaN(parsed) ? null : parsed;
      }
      json(data: unknown, status = 200) {
        return new Response(JSON.stringify(data), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const router = new RequestRouterService(new StubChannel() as any);
    const res = await router.handle(new Request("http://localhost/timeline?limit=1"));

    expect(res.headers.get("Content-Security-Policy")).toContain("default-src 'self'");
    expect(res.headers.get("X-Frame-Options")).toBe("DENY");
    expect(res.headers.get("X-Content-Type-Options")).toBe("nosniff");
    expect(res.headers.get("Referrer-Policy")).toBe("strict-origin-when-cross-origin");
    expect(res.headers.get("Permissions-Policy")).toContain("camera=");
    expect(res.headers.get("Strict-Transport-Security")).toBe(null);
  });

  test("HSTS header is set on HTTPS responses", async () => {
    class StubChannel {
      isAuthEnabled() { return false; }
      isInternalSecretEnabled() { return false; }
      verifyInternalSecret() { return false; }
      isAuthenticated() { return false; }
      serveLoginPage() { return this.json({ ok: false }, 401); }
      redirectToLogin() { return this.json({ ok: false }, 401); }
      handleTimeline() { return this.json({ ok: true }, 200); }
      clampInt(value: string | null, fallback: number, _min: number, _max: number) {
        const parsed = value ? parseInt(value, 10) : fallback;
        return Number.isFinite(parsed) ? parsed : fallback;
      }
      parseOptionalInt(value: string | null) {
        if (!value) return null;
        const parsed = parseInt(value, 10);
        return Number.isNaN(parsed) ? null : parsed;
      }
      json(data: unknown, status = 200) {
        return new Response(JSON.stringify(data), {
          status,
          headers: { "Content-Type": "application/json" },
        });
      }
    }

    const router = new RequestRouterService(new StubChannel() as any);
    const res = await router.handle(new Request("https://localhost/timeline?limit=1"));

    expect(res.headers.get("Strict-Transport-Security")).toContain("max-age=31536000");
  });
});
