import getCurrentUser from "@/actions/getCurrentUser";
import { NextResponse } from "next/server";

export async function GET() {
  try {
    const user = await getCurrentUser();
    console.log(user);
    return NextResponse.json(user);
  } catch (error) {
    console.error("Error fetching user:", error);
    return null;
  }
}
