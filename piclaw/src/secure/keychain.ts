import { readFileSync } from "fs";
import { getDb } from "../db/connection.js";

const encoder = new TextEncoder();
const decoder = new TextDecoder();

const KEYCHAIN_PREFIX = "keychain:";
const KEYCHAIN_PLACEHOLDER = /keychain:[A-Za-z0-9._\/-]+(?::[A-Za-z0-9._-]+)?/g;
const KDF_ALGO = "pbkdf2-sha256";
const KDF_ITERATIONS = 150_000;
const SALT_BYTES = 16;
const NONCE_BYTES = 12;

const toArrayBuffer = (value: Uint8Array): ArrayBuffer =>
  value.buffer.slice(value.byteOffset, value.byteOffset + value.byteLength) as ArrayBuffer;

export type KeychainEntryType = "token" | "password" | "basic" | "secret";

export interface KeychainEntry {
  name: string;
  type: KeychainEntryType;
  secret: string;
  username?: string | null;
}

export interface KeychainEntryMetadata {
  name: string;
  type: KeychainEntryType;
  createdAt: string;
  updatedAt: string;
}

interface KeychainRow {
  name: string;
  type: KeychainEntryType;
  ciphertext: Uint8Array;
  nonce: Uint8Array;
  salt: Uint8Array;
  kdf: string;
  kdf_iterations: number;
}

function loadKeyMaterial(): Uint8Array {
  let rawKey = process.env.PICLAW_KEYCHAIN_KEY || "";
  const keyFile = process.env.PICLAW_KEYCHAIN_KEY_FILE;
  if (!rawKey && keyFile) {
    rawKey = readFileSync(keyFile, "utf8").trim();
  }
  if (!rawKey) {
    throw new Error("Keychain is disabled. Set PICLAW_KEYCHAIN_KEY or PICLAW_KEYCHAIN_KEY_FILE.");
  }
  return encoder.encode(rawKey);
}

async function deriveAesKey(salt: Uint8Array, iterations: number): Promise<CryptoKey> {
  const keyMaterial = loadKeyMaterial();
  const baseKey = await crypto.subtle.importKey(
    "raw",
    toArrayBuffer(keyMaterial),
    "PBKDF2",
    false,
    ["deriveKey"]
  );
  return crypto.subtle.deriveKey(
    {
      name: "PBKDF2",
      salt: toArrayBuffer(salt),
      iterations,
      hash: "SHA-256",
    },
    baseKey,
    {
      name: "AES-GCM",
      length: 256,
    },
    false,
    ["encrypt", "decrypt"]
  );
}

function parseSecretPayload(payload: string): { secret: string; username?: string | null } {
  const data = JSON.parse(payload) as { secret?: string; username?: string | null };
  if (!data?.secret) {
    throw new Error("Invalid keychain payload.");
  }
  return { secret: data.secret, username: data.username };
}

async function encryptPayload(name: string, secret: string, username?: string | null) {
  const salt = crypto.getRandomValues(new Uint8Array(SALT_BYTES));
  const nonce = crypto.getRandomValues(new Uint8Array(NONCE_BYTES));
  const key = await deriveAesKey(salt, KDF_ITERATIONS);
  const additionalData = encoder.encode(name);
  const payload = encoder.encode(JSON.stringify({ secret, username: username ?? null }));
  const ciphertext = new Uint8Array(
    await crypto.subtle.encrypt({ name: "AES-GCM", iv: nonce, additionalData }, key, payload)
  );
  return { ciphertext, nonce, salt, kdf: KDF_ALGO, kdfIterations: KDF_ITERATIONS };
}

async function decryptPayload(name: string, row: KeychainRow): Promise<{ secret: string; username?: string | null }> {
  const key = await deriveAesKey(new Uint8Array(row.salt), row.kdf_iterations);
  const additionalData = encoder.encode(name);
  const plaintext = await crypto.subtle.decrypt(
    { name: "AES-GCM", iv: new Uint8Array(row.nonce), additionalData },
    key,
    new Uint8Array(row.ciphertext)
  );
  return parseSecretPayload(decoder.decode(plaintext));
}

