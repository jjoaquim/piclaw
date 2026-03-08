/**
 * test/utils/task-validation.test.ts – Validation tests for scheduled shell tasks.
 */
import { describe, expect, test } from "bun:test";
import "../helpers.js";
import { mkdirSync } from "fs";
import { resolve } from "path";
import { createTempWorkspace, setEnv } from "../helpers.js";
import { WORKSPACE_DIR } from "../../src/core/config.js";
import { validateShellCommand, validateShellCwd } from "../../src/utils/task-validation.js";

describe("validateShellCommand", () => {
  test("rejects empty command", () => {
    const res = validateShellCommand("   ");
    expect(res.ok).toBe(false);
  });

  test("rejects newlines", () => {
    const res = validateShellCommand("echo hi\nls");
    expect(res.ok).toBe(false);
  });

  test("rejects destructive commands", () => {
    const res = validateShellCommand("rm -rf /");
    expect(res.ok).toBe(false);
    expect(res.error).toContain("destructive");
  });

  test("accepts normal commands", () => {
    const res = validateShellCommand("echo hi");
    expect(res.ok).toBe(true);
    expect(res.command).toBe("echo hi");
  });
});

describe("validateShellCwd", () => {
  test("defaults to workspace", () => {
    const res = validateShellCwd(undefined);
    const expected = resolve(process.env.PICLAW_WORKSPACE || WORKSPACE_DIR);
    expect(res.ok).toBe(true);
    expect(res.cwd).toBe(expected);
  });

  test("rejects outside workspace", () => {
    const res = validateShellCwd("/etc");
    expect(res.ok).toBe(false);
  });

  test("rejects absolute sibling path that shares workspace prefix", () => {
    const ws = createTempWorkspace("task-cwd-");
    const restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace });
    const sibling = `${ws.workspace}-evil`;
    mkdirSync(sibling, { recursive: true });

    const res = validateShellCwd(sibling);
    expect(res.ok).toBe(false);

    restoreEnv();
    ws.cleanup();
  });
});
