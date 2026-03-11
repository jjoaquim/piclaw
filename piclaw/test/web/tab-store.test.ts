/**
 * test/web/tab-store.test.ts – Tests for TabStore.
 */

import { describe, expect, test, beforeEach } from "bun:test";

// Inline copy of TabStore (pure logic, no browser deps)

interface TabState {
    id: string;
    label: string;
    path: string;
    dirty: boolean;
    pinned: boolean;
    viewState?: TabViewState;
}

interface TabViewState {
    cursorLine?: number;
    cursorCol?: number;
    scrollTop?: number;
}

type TabChangeListener = (tabs: TabState[], activeId: string | null) => void;

class TabStoreImpl {
    private tabs: Map<string, TabState> = new Map();
    private activeId: string | null = null;
    private mruOrder: string[] = [];
    private listeners: Set<TabChangeListener> = new Set();

    onChange(listener: TabChangeListener): () => void {
        this.listeners.add(listener);
        return () => this.listeners.delete(listener);
    }

    private notify() {
        const tabs = this.getTabs();
        const activeId = this.activeId;
        for (const listener of this.listeners) {
            try { listener(tabs, activeId); } catch {}
        }
    }

    open(path: string, label?: string): TabState {
        let tab = this.tabs.get(path);
        if (!tab) {
            tab = {
                id: path,
                label: label || path.split('/').pop() || path,
                path,
                dirty: false,
                pinned: false,
            };
            this.tabs.set(path, tab);
        }
        this.activate(path);
        return tab;
    }

    activate(id: string): void {
        if (!this.tabs.has(id)) return;
        this.activeId = id;
        this.mruOrder = [id, ...this.mruOrder.filter(x => x !== id)];
        this.notify();
    }

    close(id: string): boolean {
        const tab = this.tabs.get(id);
        if (!tab) return false;
        this.tabs.delete(id);
        this.mruOrder = this.mruOrder.filter(x => x !== id);
        if (this.activeId === id) {
            this.activeId = this.mruOrder[0] || null;
        }
        this.notify();
        return true;
    }

    closeOthers(keepId: string): void {
        for (const [id, tab] of this.tabs) {
            if (id !== keepId && !tab.pinned) {
                this.tabs.delete(id);
                this.mruOrder = this.mruOrder.filter(x => x !== id);
            }
        }
        if (this.activeId && !this.tabs.has(this.activeId)) {
            this.activeId = keepId;
        }
        this.notify();
    }

    closeAll(): void {
        for (const [id, tab] of this.tabs) {
            if (!tab.pinned) {
                this.tabs.delete(id);
                this.mruOrder = this.mruOrder.filter(x => x !== id);
            }
        }
        if (this.activeId && !this.tabs.has(this.activeId)) {
            this.activeId = this.mruOrder[0] || null;
        }
        this.notify();
    }

    setDirty(id: string, dirty: boolean): void {
        const tab = this.tabs.get(id);
        if (!tab || tab.dirty === dirty) return;
        tab.dirty = dirty;
        this.notify();
    }

    togglePin(id: string): void {
        const tab = this.tabs.get(id);
        if (!tab) return;
        tab.pinned = !tab.pinned;
        this.notify();
    }

    saveViewState(id: string, viewState: TabViewState): void {
        const tab = this.tabs.get(id);
        if (tab) tab.viewState = viewState;
    }

    getViewState(id: string): TabViewState | undefined {
        return this.tabs.get(id)?.viewState;
    }

    rename(oldId: string, newPath: string, newLabel?: string): void {
        const tab = this.tabs.get(oldId);
        if (!tab) return;
        this.tabs.delete(oldId);
        tab.id = newPath;
        tab.path = newPath;
        tab.label = newLabel || newPath.split('/').pop() || newPath;
        this.tabs.set(newPath, tab);
        this.mruOrder = this.mruOrder.map(x => x === oldId ? newPath : x);
        if (this.activeId === oldId) this.activeId = newPath;
        this.notify();
    }

    getTabs(): TabState[] { return Array.from(this.tabs.values()); }
    getActiveId(): string | null { return this.activeId; }
    getActive(): TabState | null { return this.activeId ? this.tabs.get(this.activeId) || null : null; }
    get(id: string): TabState | undefined { return this.tabs.get(id); }
    get size(): number { return this.tabs.size; }

    hasUnsaved(): boolean {
        for (const tab of this.tabs.values()) { if (tab.dirty) return true; }
        return false;
    }

    getDirtyTabs(): TabState[] {
        return Array.from(this.tabs.values()).filter(t => t.dirty);
    }

    nextTab(): void {
        const tabs = this.getTabs();
        if (tabs.length <= 1) return;
        const idx = tabs.findIndex(t => t.id === this.activeId);
        const next = tabs[(idx + 1) % tabs.length];
        this.activate(next.id);
    }

