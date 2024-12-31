import University from "@/models/university-schema";
import mongoose from "mongoose";

export default async function getUniversitybyId(universityID: string): Promise<string | null> {
  try {
    const universityObjectId = new mongoose.Types.ObjectId(universityID);
    const university = await University.findById(universityObjectId);

    if (!university) return null;
    return university.name.toString();
  } catch (error) {
    console.log("Couldn't fetch university: ", error);
    return null;
  }
}
