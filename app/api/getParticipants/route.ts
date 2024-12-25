import { getAvatarsandNamesbyIds } from "@/actions/getAvatarandNamebyId";
import { NextResponse } from "next/server";

export async function GET(request: Request) {
  try {
    const url = new URL(request.url);
    const ids = url.searchParams.get("ids");

    if (!ids) {
      return NextResponse.json({ message: "Missing ids parameter" }, { status: 400 });
    }

    const idArray = ids.split(","); // Assuming the ids are passed as a comma-separated string

    if (idArray.length === 0) {
      return NextResponse.json({ message: "Empty ids array" }, { status: 400 });
    }

    const avatarsAndNames = await getAvatarsandNamesbyIds(idArray);

    if (!avatarsAndNames) {
      return NextResponse.json({ message: "Users not found" }, { status: 404 });
    }

    return NextResponse.json(avatarsAndNames);
  } catch (error) {
    console.error(error);
    return NextResponse.json({ message: "Internal Server Error" }, { status: 500 });
  }
}
