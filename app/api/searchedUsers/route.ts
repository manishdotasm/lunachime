import { searchUsers } from "@/actions/getUsersSearched";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) return new NextResponse(JSON.stringify({ message: "Missing query parameter" }), { status: 400 });

    const users = await searchUsers(query);
    return new NextResponse(JSON.stringify(users), { status: 200 });
  } catch (error) {
    console.log(error);
  }
}
