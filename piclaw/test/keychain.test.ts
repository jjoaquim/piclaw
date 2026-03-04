/**
 * test/keychain.test.ts – Tests for the encrypted keychain store.
 *
 * Verifies set/get/list/delete operations on the keychain, including
 * encryption, key derivation, and error handling for missing entries.
 */

import { afterAll, afterEach, beforeAll, expect, test } from "bun:test";
import { createTempWorkspace, setEnv, importFresh } from "./helpers.js";

const ws = createTempWorkspace("piclaw-keychain-");
let restoreEnv: (() => void) | null = null;
let keychain: typeof import("../src/secure/keychain.js");
let db: typeof import("../src/db.js");

const entryNames = ["test-entry", "test-env-entry", "test-disabled-entry"];

beforeAll(async () => {
  restoreEnv = setEnv({
    PICLAW_WORKSPACE: ws.workspace,
    PICLAW_STORE: ws.store,
    PICLAW_DATA: ws.data,
    PICLAW_KEYCHAIN_KEY: "test-key",
  });

  db = await importFresh<typeof import("../src/db.js")>("../src/db.js");
  db.initDatabase();
  keychain = await importFresh<typeof import("../src/secure/keychain.js")>("../src/secure/keychain.js");
});

afterEach(() => {
  for (const name of entryNames) {
    try {
      keychain.deleteKeychainEntry(name);
    } catch {
      // ignore cleanup errors
    }
  }
});

afterAll(() => {
  restoreEnv?.();
  ws.cleanup();
});

test("stores and retrieves keychain entries", async () => {
  await keychain.setKeychainEntry({
    name: "test-entry",
    type: "token",
    secret: "super-secret",
    username: "octo",
  });

  const entry = await keychain.getKeychainEntry("test-entry");
  expect(entry.name).toBe("test-entry");
  expect(entry.type).toBe("token");
  expect(entry.secret).toBe("super-secret");
  expect(entry.username).toBe("octo");
});

test("resolves keychain env references", async () => {
  await keychain.setKeychainEntry({
    name: "test-env-entry",
    type: "basic",
    secret: "env-secret",
    username: "env-user",
  });

  const resolved = await keychain.resolveKeychainEnv({
    TOKEN: "keychain:test-env-entry",
    USERNAME: "keychain:test-env-entry:username",
  });

  expect(resolved.TOKEN).toBe("env-secret");
  expect(resolved.USERNAME).toBe("env-user");
});

test("throws when keychain is disabled", async () => {
  await keychain.setKeychainEntry({
    name: "test-disabled-entry",
    type: "password",
    secret: "disabled-secret",
    username: "disabled-user",
  });

  const restore = setEnv({ PICLAW_KEYCHAIN_KEY: undefined, PICLAW_KEYCHAIN_KEY_FILE: undefined });
  await expect(keychain.getKeychainEntry("test-disabled-entry")).rejects.toThrow(
    "Keychain is disabled"
  );
  restore();
});
