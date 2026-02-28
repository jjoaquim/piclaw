// @ts-nocheck
import { html, render, useState, useEffect, useCallback, useRef } from './vendor/preact-htm.js';
import { getTimeline, getPostsByHashtag, searchPosts, deletePost, getAgents, SSEClient } from './api.js';
import { ComposeBox } from './components/compose-box.js';
import { AgentRequestModal, AgentStatus, ConnectionStatus } from './components/status.js';
import { Timeline } from './components/timeline.js';

function readSilenceOverride(key, fallback) {
    try {
        if (typeof window === 'undefined') return fallback;
        const overrides = window.__PICLAW_SILENCE || {};
        const directKey = `__PICLAW_SILENCE_${key.toUpperCase()}_MS`;
        const raw = overrides[key] ?? window[directKey];
        const value = Number(raw);
        return Number.isFinite(value) ? value : fallback;
    } catch {
        return fallback;
    }
}

const SILENCE_WARNING_MS = readSilenceOverride('warning', 30_000);
const SILENCE_FINALIZE_MS = readSilenceOverride('finalize', 120_000);
const SILENCE_REFRESH_MS = readSilenceOverride('refresh', 30_000);

// Configure marked for safe rendering
if (window.marked) {
    marked.setOptions({
        breaks: true,  // Convert \n to <br>
        gfm: true,     // GitHub Flavored Markdown
    });
}

function buildAgentsMap(data) {
    const map = {};
    (data?.agents || []).forEach((agent) => {
        map[agent.id] = agent;
    });
    return map;
}

/**
 * Detect iOS devices for layout adjustments.
 */
function isIOSDevice() {
    if (/iPad|iPhone/.test(navigator.userAgent)) {
        return true;
    }
    // iPadOS Safari (desktop mode) reports as MacIntel with touch points.
    return navigator.platform === 'MacIntel' && navigator.maxTouchPoints > 1;
}

/**
 * Hook to force re-render for updating timestamps
 */
function useTimestampRefresh(intervalMs = 30000) {
    const [, setTick] = useState(0);
    
    useEffect(() => {
        const timer = setInterval(() => setTick(t => t + 1), intervalMs);
        return () => clearInterval(timer);
    }, [intervalMs]);
}

/**
 * Update browser theme color (affects mobile chrome and PWA title bar)
 */
function updateThemeColor(dark) {
    const color = dark ? '#000000' : '#ffffff';
    let meta = document.querySelector('meta[name="theme-color"]');
    if (meta) {
        meta.setAttribute('content', color);
    }
}

const dedupePosts = (items) => {
    const seen = new Set();
    return (items || []).filter((post) => {
        if (!post || seen.has(post.id)) return false;
        seen.add(post.id);
        return true;
    });
};

/**
 * Main App component
 */
