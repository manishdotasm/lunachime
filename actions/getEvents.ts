import connectDB from "@/lib/db";
import Event, { IEvent } from "@/models/event-schema";

export async function getEvents(page: number = 1, sortBy: "recent" | "popular"): Promise<IEvent[]> {
  const limit = 10;
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sortOption: any = {};
  if (sortBy === "recent") {
    sortOption = { createdAt: -1 };
  } else if (sortBy === "popular") {
    sortOption = { likes: -1 };
  }

  await connectDB();
  const events = await Event.find().sort(sortOption).skip(skip).limit(limit).lean();

  return events as unknown as IEvent[];
}
