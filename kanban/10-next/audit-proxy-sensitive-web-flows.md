---
id: audit-proxy-sensitive-web-flows
title: Audit remaining proxy-sensitive web flows
status: next
priority: medium
created: 2026-03-10
updated: 2026-03-12
target_release: next
tags:
  - work-item
  - kanban
  - web
  - reverse-proxy
  - auth
owner: pi
---

# Audit remaining proxy-sensitive web flows

## Summary

Audit other browser flows that may still be sensitive to proxy / tunnel origin handling.

## Acceptance Criteria

- Verify passkey/WebAuthn flows behind reverse proxies.
- Verify login, posting, uploads, workspace writes, and SSE under proxied hosts.
- Verify absolute link/origin generation uses the correct external origin.
- Add regression tests for any uncovered proxy-sensitive paths.

## Implementation Paths

### Path A — Endpoint-by-endpoint audit + tests (recommended)
1. Enumerate sensitive routes by area: auth, posting, uploads, workspace write APIs, link generation.
2. For each route, identify origin/proto/host dependency and trusted proxy behavior.
3. Add targeted tests in existing suites (`security`, request-client, relevant route tests).
4. Validate on live proxied target (`isdclaw`) for end-to-end confirmation.

Pros: incremental, low risk, strongest regression protection.
Cons: takes longer than a one-shot broad refactor.

### Path B — Centralize origin resolution first
1. Create a single shared helper for canonical external origin resolution.
2. Refactor all sensitive endpoints to consume the helper.
3. Add matrix tests after refactor.

Pros: cleaner architecture.
Cons: higher blast radius; harder to isolate regressions.

### Path C — Observability-first pass
1. Add structured debug logging around origin checks and forwarded headers.
2. Replay key flows behind proxy and capture data.
3. Patch only confirmed problematic paths.

Pros: very targeted fixes.
Cons: may miss low-frequency edge cases if test coverage is not expanded.

## Recommended Path

Use **Path A** now, with selective helper extraction from **Path B** only where duplication appears.

## Test Plan

- **Unit:** extend the existing web security / request-origin suites for any newly identified proxy-sensitive paths.
- **Integration:** run targeted endpoint tests covering auth, uploads, workspace writes, and SSE under trusted-proxy settings.
- **Production:** validate the final route list against the live proxied deployment (`isdclaw`) and capture any mismatches.

## Definition of Done

- [ ] All acceptance criteria satisfied and verified
- [ ] Route inventory and findings recorded in `## Updates`
- [ ] Regression tests added for any uncovered proxy-sensitive flows
- [ ] Docs updated if operator behavior changes
- [ ] Quality score ≥ 9 recorded in final update
- [ ] Ticket front matter updated (`status`, `updated`, `completed`)
- [ ] Ticket moved to `50-done/`

## Updates

### 2026-03-12
- Board quality review: added explicit test plan and DoD checklist.
- Quality: ★★★★☆ 7/10 (problem: 2, scope: 2, test: 1, deps: 1, risk: 1)
- Gap: still needs a concrete route inventory and file-level test targets before moving to doing.

### 2026-03-11
- Added implementation-path analysis and recommended sequence.

### 2026-03-10
- Created after fixing the proxied post-origin failure on `isdclaw`.
- Prior passkey/origin mismatches suggest more web flows may still need explicit proxy coverage.

## Notes

Use `isdclaw` as a real-world validation target because it sits behind a Cloudflare tunnel and now has `web.trustProxy = true`.

## Links

- `kanban/50-done/reverse-proxy-origin-validation.md`
- `src/channels/web/webauthn-challenges.ts`
- `src/channels/web/request-origin.ts`
