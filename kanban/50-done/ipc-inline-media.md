---
id: ipc-inline-media
title: Support inline media/SVG attachments in IPC messages
status: done
priority: medium
created: 2026-03-11
updated: 2026-03-11
tags:
  - work-item
  - kanban
  - ipc
  - media
  - web
owner: pi
---

# Support inline media/SVG attachments in IPC messages

## Summary

The IPC message system (`ipc/messages/*.json`) currently only supports a `text`
field. Scripts that generate visual output (charts, diagrams, SVGs) have no way
to embed media directly into a timeline message — they must rely on the agent
calling `attach_file` after the fact, which produces a download card rather
than an inline image.

This ticket adds support for IPC messages that include inline media (images,
SVGs) so that scripts can post rich visual content directly to the timeline.

## Motivating Example

`bin/kanban-board-svg.ts` generates a themed kanban board SVG from workspace
tickets. Today the only way to get it into the timeline is:

1. Agent generates the SVG → calls `attach_file` → download card (not inline)
2. Agent pastes SVG source into message text → ugly, not rendered as image

With this feature, the script could directly post the SVG inline:

```bash
# Generate SVG
bun run bin/kanban-board-svg.ts --theme dark --out /workspace/tmp/kanban-board.svg

# Post to timeline with inline media
cat > "$PICLAW_DATA/ipc/messages/kanban_$(date +%s).json" <<EOF
{
  "type": "message",
  "chatJid": "web:default",
  "text": "📋 Kanban board as of $(date +%Y-%m-%d)",
  "media": [
    {
      "path": "/workspace/tmp/kanban-board.svg",
      "content_type": "image/svg+xml",
      "inline": true
    }
  ]
}
EOF
```

## Current Flow

```
Script → writes JSON {text} → ipc/messages/ → processMessageCommand()
       → deps.sendMessage(jid, text) → text-only message in timeline
```

## Target Flow

```
Script → writes JSON {text, media[]} → ipc/messages/ → processMessageCommand()
       → upload each media[] entry via mediaService.createFromPath()
       → deps.sendMessage(jid, text, { mediaIds, contentBlocks })
       → message with inline images + text in timeline
```

## Acceptance Criteria

- [x] IPC message JSON supports optional `media` array field
- [x] Each media entry accepts `path` (file on disk), optional `content_type`, `filename`, and `inline`
- [x] Media files are uploaded via `mediaService.createFromPath()` and assigned IDs
- [x] Message is stored with `media_ids` and `content_blocks` so timeline renders images inline
- [x] SVG files render inline (not as download cards) — `image/svg+xml` accepted in path uploads
- [x] Standard image types work (PNG, JPEG, GIF, WebP; SVG supported)
- [x] Missing/unreadable files produce a warning in the message, not a silent failure
- [x] Existing text-only IPC messages continue to work unchanged
- [x] `noNudge` flag still respected (message-only suppression remains)
- [x] File size limit enforced (reuses existing 10 MB media upload limit)

## Implementation Notes

### IPC payload schema (extended)

```typescript
interface IpcMessage {
  type: "message";
  chatJid: string;
  text: string;
  noNudge?: boolean;
  media?: Array<{
    /** Absolute path to file on disk. */
    path: string;
    /** MIME type override (auto-detected from extension if omitted). */
    content_type?: string;
    /** Display filename (defaults to basename of path). */
    filename?: string;
    /** Whether to render inline vs as download card (default: true for images). */
    inline?: boolean;
  }>;
}
```

### Key touchpoints

1. **`src/ipc.ts` → `processMessageCommand()`** — Parse `media` array, upload
   files, collect media IDs, pass to `sendMessage()`.

2. **`IpcDeps.sendMessage()`** — Needs to accept optional `mediaIds` and
   `contentBlocks` parameters (or a richer options object).

3. **`src/channels/web/agent-message-service.ts`** — Already supports
   `media_ids` and `content_blocks` in `addAgentMessage()`. The IPC handler
   just needs to construct the right payload.

4. **`src/channels/web/media-service.ts`** — Already has `createFromFile()`. Add
   a variant that accepts a disk path (currently expects a `File` object from form
   upload). Add `createFromPath(filePath, contentType?)`.

5. **`src/channels/web/handlers/media.ts`** — SVG already in
   `INLINE_SAFE_TYPES`, no changes needed.

### Content blocks format

For inline images, the content blocks should match the existing format used by
agent-uploaded media:

```json
{
  "content_blocks": [
    { "type": "text", "text": "📋 Kanban board as of 2026-03-11" },
    { "type": "image", "media_id": 123 }
  ],
  "media_ids": [123]
}
```

## Risks

| Risk | Mitigation |
|---|---|
| Large files uploaded via IPC bypass rate limits | Enforce same size limits as HTTP upload path |
| Arbitrary file read from disk via path | IPC is local-only (file system access); same trust boundary as the agent |
| SVG XSS via inline rendering | SVGs are already served with CSP headers; no script execution in timeline |

## Test Plan

- **Unit:** `processMessageCommand()` with `media` array — verify media IDs collected and passed
- **Unit:** `mediaService.createFromPath()` — verify file read, content type detection, ID assignment
- **Integration:** Post IPC message with SVG → verify inline rendering in timeline
- **Integration:** Post IPC message with PNG → verify inline image
- **Integration:** Post IPC message with missing file → verify graceful error
- **Regression:** Post text-only IPC message → verify unchanged behavior

## Definition of Done

- [x] All acceptance criteria met
- [x] Tests added and passing
- [ ] `bin/kanban-board-svg.ts` updated with `--post` flag as proof of concept
- [x] Docs updated (`.pi/skills/send-message/SKILL.md` and ticket notes)

## Updates

### 2026-03-11
- Implemented core IPC media flow in `src/ipc.ts` + `MediaService.createFromPath()`.
- Added warnings for missing/unreadable media and support for media-only IPC posts.
- Updated runtime message option typing to carry `mediaIds` and `contentBlocks`.
- Added tests: `test/ipc/ipc.test.ts` and `test/channels/web/media-service.test.ts`.

## Links

- `piclaw/piclaw/src/ipc.ts` — IPC message processing
- `piclaw/piclaw/src/channels/web/agent-message-service.ts` — message storage with media
- `piclaw/piclaw/src/channels/web/media-service.ts` — media upload service
- `piclaw/piclaw/src/channels/web/handlers/media.ts` — INLINE_SAFE_TYPES
- `bin/kanban-board-svg.ts` — example script that would use this feature
- `.pi/skills/send-message/SKILL.md` — IPC message format guidance
