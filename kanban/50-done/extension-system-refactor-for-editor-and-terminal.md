---
id: extension-system-refactor-for-editor-and-terminal
title: Refactor extension system — pane contract, editor extraction, and tab support
status: next
priority: high
created: 2026-03-11
updated: 2026-03-11
target_release: next
tags:
  - work-item
  - kanban
  - architecture
  - extensions
  - editor
  - terminal
  - tabs
owner: pi
---

# Refactor extension system — pane contract, editor extraction, and tab support

## Summary

Define a `WebPaneExtension` contract for the piclaw web UI, extract the current
workspace editor behind it, add multi-tab support, and support a docked
sub-panel slot (for the terminal) below the tabbed content area — enabling
future custom viewers/editors without core rewrites.

The content area layout is a **vertical split**: tabbed panes on top, an
optional docked sub-panel (e.g., terminal) on the bottom, with a draggable
splitter between them. This mirrors VS Code's integrated terminal model.

This is the **pane** (content area) half of the web UI extension model.
The companion **panel** (sidebar) extraction is tracked separately and deferred
to a future major release.

## Non-goals (this ticket)

- Sidebar/panel extension contract (see `kanban/00-inbox/workspace-explorer-panel-extension.md`)
- Backend extension host or RPC bridge
- Third-party extension loading or marketplace

## Acceptance Criteria

### Pane contract
- [ ] `WebPaneExtension` interface: id, label, icon, `canHandle(context)`, `mount(container, context)`, capabilities, placement
- [ ] `PanePlacement` type: `"tabs"` (tabbed content area) or `"dock"` (bottom sub-panel)
- [ ] `PaneContext` interface: path, content, mtime, size, mode (edit/view)
- [ ] `PaneInstance` interface: `getContent()`, `isDirty()`, `setContent()`, `focus()`, `resize()`, `dispose()`, dirty/save/close callbacks
- [ ] `PaneCapability` type: `"edit" | "readonly" | "terminal" | "preview"`

### Pane registry
- [ ] `PaneRegistry` singleton: `register()`, `unregister()`, `resolve(context)` (priority-based), `list()`
- [ ] File-type routing via `canHandle()` return value (boolean or priority number)
- [ ] Error boundary: `mount()` failures fall back to built-in editor
- [ ] `canHandle()` exceptions are caught and skipped

### Editor extraction
- [ ] `EditorPaneExtension` implements `WebPaneExtension`
- [ ] Editor state/lifecycle extracted from `app.ts` (~200 lines) into the pane instance
- [ ] `app.ts` mounts panes via `registry.resolve()` → `mount()` instead of hardcoded `<WorkspaceEditor>`

### Content area layout
- [ ] Vertical split: tabbed panes (top) + optional docked sub-panel (bottom)
- [ ] Draggable horizontal splitter between tabs area and dock area
- [ ] Dock area collapses when no dock pane is active (no wasted space)
- [ ] Dock height persisted to localStorage
- [ ] Toggle dock visibility via keyboard shortcut and UI button
- [ ] Dock resize notifies docked `PaneInstance.resize()`

### Tab model
- [ ] Tab state store: open files, active tab, dirty flags, MRU order
- [ ] Tab strip UI: close, pin, overflow dropdown
- [ ] Per-tab view state cache (cursor position, scroll offset)
- [ ] Keyboard shortcuts: close tab, next/prev tab
- [ ] Dirty-close confirmation prompt
- [ ] Workspace explorer integration: open in new tab, reveal active tab

### Host ↔ Pane communication
- [ ] Host → Pane: file reload after external change (`setContent()`), focus, resize
- [ ] Pane → Host: dirty state change, save request (Cmd+S), close request
- [ ] SSE workspace events (rename/move/delete) update tab state and notify affected panes

