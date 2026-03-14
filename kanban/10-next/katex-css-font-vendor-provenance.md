---
id: katex-css-font-vendor-provenance
title: Standardize KaTeX CSS and font vendoring provenance
status: next
priority: medium
created: 2026-03-14
updated: 2026-03-14
target_release: next
estimate: S
risk: low
tags:
  - work-item
  - kanban
  - vendor
  - katex
  - css
  - fonts
owner: pi
---

# Standardize KaTeX CSS and font vendoring provenance

## Summary

The vendored dependency workflow now covers the checked-in JS runtime artifacts for Mermaid, CodeMirror, Preact/HTM, Marked, and KaTeX JS.

The remaining provenance gap is KaTeX CSS/font handling:
- `web/src/styles/katex.bundle.css`
- `web/static/fonts/KaTeX_*.woff2`

Those assets are still present and working, but they are not yet described by the same manifest-driven workflow that now handles the JS vendor artifacts.

## Acceptance Criteria

- [ ] Document where the current KaTeX CSS and font assets originate from
- [ ] Decide whether they should be copied from `node_modules/katex/dist/` or rebuilt/generated another way
- [ ] Add reproducible metadata / provenance for the CSS and font assets
- [ ] Ensure the web build continues to produce working KaTeX rendering after the provenance cleanup
- [ ] Record whether the CSS/fonts belong inside the shared vendored-dependency workflow or a parallel static-asset workflow

## Notes

This is intentionally split out from the main vendored dependency workflow ticket so the JS workflow can land cleanly without overstating CSS/font provenance coverage.
