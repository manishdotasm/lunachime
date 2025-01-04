import { NextResponse } from "next/server";
import { getEvents } from "@/actions/getEvents";

export async function GET(req: Request) {
  const { searchParams } = new URL(req.url);
  const page = parseInt(searchParams.get("page") || "1", 10);
  const sortBy = (searchParams.get("sortBy") || "recent") as "recent" | "popular";

  try {
    const events = await getEvents(page, sortBy);
    return NextResponse.json(events);
  } catch (error) {
    console.error("Error fetching events:", error);
    return NextResponse.json({ error: "Failed to fetch events" }, { status: 500 });
  }
}
