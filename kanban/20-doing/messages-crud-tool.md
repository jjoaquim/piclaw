---
id: messages-crud-tool
title: Unified messages CRUD tool (add/get/delete/search)
status: done
priority: medium
created: 2026-03-11
updated: 2026-03-12
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - tools
  - internal
owner: pi
---

# Unified messages CRUD tool (add/get/delete/search)

## Summary

Consolidate message operations into a single internal agent module that directly accesses the SQLite database. Replace the current `search_messages` and `get_message` extension-registered tools with a unified `messages` module exposing four actions: `add`, `get`, `delete`, `search`. This becomes a baked-in internal tool (like `keychain`) rather than an extension-side registration.

## Acceptance Criteria

- [x] Single `messages` tool with `action` parameter: `add | get | delete | search`
- [x] **search**: full-text search with filters (chat, role, limit, offset, temporal filters) — replaces current `search_messages`
- [x] **get**: direct row retrieval by row IDs with optional context rows — replaces current `get_message`
- [x] **delete**: remove messages by row ID (thread cascade), support `dry_run`, skip/delete media-attached rows depending on `force`
- [x] **add**: insert a message into a chat (plus `media_ids`)
- [x] Implemented as a built-in extension with direct DB access (no HTTP round-trip)
- [x] Existing `search_messages` and `get_message` tools removed from extension registration
- [x] Existing message-search integration tests are removed/rewritten, and the new `messages` tests run against in-memory DB fixture (`PICLAW_DB_IN_MEMORY=1`), with no production DB writes
- [x] Remove old message-search implementation from runtime registration and code:
  - Remove tool import/export from `src/extensions/index.ts` (`messageSearch`)
  - Remove/retire `src/extensions/message-search.ts`
  - Remove old dedicated tests (`test/extensions/extensions-message-search.test.ts`) and replace with `test/extensions/messages-crud.test.ts`
- [x] Unit tests for all four actions
- [x] Media protection on delete: skip messages with user-uploaded attachments unless `force: true`

## Design

The module should follow the `keychain` tool pattern:

```
src/extensions/messages-crud.ts   — tool definition + handler
test/extensions/messages-crud.test.ts — tests
```

Direct DB access via the existing `connection.ts` helpers (`getDb()`, prepared statements). No HTTP calls to self.

### Action schemas

| Action | Required params | Optional params |
|---|---|---|
| `search` | `query` | `chat_jid`, `role`, `limit`, `offset`, `details_max_chars` |
| `get` | `row_id` | `before`, `after`, `chat_jid`, `role`, `details_max_chars` |
| `delete` | `row_id` | `force` (bypass media protection) |
| `add` | `content` | `chat_jid`, `type` (user/agent), `media_ids` |

## Relevant files

- `piclaw/src/extensions/messages-crud.ts` — unified `messages` tool implementation
- `piclaw/src/extensions/keychain-tools.ts` — reference pattern for internal tool module
- `piclaw/src/db/connection.ts` — DB access helpers
- `piclaw/src/channels/web/message-store.ts` — existing message insert/delete logic
- `piclaw/test/extensions/extensions-message-search.test.ts` — existing tests (to be migrated)

## Updates

### 2026-03-12
- Board quality review: ticket already had strong problem framing and acceptance criteria; kept in inbox pending prioritization and API-shape discussion.

## Notes

- The `add` action enables scheduled tasks and skills to post messages directly without the HTTP API
- `delete` should handle cascade (thread replies) at the DB level
- Consider returning deleted message content in the response for confirmation
- The tool name stays `messages` (not `message`) to match the CRUD-collection pattern
- Deletion behavior is explicit-only (`action: "delete"` required) with safe `dry_run` mode
- `get`/`delete` operate on arrays of row IDs (`row_ids`) with hard caps (<=50)
- `search` and `get` support temporal filters (`after`, `before`, `since`) in UTC ISO format
- Replacement cleanup is mandatory: old tool surface (`search_messages`/`get_message`) and `src/extensions/message-search.ts` must be removed rather than retained for compatibility
