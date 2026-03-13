/**
 * test/web/workspace-preview-pane.test.ts – Resolution tests for workspace preview pane extensions.
 */

import { afterEach, beforeEach, describe, expect, test } from "bun:test";

import { paneRegistry } from "../../web/src/panes/pane-registry.js";
import { editorPaneExtension } from "../../web/src/panes/editor-loader.js";
import {
  workspaceMarkdownPreviewPaneExtension,
  workspacePreviewPaneExtension,
} from "../../web/src/panes/workspace-preview-pane.js";

const registeredIds = [
  editorPaneExtension.id,
  workspacePreviewPaneExtension.id,
  workspaceMarkdownPreviewPaneExtension.id,
];

function resetRegistry() {
  for (const id of registeredIds) {
    paneRegistry.unregister(id);
  }
}

describe("workspace preview pane extensions", () => {
  beforeEach(() => {
    resetRegistry();
  });

  afterEach(() => {
    resetRegistry();
  });

  test("editor pane does not claim view-mode preview contexts", () => {
    expect(editorPaneExtension.canHandle?.({ path: "notes/test.md", mode: "view" })).toBe(false);
    expect(editorPaneExtension.canHandle?.({ path: "notes/test.md", mode: "edit" })).toBe(1);
  });

  test("markdown preview override wins over the default preview pane", () => {
    paneRegistry.register(editorPaneExtension);
    paneRegistry.register(workspacePreviewPaneExtension);
    paneRegistry.register(workspaceMarkdownPreviewPaneExtension);

    const resolved = paneRegistry.resolve({
      path: "notes/test.md",
      mode: "view",
      preview: {
        kind: "text",
        content_type: "text/markdown",
        text: "# Hello",
      },
    });

    expect(resolved?.id).toBe("workspace-markdown-preview");
  });

  test("default preview pane handles non-markdown file previews", () => {
    paneRegistry.register(editorPaneExtension);
    paneRegistry.register(workspacePreviewPaneExtension);
    paneRegistry.register(workspaceMarkdownPreviewPaneExtension);

    const resolved = paneRegistry.resolve({
      path: "archive.bin",
      mode: "view",
      preview: {
        kind: "binary",
        content_type: "application/octet-stream",
      },
    });

    expect(resolved?.id).toBe("workspace-preview-default");
  });
});
