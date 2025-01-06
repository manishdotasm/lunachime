//get conversation by conversationIds

import getCurrentUser from "@/actions/getCurrentUser";
import connectDB from "@/lib/db";
import Conversation from "@/models/conversation-schema";
import mongoose from "mongoose";

export async function GET() {
  try {
    await connectDB();
    const currentUser = await getCurrentUser();
    const userConversationsIds = currentUser?.conversations;
    const userConversationObjectIds = userConversationsIds?.map((conversationId) => {
      return new mongoose.Types.ObjectId(String(conversationId));
    });

    const userConversations = await Conversation.find({ _id: { $in: userConversationObjectIds } }).sort({
      lastMessageDate: -1,
    });
    return new Response(JSON.stringify(userConversations), { status: 200 });
  } catch (error) {
    console.error("FAILED TO GET CONVERSATIONS", error);
  }
}
