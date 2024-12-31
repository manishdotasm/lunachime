import Post from "@/models/post-schema";
import mongoose from "mongoose";

export async function getbookmarkedPosts(postsIDs: string[]) {
  try {
    const objectIDs = postsIDs.map((id) => new mongoose.Types.ObjectId(id));
    const posts = await Post.find({ _id: { $in: objectIDs } });
    if (!posts) return null;
    return posts;
  } catch (error) {
    console.log(error);
    return null;
  }
}
