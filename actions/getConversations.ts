import Conversation, { IConversation } from "@/models/conversation-schema";
import getCurrentUser from "./getCurrentUser";
import mongoose from "mongoose";

export async function getConversations() {
  try {
    const currentUser = await getCurrentUser();
    if (!currentUser) return null;
    const conversationIds = currentUser.conversations;
    if (!conversationIds) return null;
    const conversationObjectIds = conversationIds.map((id) => new mongoose.Types.ObjectId(id));
    const conversations: IConversation[] = await Conversation.find({ _id: { $in: conversationObjectIds } });
    return conversations;
  } catch (error) {
    console.log("COULDN'T GET CONVERSATIONS: ", error);
    return null;
  }
}
