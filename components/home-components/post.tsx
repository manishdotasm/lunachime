"use client";

import Image from "next/image";
import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Heart, MessageCircle, MoreVertical } from "lucide-react";
import { IPost } from "@/models/post-schema";

export function Post({ post }: { post: IPost }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isLiked, setIsLiked] = useState(false);

  // Convert serialized date strings back to Date objects
  const createdAt = new Date(post.createdAt);
  const timestamp = createdAt.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  return (
    <>
      <Card className="border-2 border-gray-200 mb-4">
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">{post.author.name}</div>
            <div className="text-sm text-gray-500">{timestamp}</div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-4">
          <p>{post.content}</p>
          {post.media && post.media.length > 0 && (
            <div className="grid grid-cols-3 gap-2 rounded-xl overflow-hidden">
              {post.media.map((mediaItem, i) => (
                <div key={i} className="aspect-square relative">
                  <Image src={mediaItem.url} alt={`Post media ${i + 1}`} fill className="object-cover" />
                </div>
              ))}
            </div>
          )}
        </CardContent>
        <CardFooter className="flex items-center gap-4">
          <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => setIsLiked(!isLiked)}>
            <Heart className={`h-4 w-4 mr-2 ${isLiked ? "fill-red-500 text-red-500" : ""}`} />
            {post.likes.length}
          </Button>
          <Button variant="ghost" size="sm" className="text-gray-500" onClick={() => setIsDialogOpen(true)}>
            <MessageCircle className="h-4 w-4 mr-2" />
            {post.comments.length}
          </Button>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl h-[600px]">
          <DialogHeader>
            <DialogTitle>Comments</DialogTitle>
          </DialogHeader>
          <ScrollArea className="h-full pr-4">
            <div className="space-y-4">
              {post.comments.map((comment, index) => {
                // Convert serialized date strings back to Date objects
                const commentTimestamp = new Date(comment.createdAt).toLocaleDateString("en-US", {
                  year: "numeric",
                  month: "short",
                  day: "numeric",
                  hour: "2-digit",
                  minute: "2-digit",
                });

                return (
                  <div key={index} className="flex gap-4">
                    <Avatar className="h-8 w-8">
                      <AvatarImage src={comment.author} alt={comment.author} />
                      <AvatarFallback>{comment.author[0]}</AvatarFallback>
                    </Avatar>
                    <div className="flex-1">
                      <div className="flex items-center gap-2">
                        <span className="font-semibold">{comment.author}</span>
                        <span className="text-sm text-gray-500">{commentTimestamp}</span>
                      </div>
                      <p className="text-sm">{comment.content}</p>
                    </div>
                  </div>
                );
              })}
            </div>
          </ScrollArea>
        </DialogContent>
      </Dialog>
    </>
  );
}
