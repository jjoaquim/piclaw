import { spawn } from "node:child_process";
import { WORKSPACE_DIR } from "../../../core/config.js";
import { DEFAULT_WEB_USER_ID, getWebSession } from "../../../db.js";
import { getSessionTokenFromRequest } from "../session-auth.js";
const DEFAULT_COLS = 120;
const DEFAULT_ROWS = 30;
const TERMINAL_FONT_FAMILY = "FiraCode Nerd Font Mono";
const FALLBACK_TERMINAL_OWNER = {
    token: "web-terminal-local-default",
    userId: DEFAULT_WEB_USER_ID,
};
function normalizeChunk(chunk) {
    if (typeof chunk === "string")
        return chunk;
    return Buffer.from(chunk).toString("utf8");
}
function defaultSpawnProcess(cwd) {
    return spawn("/usr/bin/script", ["-qf", "-c", "/usr/bin/bash -i", "/dev/null"], {
        cwd,
        env: {
            ...process.env,
            TERM: process.env.TERM || "xterm-256color",
            COLORTERM: process.env.COLORTERM || "truecolor",
            CLICOLOR: process.env.CLICOLOR || "1",
            FORCE_COLOR: process.env.FORCE_COLOR || "1",
            HOME: process.env.HOME || "/home/agent",
        },
        stdio: ["pipe", "pipe", "pipe"],
    });
}
export class TerminalSessionService {
    sessions = new Map();
    spawnProcess;
    constructor(options = {}) {
        this.spawnProcess = options.spawnProcess ?? defaultSpawnProcess;
    }
    resolveOwnerFromRequest(req, allowUnauthenticated = false) {
        const token = getSessionTokenFromRequest(req);
        if (token) {
            const session = getWebSession(token);
            if (session) {
                return { token, userId: session.user_id };
            }
        }
        return allowUnauthenticated ? { ...FALLBACK_TERMINAL_OWNER } : null;
    }
    getSessionInfo(owner) {
        const session = this.sessions.get(owner.token);
        return {
            enabled: true,
            transport: "websocket",
            ws_path: "/terminal/ws",
            cwd: WORKSPACE_DIR,
            shell: "/usr/bin/bash -i",
            font_family: TERMINAL_FONT_FAMILY,
            active: Boolean(session),
            connected_clients: session?.clients.size ?? 0,
        };
    }
    attachClient(ws) {
        const owner = ws.data;
        const session = this.ensureSession(owner);
        session.clients.add(ws);
        this.send(ws, {
            type: "session",
            cwd: session.cwd,
            cols: session.cols,
            rows: session.rows,
            font_family: TERMINAL_FONT_FAMILY,
        });
    }
    handleMessage(ws, rawMessage) {
        const session = this.sessions.get(ws.data.token);
        if (!session)
            return;
        const messageText = typeof rawMessage === "string" ? rawMessage : Buffer.from(rawMessage).toString("utf8");
        const payload = this.parseClientMessage(messageText);
        if (payload.type === "input") {
            if (typeof payload.data === "string" && payload.data.length > 0) {
                session.process.stdin.write(payload.data);
            }
            return;
        }
        if (payload.type === "resize") {
            const cols = Number.isFinite(payload.cols) ? Math.max(20, Math.min(400, Math.floor(payload.cols))) : session.cols;
            const rows = Number.isFinite(payload.rows) ? Math.max(5, Math.min(200, Math.floor(payload.rows))) : session.rows;
            session.cols = cols;
            session.rows = rows;
            return;
        }
    }
    detachClient(ws) {
        const session = this.sessions.get(ws.data.token);
        if (!session)
            return;
        session.clients.delete(ws);
    }
    parseClientMessage(messageText) {
        try {
            return JSON.parse(messageText);
        }
        catch {
            return { type: "input", data: messageText };
        }
    }
    shutdown() {
        for (const session of this.sessions.values()) {
            try {
                session.process.kill("SIGHUP");
            }
            catch { }
        }
        this.sessions.clear();
    }
    ensureSession(owner) {
        const existing = this.sessions.get(owner.token);
        if (existing)
            return existing;
        const process = this.spawnProcess(WORKSPACE_DIR);
        const session = {
            owner,
            process,
            clients: new Set(),
            createdAt: new Date().toISOString(),
            cwd: WORKSPACE_DIR,
            cols: DEFAULT_COLS,
            rows: DEFAULT_ROWS,
        };
        process.stdout.on("data", (chunk) => {
            this.broadcast(session, { type: "output", data: normalizeChunk(chunk) });
        });
        process.stderr.on("data", (chunk) => {
            this.broadcast(session, { type: "output", data: normalizeChunk(chunk) });
        });
        process.on("exit", (code, signal) => {
            this.broadcast(session, { type: "exit", code: code ?? null, signal: signal ?? null });
            this.sessions.delete(owner.token);
        });
        this.sessions.set(owner.token, session);
        return session;
    }
    broadcast(session, payload) {
        const encoded = JSON.stringify(payload);
        for (const client of Array.from(session.clients)) {
            this.send(client, encoded, true);
        }
    }
    send(ws, payload, preEncoded = false) {
        try {
            ws.send(preEncoded ? payload : JSON.stringify(payload));
        }
        catch { }
    }
}
