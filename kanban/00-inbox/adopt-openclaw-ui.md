---
id: openclaw-adaptive-cards
title: Evaluate and adopt Microsoft Adaptive Cards in the web chat
status: inbox
priority: medium
created: 2026-03-12
updated: 2026-03-12
tags:
  - work-item
  - kanban
  - ui
  - web
  - chat
  - adaptive-cards
owner: pi
estimate: M
risk: medium
---

# Evaluate and adopt Microsoft Adaptive Cards in the web chat

## Summary

Re-scope this ticket around the most relevant part of the reference repo:
OpenClaw's adaptive-card implementation, mapped explicitly onto the official
Microsoft Adaptive Cards model rather than treated as a one-off UI pattern.

Further research shows `matvelloso/openclaw-ui` is essentially a host-side
integration around Microsoft's Adaptive Cards stack:

- the official Adaptive Card JSON schema (`type`, `version`, `body`, `actions`)
- the JavaScript renderer from `adaptivecards`
- host theming via `HostConfig`
- card actions via the SDK action pipeline
- optional data binding via `adaptivecards-templating`
- chat-specific extraction/render glue in the host app

This ticket should define a piclaw-native implementation that follows the
Microsoft model directly, borrowing OpenClaw only where it provides a useful
host integration pattern.

## Reference Repo Findings

From `matvelloso/openclaw-ui`:

- `README.md` presents the feature as rich chat cards powered by Microsoft
  Adaptive Cards.
- `src/components/oc-adaptive-card.ts` wraps card JSON in a custom element,
  validates payloads, sets host config, and renders the card via the SDK.
- `src/components/host-config.ts` maps host theme tokens into an Adaptive Cards
  `HostConfig`.
- `src/components/action-handler.ts` maps SDK actions into host app behaviour,
  especially `Action.Submit` and `Action.OpenUrl`.
- `src/chat/card-extract.ts` / `src/chat/card-render.ts` show that cards are
  extracted from normal chat content and rendered inline in the conversation.
- `src/plugin/prompt-guidance.ts` shows the feature is paired with agent guidance
  so the model emits a predictable card shape.

## Microsoft Adaptive Cards Research

From the official Microsoft Adaptive Cards docs and SDK:

- Cards are JSON documents rooted at an object with:
  - `type: "AdaptiveCard"`
  - `version`
  - `body`
  - optional `actions`
  - optional `fallbackText`, `$schema`, and related metadata
- The standard JavaScript rendering path is:
  1. create `new AdaptiveCards.AdaptiveCard()`
  2. optionally assign `hostConfig`
  3. `parse(cardJson)`
  4. `render()` into the DOM
- Actions are handled through the SDK action execution hook (`onExecuteAction`)
  rather than by inventing a separate host-only action model.
- `HostConfig` is the official way to map spacing, typography, colours, action
  layout, and emphasis styles into the host UI.
- Templating is a separate package (`adaptivecards-templating`) and should be
  treated as an optional second step rather than a required part of the first
  render implementation.
- The SDK supports multiple schema versions; the host should pin a supported
  version window rather than accepting arbitrary future schema features.

## Mapping to piclaw

### What piclaw should follow directly from Microsoft

- Use the official Adaptive Card schema as the payload contract.
- Use the official `adaptivecards` JavaScript renderer rather than inventing a
  custom card renderer.
- Use `HostConfig` for theming/styling adaptation.
- Use the SDK action model for allowed actions.
- Define an explicit supported schema version for v1.

### What piclaw can borrow from OpenClaw

- chat-native extraction/render placement
- a small host wrapper/component around the SDK renderer
- theme detection + host-config wiring
- structured handling for submit/open-url actions
- prompt guidance that teaches the agent to emit card payloads correctly

### What piclaw should *not* copy blindly

- OpenClaw's exact Lit/custom-element stack if a simpler local integration fits
  the current Preact web client better
