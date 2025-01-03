import { getEventsbyEventIds } from "@/actions/getEventsbyEventIds";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const { searchParams } = new URL(request.url);
    const query = searchParams.getAll("eventIDs[]");
    if (!query) return new NextResponse(JSON.stringify({ message: "Missing query parameter" }), { status: 400 });

    const events = await getEventsbyEventIds(query);
    return NextResponse.json(events);
  } catch (error) {
    console.log(error);
  }
}
