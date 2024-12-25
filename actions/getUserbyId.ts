import User, { IUser } from "@/models/user-schema";
import mongoose from "mongoose";

export async function getUserbyId(id: string) {
  try {
    const userObjectId = new mongoose.Types.ObjectId(id);
    const user: IUser | null = await User.findOne({ _id: userObjectId });
    if (!user) return null;
    return user;
  } catch (error) {
    console.log("COULDN'T GET USER: ", error);
    return null;
  }
}
