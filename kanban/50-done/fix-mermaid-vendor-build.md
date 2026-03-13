---
id: fix-mermaid-vendor-build
title: Fix beautiful-mermaid vendor build — vendor or replace the package
status: done
priority: high
created: 2026-03-11
updated: 2026-03-12
completed: 2026-03-12
tags:
  - work-item
  - kanban
  - build
  - bug
  - mermaid
owner: pi
---

# Fix beautiful-mermaid vendor build

## Summary

Fix the beautiful-mermaid vendoring/build path so the source tree contains a working vendored bundle, the build is reproducible, and the web UI can render Mermaid diagrams successfully.

## Acceptance Criteria

- [x] `make build-piclaw` completes successfully in the container
- [x] `bun run build:web` completes without errors
- [x] Mermaid diagrams render correctly in the web timeline
- [x] No manual workaround needed for vendor builds
- [x] Vendor bundle is reproducible (documented how to rebuild if needed)

## Implementation Paths

### Path A — Vendor the built bundle + reproducible rebuild flow (implemented)
1. Keep the built Mermaid bundle in the source tree.
2. Add deterministic rebuild/update scripts.
3. Pin the dependency version and emit metadata/checksums.
4. Route the project build through the canonical Makefile path.

**Pros:** reproducible, source-controlled, container-friendly.
**Cons:** requires maintaining vendored artifacts.

## Recommended Path

Path A shipped successfully.

## Test Plan

- [x] `cd /workspace/piclaw/piclaw && bun run build:vendor`
- [x] `cd /workspace/piclaw/piclaw && bun run build:web`
- [x] `cd /workspace/piclaw/piclaw && bun test test/scripts/beautiful-mermaid-vendor.test.ts`
- [x] `cd /workspace/piclaw && make vendor && make build-piclaw`
- [x] Manual in-app Mermaid render verification in the web timeline

## Definition of Done

- [x] All acceptance criteria satisfied and verified
- [x] Vendored bundle and metadata committed together
- [x] Rebuild / upgrade path documented and sanity-checked
- [x] Runtime Mermaid rendering manually verified
- [x] Update history complete with evidence
- [x] Quality score ≥ 9 recorded in final update
- [x] Ticket front matter updated (`status`, `updated`, `completed`)
- [x] Ticket moved to `50-done/`

## Updates

### 2026-03-12
- Manual runtime validation completed: multiple Mermaid examples rendered successfully in the web UI timeline (flowchart, sequence, state, class, ER, xychart, subgraph, and styling tests all worked).
- This closes the final remaining acceptance gap from the vendoring work.
- Final quality: ★★★★★ 9/10 (problem: 2, scope: 2, test: 2, deps: 1, risk: 2)

### 2026-03-12
- Implemented a reproducible vendoring flow in `piclaw/piclaw/`:
  - `scripts/build-beautiful-mermaid-vendor.ts`
  - `scripts/update-beautiful-mermaid.ts`
  - deterministic metadata at `web/static/js/vendor/beautiful-mermaid.meta.json`
  - exact dependency pinning for `beautiful-mermaid@1.1.3`
- Evidence:
  - `cd /workspace/piclaw/piclaw && bun test test/scripts/beautiful-mermaid-vendor.test.ts` → pass
  - `cd /workspace/piclaw/piclaw && bun run build:web` → pass
  - `cd /workspace/piclaw && make vendor` → pass
  - `cd /workspace/piclaw && make build-piclaw` → pass

### 2026-03-11
- Ticket created to fix the broken Mermaid vendor/build path.

## Notes

This ticket delivered the reusable vendoring baseline that later motivated the general-purpose vendored dependency workflow ticket.

## Links

- `piclaw/piclaw/package.json`
- `piclaw/piclaw/web/src/vendor/mermaid-entry.ts`
- `piclaw/piclaw/web/static/js/vendor/beautiful-mermaid.js`
- `piclaw/piclaw/web/static/js/vendor/beautiful-mermaid.meta.json`
- `piclaw/piclaw/scripts/build-beautiful-mermaid-vendor.ts`
- `piclaw/piclaw/scripts/update-beautiful-mermaid.ts`
- `piclaw/Makefile`
