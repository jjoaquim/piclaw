---
id: workspace-fts-indexing-status-feedback
title: Add workspace FTS indexing status and feedback in the UI
status: inbox
priority: medium
created: 2026-03-12
updated: 2026-03-12
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - web-ui
  - workspace
  - search
  - fts
owner: pi
---

# Add workspace FTS indexing status and feedback in the UI

## Summary

Expose workspace full-text indexing state clearly so users can tell whether
search results are fresh, incomplete, or still being indexed.

## Current Behavior

- There is no dedicated UI for workspace FTS search yet beyond the `/fts` command path.
- The search icon in chat is for SQLite/chat search, not workspace FTS search.
- Workspace search can depend on FTS indexing state that is not obvious in the UI.
- Users may not know whether indexing is in progress, stale, failed, or complete.
- Missing or partial search results can look like search failure rather than indexing lag.

## Desired Behavior

- The workspace explorer header shows the current indexing state.
- Explicit states should include:
  - never indexed
  - indexing
  - ready
  - stale
  - failed
- When workspace FTS search gains a dedicated UI, search results that may be incomplete should show a small inline warning rather than a heavy status panel.
- A visible refresh/reindex action should exist in the UI, with exact placement still to be finalised.
- The workspace FTS search UX itself still needs to be defined; this ticket should capture both the status feedback requirement and that open UX-design step.
- Copy should stay plain and user-facing rather than operator-heavy or overly technical.
- Status should be accurate enough to support troubleshooting without requiring logs or SQL inspection.

## Acceptance Criteria

- [ ] Workspace explorer header exposes a clear indexing state.
- [ ] Supported states include: never indexed, indexing, ready, stale, and failed.
- [ ] Search surfaces show a small inline warning when results may be incomplete due to indexing state.
- [ ] A visible refresh/reindex action exists and shows visible state changes while running.
- [ ] Failure/stale states are distinguishable from "no matches found".
- [ ] Status text stays plain and user-facing.
- [ ] No regressions in existing workspace search behavior.

## Relevant Areas

- `piclaw/web/src/components/workspace-explorer.ts`
- `piclaw/web/src/app.ts`
- `piclaw/web/src/api.ts`
- `piclaw/piclaw/src/channels/web/workspace/*`
- any workspace search / indexing / tree-cache status surfaces already available

## Notes

- This is primarily a state-visibility and feedback task, not a search-algorithm rewrite.
- There is currently no dedicated workspace FTS UI beyond the `/fts` command, so part of this ticket is defining the user-facing search/status UX rather than just adding a badge to an existing screen.
- The chat search icon currently maps to SQLite/chat search and should not be treated as the workspace FTS entry point.
- Status belongs in the workspace explorer header.
- Search-result incompleteness should use a small inline warning, not a large status treatment.
- A visible refresh/reindex control is in scope, but its exact location can be decided during implementation.
- Prefer plain user-facing copy such as "Indexing workspace…" over operator-oriented phrasing.
- If indexing internals do not currently expose enough state, add the smallest reliable status surface first.

## Updates

### 2026-03-12
- Added to track missing UI feedback for workspace full-text indexing status and freshness.
- Refined from 5-question pass:
  - placement should be in the workspace header
  - explicit states should include never indexed, indexing, ready, stale, and failed
  - incomplete-result messaging should be a small warning
  - refresh/reindex should be visible in the UI
  - copy should stay plain and user-facing
- Added important scope clarification:
  - there is no dedicated workspace FTS UI yet beyond `/fts`
  - the chat search icon is for SQLite/chat search, not workspace FTS
  - the user-facing workspace FTS UX still needs to be defined
