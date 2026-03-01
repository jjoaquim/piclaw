// @ts-nocheck
import { html, useEffect, useMemo, useRef, useState } from '../vendor/preact-htm.js';
import {
    attachWorkspaceFile,
    getMediaInfo,
    getMediaUrl,
    getWorkspaceFile,
    getWorkspaceRawUrl,
    getWorkspaceTree,
} from '../api.js';
import { formatFileSize, formatTimestamp } from '../utils/format.js';
import { renderMarkdown } from '../markdown.js';

const ROW_HEIGHT = 22;
const TREE_WIDTH = 260;
const INDENT = 18;
const REFRESH_INTERVAL_MS = 15000;

function FileAttachmentCard({ mediaId }) {
    const [info, setInfo] = useState(null);

    useEffect(() => {
        if (!mediaId) return;
        getMediaInfo(mediaId).then(setInfo).catch(() => {});
    }, [mediaId]);

    if (!info) return null;

    const filename = info.filename || 'file';
    const size = info.metadata?.size;
    const sizeStr = size ? formatFileSize(size) : '';

    return html`
        <a href=${getMediaUrl(mediaId)} download=${filename} class="file-attachment" onClick=${(e) => e.stopPropagation()}>
            <svg class="file-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
                <polyline points="14 2 14 8 20 8"/>
                <line x1="16" y1="13" x2="8" y2="13"/>
                <line x1="16" y1="17" x2="8" y2="17"/>
                <polyline points="10 9 9 9 8 9"/>
            </svg>
            <div class="file-info">
                <span class="file-name">${filename}</span>
                ${sizeStr && html`<span class="file-size">${sizeStr}</span>`}
            </div>
            <svg class="download-icon" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2">
                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                <polyline points="7 10 12 15 17 10"/>
                <line x1="12" y1="15" x2="12" y2="3"/>
            </svg>
        </a>
    `;
}

function flattenTree(node, expanded, depth = 0, rows = []) {
    if (!node) return rows;
    rows.push({ node, depth });
    if (node.type === 'dir' && node.children && expanded.has(node.path)) {
        node.children.forEach((child) => flattenTree(child, expanded, depth + 1, rows));
    }
    return rows;
}

function treeSignature(node) {
    if (!node) return '';
    const walk = (item) => ({
        path: item.path,
        type: item.type,
        children: item.children ? item.children.map(walk) : null,
    });
    return JSON.stringify(walk(node));
}

function mergeTree(prev, next) {
    if (!next) return next;
    if (!prev) return next;
    if (prev.path !== next.path || prev.type !== next.type) return next;

    const prevChildren = Array.isArray(prev.children) ? prev.children : null;
    const nextChildren = Array.isArray(next.children) ? next.children : null;

    if (!nextChildren) {
        return prevChildren ? { ...next, children: undefined } : prev;
    }

    const prevMap = new Map();
    if (prevChildren) {
        prevChildren.forEach((child) => {
            if (child?.path) prevMap.set(child.path, child);
        });
    }

    let changed = false;
    const mergedChildren = nextChildren.map((child) => {
        const merged = mergeTree(prevMap.get(child.path), child);
        if (merged !== prevMap.get(child.path)) changed = true;
        return merged;
    });

    if (!prevChildren || prevChildren.length !== mergedChildren.length) {
        changed = true;
    } else {
        for (let i = 0; i < mergedChildren.length; i += 1) {
            if (mergedChildren[i] !== prevChildren[i]) {
                changed = true;
                break;
            }
        }
    }

    if (!changed) return prev;
    return { ...next, children: mergedChildren };
}

function iconPath(type) {
    if (type === 'dir') {
        return html`<path d="M3 7a2 2 0 0 1 2-2h4l2 2h8a2 2 0 0 1 2 2v8a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2z" />`;
    }
    return html`
        <path d="M14 2H6a2 2 0 0 0-2 2v16a2 2 0 0 0 2 2h12a2 2 0 0 0 2-2V8z"/>
        <polyline points="14 2 14 8 20 8"/>
    `;
}

