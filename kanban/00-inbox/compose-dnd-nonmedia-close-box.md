---
id: compose-dnd-nonmedia-close-box
title: Drag-and-drop support for multiple non-media files in compose drop/close box
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
  - compose
  - file-upload
owner: pi
---

# Drag-and-drop support for multiple non-media files in compose drop/close box

## Summary

Currently composer drag-and-drop is effectively media-image-only and drops are
primarily optimized for images.

Add support so users can drag-and-drop multiple files of mixed/non-media
types into the compose area (including the drop area / close-box flow used for
attaching files), and include those file types in the attachment UX.

## Current Behavior

- `compose-box` drag/drop handler filters to `image/*` files only.
- Mixed file selections can be partially ignored.
- Non-media/non-image drops do not reliably surface as attachable items.
- The close/remove flow only reflects image media entries in the current model.

## Desired Behavior

- Drag-and-drop in compose accepts multiple files regardless of MIME in one pass.
- Dropped non-media files should follow the normal uploaded-attachment path rather
  than becoming workspace references or a separate fallback model.
- Mixed drops (images + docs + patches + other formats) are preserved and shown in
  one undifferentiated attachment strip.
- All file types should be supported for upload as long as they are within the
  allowed size limits.
- Existing remove/clear interactions in the attachment area remain intact and use
  the same semantics for media and non-media items.
- Sent messages should carry these as normal attachments, not special file-reference
  message-body entries.

## Acceptance Criteria

- [ ] Drag-and-drop supports multiple files in one action.
- [ ] Non-image / non-media file types are not silently dropped.
- [ ] Mixed MIME selections are surfaced together in one undifferentiated attachment strip.
- [ ] All file types are accepted through the normal upload path as long as they satisfy existing size limits.
- [ ] `.patch` files are explicitly supported in that same normal attachment flow.
- [ ] Close/remove behavior for new attachment items matches existing media attachment remove semantics.
- [ ] Sent messages represent these items as normal uploaded attachments.
- [ ] Paste handling remains functional and does not regress image paste UX.

## Relevant Files

- `piclaw/web/src/components/compose-box.ts` – drag/drop, paste, and attachment
  state handling for mixed file sets.
- `piclaw/web/src/components/file-pill.ts` – pill rendering/interaction for
  newly supported file kinds if needed.
- `piclaw/src/channels/web/media-service.ts` – confirm allowed/unsupported
  content handling and upload path behavior.
- `piclaw/web/src/api.ts` – media upload/metadata path expectations for non-image
  uploads.

## Notes

- This ticket intentionally targets both behavior and UX, but the current refinement
  direction removes the earlier fallback idea: non-media files should go through the
  same normal uploaded-attachment path as media where size limits allow.
- The user wants one undifferentiated attachment presentation rather than separate
  media vs non-media groupings.
- `.patch` files should be explicitly included in the supported non-media attachment
  path so patch/review workflows work from the compose box without manual fallback.
- If there are backend/media-service restrictions by MIME today, this ticket likely
  requires aligning those restrictions with the broader upload policy rather than
  adding a UI-only shim.

## Updates

### 2026-03-12
- Added to inbox in response to requested UX improvements for unsupported files and
  multi-file drag-and-drop behavior.
- Refined from 5-question pass:
  - non-media dropped files should become normal uploaded attachments
  - mixed MIME drops should appear in one undifferentiated strip
  - all file types should be supported subject to existing size limits
  - remove behaviour should match current attachment semantics
  - sent messages should use the normal attachment path