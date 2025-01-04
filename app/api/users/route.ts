import { getUserbyId } from "@/actions/getUserbyId";
import { IUser } from "@/models/user-schema";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.get("query");

    if (!query) return new NextResponse(JSON.stringify({ message: "Missing id parameter" }), { status: 400 });

    const user: IUser | null = await getUserbyId(query);
    if (!user) return new NextResponse(JSON.stringify({ message: "User not found" }), { status: 404 });

    return NextResponse.json(user);
  } catch (error) {
    console.log(error);
  }
}
