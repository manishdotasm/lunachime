/* eslint-disable @typescript-eslint/no-explicit-any */
import connectDB from "@/lib/db";
import Event, { IEvent } from "@/models/event-schema";
import Post, { IPost } from "@/models/post-schema";
import getCurrentUser from "./getCurrentUser";

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
    const currentUser = await getCurrentUser();
    const posts: IPost[] = await Post.find();
    const othersPosts = posts.filter((post) => post.author.id !== String(currentUser?._id));
    const events: IEvent[] = await Event.find();
    const othersEvents = events.filter((event) => event.creator.id !== String(currentUser?._id));
    const postsandevents = shuffleArrays(othersPosts, othersEvents);
    return postsandevents;
  } catch (error) {
    console.log("COULDN'T GET POSTS: ", error);
    return null;
  }
}
