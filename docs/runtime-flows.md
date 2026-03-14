# Runtime flows

This document covers the primary web‑first flows. WhatsApp is documented separately in [whatsapp.md](whatsapp.md).

## Authentication flow (TOTP + passkeys)

The web UI can be gated behind TOTP with optional WebAuthn passkeys. Passkeys are enrolled via the `/passkey enrol` slash command (after signing in with TOTP). The login page attempts passkeys automatically when supported and falls back to the TOTP form if none are available.

- **Passkey enrolment**: `/passkey enrol` → one‑time link → WebAuthn registration
- **Login**: passkey first (conditional mediation or first input focus), then TOTP fallback
- **Multiple passkeys** are supported per user; manage with `/passkey list` and `/passkey delete`
- Use `/totp enrol` to display a QR code for the configured TOTP secret

## Web UI → Agent → Web UI

The web UI supports steering mid‑response by queuing follow‑ups while streaming.

```mermaid
sequenceDiagram
  participant User
  participant Web as Web UI
  participant API as WebChannel (HTTP/SSE)
  participant Router
  participant DB as SQLite
  participant Pool as AgentPool
  participant Pi as Pi SDK

  User->>Web: Prompt
  Web->>API: POST /agent
  API->>DB: Store message
  API->>Router: Route message
  Router->>Pool: runAgent()
  Pool->>Pi: prompt()
  Pi-->>Pool: streaming updates
  Pool-->>API: events
  API-->>Web: SSE updates
  Pool->>DB: Store assistant reply
```

### Follow‑up queueing and steering

When the agent is streaming a response, the user can submit additional messages. These are automatically queued as follow‑ups rather than interrupting the active turn:

```mermaid
sequenceDiagram
  participant User
  participant Web as Web UI
  participant API as WebChannel
  participant Queue as Deferred Queue
  participant Placeholder as Placeholder Store
  participant Pool as AgentPool

  User->>Web: Submit while agent is streaming
  Web->>API: POST /agent
  API->>API: isStreaming(chatJid) = true

  alt Deferred follow‑up (queue full path)
    API->>Queue: Append to queued_followups_json
    API-->>Web: { queued: "followup" }
    Web->>Web: Add to queue stack UI
  end

  Note over Pool: Active turn completes
  API->>Queue: Peek next deferred item
  Queue-->>API: { rowId, content, threadId }
  API->>Placeholder: Move to placeholder store
  API->>Pool: processChat(content)
  Pool->>Pool: Run agent turn
  Note over Web: Queue stack item disappears
```

There are two queue storage layers:

1. **Deferred Queue** — persisted in `queued_followups_json` column of `chat_cursors`. Uses negative synthetic row IDs. Survives restarts.
2. **Placeholder Store** — in‑memory FIFO (`FollowupPlaceholderStore`). Uses positive real row IDs (from the stored message). Lost on restart but recovered via the deferred queue.

`getQueuedFollowupItems()` merges both stores, deduplicating by `rowId`.

The user can interact with queued items in the compose area:

- **Cancel (×)** — calls `removeAgentQueueItem(rowId)`, which splices the item from the server‑side queue array and broadcasts `agent_followup_removed`.
- **Steer (→)** — calls `steerAgentQueueItem(rowId)`, which injects the item's content as steering into the active agent session. The agent sees it as mid‑turn user input.

The client tracks a `dismissedQueueRowIdsRef` (Set) to prevent `refreshQueueState` from re‑adding items that were just cancelled or steered. The set is cleared when the agent turn completes or when the server queue empties.

### Turn state machine

Each chat JID has a cursor tracked in `chat_cursors`:

```
IDLE → (beginChatRun) → IN‑FLIGHT → (endChatRun) → IDLE
                                   → (endChatRunWithError) → FAILED
FAILED → (clearFailedRun / next success) → IDLE
```

All state transitions are single SQL statements — crash‑safe under SQLite WAL mode:

