---
id: workspace-explorer-first-upload-click-misses-pill
title: Fix workspace explorer first-click not creating a file pill for newly uploaded files
status: doing
priority: medium
created: 2026-03-12
updated: 2026-03-12
estimate: S
risk: low
tags:
  - work-item
  - kanban
  - web-ui
  - workspace-explorer
  - compose
  - file-pill
owner: pi
---

# Fix workspace explorer first-click not creating a file pill for newly uploaded files

## Summary

Investigate and fix the case where clicking a newly uploaded file from the
workspace explorer does not create the expected file pill on the first click,
even though that click should both select/preview the file and attach it into
compose.

## Current Behavior

- After uploading a new file, the first click from the workspace explorer can fail
  to create an attach/reference pill.
- The intended click target is the workspace explorer item itself.
- The issue appears to affect all file types rather than a single MIME class.
- A later click or refresh/state change may succeed, suggesting stale selection,
  event ordering, or upload-to-tree state propagation issues.

## Desired Behavior

- Newly uploaded files should be attachable immediately from the workspace
  explorer.
- The first click after upload should both:
  - select/show the file in preview, and
  - create the expected file pill in the compose box.
- Explorer selection, preview state, and compose attachment state should stay in sync.
- Behaviour should be consistent across all file types.

## Acceptance Criteria

- [ ] Reproduce and document the first-click failure path for a newly uploaded file from the workspace explorer item itself.
- [ ] Identify whether the problem is caused by stale tree state, preview state,
  event ordering, path normalization, or compose attach wiring.
- [ ] First click after upload reliably creates the file pill without requiring a refresh or second click.
- [ ] That same first click continues to update explorer selection and preview state correctly.
- [ ] Behaviour is verified across representative file types, not just one MIME class.
- [ ] Existing explorer selection and preview behaviour for long-existing files remains unchanged.
- [ ] Add regression coverage if the affected code path is testable.

## Relevant Files

- `piclaw/web/src/components/workspace-explorer.ts`
- `piclaw/web/src/app.ts`
- `piclaw/web/src/components/file-pill.ts`
- `piclaw/web/src/api.ts`
- any upload/refresh wiring involved in explorer tree updates and compose attachment state

## Notes

- This likely overlaps with explorer refresh timing and file-pill creation wiring,
  but should be tracked separately from broader upload-progress or non-media attach work.
- New uploads should behave the same as long-existing files from the user's perspective.
- User clarification: the failing interaction is the workspace explorer click itself;
  expected result is both preview selection and compose-pill creation.
- User has only observed it after upload so far; create/rename paths remain unconfirmed.
- Failure mode on the missed first click still needs explicit reproduction notes because the user did not observe whether it becomes selection-only, preview-only, or a no-op.
- Initial code trace points at `workspace-explorer.ts`: upload currently calls `setSelectedPath(lastResult.path)` immediately, so the newly uploaded row is already selected before the first user click.
- The tree click handler has an early `isSelected` branch that schedules rename and returns before file attach logic runs; that is a plausible explanation for the first-click miss on fresh uploads.

## Audit conclusion

The current code path strongly supports the selected-row/rename interaction as the real cause.

- `uploadFilesToTarget()` finishes by calling `setSelectedPath(lastResult.path)` and `loadPreviewRef.current?.(lastResult.path)` before the user clicks the new row.
- In `handleTreeClick`, the branch for `isSelected && !isCaretClick && !isActionClick && clickedPath !== '.'` schedules rename and returns early.
- The file-pill creation path for explorer clicks lives later in the file branch via `onFileSelectRef.current?.(node.path, node)`.
- Because the early selected-row branch returns first, the first explicit click on the newly uploaded row can be consumed as a rename-intent click instead of reaching the compose-pill attach logic.

This is now more than a vague suspicion: the control flow matches the symptom directly. It also suggests the same class of issue may exist for other programmatic file selections such as `createUntitledFile()`, which also calls `setSelectedPath(nextPath)` before any explicit user click, although that path has not been user-reported yet.

## Likely patch

Prefer a minimal fix that preserves rename-on-second-click for ordinary rows while exempting fresh programmatic selections.

- Add a small ref/state marker for a programmatically selected file path after upload (for example `pendingExplicitAttachPathRef`).
- Set that marker when upload selects the newly uploaded file.
- In `handleTreeClick`, before the selected-row rename early return, check whether the clicked file matches that pending programmatic-selection marker.
- If it matches:
  - clear the marker
  - run the normal file-click path (`onFileSelectRef.current?.(node.path, node)` and `loadPreviewRef.current?.(clickedPath)`)
  - do **not** treat that first explicit click as rename intent.
- Leave the existing rename timing path unchanged for normal already-selected rows.

This patch is lower risk than globally changing selected-row click semantics, because it only alters the first explicit click after a programmatic selection rather than every click on a selected file.

## Updates

### 2026-03-12
- Added from report that newly uploaded files in the workspace explorer may fail to create a pill on first click.
- Refined from 5-question pass:
  - trigger is clicking the workspace explorer item itself
  - expected behaviour is both preview + compose pill creation
  - issue appears to affect all file types
  - rename/create scope is still unconfirmed
  - exact fallback behaviour on the failed first click still needs reproduction
- Moved to doing.
- Initial trace:
  - `uploadFilesToTarget()` selects the uploaded file immediately via `setSelectedPath(lastResult.path)` and loads preview.
  - `handleTreeClick` returns early for selected rows to support rename-on-second-click.
  - That interaction likely blocks the first explicit post-upload click from reaching `onFileSelectRef.current?.(node.path, node)`.
- Audited the upload → selection → tree click path and confirmed the control flow is consistent with the bug report.
- Added a likely low-risk patch direction: track fresh programmatic selections and let the first explicit click fall through to the normal file-attach path instead of the rename-intent early return.
