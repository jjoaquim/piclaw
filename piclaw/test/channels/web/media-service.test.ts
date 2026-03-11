import { afterAll, beforeAll, expect, test } from "bun:test";
import { writeFileSync, unlinkSync } from "fs";
import { join } from "path";

import { getTestWorkspace, setEnv } from "../../helpers.js";
import { MediaService } from "../../../src/channels/web/media-service.js";

let restoreEnv: (() => void) | null = null;
let db: typeof import("../../../src/db.js");

beforeAll(async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({
    PICLAW_WORKSPACE: ws.workspace,
    PICLAW_STORE: ws.store,
    PICLAW_DATA: ws.data,
  });

  db = await import("../../../src/db.js");
  db.initDatabase();
});

afterAll(() => {
  restoreEnv?.();
});

test("createFromPath stores allowed files", async () => {
  const mediaPath = join(process.env.PICLAW_DATA || "/tmp", `media-${Date.now()}.svg`);
  writeFileSync(mediaPath, "<svg xmlns='http://www.w3.org/2000/svg'></svg>");

  const service = new MediaService();
  const res = await service.createFromPath(mediaPath, "image/svg+xml", "inline-test.svg");

  expect(res.status).toBe(200);
  const body = res.body as { id?: number; filename?: string; contentType?: string };
  expect(typeof body.id).toBe("number");
  expect(body.filename).toBe("inline-test.svg");
  expect(body.contentType).toBe("image/svg+xml");

  unlinkSync(mediaPath);
});

test("createFromPath returns 404 for unreadable missing file", async () => {
  const service = new MediaService();
  const missingPath = join(process.env.PICLAW_DATA || "/tmp", `missing-${Date.now()}.png`);

  const res = await service.createFromPath(missingPath, "image/png");
  expect(res.status).toBe(404);
});

test("createFromPath rejects unsupported content type", async () => {
  const mediaPath = join(process.env.PICLAW_DATA || "/tmp", `media-${Date.now()}.bin`);
  writeFileSync(mediaPath, "not media");

  const service = new MediaService();
  const res = await service.createFromPath(mediaPath, "application/x-msdownload");

  expect(res.status).toBe(415);
  expect((res.body as { error?: string }).error).toContain("Unsupported media type");

  unlinkSync(mediaPath);
});
