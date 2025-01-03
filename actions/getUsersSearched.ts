import connectDB from "@/lib/db";
import User, { IUser } from "@/models/user-schema";

export async function searchUsers(query: string): Promise<Partial<IUser>[]> {
  if (!query) return [];

  try {
    connectDB();
    const regex = new RegExp(query, "i");
    await connectDB();
    const users = await User.find({
      $or: [{ firstName: { $regex: regex } }, { lastName: { $regex: regex } }, { username: { $regex: regex } }],
    })
      .limit(10)
      .select("_id firstName lastName username email profilePicture bio university program academicYear");

    return users;
  } catch (error) {
    console.error("Error searching users:", error);
    return [];
  }
}