export function WorkspaceExplorer({ onFileSelect }) {
    const [tree, setTree] = useState(null);
    const [expanded, setExpanded] = useState(new Set(['.']));
    const [selectedPath, setSelectedPath] = useState(null);
    const [preview, setPreview] = useState(null);
    const [downloadId, setDownloadId] = useState(null);
    const [loadingTree, setLoadingTree] = useState(false);
    const [loadingPreview, setLoadingPreview] = useState(false);
    const [error, setError] = useState(null);
    const lastTreeRef = useRef('');
    const pendingTreeRef = useRef(null);
    const treeRafRef = useRef(0);

    const loadTree = async () => {
        const initialLoad = !tree;
        if (initialLoad) {
            setLoadingTree(true);
        }
        try {
            const data = await getWorkspaceTree('', 3);
            const signature = treeSignature(data.root);
            if (signature && signature !== lastTreeRef.current) {
                lastTreeRef.current = signature;
                pendingTreeRef.current = data.root;
                if (!treeRafRef.current) {
                    treeRafRef.current = requestAnimationFrame(() => {
                        treeRafRef.current = 0;
                        setTree((prev) => mergeTree(prev, pendingTreeRef.current));
                    });
                }
            }
            if (data.root?.path) {
                setExpanded((prev) => {
                    if (prev.has(data.root.path)) return prev;
                    const next = new Set(prev);
                    next.add(data.root.path);
                    return next;
                });
            }
            setError((prev) => (prev ? null : prev));
        } catch (err) {
            setError(err.message || 'Failed to load workspace');
        } finally {
            if (initialLoad) setLoadingTree(false);
        }
    };

    const loadPreview = async (path) => {
        setLoadingPreview(true);
        setPreview(null);
        setDownloadId(null);
        try {
            const data = await getWorkspaceFile(path, 20000);
            setPreview(data);
        } catch (err) {
            setPreview({ error: err.message || 'Failed to load preview' });
        } finally {
            setLoadingPreview(false);
        }
    };

    useEffect(() => {
        loadTree();
        const timer = setInterval(loadTree, REFRESH_INTERVAL_MS);
        return () => {
            clearInterval(timer);
            if (treeRafRef.current) {
                cancelAnimationFrame(treeRafRef.current);
                treeRafRef.current = 0;
            }
        };
    }, []);

    const rows = useMemo(() => flattenTree(tree, expanded), [tree, expanded]);
    const svgHeight = Math.max(rows.length * ROW_HEIGHT + 12, 120);

    const handleToggle = (node) => {
        if (node.type !== 'dir') return;
        setExpanded((prev) => {
            const next = new Set(prev);
            if (next.has(node.path)) next.delete(node.path);
            else next.add(node.path);
            return next;
        });
    };

    const handleSelect = (node) => {
        if (node.type === 'dir') {
            handleToggle(node);
            return;
        }
        setSelectedPath(node.path);
        onFileSelect?.(node.path, node);
        loadPreview(node.path);
    };

    const handleDownload = async () => {
        if (!selectedPath) return;
        try {
            const res = await attachWorkspaceFile(selectedPath);
            if (res.media_id) setDownloadId(res.media_id);
        } catch (err) {
            setPreview((prev) => ({ ...(prev || {}), error: err.message || 'Failed to attach file' }));
        }
    };

    return html`
        <aside class="workspace-sidebar">
            <div class="workspace-header">
                <span>Workspace</span>
                <button class="workspace-refresh" onClick=${loadTree} title="Refresh">
                    <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2.5" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                        <circle cx="12" cy="12" r="8.5" stroke-dasharray="42 12" stroke-dashoffset="6" transform="rotate(35 12 12)" />
                        <polyline points="23 4 23 10 17 10" />
                    </svg>
                </button>
            </div>
            <div class="workspace-tree">
                ${loadingTree && !tree && html`<div class="workspace-loading">Loading…</div>`}
                ${error && html`<div class="workspace-error">${error}</div>`}
                ${!loadingTree && tree && html`
                    <svg class="workspace-tree-svg" viewBox=${`0 0 ${TREE_WIDTH} ${svgHeight}`} width="100%" height=${svgHeight}>
                        ${rows.map((row, idx) => {
                            const node = row.node;
                            const depth = row.depth;
                            const y = idx * ROW_HEIGHT + 12;
                            const x = 8 + depth * INDENT;
                            const isSelected = node.path === selectedPath;
                            const isDir = node.type === 'dir';
                            const expandedDir = isDir && expanded.has(node.path);
                            const caret = isDir ? (expandedDir ? 'down' : 'right') : null;
                            const caretSize = 12;
                            const caretWidth = caretSize;
                            const caretY = y - caretSize / 2 - 1;
                            const iconSlot = 20;
                            const iconSize = isDir ? 20 : 16;
                            const iconX = x + caretWidth + (iconSlot - iconSize) / 2;
                            const iconY = y - iconSize / 2 - (isDir ? 1 : 0);
                            const textX = x + caretWidth + iconSlot + 4;
                            return html`
                                <g key=${node.path} class="workspace-row" onClick=${() => handleSelect(node)}>
                                    <rect x="0" y=${y - 14} width=${TREE_WIDTH} height=${ROW_HEIGHT} class=${`workspace-row-bg ${isSelected ? 'selected' : ''}`} />
                                    ${caret && html`
                                        <svg class="workspace-caret-icon" x=${x} y=${caretY} width=${caretSize} height=${caretSize} viewBox="0 0 12 12" aria-hidden="true">
                                            ${caret === 'down'
                                                ? html`<polygon points="1 2 11 2 6 11" />`
                                                : html`<polygon points="2 1 11 6 2 11" />`
                                            }
                                        </svg>
                                    `}
                                    <svg
                                        class=${`workspace-icon ${isDir ? 'folder' : 'file'}`}
                                        x=${iconX}
                                        y=${iconY}
                                        width=${iconSize}
                                        height=${iconSize}
                                        viewBox="0 0 24 24"
                                        fill="none"
                                        stroke="currentColor"
                                        stroke-width="2"
                                        stroke-linecap="round"
                                        stroke-linejoin="round"
                                    >
                                        ${iconPath(node.type)}
                                    </svg>
                                    <text class="workspace-label" x=${textX} y=${y}>${node.name}</text>
                                </g>
                            `;
                        })}
                    </svg>
                `}
            </div>
            ${selectedPath && html`
                <div class="workspace-preview">
                    <div class="workspace-preview-header">
                        <span class="workspace-preview-title">${selectedPath}</span>
                        <button class="workspace-download" onClick=${handleDownload} title="Download">
                            <svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round" aria-hidden="true">
                                <path d="M21 15v4a2 2 0 0 1-2 2H5a2 2 0 0 1-2-2v-4"/>
                                <polyline points="7 10 12 15 17 10"/>
                                <line x1="12" y1="15" x2="12" y2="3"/>
                            </svg>
                        </button>
                    </div>
                    ${loadingPreview && html`<div class="workspace-loading">Loading preview…</div>`}
                    ${preview?.error && html`<div class="workspace-error">${preview.error}</div>`}
                    ${preview && !preview.error && html`
                        <div class="workspace-preview-meta">
                            ${preview.size ? html`<span>${formatFileSize(preview.size)}</span>` : ''}
                            ${preview.mtime ? html`<span>${formatTimestamp(preview.mtime)}</span>` : ''}
                            ${preview.truncated ? html`<span>truncated</span>` : ''}
                        </div>
                        ${preview.kind === 'image' && html`
                            <div class="workspace-preview-image">
                                <img src=${preview.url || getWorkspaceRawUrl(preview.path)} alt="preview" />
                            </div>
                        `}
                        ${preview.kind === 'text' && html`
                            ${preview.content_type === 'text/markdown'
                                ? html`<div class="workspace-preview-text" dangerouslySetInnerHTML=${{ __html: renderMarkdown(preview.text || '') }} />`
                                : html`<pre class="workspace-preview-text"><code>${preview.text || ''}</code></pre>`
                            }
                        `}
                        ${preview.kind === 'binary' && html`
                            <div class="workspace-preview-text">Binary file. Download to view.</div>
                        `}
                    `}
                    ${downloadId && html`<div class="workspace-download-card"><${FileAttachmentCard} mediaId=${downloadId} /></div>`}
                </div>
            `}
        </aside>
    `;
}
