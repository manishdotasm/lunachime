import Post, { IPost } from "@/models/post-schema";

export async function getPosts(page: number = 1, sortBy: "recent" | "popular" = "recent") {
  const limit = 10;
  const skip = (page - 1) * limit;

  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  let sortOption: any = {};
  if (sortBy === "recent") {
    sortOption = { createdAt: -1 };
  } else if (sortBy === "popular") {
    sortOption = { likes: -1 };
  }

  const posts = await Post.find().sort(sortOption).skip(skip).limit(limit).lean();

  return posts as unknown as IPost[];
}
