---
id: rounded-orthogonal-mermaid-arrows
title: Support rounded 90-degree arrow corners in Mermaid rendering
status: inbox
priority: low
created: 2026-03-12
updated: 2026-03-12
target_release: next
estimate: S
risk: low
tags:
  - work-item
  - kanban
  - mermaid
  - rendering
  - ui
owner: pi
---

# Support rounded 90-degree arrow corners in Mermaid rendering

## Summary

Investigate adding support for rounded 90-degree arrow corners in Mermaid diagrams rendered by the web UI.

Mermaid syntax itself does not appear to expose a simple built-in option for “orthogonal elbows, but rounded corners.” However, because piclaw uses the vendored `beautiful-mermaid` renderer, this is likely achievable as a renderer-level improvement.

## Desired Behavior

- The end goal is true rounded orthogonal corners, not merely softer-looking hard elbows.
- The improvement should apply globally across Mermaid rendering rather than per-diagram or per-theme.
- First pass may still ship a lower-risk visual softening approach if it looks good enough and does not introduce regressions.
- A higher-fidelity true rounded-elbow follow-up should remain in scope even if the quick first pass ships.
- The feature should only be accepted if it balances both visual improvement and layout/rendering safety.

## Acceptance Criteria

- [ ] Confirm whether Mermaid source syntax alone can express orthogonal arrows with rounded elbows in the diagram types we support.
- [ ] Evaluate a low-risk renderer-level option using SVG/CSS join styling (for example `stroke-linejoin: round`).
- [ ] Evaluate a higher-fidelity renderer change that generates true rounded elbows / filleted orthogonal turns.
- [ ] Apply the chosen behavior globally across Mermaid rendering rather than as a theme/config toggle.
- [ ] Verify visual improvement across all supported Mermaid diagram types we render, not just a single sample.
- [ ] Verify the change does not introduce unacceptable layout/rendering regressions.
- [ ] If the quick styling approach ships first, keep a follow-up path for true rounded elbow geometry.

## Implementation Paths

### Path A — Rounded SVG joins (recommended first pass)
1. Keep the existing orthogonal routing.
2. Change edge stroke styling to use rounded joins.
3. Compare visual output across the main supported diagram types.

**Pros:** simple, low-risk, likely enough to improve aesthetics immediately.
**Cons:** not true geometric corner rounding; may only soften the current elbows visually.

### Path B — True rounded elbow generation
1. Detect orthogonal elbow points in generated edge paths.
2. Replace hard corners with short arcs or rounded path segments.
3. Add a configurable corner radius if needed.

**Pros:** produces the exact “beautiful” look desired.
**Cons:** more renderer-specific logic and more chances to regress diagram layout.

## Recommended Path

Start with **Path A** (`stroke-linejoin: round`) as the low-risk prototype and ship it if it provides a real visual improvement without regressions. However, that should be treated as a first step toward **Path B**, because the desired end state remains true rounded orthogonal corners.

## Notes

- This is a renderer concern, not primarily a Mermaid-authoring concern.
- The improvement should be tested across all Mermaid diagram types we support, not just flowcharts.
- This should be global rather than theme-specific or user-configurable.
- Success requires both a visible aesthetic improvement and acceptable layout/rendering stability.
- Since the vendored Mermaid pipeline is now working, this is a good follow-up enhancement but not urgent.

## Links

- `kanban/50-done/fix-mermaid-vendor-build.md`
- `kanban/50-done/validate-mermaid-vendoring.md`
- `piclaw/piclaw/web/static/js/vendor/beautiful-mermaid.js`
- `piclaw/piclaw/web/src/markdown.ts`

## Updates

### 2026-03-12
- Created from manual Mermaid rendering validation follow-up.
- Captures both the low-risk SVG join approach and the higher-fidelity rounded-elbow renderer approach.
- Refined from 5-question pass:
  - target end state is true rounded orthogonal corners
  - scope should apply globally
  - first pass may ship the quick visual softening approach
  - true rounded geometry should still remain a follow-up target
  - acceptance requires both visual improvement and low regression risk
