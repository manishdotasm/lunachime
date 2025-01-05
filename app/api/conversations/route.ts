import { getUserbyId } from "@/actions/getUserbyId";
import connectDB from "@/lib/db";
import Conversation, { IConversation, IParticipant } from "@/models/conversation-schema";
import User, { IUser } from "@/models/user-schema";
import mongoose from "mongoose";
import { ThemeProvider as NextThemesProvider } from "next-themes";

export async function POST(req: Request) {
  try {
    await connectDB();

    const body = await req.json();
    const { participants, isGroup, groupName, groupPhoto } = body;

    const participantObjectIds = participants.map((participant: string) => {
      return new mongoose.Types.ObjectId(String(participant));
    });

    const query = isGroup
      ? { participantObjectIds, isGroup, groupName, groupPhoto }
      : { participants: { $all: participantObjectIds, $size: 2 } };

    const conversation: IConversation | null = await Conversation.findOne(query);

    if (conversation) {
      return new Response(JSON.stringify(conversation), { status: 200 });
    }

    const participantsDenormalized: IParticipant[] = [];
    for (const participant of participants) {
      const participantData: IUser | null = await getUserbyId(participant);
      if (!participantData) continue;
      participantsDenormalized.push({
        userId: String(participantData?._id),
        name: participantData?.username,
        // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
        avatar: participantData?.profilePicture!,
      });
    }

    const newConversation: IConversation = new Conversation({
      participants: participantsDenormalized,
      messages: [],
      groupName: groupName,
      groupImage: groupPhoto,
      lastMessage: "",
      lastMessageDate: new Date(),
      isGroup: isGroup,
      pinnedMessages: [],
      conversationType: isGroup ? "group" : "single",
    });

    await newConversation.save();

    // save coversation in all participants
    for (const participant of participants) {
      await User.findByIdAndUpdate(
        participant.userId,
        {
          $push: { conversations: String(newConversation._id) },
        },
        { new: true }
      );
    }

    console.log("CONVERSATION CREATED", newConversation);
    return new Response(JSON.stringify(newConversation), { status: 201 });
  } catch (error) {
    console.error("FAILED TO CREATE CONVERSATION", error);
  }
}
