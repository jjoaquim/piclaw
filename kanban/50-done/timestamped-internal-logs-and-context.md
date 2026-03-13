---
id: timestamped-internal-logs-and-context
title: "Add timestamps to agent-facing logs and tool outputs"
status: done
created: 2026-03-12
updated: 2026-03-12
completed: 2026-03-12
target_release: next
priority: medium
estimate: M
risk: low
tags:
  - work-item
  - kanban
  - logging
  - tooling
  - internal-tools
owner: pi
---

# Add timestamps to agent-facing logs and tool outputs

## Problem

The agent lacks temporal awareness across its inputs. Messages, logs, and context
records are consumed without reliable timestamp metadata, making it impossible to
reason about recency, correlate events, and debug queue/streaming behavior without
workarounds (e.g. raw SQL queries).

## User

Agent (not end-user). This is about enriching agent-facing data.

## MVP Scope (Tier 1)

### 1. Console timestamp patch
- Patch `console.log/warn/error` at startup to prefix ISO 8601 UTC ms timestamps
- New file: `src/runtime/console-timestamps.ts`
- Called once from `src/runtime/startup.ts`
- Silent fallback on failure (never break logging)

### 2. `search_messages` timestamps + time filtering
- Add `created_at` (ISO string) to each result in the details payload
- Add optional `after` / `before` ISO timestamp params for time-range filtering
- File: `src/extensions/message-search.ts`

### 3. `get_message` timestamps
- Add `created_at` (ISO string) to the detail payload
- File: `src/extensions/message-search.ts`

## Out of Scope
- UI-facing timestamp changes
- DB schema changes (timestamps already exist — `idx_messages_chat_jid_timestamp`)
- External telemetry integrations
- SSE event wire format changes
- Structured logging library / framework
- Timezone configuration (UTC only)
- System prompt / conversation context timestamps (tier 2)
- File pill / `read` tool mtime metadata (tier 2)

## Format Contract
- ISO 8601 UTC with milliseconds: `2026-03-12T13:47:52.369Z`
- Field name: `created_at` in tool outputs
- Missing DB timestamps → `null` (not omitted)

## Implementation Order
1. Console timestamp patch (isolated, zero side effects)
2. `search_messages` timestamps + `after`/`before` filtering
3. `get_message` timestamps

## Test Plan
| Test | Surface |
|------|---------|
| Console patch prefixes ISO timestamp | `console-timestamps.test.ts` |
| `search_messages` results include `created_at` | `message-search.test.ts` |
| `get_message` detail includes `created_at` | `message-search.test.ts` |
| `search_messages` with `after`/`before` filters correctly | `message-search.test.ts` |
| `search_messages` without `after`/`before` returns all (backward compat) | `message-search.test.ts` |

## Acceptance Criteria
- [x] `console.log/warn/error` output includes ISO 8601 UTC ms timestamps
- [x] `search_messages` results include `created_at` on every result
- [x] `get_message` detail payload includes `created_at`
- [x] `search_messages` supports `after` / `before` time-range params
- [x] All tests pass, lint clean, typecheck clean
- [x] Deployed via `make local-install` and verified live

## Refinement Notes
Refined via 20-question flow on 2026-03-12. See conversation for full Q&A.
