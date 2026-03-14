---
name: extension-design
description: Design and audit Pi extensions safely (avoid workspace source imports).
distribution: public
---

# Extension design notes

Use this when creating or reviewing extensions to avoid the broken import pattern.

## Avoid this pattern
Do **not** import from the workspace source tree (for example `/workspace/piclaw/piclaw/src/...` or `/workspace/.../node_modules`).
The running agent uses the **installed** package, and workspace paths can drift or break after reloads.

## Use the installed package instead
Reference the installed dist paths, for example:
```ts
import { createBatchExecTool } from "/home/agent/.bun/install/global/node_modules/piclaw/dist/tools/context-tools.js";
```

## Safety checklist
1. Use installed dist paths (not workspace source).
2. Avoid touching the DB before init.
3. Wrap tool handlers in `try/catch` to avoid crashes.
4. Guard filesystem access and `saveToolOutput` calls.
5. Keep dependencies minimal and explicit.

## Quick audit
```bash
rg -n "/workspace/piclaw/piclaw/src|/workspace/.*/node_modules" /workspace/.pi/extensions
```

## Update skel when changing extensions
```bash
cp /workspace/.pi/extensions/<name>.ts /workspace/piclaw/skel/.pi/extensions/<name>.ts
```
