---
id: follow-up-web-channel-contract-hardening-structural-type
title: Follow-up: Harden WebChannelLike to shared structural type (strict, #20)
status: done
priority: medium
created: 2026-03-13
updated: 2026-03-13
target_release: next
estimate: M
risk: low
tags:
  - work-item
  - kanban
  - architecture
  - web
  - types
  - web-channel-contract-hardening
  - follow-up
owner: pi
---

# Follow-up: Harden WebChannelLike to strict shared structural type (strict, #20)

## Summary
Create a strict, shared structural contract for `WebChannelLike` (no `any`) so web handlers and routers keep compiler-checked coupling without introducing circular imports. This is a follow-up to issue #20 and should be implemented/validated on the current feature branch.

## Why
`WebChannelLike` previously used permissive typing, which weakened type guarantees across web request/route/handler layers. We need to ensure all consumers compile against a strict shared contract.

## Scope
- Replace permissive `any` typing for `WebChannelLike` with a strict structural interface.
- Centralize required members in `src/channels/web/web-channel-contracts.ts`.
- Ensure all web modules consuming `WebChannelLike` validate under the shared contract.
- Keep behavior unchanged; this is typing + boundary hardening only.

## Requirements
- [x] `WebChannelLike` is a named `interface`/strict type (not `any`).
- [x] Contract is shared across web request routers and handlers:
  - `request-router-service`
  - `request-guards`
  - `handlers/*`
  - channel dispatch helpers (`dispatch-agent`, `dispatch-content`, `dispatch-shell`, `dispatch-media`, etc.)
- [x] Runtime class (`src/channels/web.ts`) satisfies/implements the contract.
- [x] No API/route behavior regressions for queueing/steering/web-status flows.
- [x] Lint + typecheck + tests pass after hardening.

## Implementation notes
- Primary target: `src/channels/web/web-channel-contracts.ts`.
- Prefer composing small protocol interfaces (request-guard/auth-context, dispatch APIs, persistence/status/buffer helpers, queue helpers).
- Ensure event/broadcast, queue-state, and message-write helpers are included where required by existing handlers.
- Re-run `bunx madge --circular src/index.ts` and `bun run quality` (or best-effort `madge` in this environment if tempdir constraints apply).

## Acceptance Criteria
- [x] Strict typed contract is implemented.
- [x] No `WebChannelLike = any` remains in web module typing.
- [x] Type-safe boundaries for web handlers/routes pass compile checks.
- [x] Existing behavior for /agent, queue/steer flows remains unchanged.
- [x] Ticket links back to #20 context in kanban notes.

## Links / Related
- Issue reference: `#20`
- Existing tracker: `kanban/20-doing/web-channel-contract-hardening.md`

## Definition of Done
- [x] `bun run quality` passes on feature branch.
- [x] `bunx madge --circular src/index.ts` verification passes (or documented if blocked by environment).
- [x] Relevant typings/tests are green in CI-like run.

## Updates

### 2026-03-13
- Follow-up ticket created from this request to track strict structural typing hardening as a tracked item under #20.

### 2026-03-13 (implementation)
- Implemented `WebChannelLike` strict interface in `src/channels/web/web-channel-contracts.ts` and updated `WebChannel` class in `src/channels/web.ts` to `implements WebChannelLike`.
- Verified with `bun run typecheck`, `bun run quality`, and `bunx madge --circular src/index.ts` under writable tempdir settings (result: no circular dependencies).