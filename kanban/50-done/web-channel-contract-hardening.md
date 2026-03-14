---
id: web-channel-contract-hardening
title: Replace permissive WebChannelLike alias with explicit structural contract
status: done
priority: medium
created: 2026-03-13
updated: 2026-03-13
target_release: next
estimate: S
risk: low
tags:
  - work-item
  - kanban
  - architecture
  - web
  - refactor
owner: pi
---

# Replace permissive `WebChannelLike` alias with explicit structural contract

## Summary

The initial circular-dependency cleanup introduced `WebChannelLike = any` in
`src/channels/web/web-channel-contracts.ts` to decouple web router/handler modules
from `web.ts` while unblocking cycle detection.

This follow-up hardens that contract to a typed structural interface so
submodules keep explicit compiler guarantees and autocomplete while retaining the
seam that avoids the old circular import path.

## Why now

- `any` weakens type safety in every web handler and route module that relies on
  `WebChannelLike`.
- Future refactors become riskier because property/method drift is not detected.
- We now have a known stable set of runtime requirements from the web modules, so
  we can codify it safely.

## Plan

1. Define `WebChannelLike` in `src/channels/web/web-channel-contracts.ts` as a
   structural interface built from existing exported context/dispatch interfaces
   (`request-guards`, `http/dispatch-workspace`, `http/dispatch-media`, etc.).
2. Keep the contract narrowly scoped to only members required by the current web
   router/handler modules.
3. Preserve current behavior and compatibility with cycle-safe boundaries.
4. Run `bunx madge --circular src/index.ts` and `bun run quality`.

## Relevant Files

- `src/channels/web/web-channel-contracts.ts` — replace `any` with explicit
  structural contract.
- `src/channels/web/request-router-service.ts`
- `src/channels/web/handlers/agent.ts`
- `src/channels/web/handlers/posts.ts`
- `src/channels/web/agent-events.ts`
- `src/channels/web/threading.ts`
- `src/channels/web/posts-service.ts`
- `src/channels/web/agent-message-store.ts`
- `src/channels/web/agent-message-service.ts`
- `src/channels/web/channel-endpoint-context-factory.ts`
- `src/channels/web/http/dispatch-agent.ts`
- `src/channels/web/http/dispatch-content.ts`
- `src/channels/web/http/dispatch-shell.ts`

## Acceptance Criteria

- [x] `WebChannelLike` is a typed interface and no longer `any`.
- [x] Existing web cycle-free refactor (`bunx madge --circular src/index.ts`) is unchanged (re-run now succeeds with writable tempdir env).
- [x] `bun run quality` remains green (`EXIT:0`).
- [x] Runtime behavior unchanged for web routing and handler flows (type-safe compile and full test suite).
## Implementation Notes

- Replaced `type WebChannelLike = any` with a full structural interface in
  `src/channels/web/web-channel-contracts.ts`.
- Contract now composes:
  - `RequestGuardsChannel` (auth guards + shared endpoint context contract)
  - `WorkspaceDispatchChannel`
  - `MediaDispatchChannel`
- Added concrete requirements for:
  - channel runtime collaborators (`agentPool`, `queue`, `uiBridge`, `interactionBroadcaster`, `sse`)
  - persistence helpers (`storeMessage`, follow-up/steering methods, thread/buffer accessors)
  - endpoint handlers used by dispatch/router modules (`handle*` methods)
  - auth gateway helpers (`createTotpContext`, `createWebauthnContext`, `createWebauthnEnrolPageContext`)
- Ensured `agentPool` contract references the existing `AgentPool` interface, keeping compatibility for endpoint-context creation and runtime usage.
- Type alignment now covers command/agent response, buffering, and status flows while still avoiding import of `web.ts`.
- Command verification:
  - `bun run typecheck` ✅
  - `bun run quality` ✅ (`EXIT:0`)
  - `bunx madge --circular src/index.ts` ✅ (validated in writable tempdir environment).

## Notes

- This is intentionally a follow-up cleanup after the circularity work was completed.
- Prefer reusing existing context interfaces over redefining endpoint signatures.


### 2026-03-13 (update)
- Front-end queue-state/steer wiring for issue #20 validated against `bun run quality` with no regressions in web handler/type contracts.
- Kept this item in hardening scope and preserved cycle-safe contract changes.


### 2026-03-13 (environment-fix update)
- Re-ran `bunx madge --circular src/index.ts` with fixed `TMPDIR`/`BUN_INSTALL` settings for Supervisor-backed runtime and confirmed no circular dependencies.
- `bun run quality` also remains green after this follow-up hardening pass.