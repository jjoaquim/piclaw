# Runtime flows

This document covers the primary web‑first flows. WhatsApp is documented separately in [whatsapp.md](whatsapp.md).

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
