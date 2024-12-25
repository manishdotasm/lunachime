import User, { IUser } from "@/models/user-schema";
import mongoose from "mongoose";

export async function getAvatarsandNamesbyIds(ids: string[]) {
  try {
    const idObjects = ids.map((id) => new mongoose.Types.ObjectId(id));
    const users: IUser[] = await User.find({ _id: { $in: idObjects } });
    if (!users) return null;
    return users.map((user) => ({
      name: user.firstName + " " + user.lastName,
      avatarUrl: user.profilePicture,
    }));
  } catch (error) {
    console.log(error);
    return null;
  }
}
