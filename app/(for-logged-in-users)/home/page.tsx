import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import Feed from "@/components/home-components/feed";
import Sidebar from "@/components/home-components/sidebar";

const Home = async () => {
  return (
    <ContentLayout title="Home">
      <CustomBreadCrumb />
      <PlaceholderContent>
        <div className=" mx-auto px-4 py-8">
          <div className="flex flex-col md:flex-row gap-8">
            <div className="flex-grow">
              <Feed />
            </div>
            <div className="w-full md:w-1/3 sm:hidden md:block">
              <Sidebar />
            </div>
          </div>
        </div>
      </PlaceholderContent>
    </ContentLayout>
  );
};

export default Home;
