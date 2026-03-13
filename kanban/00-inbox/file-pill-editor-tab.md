---
id: file-pill-editor-tab
title: Open file pills in a new editor tab when editor is visible
status: inbox
priority: medium
created: 2026-03-12
updated: 2026-03-12
estimate: M
risk: low
tags:
  - work-item
  - kanban
  - web-ui
  - file-pill
  - editor
owner: pi
---

# Open file pills in a new editor tab when editor is visible

## Summary
When a user clicks a file pill (timeline or compose), the UI should attempt to open that file in the editor only when:

1. an editor pane handler is registered for the file path/type, and
2. the editor pane is currently visible.

If both conditions are met, open the file in a new editor tab (or focus/reuse existing tab, depending on current tab store behavior).

## Current Behavior
- File pills render with a click handler slot but currently no editor-open action.
- Clicking file pills does not reliably open files in the workspace editor.
- There is no visibility-aware guard before attempting editor operations.

## Desired Behavior
- On file pill click:
  - resolve the file target path from the pill payload,
  - verify there is a registered editor for that path (via pane registry/editor resolution logic),
  - if the editor is visible in the current layout (`editorOpen`), open the file in a tab,
  - otherwise keep a no-op/clear fallback (ticket to decide final UX).
- If no editor can handle the file path, do not throw; leave the current timeline/compose UI unchanged.

## Acceptance Criteria
- [ ] Clicking a file pill in a timeline message attempts editor open when editor is visible.
- [ ] Clicking a file pill in compose references attempts editor open when editor is visible.
- [ ] File resolution guard checks for registered editor support before opening.
- [ ] If editor is hidden, click does not force-open editor unexpectedly.
- [ ] Existing pill remove behavior remains unchanged.
- [ ] No regressions in message/file-reference rendering.

## Relevant files (expected)
- `piclaw/web/src/components/file-pill.ts`
- `piclaw/web/src/components/post.ts`
- `piclaw/web/src/components/compose-box.ts`
- `piclaw/web/src/app.ts`
- `piclaw/web/src/panes/tab-store.ts`
- `piclaw/web/src/ui/use-editor-state.ts`
- `piclaw/web/src/panes/pane-registry.ts`

## Refinement Notes (v1)

### Scope lock (minimal)
- This feature is **strictly UI-only** inside the web client.
- It does **not** alter message parsing, backend APIs, or attachment storage.
- It only affects click behavior for `fileRefs` pills emitted by post/compose pill rendering.

### Deterministic behavior (v1)
1. When a user clicks a file pill, extract the file path string from the pill label/payload.
2. Ignore click if editor pane is not visible (`editorOpen === false`).
3. Resolve editor support by calling `paneRegistry.resolve({ path, mode: 'edit' })`:
   - If no pane resolves, do nothing (no throw, no nav).
   - If a pane resolves, open/reuse path via `openEditor(path)`.
4. Preserve current remove interactions on pills.
5. Preserve existing behavior for message-reference pills (`msg:<id>`) and media pills unchanged.

### Edge cases to handle
- Empty/invalid paths: no-op.
- External links or protocol paths in file section: safe no-op (no editor attempt).
- Duplicate clicks on already-open file path: should focus existing tab (current `openEditor` behavior).

### Decided
1. Unsupported or blocked file-open attempts should show a toast using the existing intent/status pane.
2. No duplicate tabs: reuse/focus existing tab when already open.

### Questions (resolved)
1. On unsupported file types while editor is visible, user feedback should be shown via the intent pane (toast style).
2. Repeated opens should reuse/focus existing tabs (`openEditor` default behavior).
### Acceptance criteria (refined)
- [ ] File pill click in **timeline** calls shared handler that gates on editor visibility + pane resolution.
- [ ] File pill click in **compose** shares the same handler behavior.
- [ ] Unsupported/invalid paths never break rendering and never open an editor.
- [ ] Existing remove interactions and drag/drop/multiselect flows are unchanged.
- [ ] If editor is hidden, clicking file pill is a no-op.