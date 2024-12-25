import Conversation from "@/models/conversation-schema";
import mongoose from "mongoose";

export async function getConversationbyId(id: string) {
  try {
    const conversationObjectId = new mongoose.Types.ObjectId(id);
    const conversation = await Conversation.findById(conversationObjectId);
    return conversation;
  } catch (error) {
    console.log("COULDN'T GET CONVERSATION: ", error);
    return null;
  }
}
