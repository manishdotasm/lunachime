/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import Event, { IEvent } from "@/models/event-schema";
import Post, { IPost } from "@/models/post-schema";

function shuffleArrays(array1: any, array2: any) {
  const combinedArray = [...array1, ...array2];

  for (let i = combinedArray.length - 1; i > 0; i--) {
    const randomIndex = Math.floor(Math.random() * (i + 1));
    [combinedArray[i], combinedArray[randomIndex]] = [combinedArray[randomIndex], combinedArray[i]];
  }

  return combinedArray;
}

export async function getAllPostsandEvents(): Promise<(IEvent | IPost)[] | null> {
  try {
    connectDB();
    const posts: IPost[] = await Post.find();
    const events: IEvent[] = await Event.find();
    const postsandevents = shuffleArrays(posts, events);
    return postsandevents;
  } catch (error) {
    console.log("COULDN'T GET POSTS: ", error);
    return null;
  }
}
