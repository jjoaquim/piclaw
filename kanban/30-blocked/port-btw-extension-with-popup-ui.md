---
id: port-btw-extension-with-popup-ui
title: Port btw extension with popup UI
status: blocked
priority: low
created: 2026-03-11
updated: 2026-03-12
target_release: next
tags:
  - work-item
  - kanban
  - extensions
  - web
  - ui
owner: pi
---

# Port btw extension with popup UI

## Summary

Port the `btw.ts` extension from `noahsaso/my-pi` into piclaw, including a popup-style UI interaction model suitable for the web client.

Source reference:
- `https://github.com/noahsaso/my-pi/blob/main/extensions/btw.ts`

## Blockers

- `kanban/10-next/extension-system-refactor-for-editor-and-terminal.md`

## Acceptance Criteria

- Port core `btw.ts` behavior into piclaw extension format.
- Add popup UI flow in web channel (open/close, focus, submit/cancel, keyboard support).
- Ensure extension is sandboxed by extension permissions/capabilities model.
- Add tests for command/tool behavior and popup lifecycle.
- Add docs for usage, configuration, and extension development notes.

## Implementation Paths

### Path A — Direct port after extension contract refactor (recommended)
1. Adapt `btw.ts` logic to piclaw extension API.
2. Implement popup renderer via new extension UI hooks.
3. Add integration tests and example config.

Pros: fastest once extension UI contracts exist.
Cons: fully dependent on extension-mechanism redesign.

### Path B — Temporary core implementation, then extract
1. Implement popup and behavior in core web code first.
2. Extract into extension once new mechanism lands.

Pros: earlier user-visible feature.
Cons: double work and migration risk.

### Path C — Hybrid shim
1. Keep behavior in extension, but popup in core shim until extension UI APIs are ready.

Pros: partial decoupling.
Cons: split ownership and awkward boundaries.

## Recommended Path

Use **Path A** and start design prep now, but do implementation only after extension mechanism refactor is complete.

## Test Plan

- **Behavior:** add extension/tool tests for the ported `btw` workflow.
- **UI:** verify popup open/close, keyboard handling, focus, and cancel/submit flows in the web client.
- **Integration:** validate permission/capability boundaries after the extension contract refactor lands.

## Definition of Done

- [ ] All acceptance criteria satisfied and verified
- [ ] Popup behavior tested manually and/or in-browser where practical
- [ ] Extension permission model impact documented
- [ ] Usage/config docs added
- [ ] Quality score ≥ 9 recorded in final update
- [ ] Ticket front matter updated (`status`, `updated`, `completed`)
- [ ] Ticket moved to `50-done/`

## Updates

### 2026-03-12
- Board quality review: added explicit test plan and DoD checklist.
- Quality: ★★★★☆ 7/10 (problem: 2, scope: 2, test: 1, deps: 1, risk: 1)
- Gap: still fully gated on the extension/popup contract work.

### 2026-03-11
- Created and explicitly gated on extension mechanism redesign.

## Links

- `https://github.com/noahsaso/my-pi/blob/main/extensions/btw.ts`
- `kanban/10-next/extension-system-refactor-for-editor-and-terminal.md`
- `piclaw/piclaw/src/extensions/index.ts`
- `piclaw/piclaw/web/src/app.ts`
