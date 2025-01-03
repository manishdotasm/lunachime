import { getPostbyPostIds } from "@/actions/getPostbyPostIds";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.getAll("postIds[]");

    if (!query) return new NextResponse(JSON.stringify({ message: "Missing query parameter" }), { status: 400 });

    const posts = await getPostbyPostIds(query);
    return NextResponse.json(posts);
  } catch (error) {
    console.log(error);
  }
}