- broad UI restyling unrelated to cards
- full templating breadth in v1
- any action types that do not map cleanly onto piclaw's chat/runtime model

## Current Behavior

- piclaw's web chat renders markdown/text/media but does not have an adaptive
  card surface.
- There is no defined message contract for Microsoft Adaptive Card payloads in
  timeline posts.
- Interactive card actions are therefore not available in the chat stream.
- The earlier broad "adopt openclaw UI" framing was too vague to implement safely.

## Desired Behavior

- Define a piclaw-compatible Adaptive Card path for web chat messages using the
  official Microsoft model.
- Support a minimal, explicit render pipeline for recognised card payloads in
  the timeline.
- Keep the first pass scoped to card rendering and safe action wiring, not a
  full UI redesign.
- Adopt the useful OpenClaw host patterns selectively while staying aligned with
  the Microsoft schema/SDK.
- Document the exact payload shape piclaw accepts and how card actions feed back
  into the existing chat/runtime flow.

## Proposed v1 Contract

### Supported payload root

A recognised card should be a JSON object rooted at:

```json
{
  "type": "AdaptiveCard",
  "version": "1.5",
  "body": [],
  "actions": []
}
```

### Likely v1 support subset

- Card root:
  - `type`
  - `version`
  - `body`
  - `actions`
  - `fallbackText`
- Actions:
  - `Action.Submit`
  - `Action.OpenUrl`
- Defer initially unless proven necessary:
  - templating expansion
  - `Action.ShowCard`
  - `Action.ToggleVisibility`
  - custom elements/actions
  - broad schema-version negotiation

### Likely action mapping

- `Action.Submit`
  - convert the submitted payload into an explicit chat/runtime event
  - most likely feed back into the existing message/input flow in a structured,
    inspectable format
- `Action.OpenUrl`
  - allow via normal safe external-link open path
- Everything else
  - block or defer until explicitly designed

## Acceptance Criteria

- [ ] Document the relevant OpenClaw adaptive-card architecture and map it to the official Microsoft Adaptive Cards model.
- [ ] Define a minimal piclaw message/card payload contract based on the official Adaptive Card schema.
- [ ] Pin the supported schema version window for piclaw v1.
- [ ] Identify the chat render path where Adaptive Cards would be extracted and mounted.
- [ ] Define how supported card actions (`Action.Submit`, `Action.OpenUrl`) behave in piclaw.
- [ ] Explicitly list which Microsoft Adaptive Card features are deferred from v1.
- [ ] Implement at least one minimal Adaptive Card rendering path in the web chat, or split the work into concrete follow-up tickets if the scope proves too large.
- [ ] Preserve existing markdown/timeline rendering for non-card messages.
- [ ] Add/update tests where practical for extraction, render gating, and supported action handling.
- [ ] Add a short implementation note describing which parts were adopted from OpenClaw and which were taken directly from the Microsoft Adaptive Cards model.

## Proposed First Pass

1. Research and pin down the exact Adaptive Card payload format piclaw will recognise.
2. Choose the supported schema version for v1.
3. Add a minimal extraction/render hook in the timeline/post rendering layer.
4. Render cards via a local wrapper around the official `adaptivecards` SDK.
5. Create a small piclaw `HostConfig` mapping for light/dark theme compatibility.
6. Support a narrow action subset first:
   - `Action.Submit`
   - `Action.OpenUrl`
7. Feed submit actions back into the existing message/input flow in a safe,
   explicit format.
8. Leave templating, richer actions, and broader UI redesign out of v1.

## Implementation Plan

### Phase 1 — payload contract + render path

- Add `adaptivecards` as a web-side dependency.
- Define one explicit `content_blocks` shape for cards, for example:

```json
{
  "type": "adaptive_card",
  "card_id": "uuid",
  "schema_version": "1.5",
  "state": "active",
  "payload": { "type": "AdaptiveCard", "version": "1.5", "body": [], "actions": [] },
  "fallback_text": "Approval required"
}
```

