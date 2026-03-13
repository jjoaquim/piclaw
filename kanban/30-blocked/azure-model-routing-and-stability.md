---
id: azure-model-routing-and-stability
title: Harden Azure / Foundry model routing and stability
status: blocked
priority: high
created: 2026-03-10
updated: 2026-03-12
target_release: next
tags:
  - work-item
  - kanban
  - azure
  - llm
  - harness
owner: pi
---

# Harden Azure / Foundry model routing and stability

## Summary

Use the Azure harness to close the remaining Azure-model issues:

- `gpt-5-4-pro` is Responses-only and must not route through chat completions.
- `gpt-5-mini` is unstable on repeated tool/history exchanges.
- Foundry needs compat handling for request shape, message ordering, and rate-limit behavior.

## Blockers

- Blocked on time availability / competing priorities before the next implementation pass.

## Acceptance Criteria

- `gpt-5-4-pro` always routes through the correct Responses path.
- `gpt-5-mini` repeated tool/history runs are understood and either stabilized or explicitly guarded/documented.
- Foundry compat fixes proven in the harness are ported into the real provider path where appropriate.
- Harness results are repeatable and documented, with all fixes identified before porting over to our core code.

## Updates

### 2026-03-12
- Board quality review: added explicit test plan and DoD checklist.
- Quality: ★★★★☆ 7/10 (problem: 2, scope: 2, test: 1, deps: 1, risk: 1)
- Gap: still blocked on time/priority and needs the first production-port slice selected.

### 2026-03-11
- Lane change: `doing` → `blocked`.
- Blocked on time availability / competing priorities.
- Existing harness findings and implementation paths remain valid for the next work window.

### 2026-03-11 (late)
- v1.2.0 released without Azure routing changes (non-harness work shipped).
- Harness artifacts remain untracked: `extensions/azure-openai.harness.ts`, `scripts/azure-openai-harness.ts`.
- Matrix test results in `/workspace/tmp/aoai-matrix-20260310/`.
- ~50% complete. Remaining: port proven guardrails into real provider code.
- Identified need: refactor extension to support N providers from config instead of hardcoded primary/secondary blocks. Current `azure-openai-2` East US provider was added as a copy-paste block — should become data-driven (array of `{ resource, region, modelIds, api }`) so adding a third region or swapping models is config-only.
- This aligns with **Path B** (unified compat matrix) and should be done as part of the port.

### 2026-03-11
- Added explicit implementation-path analysis for production porting.
- Marked recommended path as targeted guardrails + compat-port from harness findings.

### 2026-03-10 (late matrix pass)
- Ran expanded unstable-provider matrix and added `gpt-5-4` control:
  - artifacts under `/workspace/tmp/aoai-matrix-20260310/`
- Added harness switches for this investigation:
  - `--force-tool-choice-required`
  - transformed-payload capture improvements
- Findings:
  - `gpt-5-mini`: failures correlate strongly with `reasoning=high` on tool runs (`missing_tool_call` dominant), with occasional aborts on 2-round medium tool follow-up.
  - `mistral-large-3`: functional with compat changes, but highly 429-sensitive; `cooldown-ms=10000` gave clean pass while lower cooldown produced one strict-format history mismatch.
  - `gpt-5-4`: all matrix control runs passed (`10/10`).

### 2026-03-10
- Promoted from next to doing.
- Renamed to a clearer slug filename.
- Harness created at `piclaw/scripts/azure-openai-harness.ts`.
- Harness provider copy created at `piclaw/extensions/azure-openai.harness.ts`.
- Notes captured in `notes/azure-openai-harness.md`.
- Current findings:
  - Stable controls: `gpt-5-4`, `gpt-5-4-pro`, `gpt-5-3-codex`, `gpt-4o-mini`
  - Unstable: `gpt-5-mini`
  - Foundry `mistral-large-3` can pass with compat + retry/cooldown in the harness.

## Implementation Paths

### Path A — Targeted provider guardrails + compat port (recommended)
1. Port proven Foundry compat knobs from harness copy into live provider path.
2. Add explicit routing guarantees for Responses-only models (`gpt-5-4-pro`).
3. Add model-specific guardrail for `gpt-5-mini` tool-heavy flows (reasoning cap/fallback retry strategy).
4. Add tests for routing, payload shape, and failure handling.

Pros: direct path to production stability.
Cons: requires careful model-specific policy documentation.

### Path B — Unified compatibility matrix in config
1. Introduce formal `compat` schema per model/provider in live extension.
2. Encode request-shape differences declaratively (max token field, tool ordering, reasoning support).
3. Keep stream path generic and drive behavior by compat flags.

Pros: scalable for future providers/models.
Cons: larger refactor than immediate needs.

### Path C — Policy layer above provider
1. Add preflight policy resolver that adjusts stream options by model/case.
2. Keep provider mostly unchanged; centralize fallback/retry behavior.

Pros: reusable policy mechanism.
Cons: can hide model-specific transport nuances.

## Recommended Path

Execute **Path A** now, while shaping compat objects so the code can evolve toward **Path B**.

## Test Plan

- Re-run harness matrices for the targeted Azure / Foundry models with documented settings.
- Add or extend provider tests for routing, payload shape, retry/guardrail behavior, and failure handling.
- Validate at least one production-like provider configuration after porting proven harness fixes.

## Definition of Done

- [ ] All acceptance criteria satisfied and verified
- [ ] Harness evidence recorded in `## Updates`
- [ ] Live provider path updated and tested where applicable
- [ ] Deferred compat follow-ups captured as tickets if not shipped
- [ ] Quality score ≥ 9 recorded in final update
- [ ] Ticket front matter updated (`status`, `updated`, `completed`)
- [ ] Ticket moved to `50-done/`

## Notes

Important report files:
- `/workspace/tmp/azure-openai-harness-full.json`
- `/workspace/tmp/azure-openai-harness-focus-openai-v2.json`
- `/workspace/tmp/azure-openai-harness-focus-foundry-v3.json`
- `/workspace/tmp/azure-openai-harness-gpt5mini-payloads.json`
- `/workspace/tmp/azure-openai-harness-gpt54pro-control.json`
- `/workspace/tmp/azure-openai-harness-mistral-payloads.json`

Payload captures for failing runs:
- `/workspace/tmp/azure-openai-harness-payloads/`

## Links

- `notes/azure-openai-harness.md`
- `notes/azure-openai-harness/azure-openai-harness.ts`
- `piclaw/scripts/azure-openai-harness.ts`
- `piclaw/extensions/azure-openai.harness.ts`
- `piclaw/extensions/azure-openai.ts`
