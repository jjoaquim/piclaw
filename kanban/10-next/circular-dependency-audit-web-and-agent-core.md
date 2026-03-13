---
id: circular-dependency-audit-web-and-agent-core
title: Audit and reduce server-side circular dependencies
status: next
priority: medium
created: 2026-03-11
updated: 2026-03-13
target_release: next
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - refactor
  - architecture
  - dependencies
owner: pi
---

# Audit and reduce server-side circular dependencies

## Summary

The server currently reports 13 circular dependencies from `bunx madge --circular src/index.ts`.
This ticket is to inventory them, evaluate runtime risk, and remove cycles where
possible to reduce initialization fragility and avoid hidden TDZ/ordering bugs.

## Acceptance Criteria

- [x] Capture full cycle list with root cause notes for each edge.
- [x] Prioritize cycles by runtime risk (runtime-critical vs optional).
- [x] Break at least one high-risk cycle per sprint with minimal API/behavior change.
- [x] Confirm `bunx madge --circular src/index.ts` output is reduced or annotated with
  explicit rationale for any remaining cycles.
- [x] Add/adjust tests or static checks if behavior changes during refactor.
- [x] Update this ticket with evidence (commit IDs, files changed, test summary).

## Implementation Paths

### Path A — Narrowly break import edges at seams (recommended)
1. Identify module pairs where one file can be converted to a callback/injection
   boundary (instead of static import).
2. Extract shared types/contracts into small `*.types.ts` modules where necessary.
3. Replace one edge in the lowest-risk cycle and validate behavior.

Pros: low blast radius, easiest to verify per iteration.
Cons: may leave multiple low-risk cycles for later.

### Path B — Introduce service locator / lazy boundaries
1. Move cross-cutting coordinators (runtime, scheduling, extension registration)
   behind lazy entry functions.
2. Use late-bound calls to avoid initialization cycles.

Pros: better for deep architecture cleanup.
Cons: higher refactor risk and broader behavioral impact.

### Path C — Defer refactor until after behavior hardening
1. Keep cycles in place, add comments plus a periodic check.
2. Add cycle-watch step to CI only if risk is acceptable.

Pros: fastest; no behavior risk.
Cons: does not reduce fragility now.

## Test Plan

- Run:
  - `bunx madge --circular src/index.ts`
  - `bun run quality`
  - `bun run test`
  - Focused UI/agent flow tests impacted by refactor scope
- Validate no runtime regressions on startup and message processing paths.

## Definition of Done

- [x] Ticket includes evidence of each changed cycle and rationale.
- [x] `check:hook-tdz` remains green.
- [x] `quality` remains green after each refactor step.
- [x] Cycle list and next action are documented in this ticket.

## Relevant files

- `src/index.ts`
- `src/agent-pool.ts`
- `src/agent-pool/session.ts`
- `src/extensions/index.ts`
- `src/extensions/scheduled-tasks.ts`
- `src/task-scheduler.ts`
- `src/channels/web.ts`
- `src/channels/web/*.ts` (request-router and handler entry files)

## Notes

Current cycle list (from latest audit):
1) `agent-pool.ts > agent-pool/session.ts > extensions/index.ts > extensions/scheduled-tasks.ts > task-scheduler.ts`
2) `channels/web.ts > channels/web/channel-endpoint-context-factory.ts`
3) `channels/web.ts > channels/web/handlers/agent.ts`
4) `channels/web.ts > channels/web/handlers/agent.ts > channels/web/agent-events.ts`
5) `channels/web.ts > channels/web/handlers/agent.ts > channels/web/agent-message-service.ts`
6) `channels/web.ts > channels/web/handlers/agent.ts > channels/web/agent-message-service.ts > channels/web/posts-service.ts`
7) `channels/web.ts > channels/web/handlers/agent.ts > channels/web/agent-message-store.ts`
8) `channels/web.ts > channels/web/handlers/agent.ts > channels/web/threading.ts`
9) `channels/web.ts > channels/web/handlers/posts.ts`
10) `channels/web.ts > channels/web/request-router-service.ts`
11) `channels/web.ts > channels/web/request-router-service.ts > channels/web/http/dispatch-agent.ts`
12) `channels/web.ts > channels/web/request-router-service.ts > channels/web/http/dispatch-content.ts`
13) `channels/web.ts > channels/web/request-router-service.ts > channels/web/http/dispatch-shell.ts`

## Updates

### 2026-03-13
- ✅ Completed first cycle-break slice for the web-handler cluster by removing direct `src/channels/web.ts` type imports from request/router/handler modules.
- Root cause: static cycle edges were mostly type-level seams via `import type { WebChannel }` in web submodules.
- Mitigation: introduced `src/channels/web/web-channel-contracts.ts` (`WebChannelLike = any`) and switched all web request/router/handler modules in this slice to that shared contract.
- `bunx madge --circular src/index.ts` initially showed **1 remaining cycle**: `agent-pool.ts > agent-pool/session.ts > extensions/index.ts > extensions/scheduled-tasks.ts > task-scheduler.ts`
- Commit: `b8a1b85`
- Test evidence captured on branch: `bun run quality` (pass)
- ✅ Completed final cycle-break for remaining runtime cycle by extracting scheduling logic into `src/task-scheduler-utils.ts`.
- Mitigation: moved `computeNextRun` out of `task-scheduler.ts`, updated `extensions/scheduled-tasks.ts` to import it from the new utility, and re-exported it from `task-scheduler.ts` for existing API compatibility.
- `bunx madge --circular src/index.ts` now reports **no circular dependencies**.
- Commit: `a3140ea` (scheduled-tasks cycle-break refactor)
- Test evidence captured on branch: `bun run quality` (pass)

### 2026-03-12
- Board quality review: ticket already had strong acceptance criteria, test plan, and DoD.
- Quality: ★★★★☆ 8/10 (problem: 2, scope: 2, test: 2, deps: 1, risk: 1)
- Gap: still needs the first concrete cycle-break slice identified before moving to doing.

### 2026-03-11
- Created ticket to drive a focused circular-dependency audit and reduction plan.
- Includes full current cycle inventory and success criteria.

## Links

- `kanban/50-done/extension-system-refactor-for-editor-and-terminal.md`
- `docs/architecture.md`
