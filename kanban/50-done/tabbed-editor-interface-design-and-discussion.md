---
id: tabbed-editor-interface-design-and-discussion
title: Design and discuss tabbed editor interface
status: done
priority: medium
created: 2026-03-11
updated: 2026-03-11
target_release: v1.2.0
tags:
  - work-item
  - kanban
  - web
  - editor
  - ux
owner: pi
---

# Design and discuss tabbed editor interface

## Summary

Define a tabbed editor experience for the web UI that supports opening multiple files, switching quickly, and preserving editing context without regressing current compose/chat behavior.

## Acceptance Criteria

- Produce a design proposal covering:
  - tab model (single row, overflow strategy, pin/close behavior)
  - file lifecycle (open, reopen, dirty state, external change handling)
  - keyboard interactions (next/prev tab, close tab, quick open)
  - mobile/tablet behavior and responsive fallbacks
- Document technical approach:
  - editor state ownership and persistence
  - integration points with workspace explorer and file service routes
  - performance constraints for many open tabs
- Identify edge cases and UX risks:
  - unsaved changes prompts
  - rename/move/delete while tab is open
  - drag/drop reordering and accessibility implications
- Capture phased implementation plan (MVP + follow-ups).

## Implementation Paths

### Path A — In-place tabs in current editor component (recommended)
1. Add tab state store (open files, active file, dirty flags, MRU order).
2. Implement tab strip UI with close/pin/overflow menu.
3. Reuse existing editor instance with document swap and per-file view state cache.
4. Integrate workspace explorer actions (open in new tab, reveal active tab).

Pros: fastest path to usable MVP.
Cons: can accumulate complexity inside current editor component.

### Path B — Workspace layout shell + panes model
1. Create layout shell that manages panes and tab models centrally.
2. Editor becomes one pane implementation consuming shared tab model.
3. Enables easier future split panes and terminal docking.

Pros: better long-term architecture.
Cons: larger refactor for first delivery.

### Path C — Browser-like document manager service
1. Build dedicated document manager service (lifecycle, persistence, dirty prompts).
2. Tabs are a pure view over document manager state.

Pros: clean separation and testability.
Cons: medium complexity for initial milestone.

## Recommended Path

Ship MVP with **Path A**, while defining interfaces compatible with a later **Path B** migration.

## Proposed MVP Scope

- open/close/switch tabs
- dirty indicator + close confirmation
- overflow dropdown for many tabs
- basic keyboard shortcuts (`Ctrl/Cmd+W`, `Ctrl/Cmd+Tab` equivalent)

## Updates

### 2026-03-11
- Added implementation paths, recommended MVP route, and phased architecture notes.

### 2026-03-11
- Created to start design/discussion before implementation.
- Initial scope includes UX model, state model, keyboard ergonomics, and explorer integration.

## Notes

Discussion prompts:
- Should tabs persist per chat/session or globally per browser profile?
- Do we support split panes now or explicitly defer?
- Should compose box and workspace editor share any tab primitives?

## Links

- `piclaw/piclaw/web/src/components/workspace-explorer.ts`
- `piclaw/piclaw/web/src/components/editor.ts`
- `piclaw/piclaw/src/channels/web/workspace/file-service.ts`

### 2026-03-11 — Closed
- Tabbed editor fully implemented as part of extension system refactor (v1.2.0).
- TabStore: framework-agnostic tab state with MRU fallback, pin, dirty tracking, view state.
- TabStrip UI: active highlight, dirty dot, close/middle-click, context menu, keyboard shortcuts.
- Content area: vertical split with tabbed panes + optional dock + draggable splitter.
- Editor moved to `extensions/editor/` as self-contained pane extension.
- All design questions resolved through implementation. No further discussion needed.
- **CLOSED** — shipped in v1.2.0.
