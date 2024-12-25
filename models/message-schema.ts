import mongoose, { Schema, Document } from "mongoose";

export interface IMessage extends Document {
  sender: string;
  receivers: string[];
  content: string;
  media?: {
    url: string;
    type: string;
    metadata?: {
      fileSize: number;
      format: string;
      duration?: number;
    };
  }[];
  status: "sent" | "delivered" | "read" | "failed";
  conversationId: string;
  threadId?: string;
  reactions: {
    [userId: string]: string;
  };
  readReceipts: {
    [userId: string]: boolean;
  };
  priority: "normal" | "high" | "low";
  isEdited: boolean;
  location?: {
    latitude: number;
    longitude: number;
  };
  deleted: boolean;
  forwardedFrom?: string;
  createdAt: Date;
  updatedAt: Date;
}

const MessageSchema = new Schema<IMessage>(
  {
    sender: { type: String, required: true },
    receivers: { type: [String], required: true },
    content: { type: String, required: true },
    media: [
      {
        url: { type: String, required: true },
        type: { type: String, required: true },
        metadata: {
          fileSize: { type: Number, required: true },
          format: { type: String, required: true },
          duration: { type: Number },
        },
      },
    ],
    status: { type: String, required: true, enum: ["sent", "delivered", "read", "failed"], default: "sent" },
    conversationId: { type: String, required: true },
    threadId: { type: String },
    reactions: {
      type: Map,
      of: String,
      default: {},
    },
    readReceipts: {
      type: Map,
      of: Boolean,
      default: {},
    },
    priority: { type: String, enum: ["normal", "high", "low"], default: "normal" },
    isEdited: { type: Boolean, default: false },
    location: {
      latitude: { type: Number },
      longitude: { type: Number },
    },
    deleted: { type: Boolean, default: false },
    forwardedFrom: { type: String },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Message = mongoose.models.Message || mongoose.model<IMessage>("Message", MessageSchema);
export default Message;
