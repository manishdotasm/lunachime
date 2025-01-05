import User from "@/models/user-schema";
import { NextResponse } from "next/server";
import bcrypt from "bcrypt";
import University from "@/models/university-schema";
import mongoose from "mongoose";
import connectDB from "@/lib/db";

export async function POST(request: Request) {
  try {
    const body = await request.json();

    const {
      email,
      username,
      password,
      firstName,
      lastName,
      bio,
      profilePicture,
      dateOfBirth,
      gender,
      program,
      academicYear,
      universityID,
    }: {
      email: string;
      username: string;
      password: string;
      firstName: string;
      lastName: string;
      bio: string;
      profilePicture: string;
      dateOfBirth: string;
      gender: string;
      program: string;
      academicYear: string;
      universityID: string;
    } = body;
    const hashedPassword = await bcrypt.hash(password, 10);

    await connectDB();
    if (!email || !username || !password || !firstName || !lastName || !program || !academicYear)
      return NextResponse.json({ error: "Missing required fields" }, { status: 400 });

    const universityObjectId = new mongoose.Types.ObjectId(universityID);
    const university = await University.findById(universityObjectId);

    const existingUserByEmail = await User.findOne({ email });
    if (existingUserByEmail) {
      return NextResponse.json({ error: "User with this email already exists!" }, { status: 409 });
    }

    const existingUserByUsername = await User.findOne({ username });
    if (existingUserByUsername) {
      return NextResponse.json({ error: "Username is already taken!" }, { status: 409 });
    }

    const newUser = new User({
      firstName,
      lastName,
      username,
      email,
      password: hashedPassword,
      profilePicture,
      bio,
      dateOfBirth: new Date(dateOfBirth),
      gender,
      program,
      academicYear,
      university: university.name,
      status: "offline",
      isEmailVerified: true,
      isPhoneVerified: false,
      isTwoFactorEnabled: false,
      notifications: [],
      posts: [],
      likedPosts: [],
      bookmarkedPosts: [],
      followers: [],
      following: [],
      blockedUsers: [],
      friendRequestsSent: [],
      friendRequestsReceived: [],
      eventsCreated: [],
      eventsJoined: [],
      eventPreferences: {
        categories: [],
        radius: 10,
      },
      privacySettings: {
        isProfilePublic: true,
        allowMessagesFrom: "everyone",
      },
      notificationSettings: {
        emailNotifications: true,
        pushNotifications: true,
      },
      theme: "light", // Default to light theme
      language: "en", // Default to English language
      lastLogin: new Date(),
      loginHistory: [],
      lastActivity: new Date(),
    });

    // Save the new user to the database
    await newUser.save();

    return NextResponse.json({ success: true, message: "User registered successfully!" }, { status: 200 });
  } catch (error) {
    console.error("Error during registration:", error);
    return NextResponse.json({ error: "Registration failed. Please try again later." }, { status: 500 });
  }
}
