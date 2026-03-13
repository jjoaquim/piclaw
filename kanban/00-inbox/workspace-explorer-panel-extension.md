---
id: workspace-explorer-panel-extension
title: Extract workspace explorer as a panel extension
status: inbox
priority: low
created: 2026-03-11
updated: 2026-03-11
target_release: future-major
tags:
  - work-item
  - kanban
  - architecture
  - extensions
  - explorer
  - sidebar
owner: pi
---

# Extract workspace explorer as a panel extension

## Summary

Define a `WebPanelExtension` contract for sidebar/bottom-bar UI slots, then
extract the workspace explorer behind it — enabling future sidebar panels
(git, search, outline, custom) without core rewrites.

This is the **panel** (sidebar) companion to the **pane** (content area) contract
delivered in the editor extension refactor. It is deferred to a future major
release, contingent on the success of the pane/tab model.

## Dependency

- Requires successful delivery and validation of
  `kanban/10-next/extension-system-refactor-for-editor-and-terminal.md`
  (pane contract, editor extraction, tab support).
- Decision to proceed depends on whether the pane extension model proves
  stable, performant, and developer-friendly.

## Acceptance Criteria

### Panel contract
- [ ] `WebPanelExtension` interface: id, label, icon, placement (`"sidebar" | "bottombar"`), `mount(container, bridge)`
- [ ] `PanelBridge` interface: host ↔ panel communication (openFile, attachFile, revealFile, onActiveFileChange, onWorkspaceEvent)
- [ ] `PanelInstance` interface: `focus()`, `dispose()`, `setVisible()`

### Panel registry
- [ ] `PanelRegistry` or unified `WebUIRegistry` with `kind: "pane" | "panel"` discriminator
- [ ] Sidebar slot manager: renders registered panels in sidebar area
- [ ] Error boundary: panel mount failure falls back to built-in explorer

### Explorer extraction
- [ ] `ExplorerPanelExtension` implements `WebPanelExtension`
- [ ] Explorer's host-facing API (onFileSelect, onOpenEditor, active highlight) rewritten to use `PanelBridge`
- [ ] `app.ts` renders sidebar from registry instead of hardcoded `<WorkspaceExplorer>`

### Future panel examples
- [ ] Git panel (branch/diff/stage)
- [ ] Search panel (workspace-wide search results)
- [ ] Outline panel (document structure for active file)

## Key Interfaces (draft)

```typescript
interface WebPanelExtension {
  id: string;                          // "workspace-explorer", "git-panel"
  label: string;
  icon?: string;
  placement: "sidebar" | "bottombar";
  mount(container: HTMLElement, bridge: PanelBridge): PanelInstance;
}

interface PanelBridge {
  openFile(path: string): void;
  attachFile(path: string): void;
  revealFile(path: string): void;
  onActiveFileChange(cb: (path: string | null) => void): () => void;
  onWorkspaceEvent(cb: (event: WorkspaceEvent) => void): () => void;
}

interface PanelInstance {
  focus(): void;
  dispose(): void;
  setVisible(visible: boolean): void;
}
```

## Unified Registry Option

If validated during pane work, unify under one registry:

```typescript
type WebUIExtension =
  | { kind: "pane";  ...WebPaneExtension }
  | { kind: "panel"; ...WebPanelExtension }

interface WebUIRegistry {
  register(ext: WebUIExtension): void;
  unregister(id: string): void;
  getPanes(): WebPaneExtension[];
  getPanels(): WebPanelExtension[];
}
```

## What This Unlocks

- Sidebar becomes pluggable — swap or add panels without touching core
- Same error boundary and lifecycle patterns as pane extensions
- Path toward third-party UI extensions contributing both panes and panels

## Risks and Mitigations

| Risk | Impact | Mitigation |
|---|---|---|
| Explorer is 2061 lines with deep coupling to app shell | High | Wrap first (bridge adapter), then incrementally decouple internals |
| Pane model may not prove stable enough to justify panel extraction | Medium | This ticket is explicitly gated on pane success |
| Panel bridge API may not cover all explorer interactions | Medium | Audit all current props/callbacks before designing bridge |

## Updates

### 2026-03-11
- Created as deferred companion to pane extension refactor.
- Explicitly gated on success of editor-as-extension + tab model.
- Targeted for future major release, not next minor.

## Links

- `kanban/10-next/extension-system-refactor-for-editor-and-terminal.md` (prerequisite)
- `piclaw/piclaw/web/src/components/workspace-explorer.ts`
- `piclaw/piclaw/web/src/app.ts`
