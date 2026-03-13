---
id: file-preview-pane-as-extension
title: Convert workspace file preview pane into an extension via the pane extension framework
status: doing
priority: high
created: 2026-03-12
updated: 2026-03-13
estimate: M
risk: medium
target_release: next
tags:
  - work-item
  - kanban
  - web
  - ui
  - panes
  - extension
  - workspace
owner: pi
---

# Convert workspace file preview pane into an extension via the pane extension framework

## Summary

Refactor the workspace explorer file-preview panel to use our existing `WebPaneExtension` mechanism so specific file types can opt into custom preview behavior.

Today the preview rendering logic is hard-coded in `workspace-explorer.ts` (images/text/binary markdown handling inline). We need that flow to become extension-driven, with a default fallback extension and override support for specialized types.

The goal is to support:
- pluggable preview renderers per file type,
- clean extension-based overrides,
- and a stable migration path for richer preview tooling (e.g., PDFs, audio, video, drawio, custom editor-driven previews).

## Why

This unlocks file-type-specific UX without branching the workspace explorer logic. Specific previews (e.g., drawio, structured config, archives, notebooks, images) can be added independently as extensions.

## Current behavior (targeted)

`WorkspaceExplorer` currently renders preview content directly from `preview.kind`:
- images via `<img>`
- markdown via `renderMarkdown`
- text via `<pre><code>`
- binaries as a generic download message

This logic lives in a single component and is not extensible.

## Target design

### 1) Introduce a preview-extension contract using existing framework

Use the current `WebPaneExtension` ecosystem (or a narrow sibling interface) with preview-specific dispatch:
- use pane capabilities (`preview` / `readonly`) for preview providers,
- call `canHandle(context)` with file path and preview payload,
- prioritize explicit extension handlers.

### 2) Register a built-in fallback preview extension

Create a default preview extension that preserves current behavior for:
- image files
- markdown
- short text previews
- binary/unrecognized files (download prompt)

### 3) Hook explorer to extension registry

Resolve and mount preview provider from selected file context in the preview panel:
- try registry handlers first,
- fallback to default extension,
- provide path/mimetype/size/mtime/content/error context.

### 4) Make overrides practical

- new/third-party file extensions can be added in dedicated extension modules,
- higher priority renderers override defaults (e.g., `.drawio`, `.json`, `.csv`, `.ipynb`, binary formats).

## Acceptance Criteria

- [ ] File preview rendering in `WorkspaceExplorer` is dispatched through the extension mechanism.
- [ ] A default fallback preview extension is provided and matches current functional behavior.
- [ ] At least one non-default override pattern is supported (or one example extension added).
- [ ] Existing actions in preview header (download/open-in-editor/delete/new file) continue to work.
- [ ] Unsupported/unknown file types still have a safe fallback UI.
- [ ] Workspace explorer preview tests are updated to cover extension resolution and fallback behavior.
- [ ] Manual behavior of text/image/markdown previews remains functionally unchanged for existing file types.

## In scope
- `piclaw/piclaw/web/src/components/workspace-explorer.ts`
- New/updated preview extension registration in:
  - `piclaw/piclaw/web/src/panes` (or a small `workspace-preview/` sibling)
  - `piclaw/piclaw/web/src/app.ts` when registering preview extensions.
- `piclaw/piclaw/web/src/pane-types.ts` if contract/type additions are needed.
- `piclaw/piclaw/docs/web-pane-extensions.md` for doc update.

## Out of scope
- Reworking the editor pane system itself.
- Replacing file API shapes in `src/channels/web/workspace`.
- Introducing full backend rendering pipelines in this ticket.

## Implementation paths

### Path A — Extend `WebPaneExtension` for preview capability (recommended)
1. Define/standardize a preview context object for selected files.
2. Use existing `paneRegistry` resolution with `PaneCapability`/`canHandle`.
3. Implement built-in fallback preview extension in `web` sources.
4. Add a light `preview` renderer host component inside workspace explorer that mounts/unmounts preview pane instances.

**Pros:** uses the same extension framework and keeps discovery model familiar.

### Path B — New `previewRegistry` (parallel to pane registry)
1. Introduce a separate registry dedicated to workspace previews.
2. Migrate preview rendering only, leaving pane system untouched.

**Pros:** minimal blast radius if extension interface cannot cover both tab and side-pane constraints.

**Cons:** adds another framework instead of leveraging the existing one.

### Path C — API plugin contracts first
1. Add file-preview metadata in workspace API to include renderer hints.
2. Drive extension selection from metadata.

**Pros:** backend-driven, explicit file typing.

**Cons:** couples UI to backend decisions and adds additional scope.

## Recommended path

Start with **Path A** and, if side-pane hosting creates friction, add a thin adapter within `workspace-explorer.ts` rather than creating a parallel registry.

## Test plan

### Automated
- Unit tests for preview resolution and fallback ordering.
- Regression tests for markdown/text/image rendering parity with existing behavior.
- Coverage for extension registration/unregistration lifecycle if implemented via app-level registry.

### Manual
- Open a text file, image, and markdown file in explorer and compare preview output.
- Add a temporary custom override extension for one extension type and verify override wins.
- Confirm download action still appears for binary files.
- Verify selected path changes update preview pane consistently while editing/sse events are in flight.

## Definition of Done

- [ ] Extension-based preview dispatch implemented and default fallback preserved.
- [ ] One custom override renderer validated.
- [ ] Test coverage updated with at least one fallback and one override test.
- [ ] No UI regression in explorer preview actions.
- [ ] Docs updated for extension authors (preview extension example/registration).
- [ ] Ticket front matter updated on completion (`status`, `completed`).

## Updates

### 2026-03-13
- Moved from next to doing.
- Prioritized ahead of unsupported-file preview improvements so preview behavior can move into the extension model first.
- This should reduce churn by making later preview UX changes land in the fallback preview extension instead of adding more branching to `workspace-explorer.ts`.

### 2026-03-12
- Added to track converting the workspace explorer preview pane to an extension-driven renderer using the existing extension system so overrides by file type become supported and maintainable.
- Quality (draft): ★★★☆☆ 6/10 (problem: 2, scope: 2, test: 1, deps: 1, risk: 2)
- Next action: decide extension interface shape (pure reuse of `WebPaneExtension` with preview context vs a preview-only adapter) and create first built-in preview extension refactor.
