---
name: spec-driven-project
description: Start any new software project with a structured spec-first workflow. Use this skill whenever starting a new project, creating a SPEC.md, kicking off a spec-driven build, scaffolding a codebase from a spec, or when the user mentions "new project", "project init", "spec-driven", "SPEC.md", "PLAN.md", or asks to break down a project idea into a structured plan. Also use when iterating on an existing SPEC.md or PLAN.md, or when resuming a project that follows this workflow. Trigger even for vague project ideas—the skill's job is to sharpen them into a spec.
---

# Spec-Driven Project Kickoff

Turn project ideas into structured, agent-friendly specifications through a conversational 20-questions process, then break them into executable plans.

## Why This Exists

Agents perform dramatically better when given real specs rather than vague instructions. Feeding an agent an actual ECMA-376 spec document gets you to 60% compliance in days with no hallucinated APIs. A SPEC.md is a living document that evolves with the project—not a prompt that gets thrown away.

## The Workflow

```
Idea → SPEC.md (20-questions) → PLAN.md (structured breakdown) → Build loop
```

Three phases, each with clear entry/exit criteria. Read the reference files for templates before writing either document:

- `{baseDir}/references/spec-template.md` — structural template for SPEC.md
- `{baseDir}/references/plan-template.md` — structural template for PLAN.md

---

## Phase 1: The 20-Questions Interview

Goal: extract enough information to write a SPEC.md that an agent can execute against.

### Starting the Interview

When the user describes a project idea (however vague), begin the structured interview. Don't ask all questions upfront—work through them conversationally, 2-3 at a time, adapting based on answers.

### The Essential Questions

Cover these areas, in whatever order feels natural:

**Goals & Context**
1. What problem does this solve? Who is it for?
2. What does "done" look like? What's the MVP?
3. Are there existing systems this needs to integrate with?
4. What constraints exist? (timeline, budget, team size, existing infra)

**Functional Spec**
5. What are the core user workflows? Walk through the happy path.
6. What data does the system handle? Inputs, outputs, persistence.
7. What are the edge cases you already know about?
8. Authentication/authorization model?
9. What third-party services or APIs are involved?

**Non-Functional Spec**
10. Performance requirements? (response times, throughput, concurrent users)
11. Where does this run? (cloud, self-hosted, edge, mobile)
12. Scaling expectations? (single-user hobby project vs. enterprise)
13. Compliance or regulatory requirements? (GDPR, accessibility, etc.)

**Technical Spec**
14. Language/framework preferences or constraints?
15. Database and storage requirements?
16. API style? (REST, GraphQL, gRPC, WebSocket)
17. Frontend approach? (SPA, SSR, mobile-native, CLI)
18. CI/CD and deployment strategy?

**Acceptance Criteria**
19. How do we verify each feature works? What tests matter?
20. What would make you reject a delivered feature?

### Interview Guidelines

- Adapt questions to the project scope. A CLI tool doesn't need questions about frontend frameworks. A weekend hack doesn't need compliance questions.
- If the user already has answers baked into their description, acknowledge them and skip ahead.
- Push back on scope creep early. If the user describes 15 features, help them identify the 3-5 that define the MVP.
- When the user says something ambiguous, propose a concrete interpretation and ask them to confirm or correct.
- Suggest approaches based on the constraints. "Given you want single-user with SQLite, here's a simpler auth model..." is helpful.
- Keep momentum. The goal is a complete spec in one session, not a drawn-out requirements gathering exercise.

### When to Stop Interviewing

Stop when you can confidently fill every section of the SPEC.md template. If there are gaps, flag them explicitly as `TBD – [reason]` in the spec rather than inventing answers.

---

## Phase 2: Write the SPEC.md

Once the interview covers enough ground, generate the SPEC.md.

### Writing the Spec

Read `{baseDir}/references/spec-template.md` before writing. Then:

1. Fill in every section from the interview answers
2. Mark anything unresolved as `TBD – [reason]`
3. Include the implementation plan as phased, checkable tasks
4. Include the file structure
5. Be specific—use exact library names, version constraints, endpoint paths, schema definitions

Write the SPEC.md to the project root using the `write` tool.

### Review with the User

Present the SPEC.md and ask:
- "Does this capture what you described?"
- "Anything missing or wrong?"
- "Are the phases in the right order?"

Iterate until the user confirms.

---

## Phase 3: Generate the PLAN.md

The PLAN.md is not a flat TODO list. It's a structured breakdown the agent can reason about: what's done, what's next, what's blocked, and why.

### Plan Structure

Read `{baseDir}/references/plan-template.md` before writing. Break the SPEC.md phases into focused chunks:
- Each chunk is a self-contained unit of work (scaffolding, data model, API layer, etc.)
- Chunks have clear entry criteria (what must exist before starting) and exit criteria (how to verify it's done)
- Dependencies between chunks are explicit
- Status tracking is built in

### Plan Guidelines

- Order chunks so each one builds on verified previous work
- Keep chunks small enough that an agent can complete one in a focused session
- Include verification steps: lint, test, demonstrate correctness
- The plan updates as work progresses—it's a living document, not a contract

Write the PLAN.md to the project root alongside the SPEC.md.

---

## Resuming a Project

If the user has an existing SPEC.md or PLAN.md:

1. Read the existing documents using `read`
2. Identify current status from the PLAN.md checkboxes
3. Pick up from the next incomplete chunk
4. If the spec has evolved (new requirements, changed constraints), update both documents before continuing

---

## File Outputs

| File | Location | Purpose |
|------|----------|---------|
| SPEC.md | Project root | Living specification document |
| PLAN.md | Project root | Structured execution plan with status tracking |

---

## What This Skill Does NOT Do

- It doesn't scaffold code. That's the build loop's job, driven by the PLAN.md.
- It doesn't replace domain expertise. If the user needs to research a technology choice, help them research it before committing to the spec.
- It doesn't generate boilerplate project configs. That happens after the spec is locked.
