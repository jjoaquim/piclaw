---
id: origin-reverse-proxy-posting
title: Fix web origin validation behind reverse proxy
status: done
priority: critical
created: 2026-03-10
updated: 2026-03-11
completed: 2026-03-10
target_release: next
tags:
  - work-item
  - kanban
  - web
  - reverse-proxy
  - auth
owner: pi
---

# Fix web origin validation behind reverse proxy

## Summary

Posting failed from a domain-backed instance behind a reverse proxy with:

`Origin not allowed on an instance that has a reverse proxy.`

This is now fixed and verified on the Azure VM instance (`isdclaw`).

## Acceptance Criteria

- [x] Web posting works behind the configured reverse proxy and custom domain.
- [x] Origin / CSRF validation correctly honors trusted forwarded host/proto values.
- [x] The fix does not weaken same-origin protections for non-proxied deployments.
- [x] Follow-up documentation / hardening work has been split into separate tickets.

## Implementation Paths Considered (historical)

### Path A — Patch CSRF checks in place (chosen)
- Extend existing CSRF origin validation to evaluate direct + forwarded candidates.
- Add same-host TLS offload fallback.
- Add `Forwarded` header parsing.

Why chosen: fastest safe fix with clear regression-test boundaries.

### Path B — New centralized proxy/origin middleware
- Build middleware to canonicalize origin once and pass downstream.

Why deferred: larger refactor than needed for incident response timeline.

### Path C — Proxy-specific mode bypasses
- Add broad bypass flags for proxied deployments.

Why rejected: weakens security guarantees and increases misconfiguration risk.

## Updates

### 2026-03-11
- Backfilled implementation-path analysis for future similar incidents.

### 2026-03-10
- Promoted from next to doing after a live failure report.
- Audited the web CSRF / origin path:
  - `src/channels/web/http/request-guards.ts`
  - `src/channels/web/http/security.ts`
  - `src/utils/request-client.ts`
- Implemented fix:
  - CSRF origin guard now checks both direct and forwarded origin candidates.
  - Added TLS-offload fallback for same-host `https -> http` proxy hops.
  - Added support for standard `Forwarded` header parsing.
- Added regression tests:
  - `test/channels/web/security.test.ts`
  - `test/utils/request-client.test.ts`
- Verified tests + typecheck locally.
- Upgraded the Azure VM (`isdclaw`) over Tailscale (`100.75.207.57:2211`).
- Set `web.trustProxy = true` in `/workspace/.piclaw/config.json` on that machine.
- Restarted the remote `systemd --user` `piclaw.service`.
- User confirmed the post flow now works.

## Notes

Related failure report:
- `Failed to post: Origin not allowed on an instance that has a reverse proxy.`

Remote validation target:
- Host: `isdclaw`
- Access path used: Tailscale `100.75.207.57:2211`
- Runtime: host-native `systemd --user`

## Follow-up moved out

- `kanban/10-next/document-cloudflare-tunnel-reverse-proxy-setup.md`
- `kanban/10-next/audit-proxy-sensitive-web-flows.md`

## Links

- `src/channels/web/http/request-guards.ts`
- `src/channels/web/http/security.ts`
- `src/utils/request-client.ts`
- `test/channels/web/security.test.ts`
- `test/utils/request-client.test.ts`
