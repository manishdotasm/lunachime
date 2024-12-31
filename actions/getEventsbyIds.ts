import Event, { IEvent } from "@/models/event-schema";
import mongoose from "mongoose";

export async function getEventbyEventIds(ids: string[]) {
  try {
    const idObjects = ids.map((id) => new mongoose.Types.ObjectId(id));
    const events: IEvent[] = await Event.find({ _id: { $in: idObjects } });
    if (!events) return null;
    return events;
  } catch (error) {
    console.log(error);
    return null;
  }
}
