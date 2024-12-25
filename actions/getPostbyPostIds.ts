import Post, { IPost } from "@/models/post-schema";
import mongoose from "mongoose";

export async function getPostbyPostIds(postIds: string[]) {
  try {
    const postObjectIds = postIds.map((id) => new mongoose.Types.ObjectId(id));
    const posts: IPost[] = await Post.find({ _id: { $in: postObjectIds } });
    return posts;
  } catch (error) {
    console.log("COULDN'T GET POSTS: ", error);
    return null;
  }
}
