import Event, { IEvent } from "@/models/event-schema"; // Import the Event model
import { getUserbyId } from "@/actions/getUserbyId";
import connectDB from "@/lib/db";
import { NextResponse } from "next/server";
import User from "@/models/user-schema";

export async function POST(request: Request) {
  try {
    connectDB();

    const body = await request.json();
    const { creator, eventName, description, eventDate, endDate, maxAttendees, isPublic, categories, location, media } =
      body;

    const user = await getUserbyId(creator);
    if (!user) return NextResponse.json({ success: false, error: "User not found" }, { status: 404 });

    if (!eventName || !description || !eventDate || !maxAttendees || !isPublic || !categories || !location || !media)
      return NextResponse.json({ success: false, error: "Missing required fields" }, { status: 400 });

    const locationName = "Kathmandu";

    const newEvent: IEvent = new Event({
      creator: {
        id: String(user?._id),
        name: `${user?.firstName} ${" "} ${user.lastName}`,
        avatar: user?.profilePicture,
      },
      eventName,
      description,
      eventDate: new Date(eventDate),
      endDate: endDate ? new Date(endDate) : null,
      maxAttendees: Number(maxAttendees),
      isPublic: Boolean(isPublic),
      categories: JSON.parse(categories),
      location: {
        name: locationName,
        latitude: location.latitude,
        longitude: location.longitude,
      },
      media: media,
      createdAt: new Date(),
      updatedAt: new Date(),
    });
    console.log("New Event:", newEvent);

    const savedEvent = await newEvent.save();

    await User.updateOne({ _id: user?._id }, { $push: { events: String(savedEvent._id) } });

    return NextResponse.json({ success: true, event: savedEvent }, { status: 201 });
  } catch (error) {
    console.error("Error creating event:", error);
    return NextResponse.json({ success: false, error: "Internal Server Error" }, { status: 500 });
  }
}
