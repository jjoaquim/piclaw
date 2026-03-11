// @ts-nocheck
/**
 * use-editor-state.ts — Custom hook encapsulating editor file state.
 *
 * Manages: open/loading/saving/error state, dirty tracking, file
 * load/reload/save, tab orchestration, view state cache, and
 * workspace-update SSE integration.
 *
 * Extracted from app.ts to keep the main component focused on layout.
 */

import { useState, useCallback, useMemo, useEffect } from '../vendor/preact-htm.js';
import { getWorkspaceFile, updateWorkspaceFile } from '../api.js';
import { paneRegistry, tabStore } from '../panes/index.js';

/** Maximum file size the editor will load (256 KB). */
const EDITOR_MAX_BYTES = 256 * 1024;

/** Default (closed) editor state. */
const CLOSED_STATE = Object.freeze({ open: false, path: null, content: '', loading: false, error: null, mtime: null, size: null });

/** Recursively find a workspace tree node by path. */
function findNodeByPath(node, targetPath) {
    if (!node) return null;
    if (node.path === targetPath) return node;
    const children = Array.isArray(node.children) ? node.children : null;
    if (!children) return null;
    for (const child of children) {
        const found = findNodeByPath(child, targetPath);
        if (found) return found;
    }
    return null;
}

/**
 * Custom hook that owns all editor-related state and handlers.
 *
 * @returns Editor state, handlers, tab strip state, and helpers.
 */
