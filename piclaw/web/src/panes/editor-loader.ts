// @ts-nocheck
/**
 * editor-loader.ts — Lazy-loading wrapper for the standalone editor extension.
 *
 * Registered with the pane registry immediately (low priority fallback).
 * On first mount(), dynamically imports editor.bundle.js which contains
 * CodeMirror + the real StandaloneEditorInstance. This keeps ~900KB of
 * CodeMirror out of the core app.bundle.js.
 *
 * The returned PaneInstance shows a loading state while the bundle loads,
 * then swaps in the real editor. All contract methods are proxied.
 */

import type { WebPaneExtension, PaneContext, PaneInstance, PaneCapability } from './pane-types.js';

/** Cache the import promise so we only load once. */
let editorModulePromise: Promise<any> | null = null;
let editorModuleCache: any = null;

function loadEditorModule(): Promise<any> {
    if (editorModuleCache) return Promise.resolve(editorModuleCache);
    if (!editorModulePromise) {
        editorModulePromise = import('/static/dist/editor.bundle.js')
            .then((mod) => {
                editorModuleCache = mod;
                return mod;
            })
            .catch((err) => {
                editorModulePromise = null; // retry on next attempt
                throw err;
            });
    }
    return editorModulePromise;
}

/**
 * Proxy PaneInstance that shows a loading spinner while the editor bundle
 * loads, then delegates to the real StandaloneEditorInstance.
 */
class LazyEditorInstance implements PaneInstance {
    private container: HTMLElement;
    private context: PaneContext;
    private real: PaneInstance | null = null;
    private disposed = false;
    private loadingEl: HTMLElement;

    // Queued callbacks — registered before real instance exists
    private queuedDirtyCb: ((dirty: boolean) => void) | null = null;
    private queuedSaveCb: ((content: string) => void) | null = null;
    private queuedCloseCb: (() => void) | null = null;
    private queuedViewStateCb: ((s: any) => void) | null = null;
    private queuedViewState: any = null;

    constructor(container: HTMLElement, context: PaneContext) {
        this.container = container;
        this.context = context;

        // Show loading UI
        this.loadingEl = document.createElement('div');
        this.loadingEl.className = 'editor-pane';
        this.loadingEl.innerHTML = `
            <div class="editor-body">
                <div class="editor-status" style="padding: 2em; text-align: center; color: var(--text-secondary);">Loading editor…</div>
            </div>
        `;
        container.appendChild(this.loadingEl);

        // Load the real editor
        this.load();
    }

    private escapeHtml(s: string): string {
        const d = document.createElement('div');
        d.textContent = s;
        return d.innerHTML;
    }

    private async load(): Promise<void> {
        try {
            const mod = await loadEditorModule();
            if (this.disposed) return;

            // Remove loading UI
            if (this.loadingEl.parentNode) {
                this.loadingEl.remove();
            }

            // Create real instance
            this.real = new mod.StandaloneEditorInstance(this.container, this.context);

            // Replay queued callbacks
            if (this.queuedDirtyCb && this.real.onDirtyChange) {
                this.real.onDirtyChange(this.queuedDirtyCb);
            }
            if (this.queuedSaveCb && this.real.onSaveRequest) {
                this.real.onSaveRequest(this.queuedSaveCb);
            }
            if (this.queuedCloseCb && this.real.onClose) {
                this.real.onClose(this.queuedCloseCb);
            }
            if (this.queuedViewStateCb && typeof this.real.onViewStateChange === 'function') {
                this.real.onViewStateChange(this.queuedViewStateCb);
            }
            if (this.queuedViewState && typeof this.real.restoreViewState === 'function') {
                requestAnimationFrame(() => this.real?.restoreViewState?.(this.queuedViewState));
            }
        } catch (err) {
            if (this.disposed) return;
            console.error('[editor-loader] Failed to load editor bundle:', err);
            this.loadingEl.querySelector('.editor-status')!.textContent =
                'Failed to load editor. Check console for details.';
        }
    }

    // ── PaneInstance contract (proxy to real or queue) ───────────

    getContent(): string | undefined {
        return this.real?.getContent();
    }

    isDirty(): boolean {
        return this.real?.isDirty() || false;
    }

    setContent(content: string, mtime: string): void {
        if (this.real?.setContent) {
            this.real.setContent(content, mtime);
        }
    }

    focus(): void {
        this.real?.focus();
    }

    resize(): void {
        this.real?.resize?.();
    }

    dispose(): void {
        if (this.disposed) return;
        this.disposed = true;
        if (this.real) {
            this.real.dispose();
            this.real = null;
        }
        this.container.innerHTML = '';
        this.queuedDirtyCb = null;
        this.queuedSaveCb = null;
        this.queuedCloseCb = null;
        this.queuedViewStateCb = null;
    }

    onDirtyChange(cb: (dirty: boolean) => void): void {
        this.queuedDirtyCb = cb;
        if (this.real?.onDirtyChange) this.real.onDirtyChange(cb);
    }

    onSaveRequest(cb: (content: string) => void): void {
        this.queuedSaveCb = cb;
        if (this.real?.onSaveRequest) this.real.onSaveRequest(cb);
    }

    onClose(cb: () => void): void {
        this.queuedCloseCb = cb;
        if (this.real?.onClose) this.real.onClose(cb);
    }

    // ── Extended methods ────────────────────────────────────────

    onViewStateChange(cb: (s: any) => void): void {
        this.queuedViewStateCb = cb;
        if (this.real && typeof (this.real as any).onViewStateChange === 'function') {
            (this.real as any).onViewStateChange(cb);
        }
    }

    restoreViewState(viewState: any): void {
        this.queuedViewState = viewState;
        if (this.real && typeof (this.real as any).restoreViewState === 'function') {
            (this.real as any).restoreViewState(viewState);
        }
    }

    getPath(): string {
        if (this.real && typeof (this.real as any).getPath === 'function') {
            return (this.real as any).getPath();
        }
        return this.context.path || '';
    }

    setPath(newPath: string): void {
        if (this.real && typeof (this.real as any).setPath === 'function') {
            (this.real as any).setPath(newPath);
        }
    }
}

// ── Extension registration ──────────────────────────────────────

/**
 * Lazy-loading editor pane extension.
 * Handles all text files (low priority fallback).
 * Loads CodeMirror on first mount, not on page load.
 */
export const editorPaneExtension: WebPaneExtension = {
    id: 'editor',
    label: 'Editor',
    icon: 'edit',
    capabilities: ['edit'] as PaneCapability[],
    placement: 'tabs',

    canHandle(context: PaneContext): boolean | number {
        if (!context.path) return false;
        if (context.mode !== 'edit') return false;
        return 1; // low priority — specialized editors override
    },

    mount(container: HTMLElement, context: PaneContext): PaneInstance {
        return new LazyEditorInstance(container, context);
    },
};

/**
 * Preload the editor bundle in the background (call after initial page render).
 * This ensures the editor loads instantly when the user first opens a file.
 */
export function preloadEditorBundle(): void {
    loadEditorModule().catch(() => {}); // fire and forget
}
