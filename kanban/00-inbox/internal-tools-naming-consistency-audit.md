---
id: internal-tools-naming-consistency-audit
title: Audit internal tools for naming consistency
status: inbox
priority: medium
created: 2026-03-12
updated: 2026-03-12
target_release: next
tags:
  - work-item
  - kanban
  - tools
  - naming
  - cleanup
  - audit
owner: pi
---

# Audit internal tools for naming consistency

## Summary

Audit the exposed internal tools for naming consistency across the internal tool
surface itself.

The aim is to reduce ambiguity between similar operations, make tool discovery
more predictable for the agent/model, and standardize naming conventions for
future additions. This ticket should end in concrete rename implementation work
and revision of all related skills, not just an audit note.

## Desired Behavior

- Scope is limited to internal tool naming rather than slash commands, generic UI labels, or unrelated docs.
- The audit should address all major inconsistency classes rather than picking just one:
  - singular vs plural mismatches
  - verb-first vs noun-first naming
  - overlapping terms for similar concepts
  - legacy names that no longer fit current behavior
- The preferred naming convention should be whichever pattern is easiest for the AI model/agent to use reliably and predictably.
- Renames should be strict rather than alias-based.
- Related skills should be revised to match the final internal tool names.

## Acceptance Criteria

- Inventory currently exposed internal tools and group them by domain (messages, attachments, scheduling, keychain, model control, workspace, database, etc.).
- Identify naming inconsistencies across all major inconsistency classes:
  - singular vs plural mismatches
  - verb-first vs noun-first naming
  - overlapping terms for similar concepts
  - legacy names that no longer fit current behavior
- Define a naming convention for internal tools based on what is easiest for the AI model/agent to use correctly.
- Implement the chosen renames directly rather than relying on long-term aliases.
- Revise all related skills and tool-facing references to use the final names.
- Document any unavoidable exceptions only if strict renaming cannot be completed in one pass.

## Notes

- Scope is internal tools only.
- All inconsistency classes matter here; this is not just a singular/plural cleanup.
- Naming should optimise for agent/model reliability first.
- Preferred outcome is direct rename implementation plus revision of affected skills, not a compatibility-alias phase.

## Links

- `piclaw/piclaw/src/extensions/`
- `piclaw/piclaw/src/agent-control/`
- `piclaw/docs/tools-and-skills.md`
- `list_internal_tools`

## Updates

### 2026-03-12
- Created to track a naming audit for internal tools, with attention to consistency across code, docs, and surfaced tool labels.
- Refined from 5-question pass:
  - scope should stay limited to internal tools
  - all major inconsistency classes matter
  - renames should be strict rather than alias-based
  - naming should optimise for AI model/agent usability
  - ticket should end in concrete renames plus revision of related skills
