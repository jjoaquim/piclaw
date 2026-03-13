---
id: post-terminal-endpoint-security-audit
title: Audit web security and endpoint surface after terminal + pane refactor
status: blocked
priority: high
created: 2026-03-12
updated: 2026-03-12
target_release: next
tags:
  - work-item
  - kanban
  - security
  - web
  - terminal
  - audit
owner: pi
---

# Audit web security and endpoint surface after terminal + pane refactor

## Summary

Perform a fresh security and endpoint audit of the web channel after the pane-extension refactor and terminal integration land.

This audit should validate that the new docked terminal model, pane routing, editor extraction, workspace endpoints, media flows, and any related auth/origin/session handling do not introduce new exposure or bypass existing safeguards.

## Blockers

- `kanban/30-blocked/single-terminal-pane-webterm-integration.md`
- `kanban/50-done/extension-system-refactor-for-editor-and-terminal.md`

## Acceptance Criteria

- [ ] Re-inventory all web-facing endpoints affected by the pane refactor and terminal work.
- [ ] Validate auth/session/origin checks for:
  - terminal bootstrap/session endpoints
  - workspace read/write endpoints
  - media upload/fetch routes
  - agent-control and IPC-adjacent flows exposed through web handlers
- [ ] Re-check reverse-proxy-sensitive behavior:
  - origin validation
  - forwarded headers trust model
  - CSRF assumptions for authenticated browser flows
- [ ] Review rate limits, abuse controls, and path validation around terminal and workspace actions.
- [ ] Confirm terminal-specific boundaries:
  - workspace confinement expectations
  - session ownership/isolation
  - reconnect behavior
  - feature-flag/config gating
- [ ] Document endpoint-by-endpoint findings, risk level, and remediation follow-ups.
- [ ] Create follow-on tickets for anything that is not fixed during the audit.

## Implementation Paths

### Path A — Endpoint inventory + targeted verification (recommended)
1. Build a concrete inventory of affected routes and handlers under `src/channels/web/` and `src/channels/web/http/`.
2. Map each route to auth/origin/session/rate-limit expectations.
3. Add or extend targeted tests where the contract is enforceable in-unit.
4. Run an end-to-end manual audit on the final terminal-enabled build.

**Pros:** grounded in the actual shipped surface; easiest to review.
**Cons:** depends on the terminal feature being sufficiently stable first.

### Path B — Threat-model-first review
1. Start with attacker goals (session hijack, origin spoofing, workspace escape, terminal abuse).
2. Map those goals to routes and trust boundaries.
3. Add mitigations/tests after the threat matrix is complete.

**Pros:** strong security framing.
**Cons:** more documentation overhead before concrete fixes land.

## Recommended Path

Use **Path A** once the terminal surface exists, borrowing the threat framing from **Path B** for the final report.

## Test Plan

- **Inventory:** enumerate affected endpoints and their trust assumptions.
- **Automated:** extend route/security tests covering origin validation, auth/session checks, rate limits, and workspace path validation.
- **Manual:** validate the final terminal-enabled deployment behind a reverse proxy/tunnel.
- **Evidence:** attach endpoint matrix, test output, and any discovered remediation tickets in `## Updates`.

## Definition of Done

- [ ] All acceptance criteria satisfied and verified
- [ ] Endpoint inventory attached to update history
- [ ] New or updated tests recorded with file paths / commands
- [ ] Follow-up security tickets created for any deferred findings
- [ ] Quality score ≥ 9 recorded in final update
- [ ] Ticket front matter updated (`status`, `updated`, `completed`)
- [ ] Ticket moved to `50-done/`

## Notes

This is intentionally a second-pass audit, not a duplicate of the earlier reverse-proxy/origin review. The goal is to validate the final composed surface after the terminal and pane architecture settle.

## Links

- `kanban/30-blocked/single-terminal-pane-webterm-integration.md`
- `kanban/50-done/extension-system-refactor-for-editor-and-terminal.md`
- `kanban/10-next/audit-proxy-sensitive-web-flows.md`
- `kanban/50-done/reverse-proxy-origin-validation.md`
- `piclaw/piclaw/src/channels/web/`
- `piclaw/piclaw/src/channels/web/http/`

## Updates

### 2026-03-12
- Board quality review: added implementation paths, explicit test plan, and DoD checklist so this can move cleanly once the blockers clear.
- Quality: ★★★★☆ 7/10 (problem: 2, scope: 2, test: 1, deps: 1, risk: 1)
- Gap: blocked on terminal delivery; endpoint inventory cannot be finalized yet.

### 2026-03-12
- Created as a gated follow-up audit for the post-refactor, post-terminal web surface.
- Explicitly blocked on both the pane-extension refactor and terminal integration work.