export async function setKeychainEntry(entry: KeychainEntry): Promise<void> {
  if (!entry.name) {
    throw new Error("Keychain entry name is required.");
  }
  if (!entry.secret) {
    throw new Error("Keychain entry secret is required.");
  }
  const payload = await encryptPayload(entry.name, entry.secret, entry.username ?? null);
  const db = getDb();
  db.prepare(
    `INSERT INTO keychain_entries (
        name,
        type,
        ciphertext,
        nonce,
        salt,
        kdf,
        kdf_iterations
      ) VALUES (?, ?, ?, ?, ?, ?, ?)
      ON CONFLICT(name) DO UPDATE SET
        type = excluded.type,
        ciphertext = excluded.ciphertext,
        nonce = excluded.nonce,
        salt = excluded.salt,
        kdf = excluded.kdf,
        kdf_iterations = excluded.kdf_iterations,
        updated_at = CURRENT_TIMESTAMP`
  ).run(
    entry.name,
    entry.type,
    Buffer.from(payload.ciphertext),
    Buffer.from(payload.nonce),
    Buffer.from(payload.salt),
    payload.kdf,
    payload.kdfIterations
  );
}

export async function getKeychainEntry(name: string): Promise<KeychainEntry> {
  const db = getDb();
  const row = db
    .prepare(
      `SELECT name, type, ciphertext, nonce, salt, kdf, kdf_iterations
       FROM keychain_entries
       WHERE name = ?`
    )
    .get(name) as KeychainRow | undefined;
  if (!row) {
    throw new Error(`Keychain entry not found: ${name}`);
  }
  if (row.kdf !== KDF_ALGO) {
    throw new Error(`Unsupported keychain KDF: ${row.kdf}`);
  }
  const payload = await decryptPayload(row.name, row);
  return { name: row.name, type: row.type, secret: payload.secret, username: payload.username };
}

export function listKeychainEntries(): KeychainEntryMetadata[] {
  const db = getDb();
  const rows = db
    .prepare(
      `SELECT name, type, created_at as createdAt, updated_at as updatedAt
       FROM keychain_entries
       ORDER BY name`
    )
    .all() as KeychainEntryMetadata[];
  return rows;
}

export function deleteKeychainEntry(name: string): boolean {
  const db = getDb();
  const result = db.prepare("DELETE FROM keychain_entries WHERE name = ?").run(name);
  return result.changes > 0;
}

function parseKeychainReference(value: string): { name: string; field: "secret" | "username" } {
  const raw = value.slice(KEYCHAIN_PREFIX.length);
  const [name, field = "secret"] = raw.split(":");
  if (!name) {
    throw new Error(`Invalid keychain reference: ${value}`);
  }
  if (field === "username" || field === "user") {
    return { name, field: "username" };
  }
  if (field === "secret" || field === "password" || field === "token") {
    return { name, field: "secret" };
  }
  throw new Error(`Invalid keychain reference: ${value}`);
}

export async function resolveKeychainEnv(
  env: Record<string, string | undefined>
): Promise<Record<string, string>> {
  const resolved: Record<string, string> = {};
  for (const [key, value] of Object.entries(env)) {
    if (value === undefined) continue;
    if (!value.startsWith(KEYCHAIN_PREFIX)) {
      resolved[key] = value;
      continue;
    }
    const ref = parseKeychainReference(value);
    const entry = await getKeychainEntry(ref.name);
    if (ref.field === "username") {
      if (!entry.username) {
        throw new Error(`Keychain entry ${ref.name} has no username.`);
      }
      resolved[key] = entry.username;
      continue;
    }
    resolved[key] = entry.secret;
  }
  return resolved;
}

export async function resolveKeychainPlaceholders(input: string): Promise<string> {
  if (!input || !input.includes(KEYCHAIN_PREFIX)) {
    return input;
  }

  const matches = input.match(KEYCHAIN_PLACEHOLDER);
  if (!matches?.length) {
    return input;
  }

  const unique = Array.from(new Set(matches));
  const replacements = new Map<string, string>();

  for (const placeholder of unique) {
    const ref = parseKeychainReference(placeholder);
    const entry = await getKeychainEntry(ref.name);
    if (ref.field === "username") {
      if (!entry.username) {
        throw new Error(`Keychain entry ${ref.name} has no username.`);
      }
      replacements.set(placeholder, entry.username);
    } else {
      replacements.set(placeholder, entry.secret);
    }
  }

  return input.replace(KEYCHAIN_PLACEHOLDER, (match) => replacements.get(match) ?? match);
}
