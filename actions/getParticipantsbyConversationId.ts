import User, { IUser } from "@/models/user-schema";
import { getConversationbyId } from "./getConversationbyId";
import mongoose from "mongoose";

export async function getParticipantsbyConversationId(conversationId: string) {
  try {
    const conversation = await getConversationbyId(conversationId);
    if (!conversation) return null;

    const participantsIds: string[] = conversation.participants;
    const participantObjectIds = participantsIds.map((id) => new mongoose.Types.ObjectId(id));
    const participants: IUser[] = await User.find({ _id: { $in: participantObjectIds } });
    return participants;
  } catch (error) {
    console.log("COULDN'T GET PARTICIPANTS: ", error);
    return null;
  }
}
