import { describe, expect, test } from "bun:test";
import { validateCallbackUrl } from "../../src/remote/ssrf.js";

describe("validateCallbackUrl", () => {
  test("rejects localhost hostnames", async () => {
    const result = await validateCallbackUrl("https://localhost/callback");
    expect(result.ok).toBe(false);
    expect(result.error).toContain("hostname");
  });

  test("rejects private IPv4 literals", async () => {
    const result = await validateCallbackUrl("https://192.168.1.50/callback");
    expect(result.ok).toBe(false);
    expect(result.error).toContain("private or loopback");
  });

  test("rejects hostnames resolving to private ranges", async () => {
    const result = await validateCallbackUrl(
      "https://peer.example/callback",
      async () => ["127.0.0.1"]
    );
    expect(result.ok).toBe(false);
    expect(result.error).toContain("private or loopback");
  });

  test("rejects unresolvable hostnames", async () => {
    const result = await validateCallbackUrl(
      "https://peer.example/callback",
      async () => {
        throw new Error("dns failed");
      }
    );
    expect(result.ok).toBe(false);
    expect(result.error).toContain("could not be resolved");
  });

  test("accepts publicly-routed resolved hosts", async () => {
    const result = await validateCallbackUrl(
      "https://peer.example/callback",
      async () => ["93.184.216.34"]
    );
    expect(result.ok).toBe(true);
    expect(result.url?.hostname).toBe("peer.example");
  });
});
