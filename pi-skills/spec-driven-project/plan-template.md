# PLAN.md Template

Use this structure when generating a PLAN.md from a completed SPEC.md. The plan is a living document that tracks execution state—not a static checklist.

---

```markdown
# PLAN.md

> Generated from SPEC.md on [date]. Last updated: [date].

## Status Legend

- [ ] Not started
- [x] Complete
- [~] In progress
- [!] Blocked – see notes

---

## Current Focus

**Active chunk:** [Name of the chunk currently being worked on]
**Status:** [Brief status line]
**Blocked by:** [Nothing / specific dependency]

---

## Chunk 1: [Name, e.g. "Project Scaffolding"]

**Goal:** [What this chunk accomplishes in one sentence]
**Entry criteria:** None (first chunk) / [What must exist before starting]
**Exit criteria:** [How to verify this chunk is done]

- [ ] 1.1 [Task]
  - Details
- [ ] 1.2 [Task]
  - Details
- [ ] 1.3 Verify: [specific verification step]

**Notes:** [Decisions made, issues encountered, context for future reference]

---

## Chunk 2: [Name, e.g. "Data Model & Persistence"]

**Goal:** [One sentence]
**Entry criteria:** Chunk 1 complete (project structure exists)
**Exit criteria:** [Verification]
**Depends on:** Chunk 1

- [ ] 2.1 [Task]
- [ ] 2.2 [Task]
- [ ] 2.3 Verify: [specific verification step]

**Notes:**

---

## Chunk 3: [Name, e.g. "Core API"]

**Goal:** [One sentence]
**Entry criteria:** Chunk 2 complete (data layer working)
**Exit criteria:** [Verification]
**Depends on:** Chunk 2

- [ ] 3.1 [Task]
- [ ] 3.2 [Task]
- [ ] 3.3 Verify: [specific verification step]

**Notes:**

---

[Continue chunks as needed...]

---

## Decisions Log

Track architectural or design decisions made during execution. Agents (and future-you) need this context.

| Date | Decision | Rationale |
|------|----------|-----------|
| | | |

---

## Blocked Items

| Item | Blocked By | Since | Resolution Path |
|------|-----------|-------|-----------------|
| | | | |
```

---

## Template Usage Notes

**Chunks, not tasks.** Each chunk is a coherent unit of work, not a single task. A chunk groups related tasks that together produce a verifiable result. Think "the API layer works end-to-end" not "write the GET endpoint."

**Entry/exit criteria are mandatory.** They prevent an agent from starting work it can't finish (missing dependencies) and from declaring victory prematurely (no verification).

**Verification is a task, not an afterthought.** Every chunk ends with an explicit verification step. "Run the test suite" or "demonstrate the endpoint works with curl" or "screenshot the responsive layout at 3 breakpoints."

**The Current Focus section is the agent's entry point.** When resuming work, an agent reads this section first to understand where things stand. Keep it updated.

**Notes accumulate context.** When a chunk is complete, leave notes about what happened—decisions, workarounds, gotchas. This is how the spec stays alive and the plan stays useful across sessions.

**Decisions Log prevents repeated debates.** When you decide to use SQLite instead of Postgres, or to skip auth for MVP, log it. Future agents (or future you) will ask the same question otherwise.

**Keep chunks small.** If a chunk has more than 5-7 tasks, it's probably two chunks. An agent should be able to complete a chunk in one focused session.
