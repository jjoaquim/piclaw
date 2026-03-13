---
id: document-cloudflare-tunnel-reverse-proxy-setup
title: Document Cloudflare Tunnel / reverse-proxy setup for piclaw web
status: next
priority: medium
created: 2026-03-10
updated: 2026-03-12
target_release: next
tags:
  - work-item
  - kanban
  - docs
  - reverse-proxy
  - cloudflare
owner: pi
---

# Document Cloudflare Tunnel / reverse-proxy setup for piclaw web

## Summary

Document the correct operator setup for piclaw when running behind Cloudflare Tunnel or another reverse proxy.

## Acceptance Criteria

- Explain when `web.trustProxy` / `PICLAW_TRUST_PROXY` must be enabled.
- Document required forwarded headers (`X-Forwarded-Host`, `X-Forwarded-Proto`, `Forwarded`).
- Include Cloudflare Tunnel notes and at least one concrete example configuration.
- Link the doc from the main web/deployment docs.

## Implementation Paths

### Path A — Single authoritative doc page (recommended)
- Create `docs/reverse-proxy.md` with:
  - trust-proxy requirements
  - required headers
  - Cloudflare Tunnel example config
  - troubleshooting checklist
- Link from `README.md` and `docs/configuration.md`.

Pros: clear operator entry point.
Cons: requires careful cross-linking to avoid doc drift.

### Path B — Expand configuration.md only
- Keep everything in `docs/configuration.md` under a dedicated section.

Pros: fewer files.
Cons: long page, harder to discover proxy-specific guidance.

### Path C — Provider-specific runbook docs
- Add environment-specific notes (Cloudflare, Caddy, Nginx, Traefik) in separate docs.

Pros: detailed and practical.
Cons: larger maintenance burden and examples can go stale.

## Recommended Path

Implement **Path A**, then add concise links/snippets in `configuration.md` and README.

## Test Plan

- **Docs review:** verify the new reverse-proxy doc against current config/env handling.
- **Operator validation:** test at least one concrete Cloudflare Tunnel setup and one generic reverse-proxy example against current behavior.
- **Linking:** confirm README and configuration docs point to the final page.

## Definition of Done

- [ ] All acceptance criteria satisfied and verified
- [ ] Documentation reviewed against current runtime behavior
- [ ] Cross-links from README / config docs added and verified
- [ ] Operational examples included and sanity-checked
- [ ] Quality score ≥ 9 recorded in final update
- [ ] Ticket front matter updated (`status`, `updated`, `completed`)
- [ ] Ticket moved to `50-done/`

## Updates

### 2026-03-12
- Board quality review: added an explicit docs/test plan and DoD checklist.
- Quality: ★★★★☆ 7/10 (problem: 2, scope: 2, test: 1, deps: 1, risk: 1)
- Gap: still needs exact example configs and doc target paths before pickup.

### 2026-03-11
- Added implementation-path options and recommended documentation structure.

### 2026-03-10
- Created as a follow-up to the `isdclaw` reverse-proxy origin fix.
- We had to manually enable `web.trustProxy = true` on the Azure VM.

## Notes

This should reduce future breakage when deploying piclaw behind domain frontends.

## Links

- `kanban/50-done/reverse-proxy-origin-validation.md`
- `src/core/config.ts`
- `src/channels/web/http/security.ts`
