import connectDB from "@/lib/db";
import User, { IUser } from "@/models/user-schema";
import getSession from "./getSession";

const getCurrentUser = async (): Promise<IUser | null> => {
  try {
    await connectDB();
    const session = await getSession();
    if (!session?.user?.email) return null;

    const currentUser = await User.findOne({ email: session.user.email });
    if (!currentUser) return null;

    return JSON.parse(JSON.stringify(currentUser));
  } catch (error) {
    console.log("COULDN'T GET CURRENT USER: ", error);
    return null;
  }
};

export default getCurrentUser;
