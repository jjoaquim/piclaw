/**
 * db/connection.ts – SQLite database initialisation and schema management.
 *
 * Opens (or creates) the main SQLite database at `<STORE_DIR>/messages.db`,
 * sets pragmas for WAL mode and busy timeout, and ensures all required tables,
 * indexes, FTS virtual tables, and triggers exist.
 *
 * This is the first module that must be called at startup (via `initDatabase()`)
 * before any other db/* module can function. The singleton `Database` instance
 * is then retrieved elsewhere with `getDb()`.
 *
 * Consumers:
 *   - db.ts re-exports initDatabase/getDb as the public entry point.
 *   - All db/* modules (messages, media, tasks, token-usage, tool-outputs,
 *     router-state, web-content, auto-compaction) call getDb() internally.
 *   - index.ts / runtime.ts calls initDatabase() during application startup.
 */
import Database from "bun:sqlite";
import fs from "fs";
import path from "path";
import { STORE_DIR } from "../core/config.js";
/** Singleton database handle; set by initDatabase(), accessed via getDb(). */
let db = null;
/**
 * Create all tables, indexes, FTS virtual tables, and triggers if they do
 * not already exist. Called once during initDatabase().
 *
 * Tables created:
 *   - chats – known chat endpoints (jid, name, last_message_time)
 *   - messages – individual messages with sender/content/timestamp
 *   - messages_fts – FTS5 index over message content for full-text search
 *   - media – binary file storage for attachments
 *   - message_media – join table linking messages to media records
 *   - tool_outputs – large tool invocation results (bash output, file reads)
 *   - tool_outputs_fts – FTS5 index for searching tool output content
 *   - scheduled_tasks – cron/interval/once task definitions
 *   - task_run_logs – execution history for scheduled tasks
 *   - router_state – key-value store for router cursor positions
 *   - token_usage – per-run LLM token and cost accounting
 *   - keychain_entries – encrypted credential storage (secure/keychain.ts)
 *   - workspace_files – file metadata cache for workspace search
 *   - workspace_fts – FTS5 index over workspace file contents
 */
