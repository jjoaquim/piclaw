// @ts-nocheck
/**
 * pane-types.ts — Core type definitions for the WebPaneExtension system.
 *
 * Defines the contract between the host app and pane extensions.
 * Panes are content-area UI components (editors, viewers, terminal)
 * managed by a PaneRegistry.
 */

/** Where a pane lives in the content area */
export type PanePlacement = "tabs" | "dock";

/** What a pane can do */
export type PaneCapability = "edit" | "readonly" | "terminal" | "preview";

/**
 * Context passed to a pane when mounting.
 * For file-based panes: path, content, mtime, size.
 * For non-file panes (terminal): path is undefined.
 */
export interface PaneContext {
    /** File path (undefined for non-file panes like terminal). */
    path?: string;
    /** File content as string. */
    content?: string;
    /** Last-modified timestamp (ISO string or epoch). */
    mtime?: string;
    /** File size in bytes. */
    size?: number;
    /** Whether the pane should open in edit or read-only mode. */
    mode: "edit" | "view";
}

/**
 * A mounted pane instance. The host communicates with the pane
 * through this interface after mount().
 */
export interface PaneInstance {
    /** Get current content (file panes). Terminal returns undefined. */
    getContent(): string | undefined;

    /** Whether the pane has unsaved changes. */
    isDirty(): boolean;

    /** Host → Pane: update content after external change (e.g., file reload). */
    setContent?(content: string, mtime: string): void;

    /** Host → Pane: give this pane keyboard focus. */
    focus(): void;

    /** Host → Pane: container was resized, re-layout if needed. */
    resize?(): void;

    /** Tear down the pane, remove DOM, detach listeners. */
    dispose(): void;

    /** Register callback for dirty state changes. */
    onDirtyChange?(cb: (dirty: boolean) => void): void;

    /** Register callback for save requests (e.g., Cmd+S). */
    onSaveRequest?(cb: (content: string) => void): void;

    /** Register callback for close requests. */
    onClose?(cb: () => void): void;
}

/**
 * Extension that provides a content pane.
 *
 * - placement: "tabs" — file editors/viewers, swapped on tab switch
 * - placement: "dock" — persistent bottom panel (terminal), toggled visible/hidden
 */
export interface WebPaneExtension {
    /** Unique identifier for this pane type. */
    id: string;

    /** Human-readable label (shown in tabs, menus). */
    label: string;

    /** Optional icon identifier or SVG string. */
    icon?: string;

    /** What this pane can do. */
    capabilities: PaneCapability[];

    /** Where this pane lives: "tabs" (content area) or "dock" (bottom panel). */
    placement: PanePlacement;

    /**
     * For "tabs" panes: can this pane handle the given context?
     * Return true/false, or a priority number (higher wins).
     * Not called for "dock" panes.
     */
    canHandle?(context: PaneContext): boolean | number;

    /**
     * Mount the pane into a container element.
     * Returns a PaneInstance for host ↔ pane communication.
     */
    mount(container: HTMLElement, context: PaneContext): PaneInstance;
}
