import connectDB from "@/lib/db";
import Post from "@/models/post-schema";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    const { comment } = await req.json();
    if (!comment) return new Response("Comment is required", { status: 400 });

    const { searchParams } = new URL(req.url);
    const postId = searchParams.get("postId");
    const postObjectId = new mongoose.Types.ObjectId(String(postId));

    if (!postId) return new Response("PostId is required", { status: 400 });

    connectDB();
    await Post.updateOne({ _id: postObjectId }, { $push: { comments: comment } });

    return new Response("Success", { status: 200 });
  } catch (error) {
    console.error(error);
  }
}
