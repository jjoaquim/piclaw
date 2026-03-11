# Custom WebPaneExtension Guide

This document explains how to create a custom pane extension for the piclaw
web UI. Pane extensions provide content-area UI components — editors, viewers,
previewers, or tools — managed by the `PaneRegistry`.

## Concepts

| Term | Description |
|---|---|
| **WebPaneExtension** | The extension contract. Declares what a pane can do and how to mount it. |
| **PaneRegistry** | Singleton that tracks registered panes and resolves the best one for a file. |
| **PaneContext** | Data passed when mounting: file path, content, mtime, mode. |
| **PaneInstance** | The mounted pane. Communicates with the host via callbacks. |
| **PanePlacement** | `"tabs"` (tabbed content area) or `"dock"` (persistent bottom panel). |
| **PaneCapability** | `"edit"`, `"readonly"`, `"preview"`, or `"terminal"`. |

## Extension interface

```typescript
interface WebPaneExtension {
  id: string;                        // Unique identifier
  label: string;                     // Human-readable name
  icon?: string;                     // Icon identifier or SVG
  capabilities: PaneCapability[];    // What this pane can do
  placement: PanePlacement;          // "tabs" or "dock"

  // For tabs panes: can this pane handle the given context?
  // Return false to decline, true for default priority (0),
  // or a number (higher wins).
  canHandle?(context: PaneContext): boolean | number;

  // Mount the pane into a container element.
  mount(container: HTMLElement, context: PaneContext): PaneInstance;
}
```

## Creating a tabs pane

Tabs panes appear in the tabbed content area. The registry calls `canHandle()`
on each registered tabs pane to find the best handler for a file.

### Step 1: Define the extension

```typescript
import type { WebPaneExtension, PaneContext, PaneInstance } from '../panes/pane-types.js';

export const markdownPreviewExtension: WebPaneExtension = {
  id: 'markdown-preview',
  label: 'Markdown Preview',
  capabilities: ['preview'],
  placement: 'tabs',

  canHandle(context: PaneContext): boolean | number {
    if (!context.path) return false;
    // Only handle .md files, with higher priority than the editor (1)
    return context.path.endsWith('.md') ? 10 : false;
  },

  mount(container: HTMLElement, context: PaneContext): PaneInstance {
    return new MarkdownPreviewInstance(container, context);
  },
};
```

### Step 2: Implement PaneInstance

```typescript
class MarkdownPreviewInstance implements PaneInstance {
  private container: HTMLElement;
  private el: HTMLElement;

  constructor(container: HTMLElement, context: PaneContext) {
    this.container = container;
    this.el = document.createElement('div');
    this.el.className = 'markdown-preview';
    this.el.innerHTML = renderMarkdown(context.content || '');
    container.appendChild(this.el);
  }

  getContent(): string | undefined {
    return undefined; // Read-only — no editable content
  }

  isDirty(): boolean {
    return false; // Never dirty
  }

  setContent(content: string, _mtime: string): void {
    this.el.innerHTML = renderMarkdown(content);
  }

  focus(): void {
    this.el.focus();
  }

  dispose(): void {
    this.el.remove();
  }
}
```

### Step 3: Register

In `app.ts` (or an extension entry point):

```typescript
import { paneRegistry } from './panes/index.js';
import { markdownPreviewExtension } from './my-panes/markdown-preview.js';

paneRegistry.register(markdownPreviewExtension);
```

## Creating a dock pane

Dock panes appear in the persistent bottom panel (e.g., terminal). They are
mounted once and toggled visible/hidden — they survive tab switches.

```typescript
export const myDockExtension: WebPaneExtension = {
  id: 'my-dock',
  label: 'My Tool',
  capabilities: ['readonly'],
  placement: 'dock',
  // No canHandle needed for dock panes

  mount(container, context) {
    // Build your UI, attach to container
    // Return a PaneInstance
  },
};
```

## Priority and routing

When a file is opened, the registry calls `canHandle(context)` on every
registered `placement: "tabs"` pane:

- `false` or `0` → skip this pane
- `true` → priority 0 (default)
- `number > 0` → that priority value

The pane with the highest priority wins. The built-in editor returns `1`
(lowest), so any specialized viewer that returns `≥ 2` will take precedence.

If `canHandle()` throws, the exception is caught and the pane is skipped.
If `resolve()` returns no match, the host falls back to the built-in editor.

## Host ↔ Pane communication

| Direction | Method | When |
|---|---|---|
| Host → Pane | `setContent(content, mtime)` | File reloaded from disk |
| Host → Pane | `focus()` | Tab activated |
| Host → Pane | `resize()` | Container resized (splitter drag) |
| Pane → Host | `onDirtyChange(cb)` | Pane dirty state changed |
| Pane → Host | `onSaveRequest(cb)` | User pressed Cmd+S |
| Pane → Host | `onClose(cb)` | Pane requests close |

## Lifecycle

1. User opens a file → `paneRegistry.resolve(context)` finds best pane
2. Host creates container element → calls `pane.mount(container, context)`
3. Pane renders into container, returns `PaneInstance`
4. User edits → pane calls `onDirtyChange(true)` → tab shows dirty dot
5. User saves → pane calls `onSaveRequest(content)` → host writes file
6. Tab closed → host calls `instance.dispose()` → pane cleans up

## Built-in panes

| ID | Placement | Priority | Description |
|---|---|---|---|
| `editor` | tabs | 1 | CodeMirror editor — handles all text files (fallback) |
| `terminal` | dock | — | Terminal scaffold (xterm.js integration pending) |
