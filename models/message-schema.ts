import mongoose, { Schema, Document } from "mongoose";

export type ISender = {
  userId: string;
  name: string;
  avatar: string;
};

export interface IMessage extends Document {
  sender: ISender; // Single sender
  content: string; // Text content of the message
  media?: {
    url: string; // URL of the media file
    type: string; // Type of media (e.g., image, video, audio)
  }[];
  seenBy: Map<string, boolean>; // Map of users who have seen the message (userId -> seen status)
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: {
      userId: { type: String, required: true },
      name: { type: String, required: true },
      avatar: { type: String, required: true },
    },
    content: { type: String, required: true },
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, required: true },
      },
    ],
    seenBy: {
      type: Map,
      of: Boolean,
      default: new Map(), // Initialize as an empty map
    },
  },
  { timestamps: true } // Automatically adds `createdAt` and `updatedAt`
);

const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
