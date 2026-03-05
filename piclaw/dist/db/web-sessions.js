/**
 * db/web-sessions.ts – Persistent web UI auth session storage.
 *
 * Stores session tokens issued after TOTP or passkey login so sessions
 * survive restarts. Designed for a single-user default now, but includes
 * user_id to enable multi-user support later without schema changes.
 */
import { getDb } from "./connection.js";
export const DEFAULT_WEB_USER_ID = "default";
export function createWebSession(token, userId, ttlSeconds) {
    const db = getDb();
    const createdAt = new Date().toISOString();
    const expiresAt = new Date(Date.now() + ttlSeconds * 1000).toISOString();
    db.prepare("INSERT OR REPLACE INTO web_sessions (token, user_id, created_at, expires_at) VALUES (?, ?, ?, ?)").run(token, userId, createdAt, expiresAt);
    return { token, user_id: userId, created_at: createdAt, expires_at: expiresAt };
}
export function getWebSession(token) {
    const db = getDb();
    const row = db
        .prepare("SELECT token, user_id, created_at, expires_at FROM web_sessions WHERE token = ?")
        .get(token);
    if (!row)
        return null;
    const expiresAt = Date.parse(row.expires_at);
    if (!Number.isNaN(expiresAt) && expiresAt <= Date.now()) {
        db.prepare("DELETE FROM web_sessions WHERE token = ?").run(token);
        return null;
    }
    return row;
}
export function deleteWebSession(token) {
    const db = getDb();
    db.prepare("DELETE FROM web_sessions WHERE token = ?").run(token);
}
export function deleteExpiredWebSessions(now = new Date()) {
    const db = getDb();
    const nowIso = now.toISOString();
    const info = db.prepare("DELETE FROM web_sessions WHERE expires_at <= ?").run(nowIso);
    return Number(info.changes || 0);
}
