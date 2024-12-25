import { NextResponse } from "next/server";
import University from "@/models/university-schema";

export async function GET() {
	try {
		const universities = await University.find({}, "name").select("_id name").lean();
		return NextResponse.json(universities);
	} catch (error) {
		console.error("Error fetching universities:", error);
		return NextResponse.json({ error: "Failed to fetch universities" }, { status: 500 });
	}
}
