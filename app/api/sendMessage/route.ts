import getCurrentUser from "@/actions/getCurrentUser";
import connectDB from "@/lib/db";
import Conversation from "@/models/conversation-schema";
import Message from "@/models/message-schema";
import mongoose from "mongoose";

export async function POST(req: Request) {
  try {
    await connectDB();
    const body = await req.json();
    const { conversationId, content, media, seenBy } = body;

    if (!content) return new Response("Missing required fields", { status: 400 });
    const currentUser = await getCurrentUser();

    // Save message to database
    const newMessage = new Message({
      sender: {
        userId: String(currentUser?._id),
        name: currentUser?.firstName + " " + currentUser?.lastName,
        avatar: currentUser?.profilePicture,
      },
      content: content,
      media: media,
      seenBy: seenBy,
    });

    console.log("NEW MESSAGE", newMessage);

    await newMessage.save();

    const conversationObjectId = new mongoose.Types.ObjectId(String(conversationId));
    await Conversation.findByIdAndUpdate(
      conversationObjectId,
      {
        $push: { messages: String(newMessage._id) },
        lastMessage: content,
        lastMessageDate: new Date(),
      },
      { new: true }
    );

    return new Response(JSON.stringify(newMessage), { status: 200 });
  } catch (error) {
    console.error("FAILED TO GET MESSAGES", error);
    return new Response("Failed to get messages", { status: 500 });
  }
}
