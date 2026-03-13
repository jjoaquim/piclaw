---
id: drawio-editor-pane
title: Vendor and embed draw.io editor as an extension-pane with SVG/PNG export
status: next
priority: medium
risk: medium
estimate: M
target_release: next
created: 2026-03-12
updated: 2026-03-12
tags:
  - work-item
  - kanban
  - editor
  - pane-extensions
  - vendor
  - diagram
  - drawio
  - ui
owner: pi
---

# Vendor and embed draw.io editor as an extension-pane with SVG/PNG export

## Summary

Add a first-class **diagram editor pane** in the web UI using the existing `WebPaneExtension` mechanism. The pane should embed a draw.io (diagrams.net) editor, support opening `.drawio`/`.dio`/`*.xml` diagram files from the workspace, and export both **SVG** and **PNG** outputs.

This ticket includes both:

1. **Vendoring/build pipeline** for the chosen draw.io web runtime.
2. **Editor pane extension** that hooks into `panes`/`tab` lifecycle.
3. **Export flow** from the pane to workspace or attachment context.
4. **Candidate sweep** with at least one VS Code extension inspiration path.

## Why

The current workspace editor is text-first. A true diagram editor improves architecture/design workflows, status reporting visuals, and planning diagrams directly in the same workspace flow.

## Current candidate options (known) to research/verify

Based on ecosystem familiarity and prior art:

- `hediet.vscode-drawio` (VS Code extension, strong feature parity for draw.io editing)
- diagrams.net / draw.io `embed` integration path (`embed.diagrams.net`)
- `mxgraph` / `@maxgraph/core`-style drawing runtime lineage for possible local embedding
- Self-hosted/editor-hosted integration patterns used by existing VS Code drawio extensions

> Action required: verify exact packaging + licensing + offline/local-hosting suitability for each option before implementation.

## Scope

### In scope
- Implement one pane that can:
  - load `.drawio`, `.dio`, and `.xml` diagram files into an editor
  - save updates back to workspace file
  - export current diagram as SVG and PNG
- Vendored editor assets in-repo for reproducible builds.
- Register the pane via the extension mechanism (`WebPaneExtension`).
- Add command/UI affordance for export (`Export SVG`, `Export PNG`).
- Keep non-functional styling consistent with existing clean functional visual direction.

### Out of scope
- Full cloud diagram sharing / multi-document sync
- Generalized visual editor plugin marketplace
- Full webterm/AI-assisted diagram generation (future follow-up)

## Acceptance Criteria

- [ ] Draw.io/diagrams.net editor runtime is embedded as an **editor pane extension** (tabs placement).
- [ ] `.drawio` files can be opened in the pane by default (with clear overrides if extension/mode not detected).
- [ ] Pane persists changes to workspace via existing file APIs.
- [ ] Export action supports:
  - `SVG` download
  - `PNG` download
  - both saved into workspace or surfaced for attach in timeline workflow.
- [ ] Export format selection is explicit and deterministic.
- [ ] Draw.io runtime is vendored/reproducible (no ad-hoc remote dependency at runtime).
- [ ] Manual test exists for open/edit/export cycle.
- [ ] Ticket updates include which candidate path was selected and why.

## Implementation paths

### Path A — `embed.diagrams.net` in iframe + postMessage bridge (recommended first)
1. Add a vendored local/static loader strategy around draw.io web embed.
2. Implement draw.io pane as a thin wrapper around an iframe / host bridge.
3. Implement open/save + export via `postMessage` contract.
4. On save, persist XML/string content through `updateWorkspaceFile`.
5. Add explicit `Export SVG` and `Export PNG` menu actions.

**Pros:** fast to ship, avoids building complex editor internals; preserves diagrams semantics from source.  
**Cons:** cross-window messaging contract complexity; must harden security/sizing.

### Path B — direct canvas integration via local drawio/mxgraph bundle
1. Vendor the needed JS libraries directly.
2. Build a custom pane that boots the editor runtime in-container.
3. Expose export APIs directly for SVG/PNG.

