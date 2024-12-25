import getCurrentUser from "@/actions/getCurrentUser";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import CreateEventForm from "@/components/create-components/create-event";

const CreateEvent = async () => {
  const user = await getCurrentUser();
  return (
    <>
      <CustomBreadCrumb />
      <PlaceholderContent>
        <div className="w-full h-full ">
          <CreateEventForm user={user} />
        </div>
      </PlaceholderContent>
    </>
  );
};

export default CreateEvent;
