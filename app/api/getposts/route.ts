import { NextResponse } from "next/server";
import { getPosts } from "@/actions/getPosts";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const sortBy = (searchParams.get("sortBy") || "recent") as "recent" | "popular";

  try {
    const posts = await getPosts(page, sortBy);
    return NextResponse.json(posts);
  } catch (error) {
    console.error("Error fetching posts:", error);
    return NextResponse.json({ error: "Failed to fetch posts" }, { status: 500 });
  }
}
