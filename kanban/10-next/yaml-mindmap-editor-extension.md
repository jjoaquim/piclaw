---
id: yaml-mindmap-editor-extension
title: Add pluggable .mindmap.yaml editor extension
status: next
priority: medium
created: 2026-03-12
updated: 2026-03-12
estimate: M
risk: medium
target_release: next
tags:
  - work-item
  - kanban
  - web
  - editor
  - extension
  - pane
  - mindmap
  - yaml
owner: pi
---

# Add pluggable .mindmap.yaml editor extension

## Summary

Add a dedicated editor/viewer extension for `.mindmap.yaml` files that uses an existing mind-map source (from another project) as a pluggable extension, integrated through the existing `WebPaneExtension` framework.

The feature should allow rendering/editing mind maps from YAML source without hard-coding behavior into the workspace explorer/editor surfaces. The core constraint is that the implementation should treat the external mind-map engine as an embedded/packaged dependency and load it as an extension module.

## Why

Current workspace text editing/editing is optimized for code and docs. A YAML-based mind map format is a structured artifact that needs a specialized editor for meaningful interaction. Using an extension avoids bloating core code and follows the same pluggable model used for editor tabs.

## Scope

### In scope
- Implement a new `WebPaneExtension`-style extension for files matching `*.mindmap.yaml` (and optionally `.mindmap.yml`).
- Parse and render YAML-backed mind maps via the external source project logic.
- Support save/update back to workspace through existing file API (`getWorkspaceFile`, `updateWorkspaceFile`).
- Show clear fallback behavior when parser/runtime is unavailable.
- Keep extension load and registration compatible with existing lazy-extension patterns.

### Out of scope
- Replacing existing workspace editor behavior for general `.yaml`/`.yml` files.
- Full real-time collaborative mind-map sync.
- Native mobile authoring controls beyond current web support.
- Backend rendering engine rewrite.

## Desired behavior

- When a file with `.mindmap.yaml` is opened in the content area, it should open with the mind map extension by default.
- Users can create/update nodes visually.
- Changes are persisted to the source YAML in the workspace.
- At minimum, support export of rendered mind map (SVG/PNG/PDF depending on source capabilities).
- Unknown parse errors should surface in a stable read-only fallback with diagnostics.

## Source/project constraint

The implementation should be pluggable and based on the existing upstream/source code from another project:
- Do not rebuild core map semantics in `workspace-explorer.ts`.
- Prefer embedding or wrapping the external source module via:
  - local vendored bundle wrapper, or
  - iframe bridge, or
  - adapter layer,
  consistent with current extension architecture.
- Keep a clear integration boundary so source updates can be bumped independently.

## Acceptance Criteria

- [ ] `.mindmap.yaml` opens in a dedicated mind map extension pane.
- [ ] Extension is discoverable through `WebPaneExtension` registration.
- [ ] Load/save cycle round-trips YAML reliably.
- [ ] Extension gracefully handles malformed YAML (validation + diagnostics).
- [ ] Non-mindmap YAML continues to use default handling.
- [ ] Export capability exists (at least render-to-image where supported).
- [ ] Works with existing editor/tab lifecycle (dirty tracking, focus, close, reopen).
- [ ] Ticket includes path mapping to the source dependency and any licensing considerations.

## Implementation paths

### Path A — Vendored iframe embed (recommended)
1. Vendor/lock the external mind-map source into web-facing artifact(s).
2. Add a thin extension wrapper that mounts an iframe or host container and handles:
   - open file load
   - serialize-to-YAML
   - save callbacks
   - export commands
3. Register with pane system as a high-priority handler for mind-map YAML.

Pros: lower coupling, predictable upgrade path if upstream is not module-friendly.

### Path B — Direct module integration
1. Vendor source as JS module (or ESM wrapper).
2. Build a direct extension class around renderer hooks.
3. Wire model parsing and serialization inside extension.

Pros: better performance and tighter integration.

### Path C — Sidecar renderer service
1. Stand up a local render service or worker-like bridge for YAML transformation.
2. Keep web pane as thin shell over data API.

Pros: isolates heavy parsing from UI runtime.

Cons: extra runtime and IPC complexity.

## Recommended path

Start with **Path A** for earliest validation, then move to **Path B** only if runtime messaging overhead is too high.

## Relevant files

- `piclaw/piclaw/web/src/panes/pane-types.ts`
- `piclaw/piclaw/web/src/panes/pane-registry.ts`
- `piclaw/piclaw/web/src/panes/index.ts`
- `piclaw/piclaw/web/src/app.ts`
- `piclaw/piclaw/web/src/api.ts` (`getWorkspaceFile`, `updateWorkspaceFile`)
- `piclaw/piclaw/web/src/components/workspace-explorer.ts` (open file context for `.mindmap.yaml`)
- `piclaw/piclaw/docs/web-pane-extensions.md`
- any vendoring/build scripts if external source is packaged

## Test plan

### Automated
- Unit tests for extension registration resolution and file extension matching.
- Integration-style test for load/save roundtrip with sample `.mindmap.yaml` fixture.
- Error-path test for malformed YAML and fallback rendering.

### Manual
- Open a valid `.mindmap.yaml` file and edit nodes.
- Save and confirm file diff.
- Open malformed mindmap YAML and verify readable diagnostics.
- Verify non-mindmap YAML opens in standard flow.
- Confirm export action works (or documents unsupported action gracefully).

## Definition of Done

- [ ] Extension implemented and registered for `.mindmap.yaml`.
- [ ] Load/save path validated end-to-end.
- [ ] Export path documented/tested.
- [ ] Malformed input handled without crashing UI.
- [ ] Update `docs/web-pane-extensions.md` or companion docs with usage notes.
- [ ] Ticket front matter updated on completion (`status`, `updated`, `completed`).
- [ ] Ticket moved to `50-done/` when shipped.

## Notes

This ticket intentionally avoids reworking existing `.yaml` semantics first; it introduces a type-specific override path for mind-maps only.

## Updates

### 2026-03-12
- Added at user request to support `.mindmap.yaml` as a pluggable extension using external source code from another project.
- Emphasis set on extension-based integration so the core workspace/editor surfaces remain unchanged.
