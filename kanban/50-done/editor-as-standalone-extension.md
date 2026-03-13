---
id: editor-as-standalone-extension
title: Refactor workspace editor into a fully self-contained pane extension
status: done
priority: medium
created: 2026-03-11
updated: 2026-03-11
target_release: v1.2.0
tags:
  - work-item
  - kanban
  - architecture
  - editor
  - extensions
owner: pi
---

# Refactor workspace editor into a fully self-contained pane extension

## Summary

The extension system refactor (Phase 1–6) established the `WebPaneExtension`
contract and wrapped the existing editor behind `EditorPaneExtension`. However,
the current implementation is a **thin wrapper** — the real editor is still the
`WorkspaceEditor` Preact component rendered by `app.ts`, with state managed
by the `useEditorState` hook in core code.

This ticket covers the deeper refactor: making the editor a fully
self-contained extension that owns its own DOM lifecycle (`mount`/`dispose`),
manages its own state internally, and communicates with the host exclusively
via the `PaneInstance` contract (dirty callbacks, save requests, content
updates).

## Current State

- `EditorPaneExtension` in `web/src/panes/editor-pane.ts` is a wrapper
  that delegates to `WorkspaceEditor` (a Preact component)
- `useEditorState` hook in `web/src/ui/use-editor-state.ts` manages all
  editor state (loading, saving, dirty, tabs) — this lives in core, not
  in the extension
- `app.ts` still renders `<WorkspaceEditor>` with props and handles all
  the wiring between tabs, file loading, and the editor component

## Target State

- `EditorPaneExtension.mount()` creates and manages its own CodeMirror
  instance directly (no Preact component intermediary)
- Editor state (dirty, content, cursor) lives inside `PaneInstance`
- Host communicates via `setContent()`, `focus()`, `resize()` only
- Extension communicates via `onDirtyChange()`, `onSaveRequest()` only
- `useEditorState` hook removed or reduced to tab orchestration only
- Editor extension can be unregistered and replaced without touching core

## Acceptance Criteria

- [x] `EditorPaneExtension.mount()` creates CodeMirror directly in container
- [x] Editor state (content, dirty, cursor, scroll) owned by PaneInstance
- [x] File load/save API calls made by the extension, not by the host
- [x] Host only calls PaneInstance contract methods
- [x] `WorkspaceEditor` Preact component removed or deprecated
- [x] `useEditorState` hook simplified (tab orchestration only, no file I/O)
- [x] Hot-swap: unregistering editor extension falls back gracefully
- [x] No UX regression vs current editor behavior
- [x] Active tab file path exposed to host for compose box file reference pills
- [x] Compose box "attach open file" action works: inserts `file:{path}` pill for the active editor tab
- [x] Tests updated for new lifecycle
- [x] Editor extension ships its own JS bundle (separate from `app.bundle.js`)
- [x] Bundle loaded dynamically by host when extension is first mounted
- [x] CodeMirror + language grammars not in the core bundle (reduces initial load)
- [x] Theme applied correctly: reads current theme mode, listens for `piclaw-theme-change`, reconfigures CodeMirror compartment (light ↔ dark)
- [x] Theme follows host tint/accent color for selections, cursors, active line
- [x] CSS variables from host theme available inside extension container

## Risks

| Risk | Mitigation |
|---|---|
| Loss of Preact reactivity for editor props | CodeMirror has its own update model; direct API calls are cleaner |
| Breaking tab ↔ editor state sync | Tab store already handles state; extension just needs to read/write it |
| Large diff touching core rendering | Incremental: keep WorkspaceEditor as fallback during transition |
| Bundle size regression if not split | Extension ships own bundle; core app.bundle.js shrinks by ~900KB (CodeMirror) |
| Theme desync between host and editor | Extension listens for `piclaw-theme-change` event + reads CSS variables |

## Bundle Architecture

The editor extension should ship as a **separate JS bundle** loaded on demand:

```
web/static/dist/
  app.bundle.js          ← core (Preact, timeline, compose, tabs, pane host)
  app.bundle.css
  editor.bundle.js       ← editor extension (CodeMirror + languages + themes)
```

