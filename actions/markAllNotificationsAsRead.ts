import User from "@/models/user-schema";
import getCurrentUser from "./getCurrentUser";

export async function markAllNotificationsAsRead() {
  try {
    const user = await getCurrentUser();

    await User.updateOne({ email: user?.email }, { $set: { "notifications.$[].isRead": true } });
  } catch (error) {
    console.error("Failed to mark notifications as read:", error);
  }
}
