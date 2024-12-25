import getCurrentUser from "@/actions/getCurrentUser";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import PostForm from "@/components/create-components/create-post";

const CreatePost = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <CustomBreadCrumb />
      <PlaceholderContent>
        <div className="w-full pt-8">
          <PostForm user={user} />
        </div>
      </PlaceholderContent>
    </>
  );
};

export default CreatePost;
