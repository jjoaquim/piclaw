---
id: unsupported-file-preview-details
title: Preview unsupported files with metadata (size, date, type, etc.)
status: doing
priority: medium
created: 2026-03-12
updated: 2026-03-12
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - web-ui
  - workspace-explorer
  - file-preview
owner: pi
---

# Preview unsupported files with metadata (size, date, type, etc.)

## Summary

In the workspace explorer preview pane, file metadata is not surfaced
consistently enough across preview types.

Add an inline metadata block to the preview area so users can always see:

- MIME type
- file size
- last modified date/time
- extension / kind
- full path

For unsupported / binary previews, this should sit alongside the existing
unsupported-file message and download action, making it clear what was chosen
and why it cannot be rendered inline.

## Current Behavior

- For unknown/non-text/image binaries, preview currently renders:
  `Binary file — download to view.`
- Metadata shown in the preview header/body is inconsistent across file kinds.
- Users need to infer type, path, and freshness from elsewhere.

## Desired Behavior

- Preview pane shows a consistent inline metadata block for all previewed files,
  not just unsupported/binary ones.
- Metadata should include MIME type, size, modified date/time, extension/kind,
  and full path.
- Modified time should use the same localised timestamp style as the rest of the UI.
- Unsupported/binary previews should keep the existing download CTA as the only action.
- Existing preview rendering for text/image files should remain intact aside from
  the added metadata presentation.

## Acceptance Criteria

- [ ] Preview metadata block appears inline in the preview area rather than as a separate header treatment.
- [ ] Metadata block is shown for all previewed files, including supported text/image previews and unsupported/binary previews.
- [ ] Metadata block includes:
  - file type (MIME)
  - size
  - modified date/time (localised)
  - extension / kind
  - full path
- [ ] If truncated status exists, keep the existing truncation indicator.
- [ ] Unsupported/binary previews retain the existing download action as the only action in that area.
- [ ] Existing text/image preview behaviour is unchanged apart from the added metadata display.
- [ ] API errors for unsupported file reads still present a clear inline error.

## Relevant Files

- `piclaw/src/channels/web/workspace/file-service.ts` – ensure preview payload includes
  metadata fields for binary/unsupported files.
- `piclaw/web/src/components/workspace-explorer.ts` – render metadata + download
  fallback for unsupported file preview.
- `piclaw/web/static/css/styles.css` – tweak preview metadata styles if needed.

## Notes

- `file-service.ts` already returns `content_type`, `size`, and `mtime` for
  binary responses; this ticket is mostly a UI surfacing / formatting improvement
  to make unsupported previews actionable.
- Refined expectation: metadata should be inline in the preview area rather than
  a separate header block.
- User wants this applied across all previewed files for consistency, not only
  unsupported/binary ones.
- Modified timestamps should use the existing localised UI formatting.
- Keep actions minimal: only the existing download affordance for unsupported files,
  with no extra copy-path or utility buttons in this ticket.

## Updates

### 2026-03-12
- Added to inbox for planning and scoped as a focused UI enhancement.
- Refined from 5-question pass:
  - placement should be inline
  - all candidate metadata fields are required
  - timestamp formatting should be localised
  - metadata should appear for all preview types, not just unsupported files
  - only the existing download action should remain in scope
- Moved to doing.
