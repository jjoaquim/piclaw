---
id: keychain-workflow-helper
title: Keychain workflow helper — streamlined credential management
status: inbox
priority: low
created: 2026-03-11
updated: 2026-03-12
tags:
  - work-item
  - kanban
  - tooling
  - security
owner: pi
---

# Keychain workflow helper — streamlined credential management

## Summary

Improve the keychain tool ergonomics for common credential workflows: adding SSH keys, retrieving secrets for scripts, rotating tokens, and bulk operations. Currently the keychain works but requires knowing exact entry names and manual multi-step flows.

## Motivation

Frequent operations (deploying SSH keys, refreshing API tokens, looking up credentials for scripts) involve multiple `keychain` calls with exact name strings. A higher-level helper or command extensions would reduce friction and errors.

## Scope

- [ ] `/keychain` slash command for interactive listing and lookup (prettier than raw tool output)
- [ ] Bulk import: read multiple keys from a directory or env file
- [ ] SSH key pair helper: store both public and private key with consistent naming convention
- [ ] Credential rotation workflow: update a secret and optionally verify it works (e.g. test an API token)
- [ ] Expiry tracking: optional `expires` metadata field with warnings when credentials are stale
- [ ] Export helper: write a credential to a temp file with restricted permissions for use by external tools (auto-cleanup)

## Acceptance Criteria

- [ ] Common keychain workflows (list, lookup, add, rotate, export) are mapped and prioritized.
- [ ] At least one ergonomic entry point is proposed (`/keychain`, helper tool, or both).
- [ ] Security constraints for secret display, temp-file export, and rotation verification are documented.
- [ ] Follow-up implementation work is split into manageable tickets if the scope is too large for one pass.

## Implementation Paths

### Path A — Slash command + helpers (recommended)
Add `/keychain` command that wraps common flows (list, get, set, rotate) with formatted output. Keep the existing tool for programmatic use.

### Path B — Dedicated extension
Full extension with UI panel for credential management.

Pros: Visual, discoverable.
Cons: Security risk of exposing secrets in UI; significant effort.

## Updates

### 2026-03-12
- Board quality review: added rough acceptance criteria so this clears the inbox gate more cleanly.

### 2026-03-11
- Created from ideas backlog.

## Notes

- Secret values must never be displayed in the web timeline unless explicitly requested.
- The existing `keychain` tool already handles list/get/set/delete — this is about ergonomic wrappers.
- SSH key naming convention is already established (`ssh/<name>` and `ssh/<name>.pub`).

## Links

- `notes/ideas.md`
- `piclaw/src/secure/keychain.ts`
- `piclaw/src/extensions/keychain-tools.ts`