- **Build step:** `bun build web/src/panes/editor-pane.ts` → `editor.bundle.js`
- **Load:** Host calls `import('/static/dist/editor.bundle.js')` on first
  `EditorPaneExtension.mount()` (lazy/dynamic import)
- **Registration:** Bundle self-registers via `paneRegistry.register()` on load
- **Fallback:** If bundle fails to load, host shows error in tab (not a blank pane)
- Core bundle shrinks significantly — CodeMirror + grammars are ~900KB minified

## Theme Integration

The editor currently handles theming via:
1. `getThemeMode()` → returns `'dark'` or `'light'`
2. `piclaw-theme-change` window event → triggers compartment reconfigure
3. `githubDark` / `githubLight` CodeMirror themes
4. Custom `EditorView.theme({...})` overrides for selections, gutters, etc.

The standalone extension must:
- Read initial theme from `getThemeMode()` or `document.documentElement.dataset.theme`
- Listen for `piclaw-theme-change` events to switch light ↔ dark
- Use host CSS variables (`--accent-color`, `--bg-primary`, `--text-primary`, etc.)
  for CodeMirror theme overrides so the editor matches the host tint
- Import theme utilities from a shared module or read DOM attributes directly
  (no dependency on core Preact components)

## Dependencies

- Extension system refactor (`feature/extension-system-refactor`) — ✅ done
- Tab store + tab strip — ✅ done
- View state preservation — ✅ done
- Message permalink/file reference pills — ✅ done (compose-box.ts, file-pill.ts)

## Compose Box Integration

The compose box supports `file:{path}` reference pills that attach file context
to messages sent to the agent. Today the host app knows the active file path
directly. With the editor as a standalone extension, the host must query the
active tab's path from the tab store and expose it to the compose box:

- **TabStore already tracks paths** — `tabStore.getActive()?.path` gives the
  current file. No new contract method needed on PaneInstance.
- **Compose box "attach file" button** — inserts a pill for the active tab's
  path. This button should be disabled when no editor tab is open.
- **Drag from tab strip** — dragging a tab into the compose box could insert
  a file pill (stretch goal).
- **Key binding** — e.g. `Ctrl+Shift+A` to attach current file to message.

## Updates

### 2026-03-11
- Created ticket. Current state: thin wrapper. Target: self-contained extension.
- Phase 1 complete (commit `02f5c3b`): StandaloneEditorInstance creates CodeMirror
  directly. use-editor-state.ts reduced from 382→145 lines (tab orchestration only).
  app.ts no longer imports WorkspaceEditor — mounts extension via container ref.
  6/11 acceptance criteria met.
- Phase 2 complete (commit `f08cfc5`): Bundle split — editor.bundle.js (889KB)
  lazy-loaded. app.bundle.js 1.1MB → 185KB (84% smaller).
- Compose box attach (commit `8c37351`), accent theming (commit `e45ea49`),
  15 new tests, dirty tab confirmation (commit `f07e9e8`).
- Header removed, save to status bar (commit `ae4d899`).
- Markdown preview pane (commit `02ea119`), preview flicker fix + resizable
  splitter (commit `6f678ff`), editor flicker fix (commits `25616c7`, `f42193a`).
- All 11/11 acceptance criteria met. All 16 bonus criteria met.
- **Moved to extensions/editor/** (commit `04646f8`): editor-extension.ts and
  vendor/codemirror now live in `extensions/editor/`. Deprecated editor-pane.ts
  and components/editor.ts removed (-654 lines).
- **CLOSED** — shipped in v1.2.0.

## Links

- `piclaw/piclaw/web/src/panes/editor-pane.ts` — current wrapper
- `piclaw/piclaw/web/src/components/editor.ts` — WorkspaceEditor component
- `piclaw/piclaw/web/src/ui/use-editor-state.ts` — state hook (to be simplified)
- `piclaw/piclaw/web/src/panes/pane-types.ts` — PaneInstance contract
- `kanban/20-doing/extension-system-refactor-for-editor-and-terminal.md`
