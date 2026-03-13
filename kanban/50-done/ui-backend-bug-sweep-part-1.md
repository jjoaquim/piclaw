---
id: bugs-ui-sweep-part-1
title: Fix first-part UI / backend bug sweep
status: done
created: 2026-03-10
updated: 2026-03-11
tags:
  - work-item
  - kanban
  - bugs
  - web
owner: pi
---

# Fix first-part UI / backend bug sweep

## Summary

Completed the first major bug-fix pass across compose box, chat pane, workspace explorer, editor, thoughts pane, and backend behavior.

## Completed

- Compose Box fixes
- Chat Pane fixes
- Workspace Explorer starburst / file operations pass
- Editor reload-on-disk-change fix
- Thoughts pane cropping fix
- Backend lost-message / retry / compacting fixes
- Avatar / icon handling fixes
- Per-model token usage tracking

## Implementation Paths Considered (historical)

### Path A — Single broad sweep ticket (chosen)
- Consolidate interrelated UI/backend regressions into one execution pass.
- Triage by user-facing severity and fix in tight feedback loop.

Why chosen: fastest stabilization under active user testing.

### Path B — Split into multiple narrow tickets first
- Separate compose/chat/workspace/backend concerns into individual tickets before coding.

Why deferred: better structure but slower turnaround while regressions were active.

### Path C — Freeze features + hardening sprint
- Halt all feature work and run dedicated stabilization sprint.

Why partially applied: effective in principle, but practical work remained interleaved with requested feature changes.

## Updates

### 2026-03-11
- Added retrospective implementation-path notes for future bug-sweep planning.

### 2026-03-10
- Moved from review to done.
- Remaining Azure-specific follow-up was split into a separate kanban item.

## Follow-up moved out

- `kanban/20-doing/azure-model-routing-and-stability.md`

## Notes

Original detailed checklist lived in this ticket during the bug sweep. The remaining unchecked Azure-model item is no longer tracked here.

## Links

- `kanban/20-doing/azure-model-routing-and-stability.md`
- `bugs.md`