- Keep normal message `content` as human-readable fallback/summary text rather than raw card JSON.
- Extend the post/timeline renderer to detect `content_blocks[].type === "adaptive_card"` and mount a local wrapper around the Microsoft `adaptivecards` renderer.
- Add a small piclaw `HostConfig` mapped from existing light/dark theme variables.

### Phase 2 — action plumbing

- Add a dedicated web action endpoint for card interactions (for example `POST /agent/card-action`).
- Accepted payload should include at least:
  - message row id / thread context
  - `card_id`
  - action type
  - action id/title if present
  - submit data payload
- Support `Action.Submit` and `Action.OpenUrl` only in v1.
- `Action.OpenUrl` should use the normal safe external link path.
- `Action.Submit` should round-trip through the server so it becomes a persisted interaction, not a purely client-side event.

### Phase 3 — agent interaction mapping

- When an agent emits an adaptive card, store it as an agent message with an `adaptive_card` content block.
- When a user submits the card:
  1. persist a user interaction representing the submission
  2. dispatch a normalized event back into the agent/runtime
  3. let the agent answer with either:
     - a follow-up text response,
     - another adaptive card,
     - or a finalised version of the same workflow
- The normalized runtime input should be structured and explicit, e.g. card id, action id, action title, submitted fields, originating message id, and thread id.
- Prompt guidance should teach the agent to treat card submission as a structured continuation of the same conversation turn rather than unrelated free text.

### Phase 4 — finalisation + history

- When a card workflow is complete, persist a finished/read-only representation so the timeline can be reloaded without losing state.
- Remove interactive affordances from finished cards on subsequent renders.
- Keep finished cards renderable from database state alone, with no dependency on in-memory browser state.

## Mapping to Agent Interactions

### Agent → user

Agent emits:
- normal `content` fallback text
- plus `content_blocks` containing one or more `adaptive_card` blocks

This keeps:
- timeline rendering rich in web
- exports/search/fallback sane elsewhere
- non-card channels able to fall back to plain text

### User → agent (`Action.Submit`)

`Action.Submit` should map to a structured user interaction, not hidden local state.

Recommended shape:
- store a user message row such as:
  - `content`: short summary like `Submitted card response: Approve`
  - `content_blocks`: one `adaptive_card_submission` block carrying the structured payload
- enqueue/dispatch an agent turn with that same structured payload normalized for runtime consumption

Suggested submission block shape:

```json
{
  "type": "adaptive_card_submission",
  "card_id": "uuid",
  "source_message_id": 1234,
  "action_id": "approve",
  "action_title": "Approve",
  "data": { "reason": "LGTM" },
  "submitted_at": "2026-03-12T22:00:00.000Z"
}
```

This gives:
- auditable history in the timeline/database
- deterministic replay/debugging
- a clear structured handoff into agent logic

### Agent after submission

After receiving a submission, the agent may:
- send plain text confirmation
- send a replacement/follow-up card for the next step
- mark the current card flow complete

## Database Storage Plan

Use the existing `messages.content_blocks` JSON column for v1 rather than adding a new table immediately.

### Why this fits current piclaw architecture

- `messages.content_blocks` already stores arbitrary structured web blocks.
- The web timeline already reads and renders block arrays from `content_blocks`.
- `replaceMessageContent(...)` already exists for updating a persisted message and rebroadcasting the change.

### Recommended persisted block types

1. `adaptive_card`
   - stored on the original agent message
   - contains the card payload and lifecycle metadata

2. `adaptive_card_submission`
   - stored on the user submission message
   - contains structured submit data for audit/replay

3. optional `adaptive_card_result`
   - if later needed for richer completion summaries
   - not required for the first pass if final state is stored back onto the original card block

### Recommended finished-card strategy

