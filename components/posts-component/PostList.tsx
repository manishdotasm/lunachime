"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import PostCard from "./PostCard";
import { Button } from "@/components/ui/button";
import { IPost } from "@/models/post-schema";

interface PostListProps {
  initialPosts: IPost[];
  sortBy: "recent" | "popular";
}

export default function PostList({ initialPosts, sortBy }: PostListProps) {
  const [posts, setPosts] = useState<IPost[]>(initialPosts);
  const [page, setPage] = useState(2); // Start from page 2 as we already have initial posts
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const fetchMorePosts = useCallback(async () => {
    if (loading || !hasMore) return;
    setLoading(true);
    try {
      const response = await fetch(`/api/getposts?page=${page}&sortBy=${sortBy}`);
      if (!response.ok) {
        throw new Error("Failed to fetch posts");
      }
      const newPosts = await response.json();
      if (newPosts.length === 0) {
        setHasMore(false);
      } else {
        setPosts((prevPosts) => [...prevPosts, ...newPosts]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching posts:", error);
    } finally {
      setLoading(false);
    }
  }, [page, sortBy, loading, hasMore]);

  useEffect(() => {
    setPosts(initialPosts);
    setPage(2);
    setHasMore(true);
  }, [sortBy, initialPosts]);

  useEffect(() => {
    if (inView && hasMore) {
      fetchMorePosts();
    }
  }, [inView, fetchMorePosts, hasMore]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        {posts.map((post, index) => (
          <PostCard key={index} post={post} />
        ))}
      </div>
      <div ref={ref} className="flex justify-center mt-4">
        {loading && <p>Loading more posts...</p>}
        {!loading && hasMore && (
          <Button onClick={fetchMorePosts} disabled={loading}>
            Load More
          </Button>
        )}
        {!hasMore && <p>No more posts to load</p>}
      </div>
    </div>
  );
}
