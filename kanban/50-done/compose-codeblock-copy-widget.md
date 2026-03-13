---
id: codeblock-copy-widget
title: Add copy widget for code blocks in chat posts
status: done
priority: medium
created: 2026-03-12
updated: 2026-03-12
completed: 2026-03-12
estimate: S
risk: low
tags:
  - work-item
  - kanban
  - web-ui
  - clipboard
  - post-content
owner: pi
---

# Add copy widget for code blocks in chat posts

## Summary

Added a copy control for rendered code blocks in timeline posts. The final
implementation keeps the control pinned to the top-right corner of each code
block, copies raw code text only, shows inline SVG success/error states, and
uses the more reliable always-visible presentation after iPhone Safari testing.

## Acceptance Criteria

- [x] Copy control appears in the top-right corner of rendered code blocks.
- [x] Copy action captures full raw code content only, with preserved line breaks and no fences/language label/UI chrome.
- [x] Success state is shown inline on the same control using an SVG checkmark.
- [x] Failure state is shown inline on the same control, without a global toast, and allows immediate retry.
- [x] Applies consistently to all rendered code blocks in timeline posts (assistant, user, threaded/history views).
- [x] No regressions in markdown/code rendering.
- [x] Existing message rendering and selection behavior remains stable.

## Implementation Notes

- Implemented in `piclaw/web/src/components/post.ts` by enhancing rendered code
  blocks after markdown mount.
- The control is anchored outside the horizontal scroll area so it stays pinned
  in the corner while code content scrolls sideways.
- `navigator.clipboard.writeText()` is used first, with a fallback copy path.
- Inline SVG states are used for idle/success/error.

## Updates

### 2026-03-12
- Added ticket for planning support for copy UX in chat code blocks.
- Refined in 5-question pass: top-right placement, raw-code-only copy semantics, SVG checkmark success state, inline failure/retry, and timeline-wide scope.
- Web research and iPhone Safari testing showed tap-to-reveal/hover-style behavior was unreliable on touch devices, so the implementation was adjusted to prefer an always-visible control.
- Implemented the widget in the web client, rebuilt the web bundles, and verified the control remains pinned rather than scrolling with the code content.
- Closed as done.

## Relevant Files

- `piclaw/web/src/components/post.ts`
- `piclaw/web/static/css/styles.css`

## Notes

- Final implementation intentionally differs from the original hover-first idea.
  Reliability on iPhone Safari took precedence over minimising chrome.
