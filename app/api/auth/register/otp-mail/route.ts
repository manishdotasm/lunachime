import connectDB from "@/lib/db";
import { sendOTP } from "@/lib/mail-service";
import Otp from "@/models/otp-schema";
import User from "@/models/user-schema";

import { NextResponse } from "next/server";

export async function POST(request: Request) {
  try {
    const body = await request.json();
    const { email } = body;

    if (!email || typeof email !== "string")
      return NextResponse.json({ error: "Invalid Email Address" }, { status: 400 });

    await connectDB();
    const existingUser = await User.findOne({ email });
    if (existingUser) return NextResponse.json({ error: "Email is already registered!" }, { status: 409 });

    const otp = Math.floor(100000 + Math.random() * 900000).toString();
    const expirationTime = new Date(Date.now() + 10 * 60 * 1000);

    await Otp.updateOne({ email }, { email, otp, expirationTime }, { upsert: true });
    await sendOTP(email, otp);

    return NextResponse.json({ email, message: "OTP sent successfully" }, { status: 200 });
  } catch (error) {
    console.error("OTP couldn't be mailed!: ", error);
    return NextResponse.json({ error: "Failed to send OTP. Please try again later." }, { status: 500 });
  }
}
