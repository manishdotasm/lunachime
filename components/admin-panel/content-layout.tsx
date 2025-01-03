"use client";
import { Navbar } from "@/components/admin-panel/navbar";
import { IUser } from "@/models/user-schema";
import axios from "axios";
import { useEffect, useState } from "react";

interface ContentLayoutProps {
  title: string;
  children: React.ReactNode;
}

export function ContentLayout({ title, children }: ContentLayoutProps) {
  const [user, setUser] = useState<IUser | null>(null);

  useEffect(() => {
    const fetchUser = async () => {
      const res = await axios.get("/api/fetchuser");
      setUser(res.data);
    };
    fetchUser();
  }, []);

  return (
    <div>
      <Navbar title={title} user={user} />
      <div className="container pt-8 pb-8 px-4 sm:px-8  ">{children}</div>
    </div>
  );
}
