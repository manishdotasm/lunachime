import Conversation, { IConversation } from "@/models/conversation-schema";
import Message, { IMessage } from "@/models/message-schema";
import mongoose from "mongoose";

export async function getMessagesbyConversationId(conversationId: string) {
  try {
    const conversationObjectId = new mongoose.Types.ObjectId(conversationId);
    const conversation: IConversation | null = await Conversation.findById(conversationObjectId);
    if (!conversation) return null;
    const messageIds: string[] = conversation?.messages;
    if (!messageIds) return null;
    const messageObjectIds = messageIds.map((id: string) => new mongoose.Types.ObjectId(id));
    const messages: IMessage[] | null = await Message.find({ _id: { $in: messageObjectIds } });
    return messages;
  } catch (error) {
    console.log("COULDN'T GET MESSAGES: ", error);
    return null;
  }
}
