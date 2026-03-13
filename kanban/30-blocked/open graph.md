---
id: opengraph-previews-too-narrow-in-desktop
title: Fix OpenGraph preview sizing in desktop split layout
status: blocked
priority: medium
created: 2026-03-11
updated: 2026-03-11
target_release: next
tags:
  - work-item
  - kanban
  - web
  - ux
  - opengraph
owner: pi
---

# Fix OpenGraph preview sizing in desktop split layout

## Summary

When the web UI runs in desktop layout with workspace browser and editor open, OpenGraph link previews remain too narrow and consume disproportionate timeline width instead of adapting to available message column constraints.

## Acceptance Criteria

- OpenGraph cards respect chat column width in desktop split layouts.
- Preview sizing remains readable and balanced across breakpoints.
- No regression for mobile/tablet card sizing.
- Add CSS/UI regression coverage (snapshot or visual checks where feasible).

## Implementation Paths

### Path A — CSS constraint fix (fastest)
- Add max-width and min-width constraints to OpenGraph card container scoped to message content column.
- Ensure cards use `width: 100%` of message body, not of larger parent flex region.
- Validate with workspace + editor side panes open.

Pros: low risk, minimal code changes.
Cons: may not fix all nested-layout edge cases.

### Path B — Layout contract refactor (more robust)
- Define explicit content-width contract for timeline post body.
- Move preview sizing responsibility to a shared post-content wrapper.
- Standardize embedded component sizing (OG cards, images, tables) against same contract.

Pros: robust long-term fix.
Cons: broader CSS touch surface and regression risk.

### Path C — Component-level adaptive behavior
- Add explicit responsive behavior in OpenGraph component based on measured container width.
- Use compact/regular card modes with threshold switching.

Pros: fine-grained control.
Cons: extra JS complexity, potentially unnecessary if CSS-only solves issue.

## Recommended Path

Start with **Path A**; escalate to **Path B** only if edge-case regressions remain.

## Updates

### 2026-03-11
- Ticket formalized from freeform note.
- Added implementation options and recommended approach.
- Parked because this may already be fixed; revisit only if the narrow-preview issue is reproduced again.

## Links

- `piclaw/piclaw/web/static/css/styles.css`
- `piclaw/piclaw/web/src/components/post.ts`
