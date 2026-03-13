---
id: queue-inflight-turn-parenting-regression
title: Investigate intermittent /queue re-parenting regression for in-flight turns
status: inbox
created: 2026-03-13
updated: 2026-03-13
priority: high
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - bug
  - timeline
  - queue
  - regression
owner: pi
---

# Investigate intermittent /queue re-parenting regression for in-flight turns

## Summary

A fresh user report says that when queueing an item, some in-flight long-running
requests are still being visually parented to the queued turn instead of the
original triggering turn.

This appears to be either:
- a regression against the previously closed `/queue` threading fix, or
- an intermittent remaining edge case that the earlier fix did not fully cover.

## Current Behavior

- During a long-running in-flight request, invoking `/queue` can still sometimes
  cause subsequent streamed updates to appear under the queued turn.
- The bug is reported as intermittent rather than deterministic.
- The visible symptom is incorrect thread parenting in the timeline.

## Desired Behavior

- In-flight streamed updates must remain visually parented to the original turn
  for the full duration of that turn.
- Queued items must always remain isolated as separate future turns.
- Any previously fixed cases should remain covered while this intermittent case
  is investigated.

## Acceptance Criteria

- [ ] Reproduce the intermittent regression or identify the missing edge case relative to the earlier `/queue` fix.
- [ ] Determine whether the issue is persistence/thread metadata, streaming UI state, or a remaining mutable turn-context bug.
- [ ] Fix the regression without reintroducing the originally closed `/queue` bug.
- [ ] Add or extend regression coverage for the intermittent/long-running case.
- [ ] Document how this differs from the previously completed ticket.

## Notes

- This should be treated as a follow-up/regression ticket to:
  - `/workspace/kanban/50-done/queue-reparents-inflight-turns.md`
- Important distinction in the new report: this is about *sometimes* and *long requests*, which may indicate a different timing window than the original deterministic case.

## Updates

### 2026-03-13
- Added from new user report that long-running in-flight requests can still sometimes be visually parented to the queued turn rather than the original turn.

## Links

- `/workspace/kanban/50-done/queue-reparents-inflight-turns.md`
- `piclaw/src/agent-control/handlers/queue.ts`
- `piclaw/src/agent-pool/session.ts`
- `piclaw/test/agent-pool/agent-pool-slash-command.test.ts`
- `piclaw/test/channels/web/web-agent-streaming.test.ts`
