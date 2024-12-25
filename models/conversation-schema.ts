import mongoose, { Schema, Document } from "mongoose";

export interface IConversation extends Document {
  participants: string[];
  messages: string[];
  groupName?: string;
  groupImage?: string;
  groupDescription?: string;
  isGroup: boolean;
  lastMessage: string;
  lastMessageDate: Date;
  createdAt: Date;
  updatedAt: Date;
  isArchived: boolean;
  isMuted: boolean;
  pinnedMessages: string[];
  adminIds: string[];
  isDeleted: boolean;
  conversationType: "direct" | "group";
}

const ConversationSchema = new Schema<IConversation>(
  {
    participants: { type: [String], required: true },
    messages: { type: [String], required: true },
    groupName: { type: String },
    groupImage: { type: String },
    groupDescription: { type: String },
    isGroup: { type: Boolean, default: false },
    lastMessage: { type: String },
    lastMessageDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    isArchived: { type: Boolean, default: false },
    isMuted: { type: Boolean, default: false },
    pinnedMessages: { type: [String], default: [] },
    adminIds: { type: [String], default: [] },
    isDeleted: { type: Boolean, default: false },
    conversationType: { type: String, enum: ["direct", "group"], required: true },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Conversation = mongoose.models.Conversation || mongoose.model<IConversation>("Conversation", ConversationSchema);
export default Conversation;
