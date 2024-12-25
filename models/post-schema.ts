import mongoose, { Schema, Document } from "mongoose";

export interface IPost extends Document {
  author: {
    id: string; // User ID (reference)
    name: string; // Denormalized author name
    avatar: string; // Denormalized author avatar URL
  };
  content: string;
  media: {
    url: string;
    type: string;
  };
  likes: string[];
  comments: {
    author: string; // User ID (reference)
    content: string;
    createdAt: Date;
    parentCommentId?: string;
  }[];
  shares: string[];
  visibility: string;
  tags: string[];
  location?: {
    name: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

const PostSchema = new Schema<IPost>({
  author: {
    id: { type: String, required: true }, // User ID (reference)
    name: { type: String, required: true }, // Denormalized author name
    avatar: { type: String, required: true }, // Denormalized author avatar URL
  },
  content: { type: String },
  media: [
    {
      url: { type: String, required: true },
      type: { type: String, required: true },
    },
  ],
  likes: { type: [String], default: [] },
  comments: [
    {
      author: { type: String, required: true },
      content: { type: String, required: true },
      createdAt: { type: Date, default: Date.now },
      parentCommentId: { type: String }, // Reference to the parent comment for replies
    },
  ],
  shares: { type: [String], default: [] },
  visibility: { type: String, required: true, default: "public" },
  tags: { type: [String], default: [] },
  createdAt: { type: Date, default: Date.now, required: true },
  updatedAt: { type: Date },
});

const Post = mongoose.models.Post || mongoose.model<IPost>("Post", PostSchema);
export default Post;
