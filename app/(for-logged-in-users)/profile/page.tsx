import getCurrentUser from "@/actions/getCurrentUser";
import ProfileDashboard from "@/components/profile-components/profile-dashboard";
import React from "react";

const Profile = async () => {
  const user = await getCurrentUser();
  return (
    <div>
      <ProfileDashboard user={user} />
    </div>
  );
};

export default Profile;