function createSchema(database) {
    database.exec(`
    CREATE TABLE IF NOT EXISTS chats (
      jid TEXT PRIMARY KEY,
      name TEXT,
      last_message_time TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_chats_last_message_time ON chats(last_message_time);
    CREATE TABLE IF NOT EXISTS messages (
      id TEXT,
      chat_jid TEXT,
      sender TEXT,
      sender_name TEXT,
      content TEXT,
      content_blocks TEXT,
      link_previews TEXT,
      thread_id INTEGER,
      timestamp TEXT,
      is_from_me INTEGER,
      is_bot_message INTEGER DEFAULT 0,
      PRIMARY KEY (id, chat_jid),
      FOREIGN KEY (chat_jid) REFERENCES chats(jid)
    );
    CREATE INDEX IF NOT EXISTS idx_timestamp ON messages(timestamp);
    CREATE INDEX IF NOT EXISTS idx_messages_chat_jid ON messages(chat_jid);
    CREATE INDEX IF NOT EXISTS idx_messages_chat_jid_timestamp ON messages(chat_jid, timestamp);
    CREATE INDEX IF NOT EXISTS idx_messages_chat_jid_bot_timestamp ON messages(chat_jid, is_bot_message, timestamp);

    -- FTS5 virtual table for full-text search over message content.
    -- Kept in sync via insert/delete/update triggers below.
    CREATE VIRTUAL TABLE IF NOT EXISTS messages_fts USING fts5(
      content,
      chat_jid UNINDEXED,
      sender UNINDEXED,
      sender_name UNINDEXED,
      timestamp UNINDEXED,
      is_bot_message UNINDEXED,
      content='messages',
      content_rowid='rowid'
    );

    -- Trigger: populate FTS on message insert.
    CREATE TRIGGER IF NOT EXISTS messages_ai AFTER INSERT ON messages BEGIN
      INSERT INTO messages_fts(rowid, content, chat_jid, sender, sender_name, timestamp, is_bot_message)
      VALUES (new.rowid, new.content, new.chat_jid, new.sender, new.sender_name, new.timestamp, new.is_bot_message);
    END;

    -- Trigger: remove FTS entry on message delete.
    CREATE TRIGGER IF NOT EXISTS messages_ad AFTER DELETE ON messages BEGIN
      INSERT INTO messages_fts(messages_fts, rowid, content, chat_jid, sender, sender_name, timestamp, is_bot_message)
      VALUES ('delete', old.rowid, old.content, old.chat_jid, old.sender, old.sender_name, old.timestamp, old.is_bot_message);
    END;

    -- Trigger: update FTS entry on message update (delete old + insert new).
    CREATE TRIGGER IF NOT EXISTS messages_au AFTER UPDATE ON messages BEGIN
      INSERT INTO messages_fts(messages_fts, rowid, content, chat_jid, sender, sender_name, timestamp, is_bot_message)
      VALUES ('delete', old.rowid, old.content, old.chat_jid, old.sender, old.sender_name, old.timestamp, old.is_bot_message);
      INSERT INTO messages_fts(rowid, content, chat_jid, sender, sender_name, timestamp, is_bot_message)
      VALUES (new.rowid, new.content, new.chat_jid, new.sender, new.sender_name, new.timestamp, new.is_bot_message);
    END;

    CREATE TABLE IF NOT EXISTS media (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      filename TEXT NOT NULL,
      content_type TEXT NOT NULL,
      data BLOB NOT NULL,
      thumbnail BLOB,
      metadata TEXT,
      created_at TEXT DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_media_created_at ON media(created_at);

    -- Join table linking message rows to their media attachments.
    CREATE TABLE IF NOT EXISTS message_media (
      message_rowid INTEGER NOT NULL,
      media_id INTEGER NOT NULL,
      PRIMARY KEY (message_rowid, media_id),
      FOREIGN KEY (media_id) REFERENCES media(id)
    );
    CREATE INDEX IF NOT EXISTS idx_message_media_message_rowid ON message_media(message_rowid);
    CREATE INDEX IF NOT EXISTS idx_message_media_media_id ON message_media(media_id);

    CREATE TABLE IF NOT EXISTS tool_outputs (
      id TEXT PRIMARY KEY,
      created_at TEXT NOT NULL,
      source TEXT,
      size_bytes INTEGER,
      line_count INTEGER,
      summary TEXT,
      path TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_tool_outputs_created_at ON tool_outputs(created_at);

    -- FTS5 index for searching tool output content by text.
    CREATE VIRTUAL TABLE IF NOT EXISTS tool_outputs_fts USING fts5(
      content,
      output_id UNINDEXED
    );

    CREATE TABLE IF NOT EXISTS scheduled_tasks (
      id TEXT PRIMARY KEY,
      chat_jid TEXT NOT NULL,
      prompt TEXT NOT NULL,
      model TEXT,
      schedule_type TEXT NOT NULL,
      schedule_value TEXT NOT NULL,
      next_run TEXT,
      last_run TEXT,
      last_result TEXT,
      status TEXT DEFAULT 'active',
      created_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_next_run ON scheduled_tasks(next_run);
    CREATE INDEX IF NOT EXISTS idx_status ON scheduled_tasks(status);
    CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_created_at ON scheduled_tasks(created_at);
    CREATE INDEX IF NOT EXISTS idx_scheduled_tasks_last_run ON scheduled_tasks(last_run);

    CREATE TABLE IF NOT EXISTS task_run_logs (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      task_id TEXT NOT NULL,
      run_at TEXT NOT NULL,
      duration_ms INTEGER NOT NULL,
      status TEXT NOT NULL,
      result TEXT,
      error TEXT,
      FOREIGN KEY (task_id) REFERENCES scheduled_tasks(id)
    );
    CREATE INDEX IF NOT EXISTS idx_task_run_logs ON task_run_logs(task_id, run_at);

    -- Simple key-value store for the router's per-chat cursor positions.
    CREATE TABLE IF NOT EXISTS router_state (
      key TEXT PRIMARY KEY,
      value TEXT NOT NULL
    );

    CREATE TABLE IF NOT EXISTS token_usage (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      chat_jid TEXT NOT NULL,
      run_at TEXT NOT NULL,
      input_tokens INTEGER DEFAULT 0,
      output_tokens INTEGER DEFAULT 0,
      cache_read_tokens INTEGER DEFAULT 0,
      cache_write_tokens INTEGER DEFAULT 0,
      total_tokens INTEGER DEFAULT 0,
      cost_input REAL DEFAULT 0,
      cost_output REAL DEFAULT 0,
      cost_cache_read REAL DEFAULT 0,
      cost_cache_write REAL DEFAULT 0,
      cost_total REAL DEFAULT 0,
      model TEXT,
      provider TEXT,
      api TEXT,
      turns INTEGER DEFAULT 0
    );
    CREATE INDEX IF NOT EXISTS idx_token_usage_chat_jid ON token_usage(chat_jid);
    CREATE INDEX IF NOT EXISTS idx_token_usage_run_at ON token_usage(run_at);
    CREATE INDEX IF NOT EXISTS idx_token_usage_chat_jid_run_at ON token_usage(chat_jid, run_at);

    -- Encrypted credential storage for the keychain (secure/keychain.ts).
    CREATE TABLE IF NOT EXISTS keychain_entries (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      name TEXT NOT NULL UNIQUE,
      type TEXT NOT NULL,
      ciphertext BLOB NOT NULL,
      nonce BLOB NOT NULL,
      salt BLOB NOT NULL,
      kdf TEXT NOT NULL,
      kdf_iterations INTEGER NOT NULL,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      updated_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP
    );
    CREATE INDEX IF NOT EXISTS idx_keychain_entries_type ON keychain_entries(type);

    -- WebAuthn passkey credentials and enrolment tokens.
    CREATE TABLE IF NOT EXISTS webauthn_credentials (
      id INTEGER PRIMARY KEY AUTOINCREMENT,
      user_id TEXT NOT NULL,
      rp_id TEXT NOT NULL,
      credential_id TEXT NOT NULL UNIQUE,
      public_key TEXT NOT NULL,
      sign_count INTEGER NOT NULL DEFAULT 0,
      transports TEXT,
      created_at TEXT NOT NULL DEFAULT CURRENT_TIMESTAMP,
      last_used_at TEXT
    );
    CREATE INDEX IF NOT EXISTS idx_webauthn_credentials_user_id ON webauthn_credentials(user_id);
    CREATE INDEX IF NOT EXISTS idx_webauthn_credentials_rp_id ON webauthn_credentials(rp_id);

    CREATE TABLE IF NOT EXISTS webauthn_enrollments (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_webauthn_enrollments_expires_at ON webauthn_enrollments(expires_at);

    -- Web auth sessions (TOTP + passkey). Stored for persistence across restarts.
    CREATE TABLE IF NOT EXISTS web_sessions (
      token TEXT PRIMARY KEY,
      user_id TEXT NOT NULL,
      created_at TEXT NOT NULL,
      expires_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_web_sessions_expires_at ON web_sessions(expires_at);

    -- File metadata cache for workspace-search.ts full-text indexing.
    CREATE TABLE IF NOT EXISTS workspace_files (
      path TEXT PRIMARY KEY,
      mtime_ms INTEGER NOT NULL,
      size_bytes INTEGER NOT NULL,
      indexed_at TEXT NOT NULL
    );
    CREATE INDEX IF NOT EXISTS idx_workspace_files_indexed_at ON workspace_files(indexed_at);

    -- FTS5 index over workspace file contents for fast grep-like search.
    CREATE VIRTUAL TABLE IF NOT EXISTS workspace_fts USING fts5(
      content,
      path UNINDEXED,
      mtime_ms UNINDEXED,
      size_bytes UNINDEXED
    );
  `);
}
/**
 * Add columns that were introduced after the initial schema.
 * Safe to call repeatedly – skips columns that already exist.
 * Handles the `content_blocks`, `link_previews`, and `thread_id` columns
 * added for the web channel's rich-message support.
 */
