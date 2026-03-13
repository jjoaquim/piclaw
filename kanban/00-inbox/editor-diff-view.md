---
id: editor-diff-view
title: Add a diff view in the editor
status: inbox
created: 2026-03-13
updated: 2026-03-13
tags:
  - work-item
  - kanban
  - web-ui
  - editor
  - diff
owner: pi
---

# Add a diff view in the editor

## Summary

Add a diff view in the web editor so users can compare two text states inside the
existing editor surface instead of switching to an external tool.

## Acceptance Criteria

- [ ] Support opening a diff view for text files in the web editor.
- [ ] Define the initial comparison sources for v1 (for example: current buffer vs saved file, two workspace files, or file vs git state).
- [ ] Keep the implementation aligned with the pane/extension model used by the editor.
- [ ] Preserve normal editor behavior for non-diff tabs.
- [ ] Define a minimal test plan for loading, rendering, and closing diff views.

## Notes

- Likely relates to the editor pane/extension architecture rather than the workspace preview path.
- Scope should stay narrow for v1; comparison source and UI affordances still need refinement.
- Could eventually support inline and/or side-by-side diff modes, but that should be decided explicitly.

## Updates

### 2026-03-13
- Added from request to track an editor diff view.

## Links

- `piclaw/piclaw/web/src/panes/editor-loader.ts`
- `piclaw/piclaw/web/src/panes/editor-pane.ts`
- `piclaw/piclaw/web/src/components/tab-strip.ts`
