---
id: workspace-upload-progress-ui
title: Large file upload fails silently in workspace explorer (320MB+)
status: inbox
priority: medium
created: 2026-03-11
updated: 2026-03-12
tags:
  - work-item
  - kanban
  - ui
  - workspace
  - bug
estimate: M
risk: medium
owner: pi
---

# Large file upload fails silently in workspace explorer (320MB+)

## Summary

Uploading large files (~320MB) to the workspace explorer fails silently despite
body size limits and upload limits being configured correctly. The UI provides
no feedback during the upload — no progress indicator, no error message. The
upload just appears to hang or do nothing.

This is a compound issue: the upload itself may be failing (timeout, memory,
chunking) **and** the UI gives zero feedback either way.

## Current Behavior

- Attempting to upload a ~320MB file via drag-and-drop or file picker
- Server-side body/upload limits are set correctly (should allow 320MB+)
- Upload appears to silently fail — no file appears in the tree
- No error message, no progress bar, no spinner — UI looks frozen
- User has no way to tell if the upload is in progress, stalled, or failed

## Root Cause Investigation Needed

- **Client side**: `fetch()` may time out, browser may reject large `FormData` blobs, or the request may be killed silently
- **Server side**: Bun's `request.formData()` or body parsing may have implicit limits or memory issues with large payloads
- **Reverse proxy**: If behind Cloudflare Tunnel or nginx, proxy may impose its own body size limit (Cloudflare free tier: 100MB default)
- **Workspace file handler**: Check `dispatch-workspace.ts` / `file-service.ts` for any hardcoded size guards
- Check configured limits: `web.maxBodySize`, upload route config, any `constants.ts` caps

## Target Behavior

- 320MB+ file uploads succeed reliably.
- This remains a combined ticket covering both upload reliability and upload UX feedback.
- A temporary strip below the workspace header shows upload progress while uploads are active.
- Shows filename being uploaded and percentage when real progress is available; otherwise falls back to an indeterminate spinner.
- Multiple uploads show a count ("Uploading 3 files…") with aggregate progress where feasible.
- Upload errors surface in that strip with a dismiss action and a suggested next step.
- Indicator disappears automatically after all uploads complete, with a brief "Done" state.

## Acceptance Criteria

- [ ] 320MB file upload completes successfully end-to-end.
- [ ] Root cause of silent failure identified and fixed.
- [ ] Upload-in-progress strip appears below the workspace header while uploads are active.
- [ ] Strip shows filename (or count for multi-file) during upload.
- [ ] Percentage progress is shown when possible; otherwise an indeterminate spinner is shown.
- [ ] Error state is displayed with file name, reason, and a suggested next step where possible.
- [ ] Indicator auto-hides after completion with a brief "Done" flash.
- [ ] No UX regression for small/fast uploads (indicator shouldn't flash annoyingly).

## Implementation Notes

- `workspace-explorer.ts` handles drag-and-drop and file input via `uploadWorkspaceFile()`.
- `api.ts` `uploadWorkspaceFile()` currently uses `fetch()` — no native upload progress support.
- To show percentage progress, likely switch this path to `XMLHttpRequest` with `upload.onprogress`; fall back to spinner if exact progress cannot be obtained.
- Consider chunked upload for very large files (split into parts, reassemble server-side).
- Check Bun's handling of large multipart bodies — may need streaming body parsing.
- Minimum display time (~500ms) to avoid flickering on fast uploads.
- Verify `maxBodySize` in config actually propagates to the HTTP server.

## Updates

### 2026-03-12
- Board quality review: ticket already had strong bug framing and rough acceptance criteria; kept in inbox pending prioritization against other web work.
- Refined from 5-question pass:
  - keep reliability + progress UX together in one ticket
  - prefer percentage progress where possible, spinner fallback otherwise
  - use a temporary strip below the workspace header
  - show a brief done state before auto-hide
  - failure messaging should include the file name, reason, and a suggested next step

## Links

- `piclaw/piclaw/web/src/components/workspace-explorer.ts` — upload handling
- `piclaw/piclaw/web/src/api.ts` — `uploadWorkspaceFile()` function
- `piclaw/piclaw/src/channels/web/http/dispatch-workspace.ts` — server-side upload handler
- `piclaw/piclaw/src/channels/web/workspace/file-service.ts` — file write logic
- `piclaw/piclaw/src/channels/web/workspace/constants.ts` — size limits
- `piclaw/piclaw/src/core/config.ts` — `maxBodySize` config
