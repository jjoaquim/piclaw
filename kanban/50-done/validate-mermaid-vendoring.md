---
id: validate-mermaid-vendoring
title: Validate mermaid vendor build path after editor extension move
status: done
priority: medium
created: 2026-03-11
updated: 2026-03-12
completed: 2026-03-12
tags:
  - work-item
  - kanban
  - build
  - vendor
  - mermaid
owner: pi
---

# Validate mermaid vendor build path after editor extension move

## Summary

Validate that the Mermaid vendor build path works independently after the editor extension move, that the bundle still rebuilds correctly, and that Mermaid diagrams render successfully at runtime.

## Acceptance Criteria

- [x] `build:vendor` only builds mermaid (codemirror reference removed)
- [x] `build:vendor` succeeds or fails gracefully with clear error
- [x] Mermaid diagrams render correctly in timeline after build
- [x] `build:web` completes end-to-end (vendor + app + editor + css)
- [x] Document workaround for `beautiful-mermaid` install failure in container

## Implementation Paths

### Path A — Keep dedicated validation ticket (implemented)
1. Use the parent ticket for the vendoring/build changes.
2. Keep this ticket focused on proof that the vendor path and runtime rendering work.

**Pros:** clean validation record.
**Cons:** some overlap with the parent ticket.

### Path B — Fold validation into the parent ticket
1. Treat this ticket as historical context only after validation succeeds.
2. Keep future changes on the parent workflow ticket.

**Pros:** less duplication.
**Cons:** weaker separation of implementation vs verification.

## Recommended Path

Path A was used to complete and record the validation pass. Future Mermaid vendoring changes should likely be tracked through the parent workflow ticket(s) instead of reopening this one.

## Test Plan

- [x] `cd /workspace/piclaw/piclaw && bun run build:vendor`
- [x] `cd /workspace/piclaw/piclaw && bun run build:web`
- [x] `cd /workspace/piclaw/piclaw && bun test test/scripts/beautiful-mermaid-vendor.test.ts`
- [x] Manual in-app Mermaid render verification in the web timeline

## Definition of Done

- [x] All acceptance criteria satisfied and verified
- [x] Validation evidence recorded in `## Updates`
- [x] Parent ticket and this ticket agree on the final vendor path
- [x] Manual timeline render verification completed
- [x] Ticket front matter updated (`status`, `updated`, `completed`)
- [x] Ticket moved to `50-done/`

## Updates

### 2026-03-12
- Final runtime validation completed: all supplied Mermaid examples rendered successfully in the web UI timeline.
- Verified examples included flowchart, sequence, state, class, ER, xychart, grouped/subgraph, and styling coverage.
- Final quality: ★★★★★ 9/10 (problem: 2, scope: 2, test: 2, deps: 1, risk: 2)

### 2026-03-12
- Confirmed `build:vendor` routes through the Mermaid-only vendor path.
- Added deterministic metadata output and smoke-test coverage for rebuilding to temp paths.
- Evidence:
  - `cd /workspace/piclaw/piclaw && bun run build:vendor` → pass
  - `cd /workspace/piclaw/piclaw && bun run build:web` → pass
  - `cd /workspace/piclaw/piclaw && bun test test/scripts/beautiful-mermaid-vendor.test.ts` → pass

### 2026-03-11
- Ticket created to validate the Mermaid vendor path after the editor extension move.

## Notes

This ticket is now historical validation evidence. Future generalized vendoring work should move to the reusable vendored dependency workflow.

## Links

- `kanban/50-done/fix-mermaid-vendor-build.md`
- `piclaw/piclaw/web/src/vendor/mermaid-entry.ts`
- `piclaw/piclaw/web/static/js/vendor/beautiful-mermaid.js`
- `piclaw/piclaw/test/scripts/beautiful-mermaid-vendor.test.ts`