### Terminal dock pane
- [ ] `TerminalPaneExtension` registered with `placement: "dock"` via same `WebPaneExtension` contract
- [ ] Renders in the bottom sub-panel, not as a tab
- [ ] Persistent across tab switches (mounted once, shown/hidden, not re-created)
- [ ] Toggle open/close via keyboard shortcut (e.g., `` Ctrl+` ``) and UI button
- [ ] Splitter between editor tabs and terminal dock is draggable
- [ ] Blocked on webterm integration but scaffold proves the contract

### Guardrails
- [ ] Feature flag / config toggle for experimental pane extensions
- [ ] Pane disposal must be reliable (no leaked listeners/DOM)
- [ ] Fallback to built-in editor on any pane failure

### Documentation
- [ ] Developer docs for creating a custom `WebPaneExtension`
- [ ] Example: readonly markdown preview pane

## Implementation Paths

### Path A — Frontend pane-plugin API first (recommended)
1. Define `WebPaneExtension`, `PaneContext`, `PaneInstance`, `PaneRegistry` interfaces with `PanePlacement`.
2. Create `PaneRegistry` singleton in web app.
3. Wrap current `WorkspaceEditor` as `EditorPaneExtension` (`placement: "tabs"`).
4. Add tab state store and tab strip UI.
5. Build content area layout shell: tabs area (top) + dock area (bottom) + splitter.
6. Replace hardcoded editor mounting in `app.ts` with registry-driven resolution.
7. Add `TerminalPaneExtension` scaffold (`placement: "dock"`).
8. Add file-type routing, error boundary, and dock toggle.

**Pros:** fast incremental migration, no backend changes needed.
**Cons:** backend-side extension hooks deferred.

### Path B — Full-stack extension host
1. Backend extension lifecycle + RPC bridge to web runtime.
2. Pane extensions declare backend services and frontend renderers.
3. Move editor + terminal to full-stack extensions.

**Pros:** most powerful long-term.
**Cons:** much larger scope, higher risk for first delivery.

### Path C — Manifest-driven static viewers first
1. Lightweight viewer registry from static manifests.
2. File-extension matching and readonly viewers only.
3. Defer editable/terminal to later.

**Pros:** small safe start.
**Cons:** doesn't unlock tabs or terminal.

## Recommended Path

**Path A** — ship the pane contract + editor extraction + tabs as one deliverable.
Keep interface shapes compatible with a later move toward Path B.

## Proposed Phases

- **Phase 1:** `WebPaneExtension` contract + `PaneRegistry` + `EditorPaneExtension` wrapper
- **Phase 2:** Tab state store + tab strip UI + keyboard shortcuts
- **Phase 3:** Content area layout shell (tabs area + dock area + splitter)
- **Phase 4:** Terminal dock pane scaffold + dock toggle + file-type routing + error boundary + docs

## Key Interfaces (draft)

```typescript
/** Where a pane lives in the content area */
type PanePlacement = "tabs" | "dock";

interface WebPaneExtension {
  id: string;
  label: string;
  icon?: string;
  capabilities: PaneCapability[];
  placement: PanePlacement;           // "tabs" for editor/viewers, "dock" for terminal

  // For "tabs" panes: which files/contexts can this pane handle?
  canHandle?(context: PaneContext): boolean | number;

  // Mount the pane into a container
  mount(container: HTMLElement, context: PaneContext): PaneInstance;
}

interface PaneContext {
  path?: string;                      // undefined for non-file panes (terminal)
  content?: string;
  mtime?: string;
  size?: number;
  mode: "edit" | "view";
}

interface PaneInstance {
  // Content (file panes only; terminal returns undefined)
  getContent(): string | undefined;
  isDirty(): boolean;

  // Host → Pane updates
  setContent?(content: string, mtime: string): void;
  focus(): void;
  resize?(): void;

  // Lifecycle
  dispose(): void;

  // Pane → Host callbacks
  onDirtyChange?(cb: (dirty: boolean) => void): void;
  onSaveRequest?(cb: (content: string) => void): void;
  onClose?(cb: () => void): void;
}

type PaneCapability = "edit" | "readonly" | "terminal" | "preview";

interface PaneRegistry {
  register(ext: WebPaneExtension): void;
  unregister(id: string): void;

  // Resolve best "tabs" pane for a given context
  resolve(context: PaneContext): WebPaneExtension | undefined;

  // List all registered panes
  list(): WebPaneExtension[];

  // Get registered dock panes
  getDockPanes(): WebPaneExtension[];
}
```

### Content area layout model

```
┌─────────────────────────────────────┐
│  Tab strip: [file1.ts] [file2.md]   │
├─────────────────────────────────────┤
│                                     │
│  Active tab pane (EditorPane)       │  ← placement: "tabs"
│                                     │
│                                     │
├═══════════ splitter ════════════════┤  ← draggable
│                                     │
│  Dock pane (TerminalPane)           │  ← placement: "dock"
│                                     │
└─────────────────────────────────────┘
```

- **Tabs area** (top): tab strip + active `placement: "tabs"` pane. Swaps content on tab switch.
- **Dock area** (bottom): single `placement: "dock"` pane. Persistent — mounted once, toggled visible/hidden, survives tab switches.
- **Splitter**: horizontal drag handle between the two areas. Height stored in localStorage.
- When dock is hidden, tabs area fills the full height.
- When no file tabs are open, dock can still be visible (terminal-only mode).

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Editor extraction breaks existing UX | High | Keep `WorkspaceEditor` component intact internally; wrap it, don't rewrite |
| Tab state complexity | Medium | Start with simple array store; defer persistence to follow-up |
| Pane disposal leaks | Medium | Add dispose guard + test harness for mount/dispose cycles |
| File-type routing conflicts | Low | Priority scoring in `canHandle()` with last-registered-wins tiebreak |
| Dock splitter interaction conflicts with existing sidebar splitter | Medium | Reuse proven splitter implementation from sidebar; test touch + mouse on iPad |
| Dock pane persists across tab switches — stale focus/resize | Medium | Dock pane receives explicit `resize()` on splitter drag and visibility toggle |

## Test Plan

- **Unit:** `PaneRegistry` resolution, priority scoring, error boundary, `getDockPanes()`
- **Unit:** Tab state store: open/close/switch/dirty/MRU
- **Integration:** Mount/dispose lifecycle for `EditorPaneExtension` (tabs) and `TerminalPaneExtension` (dock)
- **Integration:** Dock toggle: show/hide preserves instance, splitter height persists
- **Manual:** Open multiple tabs, edit, switch, close with dirty prompt, verify no state leaks
- **Manual:** Toggle terminal dock while editing; verify editor retains cursor/scroll and terminal retains session
- **Manual:** Resize dock splitter on desktop and iPad; verify both areas re-layout correctly

## Definition of Done

- [ ] All acceptance criteria satisfied and verified
- [ ] Tests added or updated — passing locally (`bun run test`)
- [ ] Type check clean (`bun run typecheck`)
- [ ] Docs and notes updated with links to ticket
- [ ] Operational impact assessed (config changes, migrations, restarts)
- [ ] Follow-up tickets created for deferred scope
- [ ] Update history complete with evidence
- [ ] Quality score ≥ 9 recorded in final update
- [ ] Ticket front matter updated (`status`, `updated`, `completed`)
- [ ] Ticket moved to `50-done/`

## Updates

### 2026-03-11
- Revised terminal model: terminal is now a **docked sub-panel** below the tabbed editor area
  (horizontal split with draggable splitter), not a tab.
- Added `PanePlacement` type (`"tabs" | "dock"`) to pane contract.
- Added content area layout model (ASCII diagram) and dock-specific acceptance criteria.
- Added `getDockPanes()` to registry, dock persistence/toggle requirements.
- Updated phases: added Phase 3 (layout shell + splitter) before terminal scaffold.
- Updated risks: dock splitter interaction, stale focus on tab switch.
- Updated test plan: dock toggle, splitter resize, iPad touch.
- Quality: ★★★★☆ 8/10 (problem: 2, scope: 2, test: 2, deps: 1, risk: 1)
  - Gap: terminal dock scaffold depends on webterm integration ticket for full validation.

### 2026-03-11
- Rewrote ticket scope: now covers pane contract + editor extraction + tab support.
- Split panel/sidebar extraction into separate deferred ticket.
- Added draft interface definitions, detailed acceptance criteria, test plan, and DoD.
- Quality: ★★★★☆ 8/10 (problem: 2, scope: 2, test: 2, deps: 1, risk: 1)
  - Gap: terminal pane scaffold depends on webterm integration ticket for full validation.

### 2026-03-11
- Added implementation paths, recommended architecture, and phased rollout plan.

### 2026-03-11
- Created to capture architecture work needed for long-term custom pane extensibility.

## Links

- `kanban/10-next/tabbed-editor-interface-design-and-discussion.md`
- `kanban/30-blocked/single-terminal-pane-webterm-integration.md`
- `kanban/00-inbox/workspace-explorer-panel-extension.md`
- `piclaw/piclaw/src/extensions/index.ts`
- `piclaw/piclaw/web/src/components/editor.ts`
- `piclaw/piclaw/web/src/app.ts`
