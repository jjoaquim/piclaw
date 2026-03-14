---
id: preview-chat-attachments-besides-download
title: Preview chat attachments besides downloading them
status: done
priority: medium
created: 2026-03-14
updated: 2026-03-14
completed: 2026-03-14
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - web-ui
  - attachments
  - file-preview
  - chat
owner: pi
---

# Preview chat attachments besides downloading them

## Summary

Web chat attachments currently lean too heavily on download-only behaviour.
Users need to be able to preview attached files inline or in a lightweight
viewer where feasible, instead of having to download first to inspect them.

This ticket covers attachment preview in the chat/timeline surface, distinct
from workspace file preview. The first refinement pass should decide which file
classes must be previewable in v1 and what the viewer interaction should be.

## Acceptance Criteria

- [x] A web-chat attachment can be opened in a preview flow instead of only being downloaded.
- [x] The preview affordance is visible and understandable from the attachment UI, exposed as an explicit button/icon on each attachment card/chip, while single-click on the attachment itself still downloads.
- [x] Supported v1 file types (images, PDFs, text-like files) render in an appropriate viewer rather than forcing download.
- [x] Unsupported file types fall back to a simple non-preview state with filename, type, size, and a direct download action.
- [x] All attachments, including previewable ones, remain directly downloadable with a click.
- [x] Preview behaviour does not break existing download behaviour.
- [x] The preview flow works for previously posted attachments, not just newly uploaded ones.

## Implementation Paths

### Path A — reuse the existing lightbox (recommended)
- Reuse the existing attachment/image lightbox rather than introducing a second viewer shell.
- Add a file-type-aware preview entry point from attachment cards/pills.
- Extend the lightbox contents/controls only as needed for non-image previewable types.
- Support a small first-pass set of previewable types, then fall back cleanly.

### Path B — dedicated preview pane/route
- Open attachments in a dedicated panel, modal, or route with richer controls.
- Better long-term extensibility, but heavier than needed for a first pass.

## Test Plan

- [x] Implement web UI, API/backend contract, and tests as part of the first pass.
- [x] Add regression coverage for attachment preview resolution / fallback logic.
- [x] Validate download behaviour still works for supported and unsupported attachment types.
- [x] Manual web validation recorded for at least one supported and one unsupported attachment type.

## Definition of Done

- [x] Preview scope for v1 is explicit.
- [x] Web UI, API/backend contract, and tests are implemented for the first pass.
- [x] UI affordance for preview is implemented.
- [x] Supported types preview correctly.
- [x] Unsupported types degrade cleanly to download.
- [x] Tests and manual validation are recorded.

## Updates

### 2026-03-14
- Lane change: `20-doing` → `50-done` after user-confirmed live validation.
- Implementation used the existing lightbox model as a generic attachment preview modal, with explicit preview/details controls on attachment chip/card surfaces and direct download preserved on the main click target.
- First-pass implementation shipped:
  - added `piclaw/web/src/components/attachment-preview-modal.ts`
  - added preview-kind helper `piclaw/web/src/ui/attachment-preview.ts`
  - extended attachment surfaces in `piclaw/web/src/components/post.ts` so attachment cards/chips keep direct download while exposing explicit preview/details actions
  - added API helpers in `piclaw/web/src/api.ts` for text/blob preview loading
  - styled the modal/actions in `piclaw/web/static/css/styles.css`
  - added helper coverage in `piclaw/test/web/attachment-preview.test.ts`
- Validation/build evidence:
  - `bun test test/web/attachment-preview.test.ts test/web/file-pill-open.test.ts`
  - `bun run build:web`
  - `bun run quality` → `804 pass, 0 fail`
  - live reload completed via `make local-install`
  - manual web validation confirmed working by user
- Quality: ★★★★★ 10/10 (problem: 2, scope: 2, test: 2, deps: 2, risk: 2)

### 2026-03-14
- Lane change: `00-inbox` → `10-next` after refinement locked scope, interaction model, fallback, download behaviour, and first-pass implementation/test expectations.
- Refined the first-pass scope: v1 should reuse the existing lightbox and support images, PDFs, and text-like files.
- Locked the fallback/download rule: unsupported types should show a simple metadata/download state, and every attachment type must remain directly downloadable with one click.
- Locked the primary timeline affordance: single-click should keep downloading the attachment, with preview exposed as a separate explicit action.
- Locked the preview affordance placement: put an explicit preview button/icon directly on each attachment chip/card, not in an overflow menu.
- Locked implementation scope for pickup: first pass includes web UI, API/backend contract work, and tests rather than UI-only changes.
- Audio/video and broader browser-previewable attachment types remain out of scope for the first pass.
- Created in inbox from a new user-reported work item: chat attachments should be previewable instead of being download-only.
- Kept separate from workspace-file preview tickets because this concerns timeline/chat attachments rather than the workspace explorer preview pane.
- Quality: ★★★★★ 9/10 (problem: 2, scope: 2, test: 2, deps: 1, risk: 2)
- Ready to move to `10-next` for implementation pickup.

## Notes

- This should reuse the existing media/image lightbox as the base viewer rather than introducing a separate attachment-preview shell.
- V1 preview scope should include images, PDFs, and text-like files.
- Audio/video and other browser-previewable types are explicitly out of scope for the first pass unless added later.
- V1 preview interaction should use a modal/lightbox rather than a dedicated pane or inline expansion.
- Unsupported types should not attempt a richer fallback viewer in v1; show filename, type, size, and a direct download action instead.
- Direct one-click download must remain available for all attachments, not only unsupported ones.
- Timeline attachment affordance in v1 should keep single-click mapped to download, with preview exposed as a separate explicit action.
- The explicit preview affordance should live directly on each attachment chip/card rather than in an overflow menu.
- Need to check how attachment metadata and signed/media URLs are exposed today in the web channel.

## Links

- Related: `piclaw/kanban/20-doing/unsupported-file-preview-details.md`
- Related: `piclaw/kanban/20-doing/file-preview-pane-as-extension.md`
