import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import { CreationCards } from "../../../components/create-components/creation-card";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";

const CreatePage = () => {
  return (
    <>
      <CustomBreadCrumb />
      <PlaceholderContent>
        <CreationCards />
      </PlaceholderContent>
    </>
  );
};

export default CreatePage;
