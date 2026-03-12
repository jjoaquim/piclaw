# v1.2.3

**Scope:** Unified internal message tool, thread connector regression fix, file-pill/editor UX hardening, and web CI hardening.

## Highlights

- **Unified internal `messages` tool** replaces `search_messages` and `get_message` with a single `messages` action-based tool (`search/get/add/delete`).
- **Thread connector rendering fixed** so thread lines stop at the thread boundary and remain stable when anchor cards are large.
- **File-pill editor open flow hardened** with safe visibility/editor-capability checks and intent-style feedback on unsupported opens.
- **Web build guardrails strengthened**: targeted frontend regressions now run automatically on every web build and CI.
- **Release notes/packaging readiness** for patch release.

## Internal tools

### `messages` migration

- Added the built-in internal `messages` tool with actions:
  - `search`: full-text search with filters
  - `get`: direct retrieval by row IDs
  - `add`: direct insert path
  - `delete`: safe deletion with explicit action
- Removed legacy tool registrations for:
  - `search_messages`
  - `get_message`
- Updated and expanded tests in `test/extensions/messages-crud.test.ts` and integration coverage that exercise the new action contract.
- Kept result envelope compatibility by preserving the existing internal `AgentToolResult` patterns used by tools.

## Frontend UX and rendering

### Thread line stability

- Reworked timeline thread-line rendering to avoid a single always-on border approach.
- Connector now uses per-thread sequence info and only renders when adjacent messages are in the same thread chain.
- Prevents “connector over-shoot” past the thread endpoint and visual distortion with oversized anchor posts.

### File pill interactions

- File-pill click handling now checks editor availability + editor pane visibility before opening.
- Unsupported file open attempts no longer fail noisily and now show intent-style user feedback.
- Anchor behavior now avoids duplicate file-tab creation by reusing existing editor tab focus flow where already supported.

## Build and release quality

### Web build hardening

- `make build-web` now always runs:
  - `bun run build:web`
  - `bun test test/channels/web/web-build.test.ts`
  - `bun test test/channels/web/post-link-preview-content.test.ts`
- Added GitHub Actions workflow `.github/workflows/ci.yml`:
  - runs on `push` to `main` and `pull_request`
  - executes `make build-web` in the `piclaw` package.

## Notes

- No public HTTP API changes were made for this release.
- Existing user-visible message compose and timeline behaviors remain stable while fixing the above regressions.

## Suggested verification

- `bun run lint`
- `bun run typecheck`
- `make build-web`
- `bun run test`