function ensureMessageColumns(database) {
    const columns = database.prepare("PRAGMA table_info(messages)").all();
    const existing = new Set(columns.map((col) => col.name));
    const ensureColumn = (name, type = "TEXT") => {
        if (existing.has(name))
            return;
        try {
            database.exec(`ALTER TABLE messages ADD COLUMN ${name} ${type}`);
        }
        catch {
            // ignore if column already exists or cannot be added
        }
    };
    ensureColumn("content_blocks");
    ensureColumn("link_previews");
    ensureColumn("thread_id", "INTEGER");
}
/**
 * One-time FTS rebuild for databases created before the FTS triggers existed.
 * Uses PRAGMA user_version as a migration marker so it only runs once.
 */
function ensureFts(database) {
    const row = database.prepare("PRAGMA user_version").get();
    const version = typeof row?.user_version === "number" ? row.user_version : 0;
    if (version >= 1)
        return;
    database.exec("INSERT INTO messages_fts(messages_fts) VALUES('rebuild');");
    database.exec("PRAGMA user_version = 1;");
}
/**
 * Ensure the `model` column exists on `scheduled_tasks` (added in a later
 * version to allow per-task model overrides).
 */
function ensureScheduledTaskColumns(database) {
    const columns = database.prepare("PRAGMA table_info(scheduled_tasks)").all();
    const existing = new Set(columns.map((col) => col.name));
    if (!existing.has("model")) {
        try {
            database.exec("ALTER TABLE scheduled_tasks ADD COLUMN model TEXT");
        }
        catch {
            // ignore if column already exists or cannot be added
        }
    }
}
/**
 * Open (or create) the SQLite database and run all schema migrations.
 * Must be called once at application startup before any other db/* function.
 *
 * Called by index.ts (the application entry point).
 */
export function initDatabase() {
    const dbPath = path.join(STORE_DIR, "messages.db");
    fs.mkdirSync(path.dirname(dbPath), { recursive: true });
    db = new Database(dbPath);
    db.exec("PRAGMA journal_mode = WAL;");
    db.exec("PRAGMA busy_timeout = 5000;");
    db.exec("PRAGMA secure_delete = ON;");
    createSchema(db);
    ensureMessageColumns(db);
    ensureScheduledTaskColumns(db);
    ensureFts(db);
}
/**
 * Return the singleton Database instance.
 * Throws if called before initDatabase().
 *
 * Used by every db/* module to obtain the shared connection.
 */
export function getDb() {
    if (!db) {
        throw new Error("Database not initialized");
    }
    return db;
}
