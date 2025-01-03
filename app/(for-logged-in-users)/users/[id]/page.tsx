"use client";

import ProfileDashboard from "@/components/user-profile-components/profile-dashboard";
import { IUser } from "@/models/user-schema";
import axios from "axios";
import { usePathname } from "next/navigation";
import React, { useEffect, useState } from "react";

const UserPage = () => {
  const pathname = usePathname();
  const userID = pathname.split("/")[2];
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const response = await axios
        .get("/api/users", { params: { query: userID } })
        .then((res) => {
          return res;
        })
        .catch((error) => {
          console.error("Error fetching user:", error);
          return null;
        });
      setUser(response?.data);
    };
    fetchUser();
  }, [userID]);
  return (
    <div>
      <ProfileDashboard user={user} />
    </div>
  );
};

export default UserPage;
