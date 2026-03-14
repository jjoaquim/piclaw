/**
 * workspace-search.ts – Full-text search over workspace files using FTS5.
 *
 * Indexes text files (markdown, scripts, config) from configurable workspace
 * directories into the `workspace_fts` and `workspace_files` SQLite tables.
 * Supports incremental indexing (only re-indexes files whose mtime/size changed)
 * and scoped search (notes, skills, or all).
 *
 * Consumers:
 *   - extensions/workspace-search.ts exposes searchWorkspace() as a tool
 *     the agent can invoke to search its own workspace files.
 *   - agent-control/handlers/info.ts may query workspace search results.
 */
import fs from "node:fs/promises";
import path from "node:path";
import { getDb } from "./db.js";
import { WORKSPACE_DIR } from "./core/config.js";
import { prepareFtsQuery } from "./utils/fts-query.js";
const DEFAULT_EXTS = new Set([
    ".md",
    ".txt",
    ".ts",
    ".tsx",
    ".js",
    ".jsx",
    ".json",
    ".yaml",
    ".yml",
    ".sh",
]);
const clampNumber = (value, fallback, min, max) => {
    if (!Number.isFinite(value))
        return fallback;
    const num = Number(value);
    if (Number.isNaN(num))
        return fallback;
    return Math.min(Math.max(num, min), max);
};
const getWorkspaceRoot = () => {
    return path.resolve(process.env.PICLAW_WORKSPACE || WORKSPACE_DIR);
};
const getDefaultRoots = () => {
    const root = getWorkspaceRoot();
    return [path.join(root, "notes"), path.join(root, ".pi", "skills")];
};
const toRelative = (absPath) => {
    const workspaceRoot = getWorkspaceRoot();
    if (absPath.startsWith(workspaceRoot + path.sep)) {
        return absPath.slice(workspaceRoot.length + 1);
    }
    return absPath;
};
const isTextFile = (filePath) => {
    const ext = path.extname(filePath).toLowerCase();
    return DEFAULT_EXTS.has(ext);
};
async function walkFiles(root) {
    const files = [];
    try {
        const entries = await fs.readdir(root, { withFileTypes: true });
        for (const entry of entries) {
            const full = path.join(root, entry.name);
            if (entry.isDirectory()) {
                if (entry.name === "node_modules" || entry.name === ".git" || entry.name === ".cache")
                    continue;
                files.push(...(await walkFiles(full)));
            }
            else if (entry.isFile()) {
                files.push(full);
            }
        }
    }
    catch {
        return files;
    }
    return files;
}
function normalizeRoots(scope) {
    const roots = getDefaultRoots();
    if (!scope || scope === "all")
        return roots;
    if (scope === "notes")
        return [roots[0]];
    if (scope === "skills")
        return [roots[1]];
    return roots;
}
async function indexWorkspace(roots, maxBytes) {
    const db = getDb();
    const seen = new Set();
    const now = new Date().toISOString();
    const rootPrefixes = roots.map((root) => {
        const rel = toRelative(path.resolve(root));
        return rel.endsWith(path.sep) ? rel : `${rel}${path.sep}`;
    });
    for (const root of roots) {
        const absRoot = path.resolve(root);
        const files = await walkFiles(absRoot);
        for (const file of files) {
            if (!isTextFile(file))
                continue;
            try {
                const stat = await fs.stat(file);
                if (stat.size > maxBytes) {
                    // aggressive cleanup: drop oversized entries
                    const rel = toRelative(file);
                    db.prepare("DELETE FROM workspace_fts WHERE path = ?").run(rel);
                    db.prepare("DELETE FROM workspace_files WHERE path = ?").run(rel);
                    continue;
                }
                const rel = toRelative(file);
                seen.add(rel);
                const existing = db.prepare("SELECT mtime_ms, size_bytes FROM workspace_files WHERE path = ?").get(rel);
                const mtimeMs = Math.round(stat.mtimeMs);
                if (existing && existing.mtime_ms === mtimeMs && existing.size_bytes === stat.size) {
                    continue;
                }
                const content = await fs.readFile(file, "utf8");
                db.prepare("DELETE FROM workspace_fts WHERE path = ?").run(rel);
                db.prepare("INSERT INTO workspace_fts (content, path, mtime_ms, size_bytes) VALUES (?, ?, ?, ?)").run(content, rel, mtimeMs, stat.size);
                db.prepare("INSERT INTO workspace_files (path, mtime_ms, size_bytes, indexed_at) VALUES (?, ?, ?, ?) ON CONFLICT(path) DO UPDATE SET mtime_ms = excluded.mtime_ms, size_bytes = excluded.size_bytes, indexed_at = excluded.indexed_at").run(rel, mtimeMs, stat.size, now);
            }
            catch {
                // ignore unreadable files
            }
        }
    }
    // aggressive cleanup: remove deleted files only within scanned roots
    const existingPaths = db.prepare("SELECT path FROM workspace_files").all();
    for (const row of existingPaths) {
        const inScope = rootPrefixes.some((prefix) => row.path.startsWith(prefix));
        if (!inScope)
            continue;
        if (!seen.has(row.path)) {
            db.prepare("DELETE FROM workspace_fts WHERE path = ?").run(row.path);
            db.prepare("DELETE FROM workspace_files WHERE path = ?").run(row.path);
        }
    }
}
/** Full-text search across indexed workspace files. */
export async function searchWorkspace(params) {
    const query = params.query.trim();
    const limit = clampNumber(params.limit, 10, 1, 50);
    const offset = clampNumber(params.offset, 0, 0, 1_000_000);
    const refresh = params.refresh !== false;
    const maxBytes = clampNumber(params.max_kb, 512, 16, 2048) * 1024;
    if (!query) {
        return { rows: [], limit, offset, error: "Provide a query." };
    }
    if (refresh) {
        await indexWorkspace(normalizeRoots(params.scope), maxBytes);
    }
    const ftsQuery = prepareFtsQuery(query);
    if (!ftsQuery) {
        return { rows: [], limit, offset, error: "Query is empty after sanitization." };
    }
    const db = getDb();
    try {
        const scope = params.scope?.trim();
        const prefix = scope === "notes" ? "notes/%" : scope === "skills" ? ".pi/skills/%" : null;
        const stmt = prefix
            ? "SELECT path, size_bytes, mtime_ms, snippet(workspace_fts, 0, '[', ']', '…', 12) as snippet FROM workspace_fts WHERE workspace_fts MATCH ? AND path LIKE ? ORDER BY bm25(workspace_fts) LIMIT ? OFFSET ?"
            : "SELECT path, size_bytes, mtime_ms, snippet(workspace_fts, 0, '[', ']', '…', 12) as snippet FROM workspace_fts WHERE workspace_fts MATCH ? ORDER BY bm25(workspace_fts) LIMIT ? OFFSET ?";
        const rows = prefix
            ? db.prepare(stmt).all(ftsQuery, prefix, limit, offset)
            : db.prepare(stmt).all(ftsQuery, limit, offset);
        return { rows, limit, offset };
    }
    catch {
        // FTS query failed even after sanitization — fall back to LIKE
        try {
            const scope = params.scope?.trim();
            const prefix = scope === "notes" ? "notes/%" : scope === "skills" ? ".pi/skills/%" : null;
            const terms = query.split(/\s+/).filter(Boolean).map((t) => `%${t}%`);
            if (terms.length === 0)
                return { rows: [], limit, offset, error: "No searchable terms." };
            const likeClauses = terms.map(() => "content LIKE ? COLLATE NOCASE").join(" AND ");
            const conditions = prefix ? `${likeClauses} AND path LIKE ?` : likeClauses;
            const params_arr = prefix ? [...terms, prefix] : terms;
            const sql = `SELECT path, size_bytes, mtime_ms, substr(content, 1, 200) as snippet FROM workspace_files JOIN workspace_fts ON workspace_fts.path = workspace_files.path WHERE ${conditions} LIMIT ? OFFSET ?`;
            const rows = db.prepare(sql).all(...params_arr, limit, offset);
            return { rows, limit, offset };
        }
        catch {
            return { rows: [], limit, offset, error: "Workspace search failed (invalid query?)." };
        }
    }
}
