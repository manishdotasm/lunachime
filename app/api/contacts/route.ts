import connectDB from "@/lib/db";
import User from "@/models/user-schema";

export async function GET(req: Request) {
  try {
    await connectDB();
    const { searchParams } = new URL(req.url);
    const query = searchParams.get("search");
    if (!query) return new Response("Missing query parameter", { status: 400 });

    const searchedContacts = await User.find({
      $or: [{ firstName: { $regex: query, $options: "i" } }, { lastName: { $regex: query, $options: "i" } }],
    });

    return new Response(JSON.stringify(searchedContacts), { status: 200 });
  } catch (error) {
    console.error("FAILED TO SEARCH USER", error);
  }
}
