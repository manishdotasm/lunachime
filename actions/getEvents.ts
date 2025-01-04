import Event, { IEvent } from "@/models/event-schema";

export async function getEvents(page: number, sortBy: "recent" | "popular"): Promise<IEvent[]> {
  try {
    const limit = 10;
    const skip = (page - 1) * limit;
    let sortQuery = {};

    if (sortBy === "recent") {
      sortQuery = { createdAt: -1 };
    } else if (sortBy === "popular") {
      sortQuery = { attendees: -1 };
    }

    console.log("REACHED HERE");

    const events: IEvent[] = await Event.find({ isDeleted: false }).sort(sortQuery).skip(skip).limit(limit);

    return events;
  } catch (error) {
    console.error("Error fetching events:", error);
    throw new Error("Failed to fetch events");
  }
}