    prevTab(): void {
        const tabs = this.getTabs();
        if (tabs.length <= 1) return;
        const idx = tabs.findIndex(t => t.id === this.activeId);
        const prev = tabs[(idx - 1 + tabs.length) % tabs.length];
        this.activate(prev.id);
    }

    mruSwitch(): void {
        if (this.mruOrder.length > 1) {
            this.activate(this.mruOrder[1]);
        }
    }
}

// --- Tests ---

describe('TabStore', () => {
    let store: TabStoreImpl;

    beforeEach(() => {
        store = new TabStoreImpl();
    });

    test('starts empty', () => {
        expect(store.size).toBe(0);
        expect(store.getTabs()).toEqual([]);
        expect(store.getActiveId()).toBeNull();
        expect(store.getActive()).toBeNull();
    });

    describe('open', () => {
        test('opens a new tab and activates it', () => {
            const tab = store.open('/src/app.ts');
            expect(store.size).toBe(1);
            expect(tab.id).toBe('/src/app.ts');
            expect(tab.label).toBe('app.ts');
            expect(tab.dirty).toBe(false);
            expect(tab.pinned).toBe(false);
            expect(store.getActiveId()).toBe('/src/app.ts');
        });

        test('uses custom label when provided', () => {
            const tab = store.open('/src/app.ts', 'Main App');
            expect(tab.label).toBe('Main App');
        });

        test('re-opening same path activates without duplicating', () => {
            store.open('/src/a.ts');
            store.open('/src/b.ts');
            store.open('/src/a.ts');
            expect(store.size).toBe(2);
            expect(store.getActiveId()).toBe('/src/a.ts');
        });

        test('opening multiple tabs keeps all', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.open('/c.ts');
            expect(store.size).toBe(3);
            expect(store.getActiveId()).toBe('/c.ts');
        });
    });

    describe('activate', () => {
        test('activates existing tab', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.activate('/a.ts');
            expect(store.getActiveId()).toBe('/a.ts');
        });

        test('ignores non-existent id', () => {
            store.open('/a.ts');
            store.activate('/nope.ts');
            expect(store.getActiveId()).toBe('/a.ts');
        });
    });

    describe('close', () => {
        test('closes a tab', () => {
            store.open('/a.ts');
            expect(store.close('/a.ts')).toBe(true);
            expect(store.size).toBe(0);
            expect(store.getActiveId()).toBeNull();
        });

        test('returns false for non-existent tab', () => {
            expect(store.close('/nope.ts')).toBe(false);
        });

        test('closing active tab activates MRU', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.open('/c.ts');
            // MRU: c, b, a
            store.activate('/a.ts');
            // MRU: a, c, b
            store.close('/a.ts');
            // Should activate c (next in MRU)
            expect(store.getActiveId()).toBe('/c.ts');
        });

        test('closing non-active tab preserves active', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.close('/a.ts');
            expect(store.getActiveId()).toBe('/b.ts');
        });
    });

    describe('closeOthers', () => {
        test('closes all except specified', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.open('/c.ts');
            store.closeOthers('/b.ts');
            expect(store.size).toBe(1);
            expect(store.get('/b.ts')).toBeDefined();
        });

        test('preserves pinned tabs', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.open('/c.ts');
            store.togglePin('/a.ts');
            store.closeOthers('/c.ts');
            expect(store.size).toBe(2);
            expect(store.get('/a.ts')).toBeDefined();
            expect(store.get('/c.ts')).toBeDefined();
        });
    });

    describe('closeAll', () => {
        test('closes all unpinned tabs', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.open('/c.ts');
            store.closeAll();
            expect(store.size).toBe(0);
            expect(store.getActiveId()).toBeNull();
        });

        test('preserves pinned tabs', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.togglePin('/a.ts');
            store.closeAll();
            expect(store.size).toBe(1);
            expect(store.get('/a.ts')).toBeDefined();
        });
    });

    describe('dirty state', () => {
        test('setDirty marks tab dirty', () => {
            store.open('/a.ts');
            store.setDirty('/a.ts', true);
            expect(store.get('/a.ts')!.dirty).toBe(true);
        });

        test('setDirty to same value is no-op (no extra notification)', () => {
            store.open('/a.ts');
            let count = 0;
            store.onChange(() => count++);
            store.setDirty('/a.ts', false); // already false
            expect(count).toBe(0);
        });

        test('hasUnsaved returns true when any tab is dirty', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            expect(store.hasUnsaved()).toBe(false);
            store.setDirty('/a.ts', true);
            expect(store.hasUnsaved()).toBe(true);
        });

        test('getDirtyTabs returns only dirty tabs', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.setDirty('/a.ts', true);
            const dirty = store.getDirtyTabs();
            expect(dirty.length).toBe(1);
            expect(dirty[0].id).toBe('/a.ts');
        });

        test('setDirty on non-existent tab is no-op', () => {
            store.setDirty('/nope.ts', true);
            expect(store.size).toBe(0);
        });
    });

    describe('pin', () => {
        test('togglePin pins and unpins', () => {
            store.open('/a.ts');
            store.togglePin('/a.ts');
            expect(store.get('/a.ts')!.pinned).toBe(true);
            store.togglePin('/a.ts');
            expect(store.get('/a.ts')!.pinned).toBe(false);
        });

        test('togglePin on non-existent tab is no-op', () => {
            store.togglePin('/nope.ts');
            expect(store.size).toBe(0);
        });
    });

    describe('view state', () => {
        test('save and retrieve view state', () => {
            store.open('/a.ts');
            store.saveViewState('/a.ts', { cursorLine: 42, cursorCol: 10, scrollTop: 500 });
            const vs = store.getViewState('/a.ts');
            expect(vs).toEqual({ cursorLine: 42, cursorCol: 10, scrollTop: 500 });
        });

        test('getViewState for non-existent tab returns undefined', () => {
            expect(store.getViewState('/nope.ts')).toBeUndefined();
        });
    });

    describe('rename', () => {
        test('renames tab path, id, and label', () => {
            store.open('/old.ts');
            store.rename('/old.ts', '/new.ts');
            expect(store.get('/old.ts')).toBeUndefined();
            expect(store.get('/new.ts')).toBeDefined();
            expect(store.get('/new.ts')!.label).toBe('new.ts');
        });

        test('rename updates active id', () => {
            store.open('/old.ts');
            store.rename('/old.ts', '/new.ts');
            expect(store.getActiveId()).toBe('/new.ts');
        });

        test('rename preserves MRU position', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.open('/c.ts');
            store.activate('/b.ts');
            // MRU: b, c, a
            store.rename('/b.ts', '/renamed.ts');
            // Close renamed — should fall back to c
            store.close('/renamed.ts');
            expect(store.getActiveId()).toBe('/c.ts');
        });

        test('rename non-existent tab is no-op', () => {
            store.rename('/nope.ts', '/new.ts');
            expect(store.size).toBe(0);
        });

        test('rename with custom label', () => {
            store.open('/old.ts');
            store.rename('/old.ts', '/new.ts', 'Custom');
            expect(store.get('/new.ts')!.label).toBe('Custom');
        });
    });

    describe('navigation', () => {
        test('nextTab cycles forward', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.open('/c.ts');
            store.activate('/a.ts');
            store.nextTab();
            expect(store.getActiveId()).toBe('/b.ts');
            store.nextTab();
            expect(store.getActiveId()).toBe('/c.ts');
            store.nextTab();
            expect(store.getActiveId()).toBe('/a.ts'); // wraps
        });

        test('prevTab cycles backward', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.open('/c.ts');
            store.activate('/a.ts');
            store.prevTab();
            expect(store.getActiveId()).toBe('/c.ts'); // wraps
        });

        test('nextTab/prevTab with single tab is no-op', () => {
            store.open('/a.ts');
            store.nextTab();
            expect(store.getActiveId()).toBe('/a.ts');
            store.prevTab();
            expect(store.getActiveId()).toBe('/a.ts');
        });

        test('mruSwitch switches to previous MRU tab', () => {
            store.open('/a.ts');
            store.open('/b.ts');
            store.open('/c.ts');
            // MRU: c, b, a
            store.mruSwitch();
            expect(store.getActiveId()).toBe('/b.ts');
            // MRU: b, c, a
            store.mruSwitch();
            expect(store.getActiveId()).toBe('/c.ts');
        });

        test('mruSwitch with single tab is no-op', () => {
            store.open('/a.ts');
            store.mruSwitch();
            expect(store.getActiveId()).toBe('/a.ts');
        });
    });

    describe('onChange', () => {
        test('listener fires on open', () => {
            let fired = false;
            store.onChange(() => { fired = true; });
            store.open('/a.ts');
            expect(fired).toBe(true);
        });

        test('listener receives tabs and activeId', () => {
            let lastTabs: TabState[] = [];
            let lastActive: string | null = null;
            store.onChange((tabs, activeId) => {
                lastTabs = tabs;
                lastActive = activeId;
            });
            store.open('/a.ts');
            expect(lastTabs.length).toBe(1);
            expect(lastActive).toBe('/a.ts');
        });

        test('unsubscribe stops notifications', () => {
            let count = 0;
            const unsub = store.onChange(() => count++);
            store.open('/a.ts');
            expect(count).toBe(1);
            unsub();
            store.open('/b.ts');
            expect(count).toBe(1);
        });

        test('listener exception does not break other listeners', () => {
            let ok = false;
            store.onChange(() => { throw new Error('boom'); });
            store.onChange(() => { ok = true; });
            store.open('/a.ts');
            expect(ok).toBe(true);
        });
    });
});
