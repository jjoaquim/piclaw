// @ts-nocheck
/**
 * editor-pane.ts — EditorPaneExtension
 *
 * Wraps the existing WorkspaceEditor Preact component as a WebPaneExtension.
 * This is the bridge between the pane contract and the legacy editor component,
 * keeping WorkspaceEditor internally unchanged.
 *
 * The editor pane handles all text files (placement: "tabs").
 */

import { html, render } from '../vendor/preact-htm.js';
import { WorkspaceEditor } from '../components/editor.js';
import type { WebPaneExtension, PaneContext, PaneInstance, PaneCapability } from './pane-types.js';

/**
 * Internal state wrapper that bridges pane contract ↔ Preact component.
 * We render WorkspaceEditor into the container and track its callbacks.
 */
class EditorPaneInstance {
    private container: HTMLElement;
    private currentContent: string;
    private currentMtime: string | undefined;
    private dirty = false;
    private disposed = false;

    private dirtyChangeCb: ((dirty: boolean) => void) | null = null;
    private saveRequestCb: ((content: string) => void) | null = null;
    private closeCb: (() => void) | null = null;

    // Props we pass to WorkspaceEditor — mutated and re-rendered
    private props: {
        path: string;
        content: string;
        loading: boolean;
        error: string | null;
        saving: boolean;
        saveError: string | null;
        savedAt: number | null;
    };

    constructor(container: HTMLElement, context: PaneContext) {
        this.container = container;
        this.currentContent = context.content || '';
        this.currentMtime = context.mtime;

        this.props = {
            path: context.path || '',
            content: this.currentContent,
            loading: false,
            error: null,
            saving: false,
            saveError: null,
            savedAt: null,
        };

        this.render();
    }

    private render() {
        if (this.disposed) return;

        render(html`
            <${WorkspaceEditor}
                path=${this.props.path}
                content=${this.props.content}
                loading=${this.props.loading}
                error=${this.props.error}
                saving=${this.props.saving}
                saveError=${this.props.saveError}
                savedAt=${this.props.savedAt}
                onSave=${(value: string) => {
                    if (this.saveRequestCb) {
                        this.saveRequestCb(value);
                    }
                }}
                onClose=${() => {
                    if (this.closeCb) {
                        this.closeCb();
                    }
                }}
                onDirtyChange=${(isDirty: boolean) => {
                    this.dirty = isDirty;
                    if (this.dirtyChangeCb) {
                        this.dirtyChangeCb(isDirty);
                    }
                }}
            />
        `, this.container);
    }

    // --- PaneInstance interface ---

    getContent(): string | undefined {
        return this.currentContent;
    }

    isDirty(): boolean {
        return this.dirty;
    }

    setContent(content: string, mtime: string): void {
        this.currentContent = content;
        this.currentMtime = mtime;
        this.props.content = content;
        this.dirty = false;
        this.props.saving = false;
        this.props.saveError = null;
        this.render();
    }

    focus(): void {
        // Focus the CodeMirror editor inside the container
        const cm = this.container.querySelector('.cm-editor .cm-content');
        if (cm instanceof HTMLElement) {
            cm.focus();
        }
    }

    resize(): void {
        // CodeMirror handles its own resize via ResizeObserver
    }

    dispose(): void {
        if (this.disposed) return;
        this.disposed = true;
        // Unmount Preact tree
        render(null, this.container);
        this.dirtyChangeCb = null;
        this.saveRequestCb = null;
        this.closeCb = null;
    }

    onDirtyChange(cb: (dirty: boolean) => void): void {
        this.dirtyChangeCb = cb;
    }

    onSaveRequest(cb: (content: string) => void): void {
        this.saveRequestCb = cb;
    }

    onClose(cb: () => void): void {
        this.closeCb = cb;
    }

    // --- Host-side helpers (used by app.ts) ---

    /** Update saving state (called by host during save flow). */
    setSaving(saving: boolean): void {
        this.props.saving = saving;
        this.render();
    }

    /** Update save error (called by host after save failure). */
    setSaveError(error: string | null): void {
        this.props.saveError = error;
        this.render();
    }

    /** Update savedAt timestamp (called by host after successful save). */
    setSavedAt(timestamp: number | null): void {
        this.props.savedAt = timestamp;
        this.render();
    }

    /** Update loading state. */
    setLoading(loading: boolean): void {
        this.props.loading = loading;
        this.render();
    }

    /** Update error state. */
    setError(error: string | null): void {
        this.props.error = error;
        this.render();
    }
}

/**
 * The editor pane extension. Handles all text files.
 * Registered with placement: "tabs".
 */
export const editorPaneExtension: WebPaneExtension = {
    id: 'editor',
    label: 'Editor',
    icon: 'edit',
    capabilities: ['edit'] as PaneCapability[],
    placement: 'tabs',

    canHandle(context: PaneContext): boolean | number {
        // The editor is the default/fallback pane for all text files.
        // Return low priority (1) so specialized viewers can override.
        if (!context.path) return false;
        return 1;
    },

    mount(container: HTMLElement, context: PaneContext): PaneInstance {
        return new EditorPaneInstance(container, context);
    },
};

/** Public type alias for the editor pane instance (used for host-side helpers). */
export type { EditorPaneInstance };
