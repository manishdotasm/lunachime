import connectDB from "@/lib/db";
import Conversation, { IConversation } from "@/models/conversation-schema";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    await connectDB();
    const conversationObjectId = new mongoose.Types.ObjectId(String(conversationId));
    const conversation: IConversation | null = await Conversation.findById(conversationObjectId);

    return new Response(JSON.stringify(conversation), { status: 200 });
  } catch (error) {
    console.error("FAILED TO GET SPECIFIC CONVERSATION", error);
  }
}