- `beginChatRun(chatJid, messageId)` — saves current cursor as `inflight_prev_ts`, records `inflight_message_id` and `inflight_started_at`
- `endChatRun(chatJid, newCursorTs)` — advances cursor, clears inflight + failed markers
- `endChatRunWithError(chatJid, ...)` — records failure metadata, clears inflight marker
- `rollbackInflightRun(chatJid)` — restores cursor from `inflight_prev_ts`, clears inflight marker

If piclaw restarts mid-turn, startup recovery now happens in two phases:
1. inflight web runs are rolled back/cleared immediately on startup
2. once workers and channels are online, piclaw writes a self-addressed `resume_pending` IPC task and resumes any remaining pending chats through the normal IPC path

Recovery logic (`recoverInflightRuns`):
- Finds all `chat_cursors` rows with a non‑null `inflight_message_id`
- If a terminal agent reply already exists past the inflight message → clears the inflight marker (the turn actually completed before the crash)
- If the inflight marker is older than 30 minutes (`MAX_INFLIGHT_AGE_MS`) → clears without rollback (prevents infinite retry of permanently failing messages)
- Otherwise → rolls back the cursor, deletes non‑terminal bot messages after the inflight point, and enqueues a retry through the normal processing path

That keeps restart recovery on the same code path as an explicit reload instead of depending on a lucky post-reboot user action.

## Scheduled tasks / IPC

Scheduled tasks run on the same `AgentSession` as normal user messages but are isolated using the **session tree**. Before executing a task, the scheduler saves the current tree position (leaf ID) and the active model. The task's prompt and response are appended to the session as usual, then the scheduler **navigates back** to the saved leaf. This leaves the task's output in a side branch of the session tree — it persists in history but does not pollute the user's conversation context.

If the task specifies a different model (e.g. a cheaper one for periodic summaries), the model is switched before execution and restored afterwards. Because the tree navigation also rewinds the conversation state, the model restore happens on the original branch where it belongs.

```mermaid
sequenceDiagram
  participant Skill
  participant IPC
  participant Scheduler
  participant DB as SQLite
  participant Pool as AgentPool
  participant Tree as Session Tree
  participant Pi as Pi SDK
  participant Web as Web UI

  Skill->>IPC: write schedule_task JSON
  Scheduler->>DB: persist task
  Scheduler->>Tree: save leaf position + model
  Note over Tree: leafId = "abc123"
  opt Task specifies model
    Scheduler->>Pool: switch model
  end
  Scheduler->>Pool: runAgent()
  Pool->>Pi: prompt()
  Pi-->>Pool: result
  Note over Tree: leaf advanced to "xyz789"
  Scheduler->>Tree: navigate back to "abc123"
  Note over Tree: task output in side branch
  opt Model was switched
    Scheduler->>Pool: restore original model
  end
  Scheduler->>DB: log run
  Scheduler-->>Web: post result
```

### Why session tree isolation matters

Without isolation, a scheduled task's prompt and response would appear in the agent's conversation context. The next user message would see the task's output, leading to confused responses. The session tree approach solves this cleanly:

- **No context pollution**: The user's conversation continues from where it left off.
- **Full history**: The task's output is preserved in a side branch and can be inspected via `/tree`.
- **Model safety**: The model is restored to its pre-task state on the correct branch.
- **No session forking**: Unlike `fork()` which creates a new session file, `navigateTree()` stays in the same file and simply moves the branch pointer.

## Session lifecycle (summary)

- Messages for a chat JID share a warm `AgentSession`.
- Auto‑compaction runs when the context window is tight.
- Idle sessions are evicted after a short TTL.
- When the agent produces multiple turns in a single response (e.g. tool calls followed by a final answer), each turn's text and attachments are stored as separate messages. The first becomes the thread root; subsequent turns carry a `thread_id` pointing back to the root. The UI renders these as indented threaded replies.

See [architecture.md](architecture.md) for component layout and [tools-and-skills.md](tools-and-skills.md) for tool/skill details.
