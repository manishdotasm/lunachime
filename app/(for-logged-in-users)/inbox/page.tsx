import getCurrentUser from "@/actions/getCurrentUser";
import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import ChatList from "@/components/inbox-components/ChatList";
import Contacts from "@/components/inbox-components/Contacts";
import "@/app/extracss.css";

import React from "react";

const Inbox = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      <ContentLayout title="Inbox">
        <CustomBreadCrumb />
        <PlaceholderContent>
          <div className="main-container">
            <div className="w-1/3 max-lg:w-1/2 max-md:w-full">
              <ChatList />
            </div>
            <div className="w-2/3 max-lg:w-1/2 max-md:hidden">
              <Contacts currentUser={user} />
            </div>
          </div>
        </PlaceholderContent>
      </ContentLayout>
    </div>
  );
};

export default Inbox;
