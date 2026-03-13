---
id: post-release-code-audit
title: Post-release code audit and refactoring pass
status: blocked
priority: medium
created: 2026-03-11
updated: 2026-03-12
target_release: next-minor
tags:
  - work-item
  - kanban
  - tech-debt
  - quality
  - recurring
owner: pi
---

# Post-release code audit and refactoring pass

## Summary

After the v1.2.x feature sprint (extension system, editor, IPC media, provider usage), run a systematic audit and refactoring pass across the codebase. Focus on consolidating test patterns, removing dead code, tightening module boundaries, and reducing accumulated tech debt before the next feature cycle.

A recovered historical `plan.md` from git history shows that many of the large architecture/type-safety/JSDoc goals originally tracked for this wave are already complete. This ticket should therefore concentrate on the remaining actionable items rather than re-auditing finished work.

## Scope

### Carry-over from recovered plan: remaining actionable items

The recovered `plan.md` indicates these major areas were completed in the original refactor wave:
- broad web/runtime decomposition
- most `any`-removal and type-gate work
- exported JSDoc/module-header sweeps
- major security hardening tranches
- stale-dist enforcement and package hygiene guardrails

However, some of those areas should still be re-audited from a code-quality perspective rather than treated as permanently closed. This ticket should therefore distinguish between:

- **repeat audit required** — re-check earlier completed areas for drift, regressions, or newly introduced inconsistencies
- **implementation follow-through required** — residual work that still appears genuinely unfinished

So this is not a full restart of the old plan, but neither is it limited only to obviously unfinished items.

### Test consolidation
- [ ] Audit all test files for consistent use of shared helpers (`setEnv`, `getTestWorkspace`, `createTempWorkspace`)
- [ ] Identify and merge overlapping test coverage where redundancy no longer carries clear regression value
- [ ] Standardise `beforeEach`/`afterEach` cleanup patterns (env restore, DB close, temp dir removal)
- [ ] Remove tests that only exercise trivial pass-through wiring when equivalent behavioural coverage already exists
- [ ] Ensure every relevant test file imports `helpers.js` (or the current canonical equivalent) for global env setup

### Dead code and hygiene
- [ ] Run unused-exports check (`check-unused-exports.ts`) and act on high-confidence results
- [ ] Grep for `TODO`, `FIXME`, `HACK`, `XXX` — resolve, delete, or convert to tickets
- [ ] Identify and remove any feature-flagged code where the flag is always on/off
- [ ] Remove leftover debug logging (`console.log`, `console.warn`) not behind a log-level guard
- [ ] Review whether `src/channels/web/ui-context.ts` should remain as a compatibility/test adapter or can now be retired with justification documented either way
- [ ] Clean up `/workspace/tmp` stale diffs/build artifacts/one-off scripts, or split that into a separate workspace-hygiene task if it proves too repo-external

### Module boundary tightening
- [ ] Audit barrel exports (`src/db.js`, `src/extensions/index.ts`) for leaking internals
- [ ] Check for circular imports across `src/` modules
- [ ] Ensure `src/core/` modules have no upward dependencies into `src/channels/` or `src/extensions/`
- [ ] Review `src/agent-pool/` for functions that should now be private to the module after earlier decomposition passes

### Documentation and audit follow-through
- [ ] Update `docs/architecture.md` to reflect the current module layout after the completed refactor wave
- [ ] Ensure `AGENTS.md` reflects current conventions
- [ ] Verify the current coverage/quality bars are still documented accurately after recent work
- [ ] Record any deferred deeper refactors as concrete follow-up tickets rather than leaving them implicit

### Repeat audits from the recovered plan
- [ ] Re-audit architectural boundaries after the recent feature/release work to confirm earlier decomposition gains have not regressed.
- [ ] Re-audit type quality in high-churn areas for newly introduced loose contracts, casts, or avoidable suppression.
- [ ] Re-audit exported JSDoc/module-header consistency on newly touched seams rather than assuming the earlier sweep remains fully current.
- [ ] Re-run quality-bar checks from the old plan (coverage, stale-dist, import boundaries, unused exports) and record any drift.

### Optional polish explicitly carried over from the recovered plan
- [ ] Continue opportunistic frontend decomposition of remaining large UI files (especially `workspace-explorer.ts` and other oversized view modules) only if it can be done without coupling to this hygiene pass
- [ ] Keep tranche-end validation anchored on `quality`, `make build-piclaw`, and coverage checks so the audit remains measurable

## Acceptance Criteria

- [ ] Audit scope is grouped into concrete execution chunks (tests, dead code/hygiene, boundaries, docs, repeat audits, optional polish).
- [ ] The ticket explicitly distinguishes already-completed plan items, repeat-audit items, and true remaining implementation work.
- [ ] Quick wins vs deeper refactors are separated so the first pass stays tractable.
- [ ] Success is measurable via concrete checks (`quality`, unused exports, targeted cleanup, docs updates, coverage/validation checks).
- [ ] Follow-up tickets are created for any deeper refactors or regressions uncovered by the repeat audits.

## Implementation Paths

### Path A — Single pass (recommended for now)
One focused session: run the checklist top-to-bottom, commit in logical chunks.

Pros: Fast, keeps momentum.
Cons: May miss deeper structural issues.

### Path B — Module-by-module audit
Tackle one module per session (`db/`, `channels/web/`, `agent-pool/`, `extensions/`, `ipc`).

Pros: Thorough, easier to review.
Cons: Slower, risk of stalling mid-way.

## Recommended Path

Start with **Path A** for the quick wins that remain genuinely open after the recovered-plan review (test consolidation, dead code/hygiene, targeted boundary audits, docs refresh), then revisit deeper refactoring per **Path B** only where fresh evidence shows unfinished work.

## Updates

### 2026-03-12
- Board quality review: added rough acceptance criteria and clarified that the first pass should separate quick wins from deeper structural refactors.
- Recovered the deleted historical `plan.md` from git history and reviewed it.
- Folded the remaining actionable items from that plan into this ticket.
- Explicitly noted that many original plan goals are already complete, but some of those tranches should still be repeated as quality audits to check for drift/regressions after subsequent feature work.
- Moved to blocked for the next minor-release window.
- Marked as a recurring ticket to revisit for every minor release.

### 2026-03-11
- Created ticket after v1.2.2 release.

## Notes

- This is a hygiene pass, not a feature. No user-facing changes expected.
- Blocked on the next minor-release window rather than active feature work now.
- Treat this as a recurring audit ticket that should be reopened/refreshed for every minor release.
- Consider running coverage report before and after to measure impact.

## Links

- `kanban/50-done/ipc-inline-media.md`
- `kanban/50-done/extension-system-refactor-for-editor-and-terminal.md`
- `piclaw/scripts/check-unused-exports.ts`
