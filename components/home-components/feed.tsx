import { getAllPostsandEvents } from "@/actions/getAllPostsandEvents";
import { ScrollArea } from "../ui/scroll-area";
import { Post } from "./post";
import { Event } from "./event";
import { IEvent } from "@/models/event-schema";
import { IPost } from "@/models/post-schema";
import { Key } from "react";

export default async function Feed() {
  const postsandevents = await getAllPostsandEvents();
  const serializedData = JSON.parse(JSON.stringify(postsandevents));

  return (
    <ScrollArea className="rounded-md border p-4 min-h-[620px] gap-y-4">
      {serializedData?.map((postorevent: IEvent | IPost, index: Key | null | undefined) => {
        if ("likes" in postorevent) {
          return <Post key={index} post={postorevent} />;
        } else {
          return <Event key={index} event={postorevent} />;
        }
      })}
    </ScrollArea>
  );
}
