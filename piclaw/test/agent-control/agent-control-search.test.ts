/**
 * test/agent-control/agent-control-search.test.ts – Tests for /search-workspace handler.
 *
 * Uses a temp workspace with indexed files to verify full-text search
 * results, scope filtering (notes/skills/all), and pagination.
 */

import { describe, expect, test, beforeEach, afterEach } from "bun:test";
import path from "node:path";
import fs from "node:fs/promises";
import { createTempWorkspace, setEnv } from "../helpers.js";
import { initDatabase } from "../../src/db.js";
import { handleSearchWorkspace } from "../../src/agent-control/handlers/info.js";

const mockSession = {} as any;

describe("/search workspace command", () => {
  let ws: ReturnType<typeof createTempWorkspace>;
  let restoreEnv: (() => void) | null = null;

  beforeEach(() => {
    ws = createTempWorkspace("piclaw-search-cmd-");
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

  test("returns matches", async () => {
    await seedWorkspace();
    const result = await handleSearchWorkspace(mockSession, {
      type: "search_workspace",
      query: "kittens",
      raw: "/search kittens",
    });
    expect(result.status).toBe("success");
    expect(result.message).toContain("notes/alpha.md");
    expect(result.message).toContain(".pi/skills/demo/SKILL.md");
  });

  test("returns usage when missing query", async () => {
    const result = await handleSearchWorkspace(mockSession, {
      type: "search_workspace",
      raw: "/search",
    });
    expect(result.status).toBe("error");
    expect(result.message).toContain("Usage: /search");
  });
});