For v1:
- keep the original agent message row as the canonical card row
- when the workflow finishes, update that row's `adaptive_card` block from `state: "active"` to something like `"completed" | "cancelled" | "failed"`
- store a frozen renderable payload for the finished state on that same block
- remove/ignore actions when rendering finished cards

Suggested finished block shape:

```json
{
  "type": "adaptive_card",
  "card_id": "uuid",
  "schema_version": "1.5",
  "state": "completed",
  "payload": { "type": "AdaptiveCard", "version": "1.5", "body": [] },
  "completed_at": "2026-03-12T22:05:00.000Z",
  "last_submission": {
    "action_id": "approve",
    "action_title": "Approve"
  }
}
```

### Important storage rules

- Do not store raw card JSON in the main `content` text field.
- Keep `content` as fallback text / summary for search, export, and non-card clients.
- Keep card payloads in `content_blocks` so existing message storage stays compatible.
- Persist enough lifecycle metadata (`card_id`, `state`, timestamps, submission summary) so a finished card can be re-rendered after reload.
- If later querying/reporting over cards becomes important, that can justify a dedicated `card_runs` table in a later phase — but it is not required for v1.

## Relevant Areas

- `piclaw/piclaw/web/src/components/post.ts`
- `piclaw/piclaw/web/src/components/timeline.ts`
- `piclaw/piclaw/web/src/markdown.ts`
- `piclaw/piclaw/web/static/css/styles.css`
- `piclaw/piclaw/src/channels/web/message-write-flows.ts`
- `piclaw/piclaw/src/channels/web/message-store.ts`
- `piclaw/piclaw/src/channels/web/agent-message-service.ts`
- `piclaw/piclaw/src/db/messages.ts`
- `piclaw/piclaw/src/channels/web/*` if message/action routing needs server support
- any future prompt-guidance surface for teaching the agent to emit cards

## Notes

- This is now an Adaptive Cards ticket, not a general visual refresh ticket.
- Prefer a minimal, explicit card contract over heuristics that try to parse too many formats.
- Keep the first pass safe: no broad rewrite of compose, timeline layout, or workspace UI.
- OpenClaw uses Lit + a custom element; piclaw does not need to copy that exact
  stack if a simpler local integration fits better.
- The important architectural principle is: follow the Microsoft Adaptive Cards
  schema and SDK first, then borrow only the host-integration pieces that are
  useful from OpenClaw.

## Updates

### 2026-03-12
- Originally created as a broad `openclaw-ui` adoption ticket.
- Rewritten after reference-repo review to focus specifically on the adaptive-card implementation in `matvelloso/openclaw-ui`.
- Further refined after Microsoft Adaptive Cards research so the ticket is now explicitly mapped to:
  - the official Adaptive Card schema
  - the `adaptivecards` JavaScript SDK render flow
  - `HostConfig`
  - supported action handling
  - optional/deferred templating via `adaptivecards-templating`
- Added a concrete implementation plan covering:
  - render integration phases
  - agent interaction mapping for `Action.Submit`
  - web action endpoint expectations
  - v1 database storage using `messages.content_blocks`
  - finished-card persistence strategy
- Captured the relevant OpenClaw reference pieces:
  - `README.md`
  - `src/components/oc-adaptive-card.ts`
  - `src/components/host-config.ts`
  - `src/components/action-handler.ts`
  - `src/chat/card-extract.ts`
  - `src/chat/card-render.ts`
  - `src/plugin/register.ts`
  - `src/plugin/prompt-guidance.ts`

## Links

- OpenClaw reference repo: https://github.com/matvelloso/openclaw-ui
- Microsoft Adaptive Cards: https://adaptivecards.io
- Microsoft Adaptive Cards JS SDK: https://github.com/microsoft/AdaptiveCards
- Candidate files:
  - `piclaw/piclaw/web/src/components/post.ts`
  - `piclaw/piclaw/web/src/components/timeline.ts`
  - `piclaw/piclaw/web/src/markdown.ts`
  - `piclaw/piclaw/web/static/css/styles.css`
