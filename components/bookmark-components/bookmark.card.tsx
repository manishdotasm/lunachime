"use client";

import Image from "next/image";
import { useState } from "react";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Heart, MessageCircle, Share2, Bookmark } from "lucide-react";
import { IPost } from "./types";

interface BookmarkCardProps {
  post: IPost;
}

export default function BookmarkCard({ post }: BookmarkCardProps) {
  const [isLiked, setIsLiked] = useState(false);

  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={post.media[0].url} alt={post.content} layout="fill" objectFit="cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <div className="flex items-center gap-4 mb-2">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>
              {post.author.name
                .split(" ")
                .map((n) => n[0])
                .join("")
                .toUpperCase()}
            </AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{post.author.name}</h3>
            <p className="text-sm text-gray-500 dark:text-gray-400">{post.createdAt.toLocaleDateString()}</p>
          </div>
        </div>
        <h2 className="text-xl font-bold mb-2">{post.content}</h2>
      </CardContent>
      <CardFooter className="flex justify-between bg-gray-50 dark:bg-gray-700 p-4">
        <Button variant="ghost" size="sm" onClick={() => setIsLiked(!isLiked)}>
          <Heart size={20} className={`mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
          {post.likes.length}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle size={20} className="mr-2" />
          {post.comments.length}
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 size={20} />
        </Button>
        <Dialog>
          <DialogTrigger asChild>
            <Button variant="ghost" size="sm">
              <Bookmark size={20} className="text-primary" />
            </Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[425px]">
            <DialogHeader>
              <DialogTitle>Post Details</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Author:</span>
                <span className="col-span-3">{post.author.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Content:</span>
                <span className="col-span-3">{post.content}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Likes:</span>
                <span className="col-span-3">{post.likes.length}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Comments:</span>
                <span className="col-span-3">{post.comments.length}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Tags:</span>
                <span className="col-span-3">{post.tags.join(", ")}</span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
