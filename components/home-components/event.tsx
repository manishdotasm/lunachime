"use client";

import { useState } from "react";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Dialog, DialogContent, DialogDescription, DialogHeader, DialogTitle } from "@/components/ui/dialog";
import { Calendar, MapPin, MoreVertical, Users } from "lucide-react";
import { IEvent } from "@/models/event-schema";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "../ui/carousel";
import Image from "next/image";

export function Event({ event }: { event: IEvent }) {
  const [isDialogOpen, setIsDialogOpen] = useState(false);
  const [isAttending, setIsAttending] = useState(false);

  // Convert serialized date strings back to Date objects
  const eventDate = new Date(event.eventDate);
  const endDate = event.endDate ? new Date(event.endDate) : null;

  // Format the event date
  const formattedEventDate = eventDate.toLocaleDateString("en-US", {
    year: "numeric",
    month: "short",
    day: "numeric",
    hour: "2-digit",
    minute: "2-digit",
  });

  // Format the end date (if available)
  const formattedEndDate = endDate
    ? endDate.toLocaleDateString("en-US", {
        year: "numeric",
        month: "short",
        day: "numeric",
        hour: "2-digit",
        minute: "2-digit",
      })
    : null;

  return (
    <>
      <Card className="bg-[#F0F6FF] border-none cursor-pointer mb-4" onClick={() => setIsDialogOpen(true)}>
        <CardHeader className="flex flex-row items-center gap-4 space-y-0">
          <Avatar className="h-10 w-10">
            <AvatarImage src={event.creator.avatar} alt={event.creator.name} />
            <AvatarFallback>{event.creator.name[0]}</AvatarFallback>
          </Avatar>
          <div className="flex-1">
            <div className="font-semibold">{event.eventName}</div>
            <div className="text-sm text-gray-500">{formattedEventDate}</div>
          </div>
          <Button variant="ghost" size="icon" className="rounded-full">
            <MoreVertical className="h-4 w-4" />
          </Button>
        </CardHeader>
        <CardContent className="space-y-2">
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Calendar className="h-4 w-4" />
            <span>{formattedEventDate}</span>
          </div>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <MapPin className="h-4 w-4" />
            <span>{event.location.name}</span>
          </div>
        </CardContent>
        <CardFooter>
          <div className="flex items-center gap-2 text-sm text-gray-500">
            <Users className="h-4 w-4" />
            <span>
              {event.attendees.length} / {event.maxAttendees} attending
            </span>
          </div>
        </CardFooter>
      </Card>

      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <DialogContent className="max-w-2xl">
          <DialogHeader>
            <DialogTitle>{event.eventName}</DialogTitle>
            <DialogDescription>Organized by {event.creator.name}</DialogDescription>
          </DialogHeader>
          <div className="space-y-4">
            {/* Carousel for Media */}
            {event.media.length > 0 && (
              <Carousel className="w-full">
                <CarouselContent>
                  {event.media.map((mediaItem, i) => (
                    <CarouselItem key={i}>
                      <div className="p-1">
                        <Card>
                          <CardContent className="flex aspect-square items-center justify-center p-6">
                            <Image
                              src={mediaItem.url}
                              alt={`Event media ${i + 1}`}
                              width={500}
                              height={500}
                              className="object-cover w-full h-full rounded-lg"
                            />
                          </CardContent>
                        </Card>
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
            )}

            {/* Event Details */}
            <div className="space-y-2">
              <div className="flex items-center gap-2">
                <Calendar className="h-4 w-4" />
                <span>{formattedEventDate}</span>
              </div>
              {formattedEndDate && (
                <div className="flex items-center gap-2">
                  <Calendar className="h-4 w-4" />
                  <span>Ends at {formattedEndDate}</span>
                </div>
              )}
              <div className="flex items-center gap-2">
                <MapPin className="h-4 w-4" />
                <span>{event.location.name}</span>
              </div>
              <div className="flex items-center gap-2">
                <Users className="h-4 w-4" />
                <span>
                  {event.attendees.length} / {event.maxAttendees} attending
                </span>
              </div>
            </div>

            {/* Event Description */}
            <p>{event.description}</p>

            {/* Attend Button */}
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
