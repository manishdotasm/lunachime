import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";

const Home = async () => {
  return (
    <ContentLayout title="Home">
      <CustomBreadCrumb />
      <PlaceholderContent>Home</PlaceholderContent>
    </ContentLayout>
  );
};

export default Home;
