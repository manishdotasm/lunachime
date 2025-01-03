/* eslint-disable @next/next/no-img-element */

import { IPost } from "@/models/post-schema";
import { Card, CardContent } from "../ui/card";
import { PostDialog } from "./post-dialog";
import { useEffect, useState } from "react";
import axios from "axios";

export function PostGrid({ postIds }: { postIds: string[] | undefined }) {
  const [posts, setPosts] = useState<IPost[]>([]);

  useEffect(() => {
    const fetchPosts = async () => {
      const res = await axios.get("/api/posts", { params: { postIds } });
      setPosts(res.data);
    };
    fetchPosts();
  }, [postIds]);

  if (!posts) return <div>loading...</div>;

  return (
    <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 mt-4">
      {posts?.map((post, index) => (
        <PostDialog key={index} post={post}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-0">
              <img src={post.media[0].url} alt="Post content" className="w-full h-48 object-cover rounded-t-lg" />
              <div className="p-4">
                <p className="text-sm line-clamp-2">{post.content}</p>
                <div className="flex items-center justify-between mt-2 text-sm text-gray-500">
                  <span>{post.likes.length} likes</span>
                  <span>{post.comments.length} comments</span>
                </div>
              </div>
            </CardContent>
          </Card>
        </PostDialog>
      ))}
    </div>
  );
}