**Pros:** more control, fewer embedding assumptions.
**Cons:** significantly more work; dependency complexity and versioning risk.

### Path C — leverage an existing open editor SDK from VS Code extension source
1. Read one or more VS Code draw.io extensions for architecture and save/export behavior.
2. Re-implement only the compatible subset required for pane mode.

**Pros:** established UX behavior for users with VS Code familiarity.
**Cons:** extension code not designed for browser pane context; adaptation effort high.

## Recommended path

Start with **Path A** for first integration proof, then evaluate Path B only if messaging/security constraints are blocking.

## Refs for implementation mapping

- `piclaw/piclaw/web/src/panes/index.ts`
- `piclaw/piclaw/web/src/panes/pane-types.ts`
- `piclaw/piclaw/web/src/panes/pane-registry.ts`
- `piclaw/piclaw/web/src/app.ts`
- `piclaw/piclaw/web/src/api.ts` (`getWorkspaceFile`, `updateWorkspaceFile`)
- `piclaw/piclaw/src/channels/web/workspace/file-service.ts` (text/binary gating + mode=edit)
- `piclaw/piclaw/src/channels/web/workspace/file-utils.ts` and `constants.ts` (content-type and extension handling)
- `piclaw/piclaw/web/src/ui-?` + `web/src/components/tab-strip.ts` (pane lifecycle/controls)
- `docs/web-pane-extensions.md`
- `README / Makefile` for vendor/build script update

## Candidate investigation tasks (required before implement)

- [ ] Confirm one primary draw.io candidate runtime and verify export API:
  - if iframe-based: confirm command bridge contract for `export` and `load`
  - if bundle-based: verify module entrypoint + runtime CSS/assets + export hooks
- [ ] Validate licensing/commercial terms and whether local/offline hosting is permitted in this repo context.
- [ ] Benchmark bundle size budget vs current `app.bundle.js` and extension lazy-load expectations.
- [ ] Confirm extension path for `.drawio` vs `.xml` vs `.dio`:
  - preview/edit behavior
  - content-type classification
  - file-size caps for this mode

## Test Plan

### Unit / integration tests

- Add a pane-level test stub for registration and route handling:
  - `.drawio` context selects new pane extension above fallback editor.
  - Unsupported paths fall back to editor.
- Add a service-level test for workspace MIME/text handling if `.drawio`/`.xml` detection is changed.
- Add export flow tests for generated artifacts (mocked SVG/PNG payloads).

### Manual validation

1. Open an existing `.drawio` file from workspace explorer.
2. Edit diagram and save.
3. Verify diff/updated file appears in workspace tree + preview flow.
4. Export SVG; verify file contents openable and readable inline.
5. Export PNG; verify image renders and can be attached/presented.
6. Smoke restart and load from cold cache.

### Automated verification

- `cd /workspace/piclaw && bun run test`
- `cd /workspace/piclaw && make build-piclaw`
- `cd /workspace/piclaw/piclaw && bun run build:web`

## Definition of Done

- [ ] Candidate runtime decision documented in ticket updates
- [ ] Draw.io pane is registered and usable as a tabbed extension
- [ ] `.drawio` open/edit/save cycle works end-to-end
- [ ] SVG and PNG exports both functional
- [ ] Vendored build path is deterministic and documented
- [ ] All acceptance criteria verified and checklist checked
- [ ] Front matter updated to `status: done` + `completed`
- [ ] Ticket moved to `50-done/` when shipped

## Updates

### 2026-03-12
- User requested ticket to add vendored draw.io editor as an extension pane with SVG/PNG export.
- Added candidate sweep list and phased implementation paths (embed-first, local-bundle alternative, VS Code-inspired adaptation).
- Added dependency on `docs/web-pane-extensions.md` contract and file-service/file-utils touch points.
- Quality: ★★★☆☆ 7/10 (problem: 2, scope: 2, test: 2, deps: 1, risk: 2)
- Next action: validate the selected draw.io runtime and map the exact postMessage or API contract before coding.
