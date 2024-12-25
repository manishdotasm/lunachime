import connectDB from "@/lib/db";
import Otp from "@/models/otp-schema";
import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email, otp } = body;

    if (!email || !otp) return NextResponse.json({ success: false, error: "OTP is required" }, { status: 400 });

    const otpRecord = await Otp.findOne({ email });
    if (!otpRecord) return NextResponse.json({ success: false, error: "No OTP found for this email" }, { status: 404 });

    const isExpired = new Date() > otpRecord.expirationTime;
    if (isExpired) return NextResponse.json({ success: false, error: "OTP has expired" }, { status: 400 });

    if (otpRecord.otp !== otp) return NextResponse.json({ success: false, error: "Invalid OTP" }, { status: 400 });

    await connectDB();
    await Otp.deleteOne({ email });
    return NextResponse.json({ success: true, message: "OTP verified successfully" }, { status: 200 });
  } catch (error) {
    console.error("Error verifying OTP:", error);
    return NextResponse.json({ error: "OTP verification failed. Please try again later." }, { status: 500 });
  }
}
