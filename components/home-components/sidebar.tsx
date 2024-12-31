"use client";

import { useState } from "react";
import { Badge } from "@/components/ui/badge";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardHeader, CardTitle } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Calendar, MapPin, Timer, TrendingUpIcon as Trending, Users } from "lucide-react";

type Event = {
  id: number;
  title: string;
  date: string;
  time: string;
  location: string;
  attendees: number;
  category: string;
  description: string;
};

const popularEvents: Event[] = [
  {
    id: 1,
    title: "Annual Tech Conference",
    date: "May 15, 2024",
    time: "9:00 AM",
    location: "Convention Center",
    attendees: 234,
    category: "Tech",
    description:
      "Join us for our annual tech conference featuring keynote speakers, workshops, and networking opportunities.",
  },
  {
    id: 2,
    title: "Community Art Exhibition",
    date: "May 20, 2024",
    time: "6:00 PM",
    location: "City Gallery",
    attendees: 89,
    category: "Art",
    description: "Explore local artists' works and meet the creators behind the pieces.",
  },
  {
    id: 3,
    title: "Startup Networking Mixer",
    date: "May 25, 2024",
    time: "7:00 PM",
    location: "Innovation Hub",
    attendees: 156,
    category: "Networking",
    description: "Connect with fellow entrepreneurs and investors in a casual setting.",
  },
];

function EventCard({ event }: { event: Event }) {
  const [isOpen, setIsOpen] = useState(false);
  const [isAttending, setIsAttending] = useState(false);

  return (
    <>
      <div
        onClick={() => setIsOpen(true)}
        className="group flex items-start space-x-4 rounded-lg p-3 cursor-pointer transition-colors hover:bg-accent"
      >
        <div className="flex h-12 w-12 items-center justify-center rounded-lg border bg-background">
          <Calendar className="h-6 w-6" />
        </div>
        <div className="space-y-1">
          <h4 className="font-semibold">{event.title}</h4>
          <div className="flex items-center text-sm text-muted-foreground">
            <Timer className="mr-1 h-4 w-4" />
            {event.date}
          </div>
          <Badge variant="secondary">{event.category}</Badge>
        </div>
      </div>

      <Dialog open={isOpen} onOpenChange={setIsOpen}>
        <DialogContent>
          <DialogHeader>
            <DialogTitle>{event.title}</DialogTitle>
            <DialogDescription>{event.category} Event</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            <div className="grid gap-2">
              <div className="flex items-center text-sm">
                <Calendar className="mr-2 h-4 w-4" />
                {event.date} at {event.time}
              </div>
              <div className="flex items-center text-sm">
                <MapPin className="mr-2 h-4 w-4" />
                {event.location}
              </div>
              <div className="flex items-center text-sm">
                <Users className="mr-2 h-4 w-4" />
                {event.attendees} attending
              </div>
            </div>
            <p className="text-sm text-muted-foreground">{event.description}</p>
            <Button
              className="w-full"
              variant={isAttending ? "outline" : "default"}
              onClick={() => setIsAttending(!isAttending)}
            >
              {isAttending ? "Cancel Attendance" : "Attend Event"}
            </Button>
          </div>
        </DialogContent>
      </Dialog>
    </>
  );
}

function TrendingWidget() {
  return (
    <Card>
      <CardHeader>
        <CardTitle className="flex items-center gap-2">
          <Trending className="h-5 w-5 text-primary" />
          Trending Stats
        </CardTitle>
      </CardHeader>
      <CardContent>
        <div className="space-y-4">
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Active Users</span>
              <span className="font-semibold">1,234</span>
            </div>
            <div className="h-2 rounded-full bg-secondary">
              <div className="h-full w-3/4 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>New Posts Today</span>
              <span className="font-semibold">456</span>
            </div>
            <div className="h-2 rounded-full bg-secondary">
              <div className="h-full w-1/2 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
          <div className="space-y-2">
            <div className="flex items-center justify-between text-sm">
              <span>Event RSVPs</span>
              <span className="font-semibold">789</span>
            </div>
            <div className="h-2 rounded-full bg-secondary">
              <div className="h-full w-2/3 rounded-full bg-primary animate-pulse" />
            </div>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default function Sidebar() {
  return (
    <ScrollArea className="h-[calc(100vh-8rem)]">
      <div className="space-y-4 pr-4">
        <Card>
          <CardHeader>
            <CardTitle>Popular Events</CardTitle>
          </CardHeader>
          <CardContent className="p-0">
            <ScrollArea className="h-[400px]">
              <div className="space-y-1">
                {popularEvents.map((event) => (
                  <EventCard key={event.id} event={event} />
                ))}
              </div>
            </ScrollArea>
          </CardContent>
        </Card>

        <TrendingWidget />
      </div>
    </ScrollArea>
  );
}
