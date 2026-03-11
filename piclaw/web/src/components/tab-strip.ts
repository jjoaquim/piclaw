// @ts-nocheck
/**
 * tab-strip.ts — Tab strip UI component for the pane system.
 *
 * Renders a horizontal strip of tabs with:
 * - Active tab highlight
 * - Dirty indicator (filled circle)
 * - Close button per tab (× icon, replaced by dirty dot when dirty)
 * - Middle-click to close
 * - Context menu: Close, Close Others, Close All, Pin/Unpin
 * - Keyboard shortcuts: Ctrl+Tab (next), Ctrl+Shift+Tab (prev), Ctrl+W (close)
 */

import { html, useCallback, useEffect, useMemo, useRef, useState } from '../vendor/preact-htm.js';

/**
 * @param {Object} props
 * @param {import('../panes/tab-store.js').TabState[]} props.tabs
 * @param {string|null} props.activeId
 * @param {(id: string) => void} props.onActivate
 * @param {(id: string) => void} props.onClose
 * @param {(id: string) => void} props.onCloseOthers
 * @param {() => void} props.onCloseAll
 * @param {(id: string) => void} props.onTogglePin
 */
export function TabStrip({ tabs, activeId, onActivate, onClose, onCloseOthers, onCloseAll, onTogglePin }) {
    const [contextMenu, setContextMenu] = useState(null);
    const stripRef = useRef(null);

    // Close context menu on outside click or Escape
    useEffect(() => {
        if (!contextMenu) return;
        const dismiss = (e) => {
            if (e.type === 'keydown' && e.key !== 'Escape') return;
            setContextMenu(null);
        };
        document.addEventListener('click', dismiss);
        document.addEventListener('keydown', dismiss);
        return () => {
            document.removeEventListener('click', dismiss);
            document.removeEventListener('keydown', dismiss);
        };
    }, [contextMenu]);

    // Keyboard shortcuts
    useEffect(() => {
        const onKeyDown = (e) => {
            // Ctrl+Tab / Ctrl+Shift+Tab: cycle tabs
            if (e.ctrlKey && e.key === 'Tab') {
                e.preventDefault();
                if (!tabs.length) return;
                const idx = tabs.findIndex(t => t.id === activeId);
                if (e.shiftKey) {
                    const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
                    onActivate?.(prev.id);
                } else {
                    const next = tabs[(idx + 1) % tabs.length];
                    onActivate?.(next.id);
                }
                return;
            }
            // Ctrl+W / Cmd+W: close active tab (only when editor focused)
            if ((e.ctrlKey || e.metaKey) && e.key === 'w') {
                // Only intercept if an editor pane is focused
                const editorPane = document.querySelector('.editor-pane');
                if (editorPane && editorPane.contains(document.activeElement)) {
                    e.preventDefault();
                    if (activeId) onClose?.(activeId);
                }
            }
        };
        document.addEventListener('keydown', onKeyDown);
        return () => document.removeEventListener('keydown', onKeyDown);
    }, [tabs, activeId, onActivate, onClose]);

    const handleTabClick = useCallback((e, id) => {
        // Middle-click to close
        if (e.button === 1) {
            e.preventDefault();
            onClose?.(id);
            return;
        }
        if (e.button === 0) {
            onActivate?.(id);
        }
    }, [onActivate, onClose]);

    const handleContextMenu = useCallback((e, id) => {
        e.preventDefault();
        setContextMenu({ id, x: e.clientX, y: e.clientY });
    }, []);

    const handleCloseClick = useCallback((e, id) => {
        e.stopPropagation();
        onClose?.(id);
    }, [onClose]);

    // Scroll active tab into view
    useEffect(() => {
        if (!activeId || !stripRef.current) return;
        const activeEl = stripRef.current.querySelector('.tab-item.active');
        if (activeEl) {
            activeEl.scrollIntoView({ block: 'nearest', inline: 'nearest', behavior: 'smooth' });
        }
    }, [activeId]);

    if (!tabs.length) return null;

    return html`
        <div class="tab-strip" ref=${stripRef} role="tablist">
            ${tabs.map(tab => html`
                <div
                    key=${tab.id}
                    class=${`tab-item${tab.id === activeId ? ' active' : ''}${tab.dirty ? ' dirty' : ''}${tab.pinned ? ' pinned' : ''}`}
                    role="tab"
                    aria-selected=${tab.id === activeId}
                    title=${tab.path}
                    onMouseDown=${(e) => handleTabClick(e, tab.id)}
                    onContextMenu=${(e) => handleContextMenu(e, tab.id)}
                >
                    ${tab.pinned && html`
                        <span class="tab-pin-icon" aria-label="Pinned">
                            <svg viewBox="0 0 16 16" width="10" height="10" fill="currentColor">
                                <path d="M4.456.734a1.75 1.75 0 0 1 2.826.504l.613 1.327a3.1 3.1 0 0 0 2.084 1.707l2.454.584c1.332.317 1.8 1.972.832 2.94L11.06 10l3.72 3.72a.75.75 0 1 1-1.06 1.06L10 11.06l-2.204 2.205c-.968.968-2.623.5-2.94-.832l-.584-2.454a3.1 3.1 0 0 0-1.707-2.084l-1.327-.613a1.75 1.75 0 0 1-.504-2.826z"/>
                            </svg>
                        </span>
                    `}
                    <span class="tab-label">${tab.label}</span>
                    <span
                        class="tab-close"
                        onClick=${(e) => handleCloseClick(e, tab.id)}
                        title=${tab.dirty ? 'Unsaved changes' : 'Close'}
                        aria-label=${tab.dirty ? 'Unsaved changes' : `Close ${tab.label}`}
                    >
                        ${tab.dirty
                            ? html`<span class="tab-dirty-dot" aria-hidden="true"></span>`
                            : html`<svg viewBox="0 0 16 16" width="12" height="12" fill="none" stroke="currentColor" stroke-width="1.5" stroke-linecap="round">
                                <line x1="4" y1="4" x2="12" y2="12"/>
                                <line x1="12" y1="4" x2="4" y2="12"/>
                            </svg>`
                        }
                    </span>
                </div>
            `)}
        </div>
        ${contextMenu && html`
            <div class="tab-context-menu" style=${{ left: contextMenu.x + 'px', top: contextMenu.y + 'px' }}>
                <button onClick=${() => { onClose?.(contextMenu.id); setContextMenu(null); }}>Close</button>
                <button onClick=${() => { onCloseOthers?.(contextMenu.id); setContextMenu(null); }}>Close Others</button>
                <button onClick=${() => { onCloseAll?.(); setContextMenu(null); }}>Close All</button>
                <hr />
                <button onClick=${() => { onTogglePin?.(contextMenu.id); setContextMenu(null); }}>
                    ${tabs.find(t => t.id === contextMenu.id)?.pinned ? 'Unpin' : 'Pin'}
                </button>
            </div>
        `}
    `;
}
