// @ts-nocheck
import { useCallback, useEffect, useRef, useState } from '../vendor/preact-htm.js';
import { getTimeline, getPostsByHashtag } from '../api.js';
import { dedupePosts } from './timeline-utils.js';

export function useTimeline({ preserveTimelineScroll, preserveTimelineScrollTop, sessionId = null }) {
  const [posts, setPosts] = useState(null);
  const [hasMore, setHasMore] = useState(false);
  const hasMoreRef = useRef(false);
  const loadMoreRef = useRef(null);
  const loadingMoreRef = useRef(false);
  const lastBeforeIdRef = useRef(null);
  const postsRef = useRef(null);

  useEffect(() => {
    hasMoreRef.current = hasMore;
  }, [hasMore]);

  useEffect(() => {
    postsRef.current = posts;
  }, [posts]);

  const loadPosts = useCallback(async (hashtag = null) => {
    try {
      if (hashtag) {
        const result = await getPostsByHashtag(hashtag, 50, 0, sessionId);
        setPosts(result.posts);
        setHasMore(false);
      } else {
        const result = await getTimeline(10, null, sessionId);
        setPosts(result.posts);
        setHasMore(result.has_more);
      }
    } catch (error) {
      console.error('Failed to load posts:', error);
    }
  }, [sessionId]);

  const refreshTimeline = useCallback(async () => {
    try {
      const result = await getTimeline(10, null, sessionId);
      setPosts((prev) => {
        if (!prev || prev.length === 0) return result.posts;
        return dedupePosts([...result.posts, ...prev]);
      });
      setHasMore((prev) => prev || result.has_more);
    } catch (error) {
      console.error('Failed to refresh timeline:', error);
    }
  }, [sessionId]);

  // loadMore reads posts from ref to avoid re-creating on every posts change.
  const loadMore = useCallback(async (options = {}) => {
    const currentPosts = postsRef.current;
    if (!currentPosts || currentPosts.length === 0) return;
    if (loadingMoreRef.current) return;
    const { preserveScroll = true, preserveMode = 'top', allowRepeat = false } = options;
    const applyUpdate = (fn) => {
      if (!preserveScroll) {
        fn();
        return;
      }
      if (preserveMode === 'top') preserveTimelineScrollTop(fn);
      else preserveTimelineScroll(fn);
    };
    const sortedPosts = currentPosts.slice().sort((a, b) => a.id - b.id);
    const oldestId = sortedPosts[0]?.id;
    if (!Number.isFinite(oldestId)) return;
    if (!allowRepeat && lastBeforeIdRef.current === oldestId) return;

    loadingMoreRef.current = true;
    lastBeforeIdRef.current = oldestId;
    try {
      const result = await getTimeline(10, oldestId, sessionId);
      if (result.posts.length > 0) {
        applyUpdate(() => {
          setPosts(prev => dedupePosts([...result.posts, ...(prev || [])]));
          setHasMore(result.has_more);
        });
      } else {
        setHasMore(false);
      }
    } catch (error) {
      console.error('Failed to load more posts:', error);
    } finally {
      loadingMoreRef.current = false;
    }
  }, [preserveTimelineScroll, preserveTimelineScrollTop, sessionId]);

  useEffect(() => {
    loadMoreRef.current = loadMore;
  }, [loadMore]);

  return {
    posts,
    setPosts,
    hasMore,
    setHasMore,
    hasMoreRef,
    loadPosts,
    refreshTimeline,
    loadMore,
    loadMoreRef,
    loadingMoreRef,
    lastBeforeIdRef,
  };
}
