"use client";

import { useState } from "react";

import { Tabs, TabsContent, TabsList, TabsTrigger } from "@/components/ui/tabs";
import { Input } from "@/components/ui/input";
import { Search } from "lucide-react";

import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { IEvent, IPost } from "@/components/bookmark-components/types";
import BookmarkCard from "@/components/bookmark-components/bookmark.card";
import EventCard from "@/components/bookmark-components/event-card";
import CustomBreadCrumb from "@/components/admin-panel/custom-breadcrumb";
import PlaceholderContent from "@/components/admin-panel/placeholder-content";
import { ContentLayout } from "@/components/admin-panel/content-layout";

const bookmarks: IPost[] = [
  {
    _id: "1",
    author: {
      id: "user1",
      name: "Jane Doe",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    },
    content: "10 Tips for Better Productivity",
    media: [
      {
        url: "https://images.unsplash.com/photo-1484480974693-6ca0a78fb36b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2072&q=80",
        type: "image",
      },
    ],
    likes: ["user2", "user3"],
    comments: [{ author: "user2", content: "Great tips!", createdAt: new Date("2023-05-16") }],
    shares: ["user4"],
    visibility: "public",
    tags: ["productivity", "tips"],
    createdAt: new Date("2023-05-15"),
    updatedAt: new Date("2023-05-15"),
  },
  {
    _id: "2",
    author: {
      id: "user2",
      name: "John Smith",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JS",
    },
    content: "The Future of AI in Social Media",
    media: [
      {
        url: "https://images.unsplash.com/photo-1488590528505-98d2b5aba04b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        type: "image",
      },
    ],
    likes: ["user1", "user3", "user4"],
    comments: [],
    shares: ["user1"],
    visibility: "public",
    tags: ["AI", "social media", "technology"],
    createdAt: new Date("2023-05-14"),
    updatedAt: new Date("2023-05-14"),
  },
];

const events: IEvent[] = [
  {
    _id: "1",
    creator: {
      id: "user1",
      name: "Jane Doe",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JD",
    },
    eventName: "Tech Conference 2023",
    description: "Annual tech conference featuring the latest in AI and machine learning.",
    location: {
      name: "San Francisco Convention Center",
      latitude: 37.7749,
      longitude: -122.4194,
    },
    eventDate: new Date("2023-06-15T09:00:00"),
    endDate: new Date("2023-06-17T18:00:00"),
    attendees: ["user1", "user2", "user3"],
    maxAttendees: 500,
    isPublic: true,
    eventStatus: "upcoming",
    media: [
      {
        url: "https://images.unsplash.com/photo-1540575467063-178a50c2df87?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1505373877841-8d25f7d46678?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2012&q=80",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1515187029135-18ee286d815b?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        type: "image",
      },
    ],
    categories: ["Technology", "Conference"],
    createdAt: new Date("2023-05-01"),
    updatedAt: new Date("2023-05-01"),
    isDeleted: false,
  },
  {
    _id: "2",
    creator: {
      id: "user2",
      name: "John Smith",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=JS",
    },
    eventName: "Social Media Marketing Workshop",
    description: "Learn the latest strategies in social media marketing.",
    location: {
      name: "New York Digital Hub",
      latitude: 40.7128,
      longitude: -74.006,
    },
    eventDate: new Date("2023-06-20T10:00:00"),
    endDate: new Date("2023-06-20T16:00:00"),
    attendees: ["user1", "user4"],
    maxAttendees: 100,
    isPublic: true,
    eventStatus: "upcoming",
    media: [
      {
        url: "https://images.unsplash.com/photo-1551818255-e6e10975bc17?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=1973&q=80",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1557804506-669a67965ba0?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2074&q=80",
        type: "image",
      },
    ],
    categories: ["Marketing", "Workshop"],
    createdAt: new Date("2023-05-05"),
    updatedAt: new Date("2023-05-05"),
    isDeleted: false,
  },
  {
    _id: "3",
    creator: {
      id: "user3",
      name: "Alice Johnson",
      avatar: "https://api.dicebear.com/6.x/initials/svg?seed=AJ",
    },
    eventName: "Startup Networking Mixer",
    description: "Connect with fellow entrepreneurs and investors in a casual setting.",
    location: {
      name: "Chicago Innovation Hub",
      latitude: 41.8781,
      longitude: -87.6298,
    },
    eventDate: new Date("2023-07-05T18:00:00"),
    endDate: new Date("2023-07-05T21:00:00"),
    attendees: ["user1", "user2", "user4", "user5"],
    maxAttendees: 150,
    isPublic: true,
    eventStatus: "upcoming",
    media: [
      {
        url: "https://images.unsplash.com/photo-1511795409834-ef04bbd61622?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2069&q=80",
        type: "image",
      },
      {
        url: "https://images.unsplash.com/photo-1528605248644-14dd04022da1?ixlib=rb-4.0.3&ixid=M3wxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8fA%3D%3D&auto=format&fit=crop&w=2070&q=80",
        type: "image",
      },
    ],
    categories: ["Networking", "Startup"],
    createdAt: new Date("2023-05-10"),
    updatedAt: new Date("2023-05-10"),
    isDeleted: false,
  },
];

