// @ts-nocheck
/**
 * panes/index.ts — Pane system barrel export.
 *
 * Re-exports types, registry, and built-in pane extensions.
 * The editor extension is lazy-loaded (CodeMirror stays out of core bundle).
 */

export type { PanePlacement, PaneCapability, PaneContext, PaneInstance, WebPaneExtension } from './pane-types.js';
export { paneRegistry } from './pane-registry.js';
export { editorPaneExtension, preloadEditorBundle } from './editor-loader.js';
export { terminalPaneExtension } from './terminal-pane.js';
export { workspacePreviewPaneExtension, workspaceMarkdownPreviewPaneExtension } from './workspace-preview-pane.js';
export type { TabState, TabViewState } from './tab-store.js';
export { tabStore } from './tab-store.js';
