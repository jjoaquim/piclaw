// @ts-nocheck
import { html, useEffect, useRef, useState } from '../vendor/preact-htm.js';
import { getMediaInfo, getMediaUrl, getThumbnailUrl } from '../api.js';
import { renderMarkdown, renderMermaidDiagrams } from '../markdown.js';
import { formatCount, formatFileSize, formatTime, formatTimestamp } from '../utils/format.js';
import { DEFAULT_AGENT_NAME, getAvatarInfo } from '../ui/agent-utils.js';
import { ImageModal } from './image-modal.js';

/**
 * File attachment component - displays downloadable file with icon
 */
function FileAttachment({ mediaId }) {
    const [info, setInfo] = useState(null);

    useEffect(() => {
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

/**
 * Render annotations (audience/priority/lastModified)
 */
function AnnotationsBadge({ annotations }) {
    if (!annotations) return null;
    const { audience, priority, lastModified } = annotations;
    const formattedLastModified = lastModified ? formatTimestamp(lastModified) : null;
    return html`
        <div class="content-annotations">
            ${audience && audience.length > 0 && html`
                <span class="content-annotation">Audience: ${audience.join(', ')}</span>
            `}
            ${typeof priority === 'number' && html`
                <span class="content-annotation">Priority: ${priority}</span>
            `}
            ${formattedLastModified && html`
                <span class="content-annotation">Updated: ${formattedLastModified}</span>
            `}
        </div>
    `;
}

/**
 * Resource link block (MCP/ACP)
 */
function ResourceLinkBlock({ block }) {
    const name = block.title || block.name || block.uri;
    const description = block.description;
    const sizeStr = block.size ? formatFileSize(block.size) : '';
    const mimeType = block.mime_type || '';
    const icon = getMimeIcon(mimeType);
    return html`
        <a href=${block.uri} class="resource-link" target="_blank" rel="noopener noreferrer" onClick=${(e) => e.stopPropagation()}>
            <div class="resource-link-main">
                <div class="resource-link-header">
                    <span class="resource-link-icon-inline">${icon}</span>
                    <div class="resource-link-title">${name}</div>
                </div>
                ${description && html`<div class="resource-link-description">${description}</div>`}
                <div class="resource-link-meta">
                    ${mimeType && html`<span>${mimeType}</span>`}
                    ${sizeStr && html`<span>${sizeStr}</span>`}
                </div>
            </div>
            <div class="resource-link-icon">↗</div>
        </a>
    `;
}

/**
 * Embedded resource block (MCP/ACP)
 */
function ResourceBlock({ block }) {
    const [open, setOpen] = useState(false);
    const title = block.uri || 'Embedded resource';
    const contentText = block.text || '';
    const hasBlob = Boolean(block.data);
    const mimeType = block.mime_type || '';
    return html`
        <div class="resource-embed">
            <button class="resource-embed-toggle" onClick=${(e) => { e.preventDefault(); e.stopPropagation(); setOpen(!open); }}>
                ${open ? '▼' : '▶'} ${title}
            </button>
            ${open && html`
                ${contentText && html`<pre class="resource-embed-content">${contentText}</pre>`}
                ${hasBlob && html`
                    <div class="resource-embed-blob">
                        <span class="resource-embed-blob-label">Embedded blob</span>
                        ${mimeType && html`<span class="resource-embed-blob-meta">${mimeType}</span>`}
                        <button class="resource-embed-blob-btn" onClick=${(e) => {
                            e.preventDefault();
                            e.stopPropagation();
                            const blob = new Blob([Uint8Array.from(atob(block.data), c => c.charCodeAt(0))], { type: mimeType || 'application/octet-stream' });
                            const url = URL.createObjectURL(blob);
                            const a = document.createElement('a');
                            a.href = url;
                            a.download = title.split('/').pop() || 'resource';
                            a.click();
                            URL.revokeObjectURL(url);
                        }}>Download</button>
                    </div>
                `}
            `}
        </div>
    `;
}

function getMimeIcon(mimeType) {
    if (!mimeType) return '📎';
    if (mimeType.startsWith('image/')) return '🖼️';
    if (mimeType.startsWith('audio/')) return '🎵';
    if (mimeType.startsWith('video/')) return '🎬';
    if (mimeType.includes('pdf')) return '📄';
    if (mimeType.includes('zip') || mimeType.includes('gzip')) return '🗜️';
    if (mimeType.startsWith('text/')) return '📄';
    return '📎';
}

/**
 * Link preview component - card with image background
 */
function LinkPreview({ preview }) {
    const bgStyle = preview.image
        ? `background-image: url('${preview.image}')`
        : '';

    return html`
        <a href=${preview.url} class="link-preview ${preview.image ? 'has-image' : ''}" target="_blank" rel="noopener noreferrer" onClick=${(e) => e.stopPropagation()} style=${bgStyle}>
            <div class="link-preview-overlay">
                <div class="link-preview-site">${preview.site_name || new URL(preview.url).hostname}</div>
                <div class="link-preview-title">${preview.title}</div>
                ${preview.description && html`
                    <div class="link-preview-description">${preview.description}</div>
                `}
            </div>
        </a>
    `;
}

/**
 * Remove URLs from text that have previews, but only if at the end
 */
function removePreviewedUrls(text, linkPreviews) {
    if (!linkPreviews?.length) return text;

    let result = text;
    for (const preview of linkPreviews) {
        const escapedUrl = preview.url.replace(/[.*+?^${}()|[\]\\]/g, '\\$&');
        // Only remove URL if it's at the end of the text (with optional trailing whitespace)
        result = result.replace(new RegExp(escapedUrl + '\\s*$', ''), '');
    }
    return result.trim();
}

/**
 * Single post component
 */
export function Post({ post, onClick, onHashtagClick, agentName, agentAvatarUrl, onDelete, isThreadReply }) {
    const [zoomedImage, setZoomedImage] = useState(null);
    const contentRef = useRef(null);

    const data = post.data;
    const isAgent = data.type === 'agent_response';
    const displayName = isAgent ? (agentName || DEFAULT_AGENT_NAME) : 'You';

    // Get avatar info based on the name
    const avatarInfo = isAgent ? getAvatarInfo(agentName, agentAvatarUrl) : getAvatarInfo('You');

    const contentMeta = data.content_meta;
    const isTruncated = Boolean(contentMeta?.truncated);
    const truncatedInfo = isTruncated
        ? {
            originalLength: Number.isFinite(contentMeta?.original_length)
                ? contentMeta.original_length
                : (data.content ? data.content.length : 0),
            maxLength: Number.isFinite(contentMeta?.max_length) ? contentMeta.max_length : 0,
        }
        : null;

    // Remove URLs that have previews from the displayed content
    let displayContent = removePreviewedUrls(data.content, data.link_previews);
    const shouldRenderContent = Boolean(displayContent) && !isTruncated;

    const handleImageClick = (e, mediaId) => {
        e.stopPropagation();
        setZoomedImage(getMediaUrl(mediaId));
    };

    const handleDeleteClick = (e) => {
        e.stopPropagation();
        onDelete?.(post);
    };

    const resolveInlineAttachments = (content, attachments) => {
        const usedIds = new Set();
        if (!content || attachments.length === 0) {
            return { content, usedIds };
        }

        const replaced = content.replace(/attachment:([^\s)"']+)/g, (match, rawRef) => {
            const ref = rawRef.replace(/^\/+/, '');
            const byName = attachments.find(
                (entry) => entry.name && entry.name.toLowerCase() === ref.toLowerCase() && !usedIds.has(entry.id)
            );
            const entry = byName || attachments.find((item) => !usedIds.has(item.id));
            if (!entry) return match;
            usedIds.add(entry.id);
            return `/media/${entry.id}`;
        });

        return { content: replaced, usedIds };
    };

    // Separate images from files using content_blocks info
    const imageItems = [];
    const fileIds = [];
    const attachmentEntries = [];
    const resourceLinks = [];
    const resources = [];
    const textAnnotations = [];
    const blocks = data.content_blocks || [];
    const mediaIds = data.media_ids || [];
    let mediaIndex = 0;

    if (blocks.length > 0) {
        blocks.forEach((block) => {
            if (block?.type === 'text' && block.annotations) {
                textAnnotations.push(block.annotations);
            }
            if (block?.type === 'resource_link') {
                resourceLinks.push(block);
            } else if (block?.type === 'resource') {
                resources.push(block);
            } else if (block?.type === 'file') {
                const id = mediaIds[mediaIndex++];
                if (id) {
                    fileIds.push(id);
                    attachmentEntries.push({ id, name: block?.name || block?.filename || block?.title });
                }
            } else if (block?.type === 'image' || !block?.type) {
                const id = mediaIds[mediaIndex++];
                if (id) {
                    imageItems.push({ id, annotations: block?.annotations });
                    attachmentEntries.push({ id, name: block?.name || block?.filename || block?.title });
                }
            }
        });
    } else if (mediaIds.length > 0) {
        mediaIds.forEach((id) => {
            imageItems.push({ id, annotations: null });
            attachmentEntries.push({ id, name: null });
        });
    }

    const { content: resolvedContent, usedIds } = resolveInlineAttachments(displayContent, attachmentEntries);
    displayContent = resolvedContent;
    const filteredImageItems = imageItems.filter(({ id }) => !usedIds.has(id));
    const filteredFileIds = fileIds.filter((id) => !usedIds.has(id));

    // Render mermaid diagrams after content is mounted
    useEffect(() => {
        if (contentRef.current) {
            renderMermaidDiagrams(contentRef.current);
        }
    }, [displayContent]);

    return html`
        <div id=${`post-${post.id}`} class="post ${isAgent ? 'agent-post' : ''} ${isThreadReply ? 'thread-reply' : ''}" onClick=${onClick}>
            <div class="post-avatar ${isAgent ? 'agent-avatar' : ''} ${avatarInfo.image ? 'has-image' : ''}" style="background-color: ${avatarInfo.color}">
                ${avatarInfo.image ? html`<img src=${avatarInfo.image} alt=${displayName} />` : avatarInfo.letter}
            </div>
            <div class="post-body">
                <button
                    class="post-delete-btn"
                    type="button"
                    title="Delete message"
                    aria-label="Delete message"
                    onClick=${handleDeleteClick}
                >
                    <svg viewBox="0 0 24 24" aria-hidden="true" focusable="false">
                        <path d="M18 6L6 18M6 6l12 12" />
                    </svg>
                </button>
                <div class="post-meta">
                    <span class="post-author">${displayName}</span>
                    <span class="post-time">${formatTime(post.timestamp)}</span>
                </div>
                ${isTruncated && truncatedInfo && html`
                    <div class="post-content truncated">
                        <div class="truncated-title">Message too large to display.</div>
                        <div class="truncated-meta">
                            Original length: ${formatCount(truncatedInfo.originalLength)} chars
                            ${truncatedInfo.maxLength ? html` • Display limit: ${formatCount(truncatedInfo.maxLength)} chars` : ''}
                        </div>
                    </div>
                `}
                ${shouldRenderContent && html`
                    <div 
                        ref=${contentRef}
                        class="post-content"
                        dangerouslySetInnerHTML=${{ __html: renderMarkdown(displayContent, onHashtagClick) }}
                        onClick=${(e) => {
                            if (e.target.classList.contains('hashtag')) {
                                e.preventDefault();
                                e.stopPropagation();
                                const tag = e.target.dataset.hashtag;
                                if (tag) onHashtagClick?.(tag);
                            } else if (e.target.tagName === 'IMG') {
                                e.preventDefault();
                                e.stopPropagation();
                                setZoomedImage(e.target.src);
                            }
                        }}
                    />
                `}
                ${textAnnotations.length > 0 && html`
                    ${textAnnotations.map((annotations, idx) => html`
                        <${AnnotationsBadge} key=${idx} annotations=${annotations} />
                    `)}
                `}
                ${filteredImageItems.length > 0 && html`
                    <div class="media-preview">
                        ${filteredImageItems.map(({ id }) => html`
                            <img 
                                key=${id} 
                                src=${getThumbnailUrl(id)} 
                                alt="Media" 
                                loading="lazy"
                                onClick=${(e) => handleImageClick(e, id)}
                            />
                        `)}
                    </div>
                `}
                ${filteredImageItems.length > 0 && html`
                    ${filteredImageItems.map(({ annotations }, idx) => html`
                        ${annotations && html`<${AnnotationsBadge} key=${idx} annotations=${annotations} />`}
                    `)}
                `}
                ${filteredFileIds.length > 0 && html`
                    <div class="file-attachments">
                        ${filteredFileIds.map(id => html`
                            <${FileAttachment} key=${id} mediaId=${id} />
                        `)}
                    </div>
                `}
                ${resourceLinks.length > 0 && html`
                    <div class="resource-links">
                        ${resourceLinks.map((block, idx) => html`
                            <div key=${idx}>
                                <${ResourceLinkBlock} block=${block} />
                                <${AnnotationsBadge} annotations=${block.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${resources.length > 0 && html`
                    <div class="resource-embeds">
                        ${resources.map((block, idx) => html`
                            <div key=${idx}>
                                <${ResourceBlock} block=${block} />
                                <${AnnotationsBadge} annotations=${block.annotations} />
                            </div>
                        `)}
                    </div>
                `}
                ${data.link_previews?.length > 0 && html`
                    <div class="link-previews">
                        ${data.link_previews.map((preview, i) => html`
                            <${LinkPreview} key=${i} preview=${preview} />
                        `)}
                    </div>
                `}
            </div>
        </div>
        ${zoomedImage && html`<${ImageModal} src=${zoomedImage} onClose=${() => setZoomedImage(null)} />`}
    `;
}
