import Event, { IEvent } from "@/models/event-schema";
import mongoose from "mongoose";

export async function getEventsbyEventIds(eventIds: string[]) {
  try {
    const eventObjectIds = eventIds.map((id) => new mongoose.Types.ObjectId(id));
    const events: IEvent[] | null = await Event.find({ _id: { $in: eventObjectIds } });
    return events;
  } catch (error) {
    console.log("COULDN'T GET EVENTS: ", error);
    return null;
  }
}
