---
id: skills-and-scripts-consistency-audit
title: Audit skills and scripts for consistency
status: inbox
priority: medium
created: 2026-03-12
updated: 2026-03-12
target_release: next
tags:
  - work-item
  - kanban
  - skills
  - scripts
  - cleanup
  - audit
owner: pi
---

# Audit skills and scripts for consistency

## Summary

Review workspace skills and standalone scripts for consistency in layout,
invocation patterns, naming, documentation, IPC usage, duplicated logic, and
repo-vs-workspace copies.

The goal is to reduce drift between skill-local scripts, repo copies, archived
utilities, and scratch scripts, while making it easier to understand where
automation should live. The first pass should focus on deduplication,
category-folder reorganisation, and consistent CLI flags/arguments.

## Desired Behavior

- Reduce duplication across workspace skills, repo skills, standalone scripts,
  and archived copies.
- Re-file skills and scripts into category folders rather than leaving the
  category model as a future plan only.
- Normalise CLI flags and argument conventions across the audited scripts.
- Use a category-dependent source-of-truth model rather than forcing repo or
  workspace to win globally.
- Support a subset of scripts/skills being public-facing, likely identified by
  front-matter metadata or equivalent explicit tagging.
- Use strict path moves for the new category layout rather than compatibility
  shims.
- Keep the first pass focused on structure, naming, and docs rather than deep
  behavioural refactors.

## Acceptance Criteria

- Inventory current skill scripts, standalone scripts, archived scripts, and duplicated copies.
- Identify inconsistent patterns across skills/scripts, including:
  - argument parsing and CLI help behavior
  - output conventions
  - IPC posting format
  - attachment/media handling
  - file locations and path assumptions
  - JSDoc/header consistency
  - use of repo copies vs workspace skill copies
- Deduplicate obvious duplicate/copy-drift cases where the canonical location is clear.
- Define and apply a **category-based re-filing model** for skills and scripts:
  - Create top-level category subfolders in `.pi/skills/` and `/workspace/piclaw/skills/` (e.g., `analytics/`, `operational/`, `maintenance/`, `onboarding/`, `search/`, etc.)
  - Map each existing skill/script to one canonical category
  - Move files into category folders in the first pass rather than only documenting the idea
  - Ensure naming is stable and discoverable
- Document a category-dependent source-of-truth model for repo vs workspace copies.
- Define how public-facing skills/scripts are marked (for example via front matter or similar metadata).
- Normalise CLI flags/arguments where straightforward without turning this ticket into a broad behaviour rewrite.
- Use strict moves rather than compatibility wrappers for the new category layout.
- Update affected docs/indexes if files are moved or normalized.
- Create follow-up tickets for any deeper behavioural refactors deferred from this structural pass.

## Notes

- This ticket is broader than the recent Playwright cleanup. It should cover the whole workspace/repo skill-and-script surface, including older utilities that may not yet follow current conventions.
- First-pass priorities are deduplication, category subfolders, and consistent CLI flags/arguments.
- Canonical source of truth depends on category rather than one global rule.
- A subset of skills/scripts may be public-facing and should likely be identified explicitly in metadata/front matter.
- Path migration is expected to use strict moves, not temporary wrappers.
- Behaviour changes and deep refactors are out of scope for the first pass.

## Links

- `/workspace/.pi/skills/`
- `/workspace/scripts/`
- `/workspace/piclaw/scripts/`
- `/workspace/piclaw/skills/`
- `notes/index.md`

## Updates

### 2026-03-12
- Created to track a consistency audit across skills, standalone scripts, archived utilities, and duplicated repo/workspace copies.
- Added explicit subfolder re-filing requirement: the audit now includes a category-based model for reorganizing skills and scripts into canonical subfolders under `.pi/skills/` and `/workspace/piclaw/skills/`, including migration strategy and compatibility checks.
- Refined from 5-question pass:
  - first-pass priorities are dedupe, category subfolders, and consistent CLI flags/arguments
  - canonical source of truth depends on category
  - a subset may be public-facing and should be explicitly marked
  - category-folder moves should happen in the first pass
  - strict moves are preferred over compatibility wrappers
  - first pass stays focused on structure, naming, and docs
