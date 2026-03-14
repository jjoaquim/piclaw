import { spawn, type ChildProcessWithoutNullStreams } from "node:child_process";
import type { ServerWebSocket } from "bun";

import { WORKSPACE_DIR } from "../../../core/config.js";
import { DEFAULT_WEB_USER_ID, getWebSession } from "../../../db.js";
import { getSessionTokenFromRequest } from "../session-auth.js";

export interface TerminalSessionOwner {
  token: string;
  userId: string;
}

export interface TerminalClientMessageInput {
  type: "input";
  data: string;
}

export interface TerminalClientMessageResize {
  type: "resize";
  cols: number;
  rows: number;
}

export type TerminalClientMessage = TerminalClientMessageInput | TerminalClientMessageResize;

export type TerminalSocketData = TerminalSessionOwner;

interface TerminalProcessLike {
  stdin: { write(chunk: string | Uint8Array): void; end?(): void };
  stdout: { on(event: "data", listener: (chunk: string | Uint8Array) => void): unknown };
  stderr: { on(event: "data", listener: (chunk: string | Uint8Array) => void): unknown };
  on(event: "exit", listener: (code: number | null, signal: NodeJS.Signals | null) => void): unknown;
  kill(signal?: NodeJS.Signals | number): boolean;
}

export interface TerminalSessionServiceOptions {
  spawnProcess?: (cwd: string) => TerminalProcessLike;
}

interface TerminalSessionRecord {
  owner: TerminalSessionOwner;
  process: TerminalProcessLike;
  clients: Set<ServerWebSocket<TerminalSocketData>>;
  createdAt: string;
  cwd: string;
  cols: number;
  rows: number;
}

const DEFAULT_COLS = 120;
const DEFAULT_ROWS = 30;
const TERMINAL_FONT_FAMILY = "FiraCode Nerd Font Mono";
const FALLBACK_TERMINAL_OWNER: TerminalSessionOwner = {
  token: "web-terminal-local-default",
  userId: DEFAULT_WEB_USER_ID,
};

function normalizeChunk(chunk: string | Uint8Array): string {
  if (typeof chunk === "string") return chunk;
  return Buffer.from(chunk).toString("utf8");
}

function defaultSpawnProcess(cwd: string): TerminalProcessLike {
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
  }) as ChildProcessWithoutNullStreams;
}

export class TerminalSessionService {
  private readonly sessions = new Map<string, TerminalSessionRecord>();
  private readonly spawnProcess: (cwd: string) => TerminalProcessLike;

  constructor(options: TerminalSessionServiceOptions = {}) {
    this.spawnProcess = options.spawnProcess ?? defaultSpawnProcess;
  }

  resolveOwnerFromRequest(req: Request, allowUnauthenticated = false): TerminalSessionOwner | null {
    const token = getSessionTokenFromRequest(req);
    if (token) {
      const session = getWebSession(token);
      if (session) {
        return { token, userId: session.user_id };
      }
    }
    return allowUnauthenticated ? { ...FALLBACK_TERMINAL_OWNER } : null;
  }

  getSessionInfo(owner: TerminalSessionOwner) {
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

  attachClient(ws: ServerWebSocket<TerminalSocketData>): void {
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

  handleMessage(ws: ServerWebSocket<TerminalSocketData>, rawMessage: string | Buffer | Uint8Array): void {
    const session = this.sessions.get(ws.data.token);
    if (!session) return;

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

  detachClient(ws: ServerWebSocket<TerminalSocketData>): void {
    const session = this.sessions.get(ws.data.token);
    if (!session) return;
    session.clients.delete(ws);
  }

  private parseClientMessage(messageText: string): TerminalClientMessage {
    try {
      return JSON.parse(messageText) as TerminalClientMessage;
    } catch {
      return { type: "input", data: messageText };
    }
  }

  shutdown(): void {
    for (const session of this.sessions.values()) {
      try {
        session.process.kill("SIGHUP");
      } catch {}
    }
    this.sessions.clear();
  }

  private ensureSession(owner: TerminalSessionOwner): TerminalSessionRecord {
    const existing = this.sessions.get(owner.token);
    if (existing) return existing;

    const process = this.spawnProcess(WORKSPACE_DIR);
    const session: TerminalSessionRecord = {
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

  private broadcast(session: TerminalSessionRecord, payload: Record<string, unknown>): void {
    const encoded = JSON.stringify(payload);
    for (const client of Array.from(session.clients)) {
      this.send(client, encoded, true);
    }
  }

  private send(ws: ServerWebSocket<TerminalSocketData>, payload: string | Record<string, unknown>, preEncoded = false): void {
    try {
      ws.send(preEncoded ? (payload as string) : JSON.stringify(payload));
    } catch {}
  }
}
