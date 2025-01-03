"use client";

import { ContentLayout } from "@/components/admin-panel/content-layout";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Card, CardContent } from "@/components/ui/card";
import { Input } from "@/components/ui/input";
import axios from "axios";
import Link from "next/link";
import React, { useState } from "react";
import { toast } from "sonner";
import { useDebounce } from "use-debounce";

interface UserCardProps {
  user: {
    _id: string;
    firstName: string;
    lastName: string;
    username: string;
    email: string;
    profilePicture?: string;
    bio?: string;
    university: string;
    program?: string;
    academicYear?: number;
  };
}

const UserCard: React.FC<UserCardProps> = ({ user }) => (
  <Link href={`/users/${user._id}`}>
    <Card className="mb-4">
      <CardContent className="flex items-center p-4">
        <Avatar className="h-16 w-16 mr-4">
          <AvatarImage src={user.profilePicture} alt={`${user.firstName} ${user.lastName}`} />
          <AvatarFallback>
            {user.firstName[0]}
            {user.lastName[0]}
          </AvatarFallback>
        </Avatar>
        <div>
          <h3 className="text-lg font-semibold">
            {user.firstName} {user.lastName}
          </h3>
          <p className="text-sm text-gray-500">@{user.username}</p>
          <p className="text-sm">{user.bio || "No bio available"}</p>
          <p className="text-sm">
            {user.university} • {user.program || "N/A"} • Year {user.academicYear || "N/A"}
          </p>
        </div>
      </CardContent>
    </Card>
  </Link>
);

const SearchPage = () => {
  const [searchQuery, setSearchQuery] = useState("");
  const [debouncedQuery] = useDebounce(searchQuery, 300);
  // eslint-disable-next-line @typescript-eslint/no-explicit-any
  const [searchResults, setSearchResults] = useState<any[]>([]);
  const [isSearching, setIsSearching] = useState(false);

  const handleSearch = async (searchString: string) => {
    setIsSearching(true);
    const results = await axios
      .get("/api/searchedUsers", { params: { query: searchString } })
      .then((res) => {
        return res.data;
      })
      .catch(() => toast.error("Error searching users"))
      .finally(() => setIsSearching(false));

    setSearchResults(results);
  };

  React.useEffect(() => {
    if (debouncedQuery) {
      handleSearch(debouncedQuery);
    } else {
      setSearchResults([]);
    }
  }, [debouncedQuery]);

  return (
    <ContentLayout title="Home">
      <CustomBreadCrumb />
      <PlaceholderContent>
        <section className="flex min-h-screen flex-col items-center justify-between p-24">
          <div className="container mx-auto px-4 py-8">
            <h1 className="text-3xl font-bold mb-6">Search Users</h1>
            <Input
              type="search"
              placeholder="Search users..."
              value={searchQuery}
              onChange={(e) => setSearchQuery(e.target.value)}
              className="mb-6"
            />
            {isSearching && <p className="text-center">Searching...</p>}
            {!searchQuery && !isSearching && (
              <div className="text-center text-gray-500 mt-12">
                <p className="text-2xl">Search Something</p>
                <p className="mt-2">Enter a name or username for users</p>
              </div>
            )}
            {searchQuery && !isSearching && searchResults.length === 0 && (
              <p className="text-center text-gray-500 mt-12">No users found</p>
            )}
            {searchResults.length > 0 && (
              <div>
                {searchResults.map((user) => (
                  <UserCard key={user._id} user={user} />
                ))}
              </div>
            )}
          </div>
        </section>
      </PlaceholderContent>
    </ContentLayout>
  );
};

export default SearchPage;
