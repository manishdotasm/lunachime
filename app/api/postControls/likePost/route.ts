import getCurrentUser from "@/actions/getCurrentUser";
import Post, { IPost } from "@/models/post-schema";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const postObjectId = new mongoose.Types.ObjectId(String(postId));

    const user = await getCurrentUser();
    if (!user) return new Response("Unauthorized", { status: 401 });

    if (!postId) return new Response("PostId is required", { status: 400 });

    // Check if user has already liked the post
    const post: IPost | null = await Post.findOne({ _id: postId });
    if (!post) return new Response("Post not found", { status: 404 });

    const isLiked = post.likes.includes(String(user._id));

    if (isLiked) {
      await Post.updateOne({ _id: postObjectId }, { $pull: { likes: String(user._id) } });
    } else {
      await Post.updateOne({ _id: postObjectId }, { $push: { likes: String(user._id) } });
    }

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
