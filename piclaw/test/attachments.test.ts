import { afterEach, expect, test } from "bun:test";
import { writeFileSync } from "fs";
import { join } from "path";
import { getTestWorkspace, setEnv } from "./helpers.js";

let restoreEnv: (() => void) | null = null;

afterEach(() => {
  restoreEnv?.();
  restoreEnv = null;
});

test("attach_file tool stores media and registers attachment", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../src/db.js");
  db.initDatabase();

  const filePath = join(ws.workspace, "hello.txt");
  writeFileSync(filePath, "hello", "utf8");

  const { AttachmentRegistry, createAttachmentTool } = await import("../src/agent-pool/attachments.js");

  const registry = new AttachmentRegistry();
  const tool = createAttachmentTool("web:default", registry);

  const result = await tool.execute("call", { path: "hello.txt" }, undefined, undefined, undefined);
  const details = result.details as any;
  expect(details.media_id).toBeDefined();

  const media = db.getMediaById(details.media_id);
  expect(media?.filename).toBe("hello.txt");
  expect(media?.metadata?.size).toBe(5);
  expect(media?.metadata?.kind).toBe("file");

  const pending = registry.take("web:default");
  expect(pending.length).toBe(1);
  expect(pending[0].id).toBe(details.media_id);
});

test("web processChat stores attachment content blocks", async () => {
  const ws = getTestWorkspace();
  restoreEnv = setEnv({ PICLAW_WORKSPACE: ws.workspace, PICLAW_STORE: ws.store, PICLAW_DATA: ws.data });

  const db = await import("../src/db.js");
  db.initDatabase();
  db.storeChatMetadata("web:default", new Date().toISOString(), "Web");

  const mediaId = db.createMedia(
    "report.txt",
    "text/plain",
    new TextEncoder().encode("report"),
    null,
    { size: 6 }
  );

  db.storeMessage({
    id: `msg-${Math.random()}`,
    chat_jid: "web:default",
    sender: "user",
    sender_name: "User",
    content: "Please send the report",
    timestamp: new Date().toISOString(),
    is_from_me: false,
    is_bot_message: false,
  });

  const webMod = await import("../src/channels/web.js");
  const web = new (webMod.WebChannel as any)({
    queue: { enqueue: () => {} },
    agentPool: {
      runAgent: async () => ({
        status: "success",
        result: "Here is the report: attachment:report.txt",
        attachments: [
          {
            id: mediaId,
            name: "report.txt",
            contentType: "text/plain",
            size: 6,
            kind: "file",
            sourcePath: "/tmp/report.txt",
          },
        ],
      }),
    },
  });

  await (web as any).processChat("web:default", "default");

  const timeline = db.getTimeline("web:default", 10);
  const last = timeline[timeline.length - 1];
  expect(last.data.media_ids).toEqual([mediaId]);
  expect(last.data.content_blocks?.[0]).toMatchObject({
    type: "file",
    name: "report.txt",
    mime_type: "text/plain",
    size: 6,
  });
});
