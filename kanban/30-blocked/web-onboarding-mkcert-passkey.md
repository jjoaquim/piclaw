---
id: web-onboarding-mkcert-passkey
title: Web onboarding flow for mkcert + passkey setup
status: blocked
priority: low
created: 2026-03-11
updated: 2026-03-12
tags:
  - work-item
  - kanban
  - security
  - ux
  - onboarding
owner: pi
---

# Web onboarding flow for mkcert + passkey setup

## Summary

Create a guided onboarding experience for new devices connecting to the web UI. The flow should handle local TLS trust (via mkcert root CA) and WebAuthn passkey registration in a single, user-friendly sequence — especially targeting iOS and macOS where trust configuration requires extra steps.

## Motivation

Currently, setting up a new device to securely access piclaw over HTTPS requires manual steps: installing the mkcert root CA, trusting it in the system keychain, navigating to the web UI, and registering a passkey. This is error-prone and undocumented.

## Scope

- [ ] Serve an onboarding landing page at a dedicated route (e.g. `/setup` or `/onboard`)
- [ ] Generate and serve a `.mobileconfig` profile containing the mkcert root CA for iOS/macOS one-tap install
- [ ] Display platform-specific instructions (iOS: Settings → Profile → Install → Trust; macOS: Keychain Access)
- [ ] After CA trust is established, redirect to HTTPS and prompt WebAuthn passkey registration
- [ ] Detect whether the connection is already trusted (HTTPS + valid cert) and skip CA steps
- [ ] Provide a QR code for the onboarding URL so mobile devices can scan from a desktop session

## Acceptance Criteria

- [ ] Onboarding flow is split into trust-establishment and passkey-registration phases.
- [ ] Apple-focused `.mobileconfig` support is evaluated with explicit platform limitations noted.
- [ ] Unauthenticated-vs-authenticated entry requirements are clarified.
- [ ] Follow-up implementation work is split if certificate onboarding and passkey UX need separate tickets.

## Implementation Paths

### Path A — Static page + manual steps
Serve a static HTML page with download links and step-by-step instructions per platform.

Pros: Simple, no server logic beyond file serving.
Cons: No automation, user must follow instructions carefully.

### Path B — Guided wizard with detection (recommended)
Multi-step wizard that detects platform (User-Agent), serves the right profile/instructions, checks HTTPS status, and gates passkey registration on successful trust.

Pros: Polished UX, fewer support issues.
Cons: More frontend work, platform detection can be fragile.

## Updates

### 2026-03-12
- Board quality review: added rough acceptance criteria so the ticket clears the inbox gate more cleanly.
- Put on hold pending prioritization; not active in the current piclaw refinement/implementation queue.

### 2026-03-11
- Created from ideas backlog.

## Notes

- The `.mobileconfig` approach only works for Apple devices; Android/Linux/Windows need different trust mechanisms.
- Consider whether this should be behind auth or accessible unauthenticated (chicken-and-egg: need trust before auth works).
- Related to but distinct from `audit-proxy-sensitive-web-flows.md` (which covers existing WebAuthn hardening).

## Links

- `kanban/10-next/audit-proxy-sensitive-web-flows.md`
- `notes/ideas.md`
