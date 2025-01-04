import { getPosts } from "@/actions/getPosts";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import PostList from "@/components/posts-component/PostList";
import { SortPosts } from "@/components/posts-component/SortPosts";

export default async function PostsPage({
  searchParams,
}: {
  searchParams: { [key: string]: string | string[] | undefined };
}) {
  const sortBy = (typeof searchParams.sortBy === "string" ? searchParams.sortBy : "recent") as "recent" | "popular";
  const initialPosts = await getPosts(1, sortBy);

  return (
    <ContentLayout title="Posts">
      <CustomBreadCrumb />
      <PlaceholderContent>
        <div className="container mx-auto px-4 py-8">
          <h1 className="text-3xl font-bold mb-6">Posts</h1>
          <SortPosts sortBy={sortBy} />
          <PostList initialPosts={initialPosts} sortBy={sortBy} />
        </div>
      </PlaceholderContent>
    </ContentLayout>
  );
}
