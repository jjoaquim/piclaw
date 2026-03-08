import { describe, expect, test } from "bun:test";
import { getClientKey, getRequestOriginParts } from "../../src/utils/request-client.js";

describe("request-client helpers", () => {
  test("ignores forwarded IP headers when trustProxy is false", () => {
    const req = new Request("http://internal.local/path", {
      headers: {
        "x-forwarded-for": "203.0.113.5",
        "x-real-ip": "203.0.113.9",
      },
    });

    expect(getClientKey(req, false)).toBe("unknown");
  });

  test("uses forwarded IP headers when trustProxy is true", () => {
    const req = new Request("http://internal.local/path", {
      headers: {
        "x-forwarded-for": "203.0.113.5, 198.51.100.2",
      },
    });

    expect(getClientKey(req, true)).toBe("203.0.113.5");
  });

  test("prefers request URL + host when trustProxy is false", () => {
    const req = new Request("http://internal.local/path", {
      headers: {
        host: "internal.local",
        "x-forwarded-host": "public.example.com",
        "x-forwarded-proto": "https",
      },
    });

    expect(getRequestOriginParts(req, false)).toEqual({
      proto: "http",
      host: "internal.local",
    });
  });

  test("uses forwarded host/proto/port when trustProxy is true", () => {
    const req = new Request("http://internal.local/path", {
      headers: {
        host: "internal.local",
        "x-forwarded-host": "public.example.com",
        "x-forwarded-proto": "https",
        "x-forwarded-port": "8443",
      },
    });

    expect(getRequestOriginParts(req, true)).toEqual({
      proto: "https",
      host: "public.example.com:8443",
    });
  });
});
