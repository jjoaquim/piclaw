---
id: pi-generative-ui-integration-evaluation
title: Evaluate integrating pi-generative-ui into piclaw
status: inbox
created: 2026-03-13
updated: 2026-03-13
tags:
  - work-item
  - kanban
  - web
  - ui
  - generative-ui
  - integration
owner: pi
---

# Evaluate integrating pi-generative-ui into piclaw

## Summary

Evaluate whether and how [`Michaelliv/pi-generative-ui`](https://github.com/Michaelliv/pi-generative-ui)
could be integrated into piclaw's web experience.

The goal is not to commit to adoption up front, but to understand:

- what UI/runtime model it uses
- how it maps to piclaw's current web architecture
- whether it overlaps with or supersedes current adaptive-card / structured-UI work
- what the lowest-risk integration path would be, if any

## Acceptance Criteria

- [ ] Review the reference repo architecture, runtime assumptions, and UI primitives.
- [ ] Identify overlap and differences versus piclaw's current web UI and message rendering model.
- [ ] Compare it with the current Adaptive Cards / structured UI direction already under consideration.
- [ ] Decide whether this is best treated as:
  - direct integration,
  - selective pattern adoption,
  - parallel experiment,
  - or out of scope.
- [ ] If viable, outline a minimal proof-of-concept integration path with explicit risks and boundaries.
- [ ] If not viable, document why.

## Notes

- This should stay at evaluation/design level first.
- Prefer small integration seams over broad UI rewrites.
- Should account for piclaw's current web stack, message storage model, and agent interaction flow.
- Likely related to `adopt-openclaw-ui.md`, but should be evaluated independently before merging directions.

## Updates

### 2026-03-13
- Added from request to evaluate integrating `pi-generative-ui` into piclaw.

## Links

- https://github.com/Michaelliv/pi-generative-ui
- `/workspace/kanban/00-inbox/adopt-openclaw-ui.md`
