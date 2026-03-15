// @ts-nocheck
import { html, useCallback, useEffect, useRef, useState } from '../vendor/preact-htm.js';
import { listSessions, createSession, renameSession, deleteSession } from '../api.js';

/**
 * SessionSwitcher – Dropdown component for managing chat sessions.
 *
 * Props:
 *   currentSessionId: string – The active session ID ("default" initially)
 *   onSessionChange: (sessionId: string) => void – Called when user switches sessions
 */
export function SessionSwitcher({ currentSessionId, onSessionChange }) {
    const [sessions, setSessions] = useState([]);
    const [open, setOpen] = useState(false);
    const [creating, setCreating] = useState(false);
    const [newName, setNewName] = useState('');
    const [editingId, setEditingId] = useState(null);
    const [editName, setEditName] = useState('');
    const dropdownRef = useRef(null);
    const inputRef = useRef(null);
    const editInputRef = useRef(null);

    const loadSessions = useCallback(async () => {
        try {
            const data = await listSessions();
            setSessions(data.sessions || []);
        } catch (err) {
            console.error('Failed to load sessions:', err);
        }
    }, []);

    useEffect(() => {
        loadSessions();
    }, [loadSessions]);

    // Close dropdown on outside click
    useEffect(() => {
        if (!open) return;
        const handler = (e) => {
            if (dropdownRef.current && !dropdownRef.current.contains(e.target)) {
                setOpen(false);
                setCreating(false);
                setEditingId(null);
            }
        };
        document.addEventListener('mousedown', handler);
        return () => document.removeEventListener('mousedown', handler);
    }, [open]);

    // Focus input when creating
    useEffect(() => {
        if (creating && inputRef.current) {
            inputRef.current.focus();
        }
    }, [creating]);

    // Focus edit input
    useEffect(() => {
        if (editingId && editInputRef.current) {
            editInputRef.current.focus();
        }
    }, [editingId]);

    const currentSession = sessions.find(s => s.id === currentSessionId);
    const currentName = currentSession?.name || 'Default';

    const handleCreate = useCallback(async () => {
        const name = newName.trim();
        if (!name) return;
        try {
            const data = await createSession(name);
            setNewName('');
            setCreating(false);
            await loadSessions();
            if (data.session) {
                onSessionChange(data.session.id);
            }
        } catch (err) {
            console.error('Failed to create session:', err);
        }
    }, [newName, loadSessions, onSessionChange]);

    const handleRename = useCallback(async (id) => {
        const name = editName.trim();
        if (!name) return;
        try {
            await renameSession(id, name);
            setEditingId(null);
            setEditName('');
            await loadSessions();
        } catch (err) {
            console.error('Failed to rename session:', err);
        }
    }, [editName, loadSessions]);

    const handleDelete = useCallback(async (id) => {
        if (id === 'default') return;
        try {
            await deleteSession(id);
            if (currentSessionId === id) {
                onSessionChange('default');
            }
            await loadSessions();
        } catch (err) {
            console.error('Failed to delete session:', err);
        }
    }, [currentSessionId, onSessionChange, loadSessions]);

    const handleSelect = useCallback((id) => {
        if (id !== currentSessionId) {
            onSessionChange(id);
        }
        setOpen(false);
        setCreating(false);
        setEditingId(null);
    }, [currentSessionId, onSessionChange]);

    return html`
        <div class="session-switcher" ref=${dropdownRef}>
            <button
                class="session-switcher-toggle"
                onClick=${() => { setOpen(!open); if (!open) loadSessions(); }}
                title="Switch session"
            >
                <span class="session-switcher-label">${currentName}</span>
                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                    <path d="M2.5 4.5L6 8L9.5 4.5" stroke="currentColor" stroke-width="1.5" fill="none" stroke-linecap="round" stroke-linejoin="round"/>
                </svg>
            </button>
            ${open && html`
                <div class="session-switcher-dropdown">
                    <div class="session-switcher-list">
                        ${sessions.map(session => html`
                            <div
                                class="session-switcher-item ${session.id === currentSessionId ? 'active' : ''}"
                                key=${session.id}
                            >
                                ${editingId === session.id ? html`
                                    <input
                                        ref=${editInputRef}
                                        class="session-switcher-input"
                                        type="text"
                                        value=${editName}
                                        onInput=${(e) => setEditName(e.target.value)}
                                        onKeyDown=${(e) => {
                                            if (e.key === 'Enter') handleRename(session.id);
                                            if (e.key === 'Escape') { setEditingId(null); setEditName(''); }
                                        }}
                                        placeholder="Session name"
                                    />
                                ` : html`
                                    <button
                                        class="session-switcher-item-button"
                                        onClick=${() => handleSelect(session.id)}
                                    >
                                        <span class="session-name">${session.name}</span>
                                    </button>
                                    <div class="session-switcher-actions">
                                        <button
                                            class="session-action-btn"
                                            onClick=${(e) => { e.stopPropagation(); setEditingId(session.id); setEditName(session.name); }}
                                            title="Rename"
                                        >
                                            <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                                <path d="M8.5 1.5L10.5 3.5L4 10H2V8L8.5 1.5Z" stroke="currentColor" stroke-width="1" fill="none"/>
                                            </svg>
                                        </button>
                                        ${session.id !== 'default' && html`
                                            <button
                                                class="session-action-btn session-action-delete"
                                                onClick=${(e) => { e.stopPropagation(); handleDelete(session.id); }}
                                                title="Delete session"
                                            >
                                                <svg width="12" height="12" viewBox="0 0 12 12" fill="currentColor">
                                                    <path d="M3 3L9 9M9 3L3 9" stroke="currentColor" stroke-width="1.5" stroke-linecap="round"/>
                                                </svg>
                                            </button>
                                        `}
                                    </div>
                                `}
                            </div>
                        `)}
                    </div>
                    <div class="session-switcher-footer">
                        ${creating ? html`
                            <div class="session-switcher-create-form">
                                <input
                                    ref=${inputRef}
                                    class="session-switcher-input"
                                    type="text"
                                    value=${newName}
                                    onInput=${(e) => setNewName(e.target.value)}
                                    onKeyDown=${(e) => {
                                        if (e.key === 'Enter') handleCreate();
                                        if (e.key === 'Escape') { setCreating(false); setNewName(''); }
                                    }}
                                    placeholder="Session name"
                                    maxlength="100"
                                />
                                <button class="session-create-btn" onClick=${handleCreate} disabled=${!newName.trim()}>
                                    Create
                                </button>
                            </div>
                        ` : html`
                            <button class="session-new-btn" onClick=${() => setCreating(true)}>
                                + New Session
                            </button>
                        `}
                    </div>
                </div>
            `}
        </div>
    `;
}
