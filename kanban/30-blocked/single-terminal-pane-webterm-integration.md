---
id: single-terminal-pane-webterm-integration
title: Integrate single terminal pane via rcarmo/webterm
status: blocked
priority: medium
created: 2026-03-11
updated: 2026-03-12
target_release: next
tags:
  - work-item
  - kanban
  - web
  - terminal
  - ux
owner: pi
---

# Integrate single terminal pane via rcarmo/webterm

## Summary

Design and implement a single terminal pane in the web UI, based on `rcarmo/webterm`, to allow command-line access from inside the workspace experience.

The terminal renders as a **docked sub-panel** below the tabbed editor area
(horizontal split with draggable splitter), not as a tab. It persists across
tab switches — mounted once, toggled visible/hidden. This mirrors VS Code's
integrated terminal layout.

This work is gated on the pane extension system which defines the `placement: "dock"` contract.

## Blockers

- `kanban/10-next/extension-system-refactor-for-editor-and-terminal.md` (pane contract with dock placement)
- `kanban/10-next/tabbed-editor-interface-design-and-discussion.md`

## Acceptance Criteria

- Validate feasibility and integration approach for `rcarmo/webterm`:
  - embedding model (iframe/component/direct integration)
  - lifecycle (start/stop/reconnect)
  - session ownership (per user/session/chat)
- Define security model:
  - auth/CSRF/session checks in web channel
  - command execution boundaries and workspace path constraints
  - rate limits and abuse controls
- Define UX behavior for docked terminal sub-panel:
  - horizontal split below tabbed editor area with draggable splitter
  - toggle open/close via keyboard shortcut (`` Ctrl+` ``) and UI button
  - persistent across tab switches (not re-created on tab change)
  - splitter height saved to localStorage
  - terminal-only mode when no file tabs are open
  - responsive behavior on tablet/mobile
- Implement MVP behind feature flag/config toggle.
- Add tests and operational notes.

## Implementation Paths

### Path A — Embedded webterm component in dock pane (recommended)
1. Run webterm backend as managed service/process.
2. Implement `TerminalPaneExtension` with `placement: "dock"`.
3. Add authenticated session bootstrap endpoint.
4. Wire toggle/focus behavior into dock area state.
5. Add reconnect and terminal-reset actions.

Pros: practical, low integration overhead.
Cons: requires careful auth/session wiring.

### Path B — iframe isolation model
1. Host webterm at isolated route/subdomain.
2. Embed via iframe and bridge focus/resize via postMessage.
3. Keep strict CSP and origin checks between host app and terminal frame.

Pros: strong isolation.
Cons: more UX friction and embedding complexity.

### Path C — Native terminal protocol integration
1. Integrate PTY/session handling directly in piclaw backend.
2. Use terminal frontend component without external webterm service boundary.

Pros: deep control and unified architecture.
Cons: larger implementation burden and security surface.

## Recommended Path

Adopt **Path A** for MVP after tabbed layout decisions land; reserve **Path B** if stronger isolation is required.

## Updates

### 2026-03-12
- Board quality review: added explicit test plan and DoD checklist.
- Quality: ★★★★☆ 8/10 (problem: 2, scope: 2, test: 1, deps: 2, risk: 1)
- Gap: blocked on pane/tab contract work and still needs the final security/session model choice.

### 2026-03-11
- Updated to reflect docked sub-panel model (horizontal split below editor tabs, not a tab itself).
- Added explicit blocker on extension-system-refactor (pane contract with `placement: "dock"`).
- Updated acceptance criteria with dock-specific UX requirements.

### 2026-03-11
- Added implementation-path analysis and MVP recommendation.
- Created as a follow-on to the tabbed editor design ticket.
- Marked blocked until tabbed editor design/discussion is settled.

## Test Plan

- **Architecture:** validate the chosen embedding/session model against the final pane contract.
- **Security:** test auth/origin/session boundaries for terminal bootstrap and reconnect flows.
- **UX:** manual validation of dock visibility, splitter persistence, keyboard shortcut, and tab-switch persistence.
- **Responsive:** verify desktop + tablet/mobile behavior before promoting out of blocked.

## Definition of Done

- [ ] All acceptance criteria satisfied and verified
- [ ] Security model documented with explicit trust/session boundaries
- [ ] MVP implemented behind feature flag/config toggle
- [ ] Dock UX validated manually on desktop and touch device(s)
- [ ] Operational notes documented
- [ ] Quality score ≥ 9 recorded in final update
- [ ] Ticket front matter updated (`status`, `updated`, `completed`)
- [ ] Ticket moved to `50-done/`

## Notes

Key design question: should terminal state be ephemeral per browser session or restorable across reconnects?

## Links

- `kanban/10-next/extension-system-refactor-for-editor-and-terminal.md` (pane contract + dock layout)
- `kanban/10-next/tabbed-editor-interface-design-and-discussion.md`
- `https://github.com/rcarmo/webterm`
- `piclaw/piclaw/src/channels/web.ts`
- `piclaw/piclaw/web/src/app.ts`