export default function BookmarksPage() {
  const [searchTerm, setSearchTerm] = useState("");
  const [eventFilter, setEventFilter] = useState("all");

  const filteredBookmarks = bookmarks.filter(
    (bookmark) =>
      bookmark.content.toLowerCase().includes(searchTerm.toLowerCase()) ||
      bookmark.author.name.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const filteredEvents = events.filter(
    (event) =>
      (event.eventName.toLowerCase().includes(searchTerm.toLowerCase()) ||
        event.location.name.toLowerCase().includes(searchTerm.toLowerCase())) &&
      (eventFilter === "all" || event.eventStatus === eventFilter)
  );

  return (
    <ContentLayout title="Bookmarks">
      <CustomBreadCrumb />
      <PlaceholderContent>
        <div className="min-h-screen">
          <main className="container mx-auto px-4 py-12">
            <h1 className="text-4xl font-bold mb-8 text-gray-800 dark:text-gray-100">Your Bookmarks</h1>
            <div className="mb-6">
              <div className="relative">
                <Input
                  type="text"
                  placeholder="Search bookmarks and events..."
                  value={searchTerm}
                  onChange={(e) => setSearchTerm(e.target.value)}
                  className="pl-10"
                />
                <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400" size={20} />
              </div>
            </div>
            <Tabs defaultValue="posts" className="w-full">
              <TabsList className="grid w-full grid-cols-2 mb-8">
                <TabsTrigger value="posts" className="text-lg">
                  Saved Posts
                </TabsTrigger>
                <TabsTrigger value="events" className="text-lg">
                  Joined Events
                </TabsTrigger>
              </TabsList>
              <TabsContent value="posts">
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredBookmarks.map((bookmark) => (
                    <BookmarkCard key={bookmark._id} post={bookmark} />
                  ))}
                </div>
              </TabsContent>
              <TabsContent value="events">
                <div className="mb-4 flex justify-between items-center">
                  <h2 className="text-2xl font-semibold">Upcoming Events</h2>
                  <Select value={eventFilter} onValueChange={setEventFilter}>
                    <SelectTrigger className="w-[180px]">
                      <SelectValue placeholder="Filter events" />
                    </SelectTrigger>
                    <SelectContent>
                      <SelectItem value="all">All Events</SelectItem>
                      <SelectItem value="upcoming">Upcoming</SelectItem>
                      <SelectItem value="ongoing">Ongoing</SelectItem>
                      <SelectItem value="completed">Completed</SelectItem>
                    </SelectContent>
                  </Select>
                </div>
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredEvents.map((event) => (
                    <EventCard key={event._id} event={event} />
                  ))}
                </div>
              </TabsContent>
            </Tabs>
          </main>
        </div>
      </PlaceholderContent>
    </ContentLayout>
  );
}
