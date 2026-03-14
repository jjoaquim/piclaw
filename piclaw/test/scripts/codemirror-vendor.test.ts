/**
 * test/scripts/codemirror-vendor.test.ts – Smoke tests for the
 * manifest-driven CodeMirror vendor build path.
 */

import { expect, test } from "bun:test";
import { createHash } from "node:crypto";
import { existsSync, mkdirSync, readFileSync, rmSync } from "node:fs";
import { tmpdir } from "node:os";
import { join } from "node:path";

test("generic vendored dependency build script writes codemirror bundle + metadata deterministically", () => {
  const base = join(tmpdir(), `piclaw-codemirror-vendor-${Date.now()}`);
  const outFile = join(base, "codemirror.js");
  const metaFile = join(base, "codemirror.meta.json");
  mkdirSync(base, { recursive: true });

  const proc = Bun.spawnSync(
    [
      "bun",
      "/workspace/piclaw/piclaw/scripts/build-vendored-dependency.ts",
      "--manifest",
      "vendor-manifests/codemirror-editor.json",
      "--outfile",
      outFile,
      "--meta-out",
      metaFile,
    ],
    {
      cwd: "/workspace/piclaw/piclaw",
      stdout: "pipe",
      stderr: "pipe",
    },
  );

  if (proc.exitCode !== 0) {
    throw new Error(`${proc.stdout.toString()}\n${proc.stderr.toString()}`.trim());
  }

  expect(existsSync(outFile)).toBe(true);
  expect(existsSync(metaFile)).toBe(true);

  const bundle = readFileSync(outFile);
  const meta = JSON.parse(readFileSync(metaFile, "utf8")) as {
    manifest_id: string;
    package_name: string;
    package_version: string;
    output_file: string;
    source_entry: string;
    sha256: string;
    size_bytes: number;
  };

  const installed = JSON.parse(
    readFileSync("/workspace/piclaw/piclaw/node_modules/codemirror/package.json", "utf8"),
  ) as { version: string };

  expect(meta.manifest_id).toBe("codemirror-editor");
  expect(meta.package_name).toBe("codemirror");
  expect(meta.package_version).toBe(installed.version);
  expect(meta.source_entry).toBe("extensions/editor/vendor/codemirror-entry.ts");
  expect(meta.output_file.endsWith("codemirror.js")).toBe(true);
  expect(meta.size_bytes).toBe(bundle.byteLength);
  expect(meta.sha256).toBe(createHash("sha256").update(bundle).digest("hex"));
  expect(bundle.toString("utf8")).toContain("@codemirror/state");

  rmSync(base, { recursive: true, force: true });
});
