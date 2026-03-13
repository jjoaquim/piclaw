---
id: next-minor-release
title: Prepare next minor release
status: blocked
priority: medium
created: 2026-03-10
updated: 2026-03-12
target_release: next
tags:
  - work-item
  - kanban
  - release
owner: pi
---

# Prepare next minor release

## Summary

Prepare the next minor release once the remaining blocking issues are resolved.

## Blockers

- `kanban/30-blocked/azure-model-routing-and-stability.md`

## Acceptance Criteria

- [ ] Blocking release issues are either shipped or explicitly deferred with rationale.
- [ ] Working tree is clean and release scope is confirmed.
- [ ] Full release validation passes (tests, typecheck, build, pack, and CI trigger verification).
- [ ] Version bump, tag, release notes, push, and GitHub release all complete successfully.
- [ ] Release notes highlight user-visible changes and omit low-value implementation noise.
- [ ] Post-release verification confirms images/artifacts and CI completed successfully.

## Implementation Paths

### Path A — Manual release runbook (recommended)
- Keep explicit checklist execution by operator.
- Gate release start on blocker clearance and clean working tree.
- Generate notes from curated feature summary plus changelog verification.

**Pros:** controlled, low automation risk.
**Cons:** slower and operator-dependent.

### Path B — Semi-automated release script
- Add scripted steps for version bump, tag creation, changelog draft, and push.
- Keep human approval for release notes and publish action.

**Pros:** repeatable and faster.
**Cons:** script maintenance and guardrail design needed.

### Path C — Fully CI-driven release pipeline
- Trigger release workflow from tag push.
- Auto-publish artifacts and release notes templates.

**Pros:** scalable for frequent releases.
**Cons:** requires robust CI secret handling and rollback strategy.

## Recommended Path

Use **Path A** for the next release, then invest in **Path B** once the Azure blocker is resolved.

## Test Plan

- Run release gate locally:
  - `cd /workspace/piclaw/piclaw && bun run test && bun run typecheck && bun run build:web`
  - `cd /workspace/piclaw && make build-piclaw`
- Validate package/release mechanics:
  - clean `git status`
  - version sync (`VERSION` + `piclaw/package.json`)
  - `bun pm pack` / installability check if release mechanics changed
- Post-release validation:
  - verify GitHub Actions tag workflow starts
  - verify GitHub release contents
  - verify published container images/tags exist

## Definition of Done

- [ ] All acceptance criteria satisfied and verified
- [ ] Release notes reviewed for accuracy and signal-to-noise
- [ ] CI for the release tag completed successfully
- [ ] Update history complete with evidence (tag, commit, release URL)
- [ ] Quality score ≥ 9 recorded in final update
- [ ] Ticket front matter updated (`status`, `updated`, `completed`)
- [ ] Ticket moved to `50-done/`

## Checklist

- [ ] Run full test suite
- [ ] Bump minor version
- [ ] Tag
- [ ] Draft extensive release notes based on previous commits (avoid mentioning fixes, only highlight new features like UI enhancements since the last minor release)
- [ ] Push
- [ ] Use keychain to create release
- [ ] Verify CI is running

## Updates

### 2026-03-12
- Board quality review: fixed blocker path to the current Azure ticket location and aligned the ticket id/title with the filename.
- Added explicit acceptance criteria, test plan, and DoD so the release work can move cleanly once the blocker clears.
- Quality: ★★★☆☆ 6/10 (problem: 2, scope: 1, test: 1, deps: 1, risk: 1)
- Gap: still blocked on Azure routing/stability and lacks a more automated release runbook.

### 2026-03-11
- Added implementation-path options for release execution and automation.

### 2026-03-11
- v1.2.0 tagged and released (commit `6ac2dc4`, 36 commits since v1.1.4).
- Extension system, standalone editor, markdown preview, message permalinks all shipped.
- v1.2.1 patch: synced package.json version.
- v1.2.2 patch released (commit `5411e08`): IPC media pipeline, provider usage display, inline SVG UX, kanban skill improvements, test guardrails.
- This ticket now refers to the *next* release after v1.2.2.
- Still blocked on Azure model routing & stability ticket.

### 2026-03-10
- Moved out of inbox and marked blocked.
- Renamed to a clearer slug filename.
- Reverse-proxy origin blocker is resolved.
- Release remains blocked on Azure-model routing/stability follow-up.

## Notes

Once the Azure-model blocker clears, this should likely become the top release-prep ticket.

## Links

- `kanban/30-blocked/azure-model-routing-and-stability.md`
- `kanban/50-done/reverse-proxy-origin-validation.md`
- `piclaw/VERSION`
