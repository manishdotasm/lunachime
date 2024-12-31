import { getUsersNotifications } from "@/actions/getUsersNotifications";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";

const NotificationPage = async () => {
  const notifications = await getUsersNotifications();

  if (notifications?.length === 0) {
    return (
      <ContentLayout title="Notifications">
        <CustomBreadCrumb />
        <PlaceholderContent>
          <div className="flex items-center justify-center">No Notifications</div>
        </PlaceholderContent>
      </ContentLayout>
    );
  }

  return (
    <ContentLayout title="Notifications">
      <CustomBreadCrumb />
      <PlaceholderContent>HMM</PlaceholderContent>
    </ContentLayout>
  );
};

export default NotificationPage;
