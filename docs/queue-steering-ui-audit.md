# Queue & Steering UI Audit — March 2026

## Architecture Overview

The queue/steering UI is a client-server system with three communication paths:

```
User Input (ComposeBox)
    │
    ├── sendAgentMessage(mode: "queue"|"steer"|"auto"|null)
    │       → Server defers or processes immediately
    │       → Response: { queued: "followup"|"steer" } or { user_message }
    │
    ├── steerAgentQueueItem(rowId)        [Steer button]
    │       → Server removes from queue + injects as steering
    │
    ├── removeAgentQueueItem(rowId)       [Cancel button]  ← NEW
    │       → Server removes from queue without sending
    │
    └── SSE events:
            agent_followup_queued     → item added to queue
            agent_followup_consumed   → item materialized as real message
            agent_followup_removed    → item cancelled/steered

Client state:
    followupQueueItems[]    – visible queue stack
    dismissedQueueRowIdsRef – prevents race re-adds
    isAgentTurnActive       – tracks active agent turn
```

## Server-side Queue Architecture

Two storage layers hold queued items:

1. **Deferred Queue** (`queued_followups_json` column in `chat_cursors`)
   - Messages not yet persisted to the `messages` table
   - Use negative synthetic row IDs (allocated by `allocateDeferredQueuedRowId`)
   - Survive restarts (persisted in SQLite)
   - Consumed by `materializeNextDeferredFollowup()` after turn completion

2. **Placeholder Store** (`FollowupPlaceholderStore` — in-memory FIFO)
   - Messages already persisted to DB but awaiting replacement
   - Use positive row IDs (real DB row IDs)
   - Lost on restart (in-memory only)
   - Consumed by `storeAgentTurn` during response persistence

The `getQueuedFollowupItems()` method merges both sources for the queue-state API.

## Bugs Found & Fixed

### Bug 1 (Critical): Cancel button steered instead of removing

**Symptom:** Clicking the × button on a queued message sent it to the agent
as steering content instead of discarding it.

**Root cause:** Both the "Steer" button and the "×" (cancel) button in
`compose-box.ts` called the same handler — `onInjectQueuedFollowup` — which
invoked `steerAgentQueueItem(rowId)` on the server. The server would:
1. Remove the item from the deferred queue
2. Store it as a real user message
3. Inject it as steering (or start a new agent turn)

**Fix:**
- Added `onRemoveQueuedFollowup` prop to `ComposeBox`
- Wired the × button to call `removeAgentQueueItem(rowId)` instead
- The server's `handleAgentQueueRemove` properly removes without sending
- Same optimistic UI pattern: `dismissedQueueRowIdsRef` + `refreshQueueState`

### Bug 2 (Now verified as not a data-corruption issue): Mid-stack deletion

**Analysis:** Deleting a middle item from the queue stack works correctly
at the data layer:

1. Server: `removeQueuedFollowupForAction` splices the item from the array
   and persists the remaining items via `setDeferredQueuedFollowups`
2. Server broadcasts `agent_followup_removed` with the removed `row_id`
3. Client: optimistically filters the item from `followupQueueItems`
4. Client: `dismissedQueueRowIdsRef` prevents race re-adds from `refreshQueueState`
5. On next `refreshQueueState`, server returns correct remaining items

**However**, because Bug 1 existed (cancel = steer), mid-stack "cancellation"
would actually process the message. Combined with the user observation that
"cancellation" could disrupt the queue, the real issue was that the cancel
action had side effects (steering/sending the message) that affected the
active agent turn, which in turn affected how remaining queued items were
drained via `materializeNextDeferredFollowup`.

## Remaining Design Analysis

### ✅ Sound Patterns

1. **Optimistic UI with dismissed set**: Client immediately removes the item
   from the visible queue, adds the row_id to `dismissedQueueRowIdsRef`,
   then calls the server API. If the server call fails, the dismissed entry
   is removed and `refreshQueueState` re-adds the item. This prevents
   visible flicker.

2. **Server-authoritative queue state**: `refreshQueueState` always replaces
   the client state with the server's truth (after filtering dismissed items).
   The client never maintains its own queue ordering — it derives from server.

3. **Dismissed set lifecycle**: Cleared on turn completion (`agent_status`
   `done`/`error`) and when server queue is empty. This prevents unbounded
   growth of the dismissed set.

4. **filterQueuedPosts hides queue artifacts**: Uses refs for zero-dependency
   callback identity. Hides both `row_id` matches and `thread_id` matches
   so parent messages of queued items stay hidden until consumed.

5. **SSE ref-stabilization**: `useSseConnection` uses refs for all callbacks,
   empty `[]` dependency array — SSE never reconnects due to state changes.

6. **Queue stack rendering**: Conditional on `followupQueueItems.length > 0`,
   items rendered via `.map()` with proper content truncation and hover states.

### ⚠️ Potential Improvements

#### 1. No feedback on failed queue operations

