---
id: queue-reparents-inflight-turns
title: "/queue re-parents in-flight agent turns to queued item"
status: done
created: 2026-03-11
updated: 2026-03-12
completed: 2026-03-12
target_release: next
priority: medium
estimate: M
risk: medium
tags:
  - bug
  - timeline
  - queue
  - kanban
owner: pi
---

# /queue re-parents in-flight agent turns to queued item

## Summary

When a user sends `/queue` while the agent is mid-turn, the agent's in-flight response messages get associated with the newly queued item (which should always start a new thread) instead of the original message that triggered the turn. This breaks timeline continuity — the reply appears under the wrong conversation item.

The current likely hot path is the `/queue` handler calling `session.prompt(..., { streamingBehavior: "followUp" })` while `session.isStreaming` is already true. That suggests the in-flight turn may be reading mutable session/thread context instead of a turn-local parent/thread snapshot.

## Scope

This ticket is specifically about **thread/parent stability for an already-running turn** when `/queue` injects a follow-up during streaming.

### In scope
- Capturing and preserving the original parent/thread context for the active turn.
- Ensuring queued follow-ups create their own queued context without mutating the active turn.
- Regression coverage for `/queue` during streaming.
- Sanity coverage for nearby `/cancel` and normal follow-up behavior if touched by the fix.

### Out of scope
- Redesigning the entire queue/follow-up system.
- Broader timeline/tree model changes unrelated to in-flight parent mutation.
- UX changes to `/queue` messaging or queue visibility.

## Acceptance Criteria

- [ ] Reproduce the bug reliably with an automated regression test or deterministic harness flow.
- [ ] In-flight assistant messages remain parented to the original triggering message even if `/queue` arrives mid-turn.
- [ ] Queued items always start a new thread and never mutate the active turn parent.
- [ ] No regression to `/queue`, `/cancel`, or normal turn threading behavior.
- [ ] Update history includes the root cause, chosen fix path, affected files, and test evidence.

## Likely Root Cause

The active turn appears to depend on mutable session-level context while streaming. When `/queue` injects a follow-up into the same session during `isStreaming`, it likely updates the current thread/parent pointer used by subsequent assistant writes, so the remainder of the original turn gets attached to the queued item.

## Repro Shape

1. Start a turn that emits at least two streamed assistant updates.
2. Before the turn completes, invoke `/queue <message>`.
3. Observe whether later assistant updates from the original turn switch to the queued item's thread/parent.
4. Expected: the original turn stays attached to its original parent for the entire duration.

## Implementation Paths

### Path A — Freeze turn parent at turn start (recommended)
1. Capture the parent/thread identifiers when a turn begins.
2. Store them on the in-flight turn object rather than reading mutable session state during streaming.
3. Ensure queued item creation writes separate context without mutating the active turn's parent.
4. Add regression tests around `/queue` during streaming.

**Pros:** smallest blast radius, matches the expected model of immutable turn context.
**Cons:** may still leave other mutable per-turn state risks if the turn object is incomplete.

### Path B — Split queued-item context from active-turn context
1. Refactor session state so queued items and active turns use distinct context holders.
2. Route all message writes through the active-turn holder until completion.
3. Add tests for `/queue`, `/cancel`, and concurrent session transitions.

**Pros:** stronger long-term separation.
**Cons:** larger refactor and more threading touchpoints.

## Recommended Path

Use **Path A** first to lock parent/thread identity per turn, then evaluate whether broader session-state separation from **Path B** is still needed.

## Test Plan

- **Primary regression target:** extend `piclaw/test/agent-pool/agent-pool-slash-command.test.ts` or add a sibling focused regression test that simulates a streaming session plus `/queue` injection.
- **Behavioral target:** inspect `/queue` handling in `piclaw/src/agent-control/handlers/queue.ts` and verify that queued follow-ups do not change the active turn's parent/thread context.
- **Integration target:** add or extend a web/timeline-facing test if needed to verify stored message/thread associations after mixed streaming + queue behavior.
- **Safety:** rerun threading/timeline tests plus any `/queue` or session lifecycle suites affected by the change.
- **Quality gate:** `cd /workspace/piclaw/piclaw && bun run test && bun run typecheck`

## Definition of Done

- [ ] All acceptance criteria satisfied and verified
- [ ] Regression test added for `/queue` during in-flight turns
- [ ] Existing queue/threading tests pass
- [ ] Type check clean (`bun run typecheck`)
- [ ] Update history complete with evidence
- [ ] Quality score ≥ 9 recorded in final update
- [ ] Ticket front matter updated (`status`, `updated`, `completed`)
- [ ] Ticket moved to `50-done/`

## Updates

### 2026-03-12
- Refined after source/test audit.
- Narrowed scope to parent/thread stability for an already-running turn when `/queue` injects a follow-up during streaming.
- Added likely hot path: `piclaw/src/agent-control/handlers/queue.ts` calling `session.prompt(..., { streamingBehavior: "followUp" })` while `session.isStreaming` is true.
- Added concrete test direction: extend `piclaw/test/agent-pool/agent-pool-slash-command.test.ts` or add a sibling focused regression test for streaming + `/queue` interleaving.
- Quality: ★★★★☆ 7/10 (problem: 2, scope: 2, test: 1, deps: 1, risk: 1)
- Gap: still needs the exact persistence point for thread/parent metadata identified in code before implementation starts.

### 2026-03-12
- Board quality review: expanded this ticket with concrete acceptance criteria, implementation paths, a test plan, and DoD checklist.
- Recommended fix direction is to freeze turn-parent context at turn start instead of relying on mutable session state during streaming.
- Quality: ★★★☆☆ 6/10 (problem: 2, scope: 1, test: 1, deps: 1, risk: 1)
- Gap: still needs a confirmed repro path in the existing test harness and explicit file-level test targets.

### 2026-03-11
- Ticket created from user report.

## Notes

- Nearby files likely involved:
  - `piclaw/src/agent-control/handlers/queue.ts`
  - `piclaw/src/agent-pool.ts`
  - `piclaw/src/agent-pool/session.ts`
  - `piclaw/src/channels/web/agent-message-service.ts`
- May also affect `/cancel` behavior if both features share mutable turn state.
- Fix should ensure message context is immutable for the duration of a turn.

## Links

- `piclaw/src/agent-control/handlers/queue.ts`
- `piclaw/src/agent-pool.ts`
- `piclaw/src/agent-pool/session.ts`
- `piclaw/src/channels/web/agent-message-service.ts`
- `piclaw/test/agent-pool/agent-pool-slash-command.test.ts`
- `piclaw/test/channels/web/web-agent-streaming.test.ts`
