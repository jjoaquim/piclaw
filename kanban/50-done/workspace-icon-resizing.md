---
id: workspace-icon-resizing
title: Support resizing workspace explorer icons
status: done
created: 2026-03-13
updated: 2026-03-13
tags:
  - work-item
  - kanban
  - web-ui
  - workspace-explorer
  - icons
owner: pi
---

# Support resizing workspace explorer icons

## Summary

Add support for resizing icons in the workspace explorer so the file tree can be
made denser or more readable depending on user preference and screen size.

## Acceptance Criteria

- [ ] Treat this as a workspace explorer scale feature, not icon-only resizing.
- [ ] Scope includes tree icons, row height/spacing, and workspace explorer font sizes so the visual scale stays consistent.
- [ ] Use responsive defaults by viewport/device in v1.
- [ ] Do not add a visible workspace UI control in v1.
- [ ] Allow an internal/stored override path for scale selection if needed, with local persistence behavior documented.
- [ ] Support three presets: `compact`, `default`, and `comfortable`.
- [ ] On touch devices, never go below the default touch-target floor even if a compact mode exists for desktop.
- [ ] Keep explorer readability and alignment intact: icons, labels, indentation, row actions, and hit targets must remain visually balanced.
- [ ] No regressions in mobile/touch usability, row interaction, or tree scanning.

## Refinement Notes

### 5-question pass (2026-03-13)

1. **Problem being solved**
   - Primary: visual consistency with the rest of the UI.
   - Also improve readability and touch usability.
2. **What is in scope for v1**
   - A broader workspace explorer scale model: icons + row spacing/height + font sizes.
3. **How users control it**
   - Responsive defaults first, with user override capability available through stored/internal settings.
4. **Where the control lives**
   - No visible control in v1.
5. **Preset/safety model**
   - Three presets: `compact`, `default`, `comfortable`.
   - Touch devices must not shrink below default interaction sizing.

## Notes

- Likely touches both icon dimensions and row spacing/density in the workspace explorer.
- Should be considered alongside overall workspace explorer readability and touch-target constraints.
- Prefer CSS-variable driven scaling so icon size, typography, spacing, and row height stay in sync.
- Treat desktop compactness and touch safety as separate constraints; compact should not degrade tap targets.
- Implemented via responsive defaults plus a stored override path using the `workspaceExplorerScale` localStorage key.
- Current responsive behavior:
  - touch / coarse-pointer devices → `comfortable`
  - narrower desktop widths → `comfortable`
  - larger desktop widths → `default`
  - stored `compact` overrides are clamped back to `default` on touch devices

## Test Plan

- Verify desktop explorer rendering at `compact`, `default`, and `comfortable` scales.
- Verify touch/mobile view keeps at least default hit-target sizing.
- Confirm long filenames, nested indentation, expand/collapse chevrons, and row action affordances remain aligned.
- Confirm persisted override behavior does not fight responsive defaults unexpectedly.

## Updates

### 2026-03-13
- Added from request to track workspace icon resizing in the workspace explorer.
- Refined in a 5-question pass:
  - prioritize visual consistency, readability, and touch usability
  - scope as full explorer scale (icons + spacing + font sizes)
  - responsive defaults in v1
  - no visible UI control in v1
  - `compact/default/comfortable` presets with a touch-device floor at `default`
- Implemented explorer scaling using responsive preset resolution plus a stored override path.
- Added a follow-up low-priority ticket for designing the eventual visible scale-control UI.

## Links

- `piclaw/piclaw/web/src/components/workspace-explorer.ts`
- `piclaw/piclaw/web/static/css/styles.css`
