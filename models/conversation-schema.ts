import mongoose, { Schema, Document } from "mongoose";

export interface IParticipant {
  userId: string;
  name: string;
  avatar: string;
}

export interface IConversation extends Document {
  participants: IParticipant[]; // Updated to store userId, name, and avatar
  messages: string[];
  groupName?: string;
  groupImage?: string;
  isGroup: boolean;
  lastMessage: string;
  lastMessageDate: Date;
  createdAt: Date;
  updatedAt: Date;
  pinnedMessages: string[];
  conversationType: string;
}

const ConversationSchema = new Schema<IConversation>(
  {
    participants: [
      {
        userId: { type: String, required: true }, // User ID of the participant
        name: { type: String, required: true }, // Name of the participant
        avatar: { type: String }, // URL of the participant's avatar (optional)
      },
    ],
    messages: { type: [String], required: true },
    groupName: { type: String },
    groupImage: { type: String },
    isGroup: { type: Boolean, default: false },
    lastMessage: { type: String },
    lastMessageDate: { type: Date },
    createdAt: { type: Date, default: Date.now },
    updatedAt: { type: Date },
    pinnedMessages: { type: [String], default: [] },
    conversationType: { type: String, enum: ["single", "group"], default: "single" },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const Conversation = mongoose.models.Conversation || mongoose.model<IConversation>("Conversation", ConversationSchema);
export default Conversation;
