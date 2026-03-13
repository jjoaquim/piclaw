---
id: vendored-dependency-update-workflow
title: General-purpose vendored dependency update workflow
status: next
priority: medium
created: 2026-03-12
updated: 2026-03-12
target_release: next
estimate: M
risk: medium
tags:
  - work-item
  - kanban
  - vendor
  - dependencies
  - build
  - tooling
owner: pi
---

# General-purpose vendored dependency update workflow

## Summary

Create a general-purpose task/script/skill for managing vendored third-party dependencies that we ship in the source tree.

The goal is to make vendored assets reproducible, auditable, and easy to update without relying on ad hoc one-off commands. This should cover the full lifecycle: pinning the upstream version, rebuilding or exporting the vendored artifact, recording metadata/checksums, validating the result, and documenting how future updates are performed.

This should generalize the beautiful-mermaid flow into a reusable pattern that can also be applied to other vendored frontend or runtime assets.

## Acceptance Criteria

- [ ] Define a standard vendored-dependency workflow that covers source entry, build/export command, output path, version pinning, and verification metadata.
- [ ] Decide whether the primary interface should be a script, a skill, a Make target, or a combination.
- [ ] Support at least one reusable manifest/config format for vendored dependencies.
- [ ] Document how vendored assets are rebuilt, upgraded, verified, and committed.
- [ ] Identify which currently vendored assets should migrate to the common workflow first.
- [ ] Split follow-up migration work into separate tickets if more than one dependency needs non-trivial conversion.
- [ ] Prove the workflow on at least one real vendored dependency beyond the current one-off Mermaid path, or explicitly document why Mermaid is the only initial adopter.

## Implementation Paths

### Path A — Script-first manifest-driven updater (recommended)
1. Add a generic script that reads a manifest describing vendored dependencies.
2. For each dependency, run the pinned install/build/export command.
3. Write metadata alongside the vendored artifact (version, checksum, source, command).
4. Expose thin wrappers via package scripts / Make targets.

**Pros:** reusable, automatable, good fit for CI and local rebuilds.
**Cons:** requires a bit more upfront design.

### Path B — Skill-first workflow wrapper
1. Create a Pi skill that standardizes vendored dependency updates.
2. Keep per-dependency scripts local to each dependency.
3. Use the skill mostly as orchestration + documentation.

**Pros:** ergonomic for interactive use.
**Cons:** less reusable for CI/non-agent workflows unless backed by scripts anyway.

### Path C — Convention + per-dependency scripts only
1. Keep one script per vendored dependency.
2. Standardize naming, metadata output, and docs conventions.
3. Avoid a shared manifest or generic updater.

**Pros:** simple and incremental.
**Cons:** higher drift risk over time.

## Recommended Path

Use **Path A**: define a reusable script-first workflow, then optionally expose it through a skill or Make wrapper.

## Test Plan

- **Unit:** validate manifest parsing, required fields, and deterministic metadata output for at least one fixture dependency.
- **Integration:** run the generic updater against a real vendored dependency and confirm the artifact + metadata are reproduced.
- **Build:** verify package/Make wrappers work from the authoritative repo root and package root.
- **Safety:** confirm the workflow fails clearly when an upstream package, entry file, or build command is missing.

## Definition of Done

- [ ] All acceptance criteria satisfied and verified
- [ ] Generic vendored-dependency updater exists and is documented
- [ ] Manifest/config format committed with at least one real example
- [ ] Metadata/checksum output verified for the example dependency
- [ ] Package / Make / skill entry points (as chosen) are wired and documented
- [ ] Follow-up migration tickets created for additional vendored assets
- [ ] Update history complete with evidence
- [ ] Quality score ≥ 9 recorded in final update
- [ ] Ticket front matter updated (`status`, `updated`, `completed`)
- [ ] Ticket moved to `50-done/`

## Updates

### 2026-03-12
- Lane change: `inbox` → `next`.
- Expanded the ticket with a concrete test plan, DoD, and a draft manifest shape so it is ready for implementation planning.
- Quality: ★★★★☆ 8/10 (problem: 2, scope: 2, test: 2, deps: 1, risk: 1)
- Gap: still needs the first concrete adoption target beyond Mermaid to be selected at pickup time.

### 2026-03-12
- Created to track a reusable vendored dependency update workflow after the beautiful-mermaid vendoring work exposed the need for a general pattern.

## Notes

### Draft manifest shape

```json
{
  "id": "beautiful-mermaid",
  "packageName": "beautiful-mermaid",
  "version": "1.1.3",
  "projectRoot": "piclaw/piclaw",
  "sourceEntry": "web/src/vendor/mermaid-entry.ts",
  "outputFile": "web/static/js/vendor/beautiful-mermaid.js",
  "metadataFile": "web/static/js/vendor/beautiful-mermaid.meta.json",
  "installCommand": ["bun", "add", "--exact", "beautiful-mermaid@1.1.3"],
  "buildCommand": [
    "bun",
    "build",
    "web/src/vendor/mermaid-entry.ts",
    "--target=browser",
    "--minify",
    "--outfile",
    "web/static/js/vendor/beautiful-mermaid.js"
  ],
  "verify": {
    "sha256": true,
    "sizeBytes": true,
    "packageVersion": true
  }
}
```

Suggested required fields:
- `id`
- `packageName`
- `version`
- `projectRoot`
- `outputFile`
- `metadataFile`
- one of `buildCommand` or `exportCommand`

Suggested optional fields:
- `sourceEntry`
- `installCommand`
- `verify`
- `license`
- `repository`
- `notes`

The workflow should preserve host/container identity assumptions and keep all vendored assets reproducible from the authoritative source tree.

Good candidates include frontend bundles and other checked-in generated assets that are currently rebuilt manually or with one-off commands.

Metadata should be committed alongside the vendored artifact where practical.
Consider whether the shared workflow should also validate license/source provenance for vendored dependencies.

## Links

- `kanban/20-doing/fix-mermaid-vendor-build.md`
- `piclaw/piclaw/web/static/js/vendor/`
- `piclaw/piclaw/scripts/build-beautiful-mermaid-vendor.ts`
- `piclaw/piclaw/scripts/update-beautiful-mermaid.ts`
- `piclaw/Makefile`
