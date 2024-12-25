import { Dialog, DialogContent, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageSquare, BookmarkCheck } from "lucide-react";
import { IPost } from "@/models/post-schema";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel"; // Import the carousel components

interface PostDialogProps {
  post: IPost;
  children: React.ReactNode;
}

export function PostDialog({ post, children }: PostDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-4">
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              {/* Assuming you have the author's profile picture stored */}
              <AvatarImage src={post.author.avatar || "/placeholder.svg?height=40&width=40"} />
              <AvatarFallback>
                {post.author.name[0]}
                {post.author.name[1]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{post.author.name}</p>
              <p className="text-sm text-gray-500">
                {new Date(post.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Carousel for media */}
          {post.media.length > 0 && (
            <Carousel className="w-full">
              <CarouselContent>
                {post.media.map((mediaItem, index) => (
                  <CarouselItem key={index}>
                    {/* Render different media types */}
                    {mediaItem.url && mediaItem.url.endsWith(".mp4") ? (
                      <video controls className="rounded-lg w-full object-cover" src={mediaItem.url} />
                    ) : mediaItem.url && mediaItem.url.endsWith(".mp3") ? (
                      <audio controls className="w-full">
                        <source src={mediaItem.url} type="audio/mp3" />
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mediaItem.url}
                        alt={`Post image ${index + 1}`}
                        className="rounded-lg w-full object-cover"
                      />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}

          <p>{post.content}</p>

          <div className="flex items-center gap-6">
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <Heart className="h-5 w-5 mr-2" />
              {post.likes.length}
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900">
              <MessageSquare className="h-5 w-5 mr-2" />
              {post.comments.length}
            </Button>
            <Button variant="ghost" className="text-gray-600 hover:text-gray-900 ml-auto">
              <BookmarkCheck className="h-5 w-5" />
            </Button>
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
