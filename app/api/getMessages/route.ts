import connectDB from "@/lib/db";
import Conversation, { IConversation } from "@/models/conversation-schema";
import Message from "@/models/message-schema";
import mongoose from "mongoose";

export async function GET(req: Request) {
  try {
    const { searchParams } = new URL(req.url);
    const conversationId = searchParams.get("conversationId");

    await connectDB();
    const conversationObjectId = new mongoose.Types.ObjectId(String(conversationId));
    const conversation: IConversation | null = await Conversation.findById(conversationObjectId);

    const messagesIds = conversation?.messages;
    // eslint-disable-next-line @typescript-eslint/no-explicit-any
    const messageObjectIds = messagesIds?.map((messageId: any) => {
      return new mongoose.Types.ObjectId(String(messageId));
    });

    const messages = await Message.find({ _id: { $in: messageObjectIds } });
    return new Response(JSON.stringify(messages), { status: 200 });
  } catch (error) {
    console.error("FAILED TO GET MESSAGES", error);
  }
}
