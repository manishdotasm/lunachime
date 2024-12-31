import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Users, MessageSquare, Calendar } from "lucide-react";
import getCurrentUser from "@/actions/getCurrentUser";
import Link from "next/link";
import { PostGrid } from "./post-grid";
import getUniversitybyId from "@/actions/getUniversityNamebyID";
import { EventList } from "./event-grid";

export default async function ProfileDashboard() {
  const user = await getCurrentUser();
  // eslint-disable-next-line @typescript-eslint/no-non-null-asserted-optional-chain
  const universityName = getUniversitybyId(user?.university!);
  return (
    <div className="p-6 min-h-screen bg-gray-50">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Profile Details Card */}
        <Card>
          <CardHeader className="flex flex-row items-center justify-between">
            <div className="flex items-center space-x-2">
              <div className="w-1 h-6 bg-blue-500 rounded-full" />
              <CardTitle>Profile</CardTitle>
            </div>
            <Button variant="outline">Edit Profile</Button>
          </CardHeader>
          <CardContent>
            <div className="flex flex-col md:flex-row gap-8">
              <div className="flex items-start gap-4">
                <Avatar className="w-20 h-20">
                  <AvatarImage src={user?.profilePicture || "/default-profile.png"} />
                  <AvatarFallback>
                    {user?.firstName[0]}
                    {user?.lastName[0]}
                  </AvatarFallback>
                </Avatar>
                <div className="space-y-1">
                  <h2 className="text-2xl font-semibold">
                    {user?.firstName} {user?.lastName}
                  </h2>
                  <div className="space-y-3">
                    <div>
                      <p className="text-sm text-gray-500">@{user?.username}</p>
                      <p>{universityName}</p>
                      <p className="text-gray-600">
                        {user?.program} • Year {user?.academicYear}
                      </p>
                    </div>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-2 md:grid-cols-4 gap-4 flex-1">
                <Link href={`/profile/followers`}>
                  <Card className="hover:bg-gray-100 cursor-pointer transition-colors">
                    <CardContent className="p-6">
                      <Users className="h-6 w-6 text-blue-500 mb-4" />
                      <p className="text-3xl font-bold mb-1">{user?.followers.length}</p>
                      <p className="text-sm text-gray-500">Followers</p>
                    </CardContent>
                  </Card>
                </Link>
                <Link href={`/profile/following`}>
                  <Card className="hover:bg-gray-100 cursor-pointer transition-colors">
                    <CardContent className="p-6">
                      <Users className="h-6 w-6 text-blue-500 mb-4" />
                      <p className="text-3xl font-bold mb-1">{user?.following.length}</p>
                      <p className="text-sm text-gray-500">Following</p>
                    </CardContent>
                  </Card>
                </Link>
                <Card>
                  <CardContent className="p-6">
                    <MessageSquare className="h-6 w-6 text-blue-500 mb-4" />
                    <p className="text-3xl font-bold mb-1">{user?.posts.length}</p>
                    <p className="text-sm text-gray-500">Posts</p>
                  </CardContent>
                </Card>
                <Card>
                  <CardContent className="p-6">
                    <Calendar className="h-6 w-6 text-blue-500 mb-4" />
                    <p className="text-3xl font-bold mb-1">{user?.eventsCreated.length}</p>
                    <p className="text-sm text-gray-500">Events</p>
                  </CardContent>
                </Card>
              </div>
            </div>
          </CardContent>
        </Card>

        {/* Content Tabs */}
        <Card>
          <CardContent className="p-6">
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2">
                <TabsTrigger value="posts">Posts</TabsTrigger>
                <TabsTrigger value="events">Events</TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <PostGrid postIds={user?.posts} />
              </TabsContent>
              <TabsContent value="events">
                <EventList eventIDs={user?.eventsCreated} />
              </TabsContent>
            </Tabs>
          </CardContent>
        </Card>
      </div>
    </div>
  );
}