When `steerAgentQueueItem` or `removeAgentQueueItem` fails, the error is
logged to console but no user-visible feedback is shown. The item reappears
in the queue (dismissed entry removed, `refreshQueueState` re-adds it), but
the user doesn't know why their action "didn't work."

**Recommendation:** Show a brief toast/snackbar on failure.

#### 2. No queue item reordering

Items are always displayed in server-determined order (sorted by `queuedAt`).
There's no drag-and-drop or up/down to reorder. This is fine for most use
cases but limits power users.

#### 3. isAgentActive race window

Between `agent_status: done` clearing `isAgentTurnActive` and the next turn's
first SSE event setting it back to true, there's a brief window where the
compose box doesn't show queue mode. Messages submitted during this window
are sent with `mode: null` (auto). The server correctly defers them if
`isStreaming` is true, and the response `{ queued: "followup" }` triggers
`refreshQueueState` to update the UI. So the behavior is correct but the
visual indicator may briefly flicker.

#### 4. Queue stack visibility depends on followupQueueItems.length

The queue stack is hidden when `followupQueueItems.length === 0`. After
turn completion, `clearAgentRunState()` does NOT clear `followupQueueItems`
(it was previously cleared, but now relies on `refreshQueueState` from the
`agent_status: done` handler). This is correct — the server's queue state
is the truth.

## Data Flow Diagrams

### Submit → Queue

```
User types message, agent is streaming
    │
ComposeBox.handleSubmit()
    │ resolveSubmitMode() → "queue" (isAgentActive=true)
    │ setContent('') — clear compose immediately
    │
    └── async: sendAgentMessage(mode: "queue")
              │
              Server (handleAgentMessage):
              │ isStreaming=true, requestMode="queue"
              │ shouldDeferQueuedFollowup=true
              │ queueDeferredFollowup() → store in chat_cursors
              │ broadcast agent_followup_queued
              │ return { queued: "followup" }
              │
              Client:
              │ handleMessageResponse → refreshQueueState()
              │ SSE: agent_followup_queued → add to followupQueueItems
              │
              Queue stack shows new item ✓
```

### Cancel Queued Item (after fix)

```
User clicks × on queue stack item
    │
handleRemoveQueuedFollowup(item)
    │ dismissedQueueRowIdsRef.add(rowId)
    │ setFollowupQueueItems(filter out item) — optimistic
    │
    └── async: removeAgentQueueItem(rowId)
              │
              Server (handleAgentQueueRemove):
              │ removeQueuedFollowupForAction() — splice from array
              │ deleteMessageByRowId() — clean up backing row if positive
              │ broadcast agent_followup_removed
              │ return { removed: true }
              │
              Client:
              │ refreshQueueState() — server confirms removal
              │ SSE: agent_followup_removed → dismissed + filter (redundant, safe)
              │
              Item removed from queue, NOT sent to agent ✓
```

### Steer Queued Item

```
User clicks "Steer" on queue stack item
    │
handleInjectQueuedFollowup(item)
    │ dismissedQueueRowIdsRef.add(rowId)
    │ setFollowupQueueItems(filter out item) — optimistic
    │
    └── async: steerAgentQueueItem(rowId)
              │
              Server (handleAgentQueueSteer):
              │ removeQueuedFollowupForAction()
              │ storeMessage() — persist as user message
              │ broadcast new_post
              │ broadcast agent_followup_removed
              │ If streaming:
              │   agentPool.queueStreamingMessage(steer)
              │   queuePendingSteering()
              │   broadcast agent_steer_queued
              │ Else:
              │   queue.enqueue(processChat) — start new turn
              │
              Client:
              │ refreshQueueState()
              │ SSE: agent_followup_removed → dismissed
              │ SSE: new_post → appears in timeline
              │ SSE: agent_steer_queued (if streaming) → steerQueued indicator
              │
              Item converted to steering or immediate send ✓
```

### Turn Completion → Queue Drain

```
Agent turn finishes
    │
finalizeSuccessfulRun()
    │ endChatRun() — clear inflight markers
    │ consumePendingSteering() — advance cursor past steer messages
    │ getMessagesSince(cursor) — check for more persisted messages
    │ If more: resumeChat() — process next persisted message
    │ Else: materializeNextDeferredFollowup()
    │         │ consumeQueuedFollowupItem() — pop from deferred store
    │         │ storeMessage() — persist to DB
    │         │ broadcast agent_followup_consumed
    │         │ broadcast new_post
    │         │ resumeChat() — process the materialized message
    │
    │ broadcast agent_status: done
    │
Client:
    │ SSE: agent_status: done
    │   clearAgentRunState()
    │   dismissedQueueRowIdsRef.clear()
    │   refreshQueueState() — sync remaining items
    │   refreshTimeline()
    │
    │ SSE: agent_followup_consumed
    │   filter out consumed item
    │   refreshTimeline()
    │
    Next turn starts automatically for materialized message ✓
```

## See also

- [Turn mechanism audit](turn-mechanism-audit.md) — server‑side state machine and crash recovery
- [Runtime flows](runtime-flows.md) — high‑level message flow and recovery
- [Architecture](architecture.md) — component layout
