/**
 * db/web-sessions.ts – Persistent web UI auth session storage.
 *
 * Stores session tokens issued after TOTP or passkey login so sessions
 * survive restarts. Tokens are persisted as SHA-256 hashes (not plaintext)
 * for at-rest hardening. Designed for a single-user default now, but includes
 * user_id to enable multi-user support later without schema changes.
 */
import { createHash } from "node:crypto";
import { getDb } from "./connection.js";
/** Default user ID used for single-user web auth sessions. */
export const DEFAULT_WEB_USER_ID = "default";
/** Derive a deterministic DB-safe hash for a session token. */
function hashSessionToken(token) {
    return createHash("sha256").update(token).digest("hex");
}
/** Create or replace a persistent web auth session token row. */
export function createWebSession(token, userId, ttlSeconds, authMethod) {
    const db = getDb();
    const createdAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
    const tokenHash = hashSessionToken(token);
    db.prepare("INSERT OR REPLACE INTO web_sessions (token, user_id, auth_method, created_at, expires_at) VALUES (?, ?, ?, ?, ?)").run(tokenHash, userId, authMethod, createdAt, expiresAt);
    return { token, user_id: userId, auth_method: authMethod, created_at: createdAt, expires_at: expiresAt };
}
/** Fetch a session row by token and auto-delete it when expired. */
export function getWebSession(token) {
    const db = getDb();
    const tokenHash = hashSessionToken(token);
    let row = db
        .prepare("SELECT token, user_id, auth_method, created_at, expires_at FROM web_sessions WHERE token = ?")
        .get(tokenHash);
    // Legacy fallback for plain-token rows created before hashing hardening.
    if (!row) {
        row = db
            .prepare("SELECT token, user_id, auth_method, created_at, expires_at FROM web_sessions WHERE token = ?")
            .get(token);
        if (row) {
            db.prepare("DELETE FROM web_sessions WHERE token = ?").run(token);
            db.prepare("INSERT OR REPLACE INTO web_sessions (token, user_id, auth_method, created_at, expires_at) VALUES (?, ?, ?, ?, ?)").run(tokenHash, row.user_id, row.auth_method, row.created_at, row.expires_at);
        }
    }
    if (!row)
        return null;
    const expiresAt = Date.parse(row.expires_at);
    if (!Number.isNaN(expiresAt) && expiresAt <= Date.now()) {
        db.prepare("DELETE FROM web_sessions WHERE token = ?").run(tokenHash);
        db.prepare("DELETE FROM web_sessions WHERE token = ?").run(token);
        return null;
    }
    return {
        token,
        user_id: row.user_id,
        auth_method: row.auth_method,
        created_at: row.created_at,
        expires_at: row.expires_at,
    };
}
/** Delete a specific web auth session token. */
export function deleteWebSession(token) {
    const db = getDb();
    const tokenHash = hashSessionToken(token);
    db.prepare("DELETE FROM web_sessions WHERE token = ?").run(tokenHash);
    // Best-effort legacy cleanup for pre-hash rows.
    db.prepare("DELETE FROM web_sessions WHERE token = ?").run(token);
}
/** Delete expired session rows and return number of removed records. */
export function deleteExpiredWebSessions(now = new Date()) {
    const db = getDb();
    const nowIso = now.toISOString();
    const info = db.prepare("DELETE FROM web_sessions WHERE expires_at <= ?").run(nowIso);
    return Number(info.changes || 0);
}
