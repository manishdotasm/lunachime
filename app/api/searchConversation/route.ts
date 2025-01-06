import getCurrentUser from "@/actions/getCurrentUser";
import connectDB from "@/lib/db";
import Conversation from "@/models/conversation-schema";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("search");

    console.log("QUERY", query);

    if (!query) return new Response("Missing query parameter", { status: 400 });

    const currentUser = await getCurrentUser();

    const searchedConversations = await Conversation.find({
      $or: [
        // Direct conversations with the searched user
        {
          participants: {
            $elemMatch: {
              name: { $regex: query, $options: "i" }, // Case-insensitive search for the name
            },
          },
          isGroup: false, // Only direct conversations
        },

        {
          $or: [
            {
              participants: {
                $all: [
                  { $elemMatch: { userId: currentUser?._id } },
                  { $elemMatch: { name: { $regex: query, $options: "i" } } },
                ],
              },
            },
            {
              groupName: { $regex: query, $options: "i" },
            },
          ],
          isGroup: true,
        },
      ],
    });
    return new Response(JSON.stringify(searchedConversations), { status: 200 });
  } catch (error) {
    console.error("FAILED TO SEARCH USER", error);
  }
}
