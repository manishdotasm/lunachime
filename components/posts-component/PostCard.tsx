import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Heart, MessageCircle, Share2 } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { IPost } from "@/models/post-schema";
import { StaticImport } from "next/dist/shared/lib/get-img-props";
import { Key } from "react";

interface PostCardProps {
  post: IPost;
}

export default function PostCard({ post }: PostCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={post.author.avatar} alt={post.author.name} />
            <AvatarFallback>{post.author.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{post.author.name}</h3>
            <p className="text-sm text-gray-500">{new Date(post.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <p className="mb-4">{post.content}</p>
        {post.media && post.media.length > 0 && (
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {post.media.map((media: { url: string | StaticImport }, index: Key | null | undefined) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Image
                      src={media.url}
                      alt={`Post media ${index}`}
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full h-[200px]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <Heart className="w-4 h-4 mr-2" />
          {post.likes.length}
        </Button>
        <Button variant="ghost" size="sm">
          <MessageCircle className="w-4 h-4 mr-2" />
          {post.comments.length}
        </Button>
        <Button variant="ghost" size="sm">
          <Share2 className="w-4 h-4 mr-2" />
          {post.shares.length}
        </Button>
      </CardFooter>
    </Card>
  );
}