function App() {
    const [posts, setPosts] = useState(null);
    const [hasMore, setHasMore] = useState(false);
    const [connectionStatus, setConnectionStatus] = useState('disconnected');
    const [currentHashtag, setCurrentHashtag] = useState(null);
    const [searchQuery, setSearchQuery] = useState(null);
    const [searchOpen, setSearchOpen] = useState(false);
    const [agentStatus, setAgentStatus] = useState(null);
    const [agentDraft, setAgentDraft] = useState({ text: '', totalLines: 0 });
    const [agentPlan, setAgentPlan] = useState('');
    const [agentThought, setAgentThought] = useState({ text: '', totalLines: 0 });
    const [pendingRequest, setPendingRequest] = useState(null);
    const [currentTurnId, setCurrentTurnId] = useState(null);
    const [agents, setAgents] = useState({});
    const hasConnectedOnceRef = useRef(false);
    const viewStateRef = useRef({ currentHashtag: null, searchQuery: null });
    const hasMoreRef = useRef(false);
    const loadMoreRef = useRef(null);
    const timelineRef = useRef(null);
    const lastAgentEventRef = useRef(null);
    const lastSilenceNoticeRef = useRef(0);
    const isAgentRunningRef = useRef(false);
    const draftBufferRef = useRef('');
    const pendingRequestRef = useRef(null);
    const stalledPostIdRef = useRef(null);
    const currentTurnIdRef = useRef(null);
    
    // Refresh timestamps every 30 seconds
    useTimestampRefresh(30000);

    const noteAgentActivity = useCallback((options = {}) => {
        const now = Date.now();
        lastAgentEventRef.current = now;
        if (options.running) {
            isAgentRunningRef.current = true;
        }
        if (options.clearSilence) {
            lastSilenceNoticeRef.current = 0;
        }
    }, []);

    const clearAgentRunState = useCallback(() => {
        isAgentRunningRef.current = false;
        lastAgentEventRef.current = null;
        lastSilenceNoticeRef.current = 0;
        draftBufferRef.current = '';
        pendingRequestRef.current = null;
        currentTurnIdRef.current = null;
        setCurrentTurnId(null);
    }, [setCurrentTurnId]);

    const setActiveTurn = useCallback((turnId) => {
        if (!turnId) return;
        if (currentTurnIdRef.current === turnId) return;
        currentTurnIdRef.current = turnId;
        setCurrentTurnId(turnId);
        draftBufferRef.current = '';
        setAgentDraft({ text: '', totalLines: 0 });
        setAgentPlan('');
        setAgentThought({ text: '', totalLines: 0 });
        setPendingRequest(null);
        pendingRequestRef.current = null;
    }, [setCurrentTurnId]);

    const removeStalledPost = useCallback(() => {
        const stalledId = stalledPostIdRef.current;
        if (!stalledId) return;
        setPosts((prev) => (prev ? prev.filter((post) => post.id !== stalledId) : prev));
        stalledPostIdRef.current = null;
    }, []);

    // Scroll to bottom of timeline (column-reverse: bottom is scrollTop=0)
    const scrollToBottomRef = useRef(null);
    const scrollToBottom = useCallback(() => {
        if (timelineRef.current) {
            timelineRef.current.scrollTop = 0;
        }
    }, []);
    scrollToBottomRef.current = scrollToBottom;

    const finalizeStalledResponse = useCallback(() => {
        if (!isAgentRunningRef.current) return;
        isAgentRunningRef.current = false;
        lastSilenceNoticeRef.current = 0;
        lastAgentEventRef.current = null;
        currentTurnIdRef.current = null;
        setCurrentTurnId(null);

        const partial = (draftBufferRef.current || '').trim();
        draftBufferRef.current = '';
        setAgentDraft({ text: '', totalLines: 0 });
        setAgentPlan('');
        setAgentThought({ text: '', totalLines: 0 });
        setPendingRequest(null);
        pendingRequestRef.current = null;

        if (!partial) {
            setAgentStatus({ type: 'error', title: 'Response stalled — No content received' });
            return;
        }

        const warning = '\n\n⚠️ Response may be incomplete — the model stopped responding';
        const content = `${partial}${warning}`;
        const id = Date.now();
        const timestamp = new Date().toISOString();
        const localPost = {
            id,
            timestamp,
            data: {
                type: 'agent_response',
                content,
                agent_id: 'default',
                is_local_stall: true,
            },
        };

        stalledPostIdRef.current = id;
        setPosts((prev) => (prev ? dedupePosts([...prev, localPost]) : [localPost]));
        scrollToBottomRef.current?.();
        setAgentStatus(null);
    }, [setCurrentTurnId]);
    
    useEffect(() => {
        viewStateRef.current = { currentHashtag, searchQuery };
    }, [currentHashtag, searchQuery]);

    useEffect(() => {
        hasMoreRef.current = hasMore;
    }, [hasMore]);

    useEffect(() => {
        const intervalMs = Math.min(1000, Math.max(100, Math.floor(SILENCE_WARNING_MS / 2)));
        const interval = setInterval(() => {
            if (!isAgentRunningRef.current) return;
            if (pendingRequestRef.current) return;
            const lastEvent = lastAgentEventRef.current;
            if (!lastEvent) return;
            const now = Date.now();
            const silenceMs = now - lastEvent;

            if (silenceMs >= SILENCE_FINALIZE_MS) {
                finalizeStalledResponse();
                return;
            }

            if (silenceMs >= SILENCE_WARNING_MS) {
                if (now - lastSilenceNoticeRef.current >= SILENCE_REFRESH_MS) {
                    const seconds = Math.floor(silenceMs / 1000);
                    setAgentStatus({
                        type: 'waiting',
                        title: `Waiting for model… No events for ${seconds}s`,
                    });
                    lastSilenceNoticeRef.current = now;
                }
            }
        }, intervalMs);

        return () => clearInterval(interval);
    }, [finalizeStalledResponse]);

    
    // Load timeline or hashtag posts
    const loadPosts = useCallback(async (hashtag = null) => {
        try {
            if (hashtag) {
                const result = await getPostsByHashtag(hashtag);
                setPosts(result.posts);
                setHasMore(false);
            } else {
                const result = await getTimeline(10);
                setPosts(result.posts);
                setHasMore(result.has_more);
            }
        } catch (error) {
            console.error('Failed to load posts:', error);
        }
    }, []);

    const handleConnectionStatusChange = useCallback((status) => {
        setConnectionStatus(status);
        if (status !== 'connected') {
            setAgentStatus(null);
            setAgentDraft({ text: '', totalLines: 0 });
            setAgentPlan('');
            setAgentThought({ text: '', totalLines: 0 });
            setPendingRequest(null);
            pendingRequestRef.current = null;
            clearAgentRunState();
            return;
        }
        if (!hasConnectedOnceRef.current) {
            hasConnectedOnceRef.current = true;
            return;
        }
        const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current;
        if (!activeHashtag && !activeSearch) {
            loadPosts();
        }
    }, [clearAgentRunState, loadPosts]);
    
    // Load older messages (prepend)
    const loadMore = useCallback(async () => {
        if (!posts || posts.length === 0) return;
        
        // Find oldest post id
        const sortedPosts = posts.slice().sort((a, b) => a.id - b.id);
        const oldestId = sortedPosts[0].id;
        
        console.log('Loading more before id:', oldestId);
        try {
            const result = await getTimeline(5, oldestId);
            console.log('Loaded:', result.posts.length, 'has_more:', result.has_more);
            if (result.posts.length > 0) {
                setPosts(prev => dedupePosts([...result.posts, ...(prev || [])]));
                setHasMore(result.has_more);
            } else {
                setHasMore(false);
            }
        } catch (error) {
            console.error('Failed to load more posts:', error);
        }
    }, [posts, timelineRef]);

    useEffect(() => {
        loadMoreRef.current = loadMore;
    }, [loadMore]);
    
    // Handle hashtag click
    const handleHashtagClick = useCallback(async (hashtag) => {
        setCurrentHashtag(hashtag);
        setPosts(null); // Show loading
        try {
            const result = await getPostsByHashtag(hashtag);
            setPosts(result.posts);
            setHasMore(false);
        } catch (error) {
            console.error('Failed to load hashtag posts:', error);
        }
    }, []);
    
    // Go back to timeline
    const handleBackToTimeline = useCallback(async () => {
        setCurrentHashtag(null);
        setSearchQuery(null);
        setPosts(null);
        try {
            const result = await getTimeline(10);
            setPosts(result.posts);
            setHasMore(result.has_more);
        } catch (error) {
            console.error('Failed to load timeline:', error);
        }
    }, []);

    // Handle search
    const handleSearch = useCallback(async (query) => {
        if (!query || !query.trim()) return;
        setSearchQuery(query.trim());
        setCurrentHashtag(null);
        setPosts(null);
        try {
            const result = await searchPosts(query.trim());
            setPosts(result.results);
            setHasMore(false);
        } catch (error) {
            console.error('Failed to search:', error);
            setPosts([]);
        }
    }, []);
    
    const enterSearchMode = useCallback(() => {
        setSearchOpen(true);
        setSearchQuery(null);
        setCurrentHashtag(null);
        setPosts([]);
    }, []);
    
    const exitSearchMode = useCallback(() => {
        setSearchOpen(false);
        setSearchQuery(null);
        loadPosts();
    }, [loadPosts]);

    const navigateToSearchResult = useCallback(() => {}, []);

    const handleDeletePost = useCallback(async (post) => {
        if (!post) return;
        const postId = post.id;
        const replyCount = posts?.filter((item) => item?.data?.thread_id === postId).length || 0;
        if (replyCount > 0) {
            const confirmed = window.confirm(`Delete this message and its ${replyCount} replies?`);
            if (!confirmed) return;
        }
        try {
            const result = await deletePost(postId, replyCount > 0);
            if (result?.ids?.length) {
                setPosts((prev) => prev ? prev.filter((item) => !result.ids.includes(item.id)) : prev);
                if (hasMore) {
                    await loadMore();
                }
            }
        } catch (error) {
            const errorMessage = error?.message || '';
            if (replyCount === 0 && errorMessage.includes('Replies exist')) {
                const confirmed = window.confirm('Delete this message and its replies?');
                if (!confirmed) return;
                const result = await deletePost(postId, true);
                if (result?.ids?.length) {
                    setPosts((prev) => prev ? prev.filter((item) => !result.ids.includes(item.id)) : prev);
                    if (hasMore) {
                        await loadMore();
                    }
                }
                return;
            }
            console.error('Failed to delete post:', error);
            alert(`Failed to delete message: ${errorMessage}`);
        }
    }, [hasMore, loadMore, posts]);

    const loadAgents = useCallback(async () => {
        try {
            const data = await getAgents();
            setAgents(buildAgentsMap(data));
        } catch (e) {
            console.warn('Failed to load agents:', e);
        }
    }, []);

    useEffect(() => {
        loadAgents();
    }, [loadAgents]);

    const updateAgentProfile = useCallback((payload) => {
        if (!payload || typeof payload !== 'object') return;
        const agentId = payload.agent_id;
        if (!agentId) return;
        const nextName = payload.agent_name;
        const nextAvatar = payload.agent_avatar;
        if (!nextName && nextAvatar === undefined) return;

        setAgents((prev) => {
            const current = prev[agentId] || { id: agentId };
            const updated = { ...current };
            let changed = false;

            if (nextName && nextName !== current.name) {
                updated.name = nextName;
                changed = true;
            }

            if (nextAvatar !== undefined) {
                const normalizedAvatar = typeof nextAvatar === 'string' ? nextAvatar.trim() : null;
                const currentAvatar = current.avatar_url ?? current.avatarUrl ?? current.avatar;
                const normalizedCurrent = typeof currentAvatar === 'string' ? currentAvatar.trim() : null;
                if (normalizedAvatar !== normalizedCurrent) {
                    updated.avatar_url = normalizedAvatar || null;
                    changed = true;
                }
            }

            if (!changed) return prev;
            return { ...prev, [agentId]: updated };
        });
    }, []);

    const handleSseEvent = useCallback((eventType, data) => {
        const turnId = data?.turn_id;

        updateAgentProfile(data);

        // Handle agent status updates
        if (eventType === 'connected') {
            setAgentStatus(null);
            setAgentDraft({ text: '', totalLines: 0 });
            setAgentPlan('');
            setAgentThought({ text: '', totalLines: 0 });
            setPendingRequest(null);
            pendingRequestRef.current = null;
            clearAgentRunState();
            return;
        }

        if (eventType === 'agent_status') {
            console.log('Agent status:', data);
            if (data.type === 'done' || data.type === 'error') {
                if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                    return;
                }
                clearAgentRunState();
                setAgentStatus(null);
                setAgentDraft({ text: '', totalLines: 0 });
                setAgentPlan('');
                setAgentThought({ text: '', totalLines: 0 });
                setPendingRequest(null);
            } else {
                if (turnId) setActiveTurn(turnId);
                noteAgentActivity({ running: true, clearSilence: true });
                if (data.type === 'thinking') {
                    draftBufferRef.current = '';
                    setAgentDraft({ text: '', totalLines: 0 });
                    setAgentPlan('');
                    setAgentThought({ text: '', totalLines: 0 });
                }
                setAgentStatus(data);
            }
            return;
        }

        if (eventType === 'agent_draft_delta') {
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            if (turnId && !currentTurnIdRef.current) {
                setActiveTurn(turnId);
            }
            noteAgentActivity({ running: true, clearSilence: true });
            if (data?.reset) {
                draftBufferRef.current = '';
            }
            if (data?.delta) {
                draftBufferRef.current += data.delta;
            }
            return;
        }

        if (eventType === 'agent_draft') {
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            if (turnId && !currentTurnIdRef.current) {
                setActiveTurn(turnId);
            }
            noteAgentActivity({ running: true, clearSilence: true });
            const text = data.text || '';
            const mode = data.mode || (data.kind === 'plan' ? 'replace' : 'append');
            const inferredTotal = Number.isFinite(data.total_lines)
                ? data.total_lines
                : (text ? text.replace(/\r\n/g, '\n').split('\n').length : 0);

            if (data.kind === 'plan') {
                if (mode === 'replace') setAgentPlan(text);
                else setAgentPlan((prev) => (prev || '') + text);
            } else {
                setAgentDraft({ text, totalLines: inferredTotal });
            }
            return;
        }

        if (eventType === 'agent_thought') {
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            if (turnId && !currentTurnIdRef.current) {
                setActiveTurn(turnId);
            }
            noteAgentActivity({ running: true, clearSilence: true });
            const text = data.text || '';
            const inferredTotal = Number.isFinite(data.total_lines)
                ? data.total_lines
                : (text ? text.replace(/\r\n/g, '\n').split('\n').length : 0);
            setAgentThought({ text, totalLines: inferredTotal });
            return;
        }

        // Handle agent requests (permission, choices)
        if (eventType === 'agent_request') {
            console.log('Agent request:', data);
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            if (turnId) setActiveTurn(turnId);
            noteAgentActivity({ running: true, clearSilence: true });
            setPendingRequest(data);
            pendingRequestRef.current = data;
            return;
        }

        if (eventType === 'agent_request_timeout') {
            console.log('Agent request timeout:', data);
            if (turnId && currentTurnIdRef.current && turnId !== currentTurnIdRef.current) {
                return;
            }
            setPendingRequest(null);
            pendingRequestRef.current = null;
            clearAgentRunState();
            setAgentStatus({ type: 'error', title: 'Permission request timed out' });
            return;
        }

        // Add new posts/replies to timeline (only when on main timeline) - append at end for chat style
        const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current;
        if (eventType === 'agent_response') {
            removeStalledPost();
        }
        if (!activeHashtag && !activeSearch && (eventType === 'new_post' || eventType === 'agent_response')) {
            setPosts(prev => {
                if (!prev) return [data];
                if (prev.some((post) => post.id === data.id)) return prev;
                return [...prev, data];
            });
            scrollToBottomRef.current?.();
        }
        // Update existing post (e.g., when link previews are fetched)
        if (eventType === 'interaction_updated') {
            setPosts(prev => prev ? prev.map(p => p.id === data.id ? data : p) : prev);
        }
        if (eventType === 'interaction_deleted') {
            const ids = data?.ids || [];
            if (ids.length) {
                setPosts(prev => prev ? prev.filter(p => !ids.includes(p.id)) : prev);
                const { currentHashtag: activeHashtag, searchQuery: activeSearch } = viewStateRef.current;
                if (hasMoreRef.current && !activeHashtag && !activeSearch) {
                    loadMoreRef.current?.();
                }
            }
        }
    }, [clearAgentRunState, noteAgentActivity, removeStalledPost, setActiveTurn, updateAgentProfile]);

    useEffect(() => {
        if (typeof window === 'undefined') return;
        const api = window.__PICLAW_TEST_API || {};
        api.emit = handleSseEvent;
        api.reset = () => {
            removeStalledPost();
            clearAgentRunState();
            setAgentStatus(null);
            setAgentDraft({ text: '', totalLines: 0 });
            setAgentPlan('');
            setAgentThought({ text: '', totalLines: 0 });
            setPendingRequest(null);
        };
        api.finalize = () => finalizeStalledResponse();
        window.__PICLAW_TEST_API = api;
        return () => {
            if (window.__PICLAW_TEST_API === api) {
                window.__PICLAW_TEST_API = undefined;
            }
        };
    }, [clearAgentRunState, finalizeStalledResponse, handleSseEvent, removeStalledPost]);

    // Set up SSE connection
    useEffect(() => {
        loadPosts();

        const sse = new SSEClient(handleSseEvent, handleConnectionStatusChange);

        sse.connect();

        const handleWindowFocus = () => {
            sse.reconnectIfNeeded();
        };
        window.addEventListener('focus', handleWindowFocus);
        document.addEventListener('visibilitychange', handleWindowFocus);

        return () => {
            window.removeEventListener('focus', handleWindowFocus);
            document.removeEventListener('visibilitychange', handleWindowFocus);
            sse.disconnect();
        };
    }, [handleConnectionStatusChange, handleSseEvent, loadPosts]);
    
    return html`
        <div class="container">
            ${searchQuery && isIOSDevice() && html`<div class="search-results-spacer"></div>`}
            ${(currentHashtag || searchQuery) && html`
                <div class="hashtag-header">
                    <button class="back-btn" onClick=${handleBackToTimeline}>
                        <svg width="20" height="20" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2"><path d="M19 12H5M12 19l-7-7 7-7"/></svg>
                    </button>
                    <span>${currentHashtag ? `#${currentHashtag}` : `Search: ${searchQuery}`}</span>
                </div>
            `}
            <${Timeline} 
                posts=${posts}
                hasMore=${hasMore}
                onLoadMore=${loadMore}
                timelineRef=${timelineRef}
                onHashtagClick=${handleHashtagClick}
                onPostClick=${undefined}
                onDeletePost=${handleDeletePost}
                emptyMessage=${currentHashtag ? `No posts with #${currentHashtag}` : searchQuery ? `No results for "${searchQuery}"` : undefined}
                agents=${agents}
                reverse=${!(searchQuery && !currentHashtag)}
            />
            <${AgentStatus}
                status=${agentStatus}
                draft=${agentDraft}
                plan=${agentPlan}
                thought=${agentThought}
                pendingRequest=${pendingRequest}
                turnId=${currentTurnId}
            />
            <${ComposeBox} 
                onPost=${() => { loadPosts(); scrollToBottom(); }}
                onFocus=${scrollToBottom}
                searchMode=${searchOpen}
                onSearch=${handleSearch}
                onEnterSearch=${enterSearchMode}
                onExitSearch=${exitSearchMode}
            />
            <${ConnectionStatus} status=${connectionStatus} />
            <${AgentRequestModal}
                request=${pendingRequest}
                onRespond=${() => {
                    setPendingRequest(null);
                    pendingRequestRef.current = null;
                }}
            />
        </div>
    `;
}

// Mount the app
render(html`<${App} />`, document.getElementById('app'));
