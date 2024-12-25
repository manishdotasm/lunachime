import { getConversations } from "@/actions/getConversations";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import { ConversationSidebar } from "@/components/inbox-components/conversations-sidebar";

const InboxLayout = async ({ children }: { children: React.ReactNode }) => {
  const conversations = await getConversations();
  return (
    <ContentLayout title="Inbox">
      <CustomBreadCrumb />
      <PlaceholderContent>
        <ConversationSidebar conversations={conversations} />
        {children}
      </PlaceholderContent>
    </ContentLayout>
  );
};

export default InboxLayout;
