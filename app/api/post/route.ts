import Post, { IPost } from "@/models/post-schema";
import connectDB from "@/lib/db";
import { getUserbyId } from "@/actions/getUserbyId";
import { IUser } from "@/models/user-schema";
import { NextResponse } from "next/server";

export async function POST(req: Request) {
  try {
    await connectDB();

    const { author, content, media, visibility, tags } = await req.json();

    if (!author || !content || !media || !visibility || !tags)
      return new NextResponse(JSON.stringify({ message: "Missing required fields" }), { status: 400 });

    const user: IUser | null = await getUserbyId(author);
    if (!user) {
      return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });
    }

    const newPost: IPost = new Post({
      author: {
        id: String(user._id),
        name: `${user.firstName} ${user.lastName}`,
        avatar: user.profilePicture,
      },
      content,
      media: media,
      likes: [],
      comments: [],
      shares: [],
      visibility: visibility,
      tags: tags,
      mentions: [],
      createdAt: new Date(),
      updatedAt: new Date(),
    });

    const savedPost = await newPost.save();

    return new NextResponse(JSON.stringify(savedPost), { status: 201 });
  } catch (error) {
    console.error("Error creating post:", error);
    return new NextResponse(JSON.stringify({ message: "Internal Server Error" }), { status: 500 });
  }
}
