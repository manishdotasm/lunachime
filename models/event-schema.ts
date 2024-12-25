import mongoose, { Schema, Document } from "mongoose";

export interface IEvent extends Document {
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  eventName: string;
  description: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  eventDate: Date;
  endDate?: Date;
  attendees: string[];
  maxAttendees: number;
  isPublic: boolean;
  eventStatus: "upcoming" | "ongoing" | "completed" | "cancelled";
  media: {
    url: string;
    type: "image" | "video" | "audio";
  }[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}

const EventSchema = new Schema<IEvent>(
  {
    creator: {
      id: { type: String, required: true },
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    eventName: { type: String, required: true },
    description: { type: String, required: true },
    location: {
      name: { type: String, required: true },
      latitude: { type: Number, required: true },
      longitude: { type: Number, required: true },
    },
    eventDate: { type: Date, required: true },
    endDate: { type: Date },
    attendees: { type: [String], default: [] },
    maxAttendees: { type: Number, required: true },
    isPublic: { type: Boolean, default: true },
    eventStatus: {
      type: String,
      enum: ["upcoming", "ongoing", "completed", "cancelled"],
      default: "upcoming",
    },
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, enum: ["image", "video", "audio"], required: true },
      },
    ],
    categories: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Event = mongoose.models.event || mongoose.model("event", EventSchema);

export default Event;
