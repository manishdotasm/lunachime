import getCurrentUser from "./getCurrentUser";

export async function getUsersNotifications() {
  try {
    const user = await getCurrentUser();
    if (!user) return null;
    return user.notifications;
  } catch (error) {
    console.error("Error getting user notifications:", error);
    return null;
  }
}
