import mongoose, { Schema, Document } from "mongoose";

export interface IUser extends Document {
  firstName: string;
  lastName: string;
  username: string;
  email: string;
  password: string;
  profilePicture?: string;
  bio?: string;
  dateOfBirth?: Date;
  gender?: string;
  phoneNumber?: string;
  address?: {
    city: string;
    state: string;
    country: string;
    zipCode: string;
  };
  socialLinks?: {
    facebook?: string;
    twitter?: string;
    linkedin?: string;
    instagram?: string;
  };
  university: string;
  program?: string;
  academicYear?: number; // Renamed to academicYear for clarity
  followers: string[];
  following: string[];
  blockedUsers: string[];
  friendRequestsSent: string[];
  friendRequestsReceived: string[];
  conversations: string[];
  posts: string[];
  likedPosts: string[];
  bookmarkedPosts: string[];
  notifications: {
    type: string;
    message: string;
    isRead: boolean;
    createdAt: Date;
  }[];
  eventsCreated: string[]; // References to event IDs
  eventsJoined: string[]; // References to event IDs
  eventPreferences: {
    categories: string[];
    radius: number;
  };
  privacySettings: {
    isProfilePublic: boolean;
    allowMessagesFrom: string;
  };
  notificationSettings: {
    emailNotifications: boolean;
    pushNotifications: boolean;
  };
  theme: string;
  language: string;
  status: string;
  isEmailVerified: boolean;
  isPhoneVerified: boolean;
  isTwoFactorEnabled: boolean;
  deactivationReason?: string;
  lastActivity?: Date;
  loginHistory: {
    ipAddress: string;
    device: string;
    timestamp: Date;
  }[];
  lastLogin?: Date;
  createdAt: Date;
  updatedAt: Date;
}

const UserSchema = new Schema<IUser>(
  {
    // General Information
    firstName: { type: String },
    lastName: { type: String, required: true },
    username: { type: String },
    email: { type: String, unique: true, required: true },
    password: { type: String, required: true },
    profilePicture: { type: String },
    bio: { type: String },
    dateOfBirth: { type: Date },
    gender: { type: String },
    phoneNumber: { type: String },

    // Address Information
    address: {
      city: { type: String },
      state: { type: String },
      country: { type: String },
      zipCode: { type: String },
    },

    // Social Links
    socialLinks: {
      facebook: { type: String },
      twitter: { type: String },
      linkedin: { type: String },
      instagram: { type: String },
    },

    // University Info
    university: { type: String, required: true },

    // Academic Information
    program: { type: String },
    academicYear: { type: Number }, // Renamed field

    // Relationships and Engagements
    followers: { type: [String], default: [] },
    following: { type: [String], default: [] },
    blockedUsers: { type: [String], default: [] },
    friendRequestsSent: { type: [String], default: [] },
    friendRequestsReceived: { type: [String], default: [] },
    conversations: { type: [String], default: [] },

    // Posts and Activities
    posts: { type: [String], default: [] },
    likedPosts: { type: [String], default: [] },
    bookmarkedPosts: { type: [String], default: [] },

    // Notifications
    notifications: [
      {
        type: { type: String, required: true },
        message: { type: String, required: true },
        isRead: { type: Boolean, default: false },
        createdAt: { type: Date, default: Date.now },
      },
    ],

    // Event Participation
    eventsCreated: { type: [String], default: [] }, // Event IDs
    eventsJoined: { type: [String], default: [] }, // Event IDs

    // Event Preferences
    eventPreferences: {
      categories: { type: [String], default: [] },
      radius: { type: Number, default: 10 },
    },

    // Privacy and Notifications Settings
    privacySettings: {
      isProfilePublic: { type: Boolean, default: true },
      allowMessagesFrom: { type: String, default: "everyone" },
    },
    notificationSettings: {
      emailNotifications: { type: Boolean, default: true },
      pushNotifications: { type: Boolean, default: true },
    },

    // User Preferences
    theme: { type: String, default: "light" },
    language: { type: String, default: "en" },

    // Account Status
    status: { type: String, default: "active" },
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    isTwoFactorEnabled: { type: Boolean, default: false },
    deactivationReason: { type: String },
    lastActivity: { type: Date },
    loginHistory: [
      {
        ipAddress: { type: String },
        device: { type: String },
        timestamp: { type: Date, default: Date.now },
      },
    ],

    // Timestamps
    lastLogin: { type: Date },
  },
  { timestamps: { createdAt: true, updatedAt: true } }
);

const User = mongoose.models.User || mongoose.model<IUser>("User", UserSchema);
export default User;
