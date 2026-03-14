import { beforeEach, expect, test } from "bun:test";

import { createWebSession, deleteExpiredWebSessions, getDb, initDatabase } from "../../../src/db.js";
import { TerminalSessionService } from "../../../src/channels/web/terminal/terminal-session-service.js";

class FakeStream {
  listeners: Array<(chunk: string) => void> = [];

  on(event: "data", listener: (chunk: string) => void) {
    if (event === "data") this.listeners.push(listener);
  }

  emit(chunk: string) {
    for (const listener of this.listeners) listener(chunk);
  }
}

class FakeProcess {
  stdinWrites: string[] = [];
  stdout = new FakeStream();
  stderr = new FakeStream();
  exitListeners: Array<(code: number | null, signal: NodeJS.Signals | null) => void> = [];
  killed = false;

  stdin = {
    write: (chunk: string | Uint8Array) => {
      this.stdinWrites.push(typeof chunk === "string" ? chunk : Buffer.from(chunk).toString("utf8"));
    },
    end: () => {},
  };

  on(event: "exit", listener: (code: number | null, signal: NodeJS.Signals | null) => void) {
    if (event === "exit") this.exitListeners.push(listener);
  }

  kill() {
    this.killed = true;
    return true;
  }

  emitExit(code: number | null = 0, signal: NodeJS.Signals | null = null) {
    for (const listener of this.exitListeners) listener(code, signal);
  }
}

beforeEach(() => {
  initDatabase();
  getDb().prepare("DELETE FROM web_sessions").run();
  deleteExpiredWebSessions(new Date(Date.now() + 10 * 365 * 24 * 60 * 60 * 1000));
});

test("terminal session service resolves owner from web session cookie", () => {
  createWebSession("terminal-token", "user-1", 3600, "totp");
  const service = new TerminalSessionService({
    spawnProcess: () => new FakeProcess() as any,
  });

  const req = new Request("https://example.com/terminal/session", {
    headers: { cookie: "piclaw_session=terminal-token" },
  });

  expect(service.resolveOwnerFromRequest(req)).toEqual({ token: "terminal-token", userId: "user-1" });
});

test("terminal session service falls back to the local default owner when allowed", () => {
  const service = new TerminalSessionService({
    spawnProcess: () => new FakeProcess() as any,
  });

  const req = new Request("https://example.com/terminal/session");
  expect(service.resolveOwnerFromRequest(req, true)).toEqual({
    token: "web-terminal-local-default",
    userId: "default",
  });
});

test("terminal session service spawns one shell per web session and relays IO", () => {
  createWebSession("terminal-io", "user-io", 3600, "totp");
  const processes: FakeProcess[] = [];
  const service = new TerminalSessionService({
    spawnProcess: () => {
      const proc = new FakeProcess();
      processes.push(proc);
      return proc as any;
    },
  });

  const owner = { token: "terminal-io", userId: "user-io" };
  const sent: string[] = [];
  const ws = {
    data: owner,
    send: (payload: string) => sent.push(payload),
  } as any;

  expect(service.getSessionInfo(owner).active).toBe(false);
  service.attachClient(ws);
  expect(processes.length).toBe(1);
  expect(service.getSessionInfo(owner).active).toBe(true);
  expect(service.getSessionInfo(owner).connected_clients).toBe(1);

  service.handleMessage(ws, JSON.stringify({ type: "input", data: "pwd\n" }));
  service.handleMessage(ws, JSON.stringify({ type: "resize", cols: 100, rows: 40 }));

  expect(processes[0].stdinWrites.some((entry) => entry.includes("pwd\n"))).toBe(true);
  expect(processes[0].stdinWrites.some((entry) => entry.includes("stty cols 100 rows 40"))).toBe(false);
  expect(processes[0].stdinWrites.some((entry) => entry.includes("\\033[?25h"))).toBe(false);

  processes[0].stdout.emit("hello from shell\r\n");
  expect(sent.some((payload) => payload.includes("hello from shell"))).toBe(true);

  processes[0].emitExit(0, null);
  expect(service.getSessionInfo(owner).active).toBe(false);
});

test("terminal session shutdown kills live shells", () => {
  const proc = new FakeProcess();
  const service = new TerminalSessionService({
    spawnProcess: () => proc as any,
  });
  const owner = { token: "terminal-shutdown", userId: "user-shutdown" };
  const ws = {
    data: owner,
    send: () => {},
  } as any;

  service.attachClient(ws);
  service.shutdown();
  expect(proc.killed).toBe(true);
});
