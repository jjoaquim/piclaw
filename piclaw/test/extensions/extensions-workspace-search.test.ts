/**
 * test/extensions/extensions-workspace-search.test.ts – Tests for the workspace-search extension.
 *
 * Verifies search_workspace tool indexes workspace files and returns
 * matching results with correct scope filtering and pagination.
 */

import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import type { ExtensionAPI } from "@mariozechner/pi-coding-agent";
import path from "node:path";
import fs from "node:fs/promises";
import { createTempWorkspace, setEnv } from "../helpers.js";
import { initDatabase } from "../../src/db.js";
import { withChatContext } from "../../src/core/chat-context.js";

function makeFakeApi() {
  const tools = new Map<string, any>();
  return {
    api: {
      on() {},
      registerTool(tool: any) { tools.set(tool.name, tool); },
      registerCommand() {},
      registerShortcut() {},
      registerFlag() {},
      getFlag() { return undefined; },
      registerMessageRenderer() {},
      sendMessage() {},
      sendUserMessage() {},
      appendEntry() {},
      setSessionName() {},
      getSessionName() { return undefined; },
      setLabel() {},
      exec: async () => ({ exitCode: 0, stdout: "", stderr: "" }),
      getActiveTools: () => [],
      getAllTools: () => [],
      setActiveTools() {},
      getCommands: () => [],
      setModel: async () => true,
      getThinkingLevel: () => "off" as any,
      setThinkingLevel() {},
      registerProvider() {},
      unregisterProvider() {},
    } as unknown as ExtensionAPI,
    tools,
  };
}

describe("workspace-search extension", () => {
  let ws: ReturnType<typeof createTempWorkspace>;
  let restoreEnv: (() => void) | null = null;

  beforeEach(() => {
    ws = createTempWorkspace("piclaw-workspace-search-");
    restoreEnv = setEnv({
      PICLAW_WORKSPACE: ws.workspace,
      PICLAW_STORE: ws.store,
      PICLAW_DATA: ws.data,
    });
    initDatabase();
  });

  afterEach(() => {
    restoreEnv?.();
    restoreEnv = null;
    ws.cleanup();
  });

  async function seedWorkspace() {
    const notesDir = path.join(ws.workspace, "notes");
    const skillsDir = path.join(ws.workspace, ".pi", "skills", "demo");
    await fs.mkdir(notesDir, { recursive: true });
    await fs.mkdir(skillsDir, { recursive: true });
    await fs.writeFile(path.join(notesDir, "alpha.md"), "Alpha note about kittens.");
    await fs.writeFile(path.join(skillsDir, "SKILL.md"), "Demo skill that mentions kittens and puppies.");
  }

  async function getSearchTool() {
    const { workspaceSearch } = await import("../../src/extensions/workspace-search.js");
    const fake = makeFakeApi();
    workspaceSearch(fake.api);
    return fake.tools.get("search_workspace")!;
  }

  async function executeWithContext(tool: any, params: Record<string, unknown>) {
    return withChatContext("web:test", "web", () => tool.execute("c1", params));
  }

  test("registers search_workspace tool", async () => {
    const tool = await getSearchTool();
    expect(tool).toBeDefined();
    expect(tool.name).toBe("search_workspace");
  });

  test("indexes notes + skills and returns matches", async () => {
    await seedWorkspace();
    const tool = await getSearchTool();
    const result = await executeWithContext(tool, { query: "kittens", refresh: true });
    expect(result.details.count).toBe(2);
    expect(result.content[0].text).toContain("notes/alpha.md");
    expect(result.content[0].text).toContain(".pi/skills/demo/SKILL.md");
  });

  test("scope filters to notes or skills", async () => {
    await seedWorkspace();
    const tool = await getSearchTool();

    const notesOnly = await executeWithContext(tool, { query: "kittens", scope: "notes", refresh: true });
    expect(notesOnly.details.count).toBe(1);
    expect(notesOnly.content[0].text).toContain("notes/alpha.md");

    const skillsOnly = await executeWithContext(tool, { query: "kittens", scope: "skills", refresh: true });
    expect(skillsOnly.details.count).toBe(1);
    expect(skillsOnly.content[0].text).toContain(".pi/skills/demo/SKILL.md");
  });

  test("aggressively cleans up deleted files", async () => {
    await seedWorkspace();
    const tool = await getSearchTool();
    const first = await executeWithContext(tool, { query: "kittens", refresh: true });
    expect(first.details.count).toBe(2);

    await fs.rm(path.join(ws.workspace, "notes", "alpha.md"));
    const second = await executeWithContext(tool, { query: "kittens", refresh: true, scope: "notes" });
    expect(second.details.count).toBe(0);
  });

  test("skips oversized files and removes stale entries", async () => {
    const notesDir = path.join(ws.workspace, "notes");
    await fs.mkdir(notesDir, { recursive: true });
    const bigContent = "x".repeat(40 * 1024);
    await fs.writeFile(path.join(notesDir, "big.md"), bigContent);

    const tool = await getSearchTool();
    const first = await executeWithContext(tool, { query: "x", refresh: true, max_kb: 10 });
    expect(first.details.count).toBe(0);

    const smallContent = "tiny kittens";
    await fs.writeFile(path.join(notesDir, "big.md"), smallContent);
    const second = await executeWithContext(tool, { query: "kittens", refresh: true, max_kb: 10 });
    expect(second.details.count).toBe(1);
    expect(second.content[0].text).toContain("notes/big.md");
  });
});