export function useEditorState() {
    // ── Core state ──────────────────────────────────────────────
    const [editorState, setEditorState] = useState(CLOSED_STATE);
    const [editorSaving, setEditorSaving] = useState(false);
    const [editorSaveError, setEditorSaveError] = useState(null);
    const [editorSavedAt, setEditorSavedAt] = useState(null);
    const [editorDirty, setEditorDirty] = useState(false);

    // ── Tab strip state (driven by tabStore) ────────────────────
    const [tabStripTabs, setTabStripTabs] = useState(() => tabStore.getTabs());
    const [tabStripActiveId, setTabStripActiveId] = useState(() => tabStore.getActiveId());
    useEffect(() => {
        return tabStore.onChange((tabs, activeId) => {
            setTabStripTabs(tabs);
            setTabStripActiveId(activeId);
        });
    }, []);

    // ── Helpers ─────────────────────────────────────────────────

    /** Reset save indicators. */
    const resetSaveState = useCallback(() => {
        setEditorSaveError(null);
        setEditorSavedAt(null);
    }, []);

    /** Apply loaded file data to editor state. */
    const applyEditorPayload = useCallback((path, data) => {
        if (data?.error) {
            setEditorState({ open: true, path, content: '', loading: false, error: data.error, mtime: null, size: null });
            return false;
        }
        if (data?.kind && data.kind !== 'text') {
            setEditorState({ open: true, path, content: '', loading: false, error: 'File is not editable', mtime: data.mtime, size: data.size });
            return false;
        }
        setEditorState({
            open: true,
            path,
            content: data?.text || '',
            loading: false,
            error: null,
            mtime: data?.mtime || null,
            size: data?.size || null,
        });
        return true;
    }, []);

    /** Load a file into the editor. */
    const loadEditorFile = useCallback(async (path) => {
        const data = await getWorkspaceFile(path, EDITOR_MAX_BYTES, 'edit');
        applyEditorPayload(path, data);
    }, [applyEditorPayload]);

    /** Reload the current file from disk (with dirty confirmation). */
    const reloadEditorFromDisk = useCallback(async (path) => {
        setEditorState((prev) => ({ ...prev, loading: true, error: null }));
        let data;
        try {
            data = await getWorkspaceFile(path, EDITOR_MAX_BYTES, 'edit');
        } catch (err) {
            setEditorState((prev) => ({ ...prev, loading: false, error: err.message || 'Failed to reload file' }));
            return;
        }
        if (data?.error || (data?.kind && data.kind !== 'text')) {
            applyEditorPayload(path, data);
            return;
        }
        const nextMtime = data?.mtime || null;
        if (nextMtime && editorState.mtime && nextMtime === editorState.mtime) {
            setEditorState((prev) => ({ ...prev, loading: false }));
            return;
        }
        if (editorDirty) {
            const confirmReload = window.confirm('This file changed on disk. Reload and discard local changes?');
            if (!confirmReload) {
                setEditorState((prev) => ({ ...prev, loading: false }));
                return;
            }
        }
        resetSaveState();
        setEditorDirty(false);
        applyEditorPayload(path, data);
    }, [applyEditorPayload, editorDirty, editorState.mtime, resetSaveState]);

    // ── Tab + editor actions ────────────────────────────────────

    /** Switch UI to a tab (or close if no tabs). */
    const switchToTab = useCallback((tab) => {
        if (tab) {
            resetSaveState();
            setEditorDirty(tab.dirty);
            setEditorState({ open: true, path: tab.path, content: '', loading: true, error: null, mtime: null, size: null });
            loadEditorFile(tab.path).catch(() => {});
        } else {
            setEditorState(CLOSED_STATE);
            resetSaveState();
            setEditorDirty(false);
        }
    }, [loadEditorFile, resetSaveState]);

    /** Open a file in the editor (with pane routing). */
    const openEditor = useCallback(async (path) => {
        if (!path) return;
        const context = { path, mode: 'edit' };
        let pane;
        try {
            pane = paneRegistry.resolve(context);
        } catch (err) {
            console.warn(`[openEditor] paneRegistry.resolve() error for "${path}":`, err);
        }
        if (!pane) {
            pane = paneRegistry.get('editor');
            if (!pane) {
                console.warn(`[openEditor] No pane handler for: ${path}`);
                return;
            }
        }
        tabStore.open(path);
        resetSaveState();
        setEditorDirty(false);
        setEditorState({ open: true, path, content: '', loading: true, error: null, mtime: null, size: null });
        try {
            await loadEditorFile(path);
        } catch (err) {
            setEditorState({ open: true, path, content: '', loading: false, error: err.message || 'Failed to load file', mtime: null, size: null });
        }
    }, [loadEditorFile, resetSaveState]);

    /** Close the active tab (with dirty confirmation). */
    const closeEditor = useCallback(() => {
        const activeId = tabStore.getActiveId();
        if (activeId) {
            const tab = tabStore.get(activeId);
            if (tab?.dirty) {
                const confirmed = window.confirm(`"${tab.label}" has unsaved changes. Close anyway?`);
                if (!confirmed) return;
            }
            tabStore.close(activeId);
        }
        switchToTab(tabStore.getActive());
    }, [switchToTab]);

    /** Close a specific tab (from tab strip). */
    const handleTabClose = useCallback((id) => {
        const tab = tabStore.get(id);
        if (tab?.dirty) {
            const confirmed = window.confirm(`"${tab.label}" has unsaved changes. Close anyway?`);
            if (!confirmed) return;
        }
        const isActive = tabStore.getActiveId() === id;
        tabStore.close(id);
        if (isActive) switchToTab(tabStore.getActive());
    }, [switchToTab]);

    /** Activate a tab by id. */
    const handleTabActivate = useCallback((id) => {
        if (id === editorState.path) return;
        tabStore.activate(id);
        resetSaveState();
        setEditorDirty(false);
        setEditorState({ open: true, path: id, content: '', loading: true, error: null, mtime: null, size: null });
        loadEditorFile(id).catch((err) => {
            setEditorState({ open: true, path: id, content: '', loading: false, error: err.message || 'Failed to load file', mtime: null, size: null });
        });
    }, [loadEditorFile, editorState.path, resetSaveState]);

    /** Close all other tabs. */
    const handleTabCloseOthers = useCallback((id) => {
        tabStore.closeOthers(id);
        if (tabStore.getActiveId() !== editorState.path) {
            handleTabActivate(id);
        }
    }, [editorState.path, handleTabActivate]);

    /** Close all tabs. */
    const handleTabCloseAll = useCallback(() => {
        tabStore.closeAll();
        if (!tabStore.getActive()) {
            setEditorState(CLOSED_STATE);
            resetSaveState();
            setEditorDirty(false);
        }
    }, [resetSaveState]);

    /** Toggle pin on a tab. */
    const handleTabTogglePin = useCallback((id) => {
        tabStore.togglePin(id);
    }, []);

    /** Handle dirty state change from editor component. */
    const handleEditorDirtyChange = useCallback((dirty) => {
        setEditorDirty(dirty);
        const activeId = tabStore.getActiveId();
        if (activeId) tabStore.setDirty(activeId, dirty);
    }, []);

    /** Save view state (cursor, scroll) to tab store. */
    const handleViewStateChange = useCallback((viewState) => {
        const activeId = tabStore.getActiveId();
        if (activeId) tabStore.saveViewState(activeId, viewState);
    }, []);

    /** Get initial view state for active tab. */
    const activeViewState = useMemo(() => {
        return editorState.path ? tabStore.getViewState(editorState.path) : undefined;
    }, [editorState.path]);

    /** Save file content. */
    const handleEditorSave = useCallback(async (value) => {
        if (!editorState?.path || editorSaving) return;
        setEditorSaving(true);
        setEditorSaveError(null);
        try {
            const result = await updateWorkspaceFile(editorState.path, value);
            setEditorState((prev) => ({
                ...prev,
                content: value,
                mtime: result?.mtime || prev.mtime,
                size: result?.size || prev.size,
            }));
            setEditorSavedAt(Date.now());
        } catch (err) {
            setEditorSaveError(err.message || 'Failed to save file');
        } finally {
            setEditorSaving(false);
        }
    }, [editorState?.path, editorSaving]);

    // ── SSE workspace-update listener ───────────────────────────
    useEffect(() => {
        if (typeof window === 'undefined') return;
        const handleWorkspaceUpdate = (event) => {
            if (!editorState.open || !editorState.path || editorState.loading) return;
            const updates = event?.detail?.updates || [];
            if (!Array.isArray(updates) || updates.length === 0) return;
            const targetPath = editorState.path;
            let nextMtime = null;
            let sawMatch = false;
            for (const update of updates) {
                if (!update?.root) continue;
                const updatePath = update.path || '.';
                const matches = updatePath === '.' || targetPath === updatePath || targetPath.startsWith(`${updatePath}/`);
                if (!matches) continue;
                sawMatch = true;
                const node = findNodeByPath(update.root, targetPath);
                if (node && node.type === 'file') {
                    nextMtime = node.mtime || null;
                    break;
                }
            }
            if (!sawMatch) return;
            if (nextMtime && editorState.mtime && nextMtime === editorState.mtime) return;
            if (!nextMtime) {
                reloadEditorFromDisk(targetPath);
                return;
            }
            if (editorDirty) {
                const confirmReload = window.confirm('This file changed on disk. Reload and discard local changes?');
                if (!confirmReload) return;
            }
            resetSaveState();
            setEditorDirty(false);
            setEditorState((prev) => ({ ...prev, loading: true, error: null }));
            loadEditorFile(targetPath).catch((err) => {
                setEditorState((prev) => ({
                    ...prev,
                    loading: false,
                    error: err.message || 'Failed to reload file',
                }));
            });
        };
        window.addEventListener('workspace-update', handleWorkspaceUpdate);
        return () => window.removeEventListener('workspace-update', handleWorkspaceUpdate);
    }, [editorState.open, editorState.path, editorState.mtime, editorState.loading, editorDirty, loadEditorFile, reloadEditorFromDisk, resetSaveState]);

    // ── SSE rename sync ─────────────────────────────────────────
    useEffect(() => {
        const handleFileRenamed = (e) => {
            const { oldPath, newPath, type } = e.detail || {};
            if (!oldPath || !newPath) return;
            if (type === 'dir') {
                for (const tab of tabStore.getTabs()) {
                    if (tab.path === oldPath || tab.path.startsWith(`${oldPath}/`)) {
                        const updatedPath = `${newPath}${tab.path.slice(oldPath.length)}`;
                        tabStore.rename(tab.id, updatedPath);
                    }
                }
            } else {
                tabStore.rename(oldPath, newPath);
            }
        };
        window.addEventListener('workspace-file-renamed', handleFileRenamed);
        return () => window.removeEventListener('workspace-file-renamed', handleFileRenamed);
    }, []);

    // ── Warn on close with unsaved changes ──────────────────────
    useEffect(() => {
        const handleBeforeUnload = (e) => {
            if (tabStore.hasUnsaved()) {
                e.preventDefault();
                e.returnValue = '';
            }
        };
        window.addEventListener('beforeunload', handleBeforeUnload);
        return () => window.removeEventListener('beforeunload', handleBeforeUnload);
    }, []);

    // ── Reveal active tab in workspace explorer ─────────────────
    const revealInExplorer = useCallback(() => {
        const activeId = tabStore.getActiveId();
        if (activeId) {
            window.dispatchEvent(new CustomEvent('workspace-reveal-path', { detail: { path: activeId } }));
        }
    }, []);

    return {
        // State
        editorState,
        editorSaving,
        editorSaveError,
        editorSavedAt,
        editorDirty,
        // Tab strip
        tabStripTabs,
        tabStripActiveId,
        activeViewState,
        // Handlers
        openEditor,
        closeEditor,
        handleEditorSave,
        handleEditorDirtyChange,
        handleViewStateChange,
        handleTabClose,
        handleTabActivate,
        handleTabCloseOthers,
        handleTabCloseAll,
        handleTabTogglePin,
        revealInExplorer,
        // Internals (for editor width init)
        loadEditorFile,
    };
}
