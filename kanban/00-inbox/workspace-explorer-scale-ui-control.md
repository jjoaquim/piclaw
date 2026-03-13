---
id: workspace-explorer-scale-ui-control
title: Design a visible workspace explorer scale control
status: inbox
created: 2026-03-13
updated: 2026-03-13
tags:
  - work-item
  - kanban
  - web-ui
  - workspace-explorer
  - low-priority
owner: pi
---

# Design a visible workspace explorer scale control

## Summary

Follow up on the workspace explorer scaling work with a low-priority ticket to
figure out the eventual user-facing control for choosing `compact`, `default`,
and `comfortable` scale presets.

## Acceptance Criteria

- [ ] Decide where the control should live (workspace header, settings, context menu, or elsewhere).
- [ ] Define how the control interacts with responsive defaults.
- [ ] Define persistence semantics for explicit user overrides.
- [ ] Ensure the control is understandable on desktop and touch devices.
- [ ] Keep the initial v1 scaling implementation usable even before this UI ships.

## Notes

- Current scaling work intentionally ships without a visible control.
- Existing implementation uses responsive defaults and a stored/internal override path first.
- This ticket is low priority and should not block the current workspace scaling behavior.

## Links

- `/workspace/kanban/50-done/workspace-icon-resizing.md`
- `piclaw/piclaw/web/src/components/workspace-explorer.ts`
- `piclaw/piclaw/web/src/ui/workspace-scale.ts`
