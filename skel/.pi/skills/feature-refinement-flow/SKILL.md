---
name: feature-refinement-flow
description: Run a structured 20-question refinement flow before implementation for feature requests.
---

# Feature Refinement Flow

Use this skill to turn a feature request into a clear, implementation-ready ticket.

## When to use

Invoke when a request includes:

- behavior changes,
- new integrations,
- UI/editor workflow changes,
- or non-trivial architectural decisions.

## Goal

Turn vague ideas into:

1. A concrete user outcome
2. A deterministic implementation scope
3. A reproducible test plan

## Default process

Ask up to 20 questions in sequence, one-at-a-time, unless already answered.

### 20-question baseline

1. What is the **problem statement** and why does it matter now?
2. Who is the **primary user** and what workflow do they follow today?
3. What are the **success criteria** (observable outcomes)?
4. What is the **MVP behavior** (minimum useful version)?
5. What is explicitly **out of scope**?
6. Which files/surfaces are in scope (frontend, backend, extension API, tests)?
7. Any required **platform constraints** (browser support, runtime limits, auth mode)?
8. What should happen on **error/failure** cases?
9. What is required for **data persistence** / storage semantics?
10. Which existing pattern should this align with?
11. What should be changed first (lowest-risk slice)?
12. What should we avoid for v1?
13. How should file types, formats, and naming be handled?
14. Who/what are the **inputs** and **outputs** of this feature?
15. What should happen to existing behavior during this change?
16. What are the expected **performance** and startup/load constraints?
17. What **security / permissions** concerns apply?
18. What should be exportable / shareable and in which format(s)?
19. How will we prove this works (test plan)?
20. What is the acceptance/closure condition for “done”?

## How to use in tickets

- Add a short “Refinement notes” section in the ticket with the 20-question answers.
- Convert answers into:
  - acceptance criteria,
  - risks,
  - implementation path,
  - test plan,
  - definition of done.
- Add blockers only where known (uncertain candidate APIs, policy issues, missing assets).

## Preference persistence

Keep answers in a feature-scoped notes/ticket file or `notes/preferences/feature-refinement.md` if the process becomes reusable.

## Practical tip

Prefer *narrow first, iterate later*: lock scope by answering 1–10 first, then expand with dependency/testing details only after behavior is clear.
