import getCurrentUser from "./getCurrentUser";
import { getUserbyId } from "./getUserbyId";

export async function getContacts() {
  try {
    const user = await getCurrentUser();
    if (!user) return;
    const contactIDs = user.followers;
    contactIDs.concat(user.following);

    const contacts = await Promise.all(
      contactIDs.map(async (id) => {
        const contact = await getUserbyId(id);
        return contact;
      })
    );
    return contacts;
  } catch (error) {
    console.error(error);
  }
}
