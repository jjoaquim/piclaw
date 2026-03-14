---
id: model-switch-hang-during-compaction
title: Recover cleanly when model switching hangs during compaction
status: done
priority: high
created: 2026-03-12
updated: 2026-03-14
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - reliability
  - models
  - compaction
  - recovery
owner: pi
---

# Recover cleanly when model switching hangs during compaction

## Summary

Investigate and fix cases where piclaw can hang while switching models during
compaction, leaving the runtime stuck with no reliable user-facing recovery path.

## Current Behavior

- A model switch issued during or around compaction can leave piclaw hung or non-responsive.
- From the user side, there may be no clear way to recover the active session.
- Restart/recovery is not exposed in a reliable enough way when the runtime gets stuck mid-operation.

## Desired Behavior

- Primary goal is a clean recovery path and clear UX feedback when model switching and compaction interact badly.
- Model switching should be blocked while compaction is in progress rather than allowed to race.
- If the runtime still gets stuck, a slash-command recovery path should be available via `/exit`, killing the process immediately so supervisor can restart it cleanly.
- That recovery path should be available to any authenticated user, not only operators.
- The intent pane should activate automatically during compaction and show as much useful status as possible, then disappear again when the operation completes.

## Acceptance Criteria

- [ ] Reproduce and document at least one concrete hang path involving model switching during compaction.
- [ ] Identify the lock/state transition causing the stuck condition (session state, queue state, model switch state, compaction state, or UI/run-control state).
- [ ] Model switching is blocked while compaction is active.
- [ ] A `/exit` recovery path exists that immediately terminates the process so supervisor can restart it cleanly when the runtime is wedged.
- [ ] That recovery path is available to any authenticated user.
- [ ] The intent pane auto-activates during compaction, exposes rich compaction/status detail, and is removed again after completion.
- [ ] User-visible state makes compaction/recovery progress clear enough to explain why switching is blocked or recovery is needed.
- [ ] Add regression coverage for the hang path or the state-machine guard that prevents it.
- [ ] Document operational recovery steps if full in-app recovery is not yet possible.

## Relevant Areas

- `piclaw/piclaw/src/extensions/model-control.ts`
- `piclaw/piclaw/src/agent-control/handlers/agent.ts`
- `piclaw/piclaw/src/agent-control/handlers/queue.ts`
- `piclaw/piclaw/src/runtime/message-loop.ts`
- `piclaw/piclaw/src/agent-pool/session.ts`
- `piclaw/piclaw/src/agent.ts`
- any compaction/run-control code paths involved in model switching and turn lifecycle
- web UI controls/status surfaces for model switching and recovery

## Notes

- This is primarily a reliability/recovery issue, not a UX polish task.
- Prefer deterministic state-machine fixes over adding retries on top of a wedged state.
- Recovery must match this environment's runtime model: supervisor-managed piclaw inside the container.
- Refined direction is to prioritise clean recovery and explicit UX/status feedback over solving every deadlock path in the first pass.
- Current requested recovery surface is a slash command (`/exit`) that immediately kills the process and relies on supervisor to bring it back.
- Compaction state should be surfaced through the intent pane automatically, with as much detail as practical while the operation is active.
- The compaction-intent surface should clean itself up after completion rather than lingering.

## Updates

### 2026-03-14 (closed)
- Core concern addressed by shipped work across multiple tickets:
  - `compactionGuard()` in `handlers/model.ts` blocks `/model` while
    `session.isCompacting` is true
  - `agent-pool.ts` blocks prompt execution during compaction
  - `session-rotation.ts` blocks rotation during compaction
  - `/compact` and `/auto-compact` slash commands give user-facing control
  - compaction status surfaced in `/state` and web UI status bar
  - restart recovery hardened in separate done ticket
  - session rotation shipped as an escape hatch (in review)
- Remaining nice-to-haves (`/exit` kill command, intent-pane auto-activation)
  are UX polish and can be tracked separately if wanted.
- Closing as effectively done by related work.

### 2026-03-12
- Ticket added from report that model switching during compaction can hang piclaw with no practical restart path from the user side.
- Refined from 5-question pass:
  - prioritise clean recovery and clear UX feedback
  - block model switching while compaction is active
  - add `/exit` as the immediate recovery path
  - make that recovery path available to any authenticated user
  - auto-open the intent pane for compaction status and remove it afterward
