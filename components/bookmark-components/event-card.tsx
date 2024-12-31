"use client";

import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Dialog, DialogContent, DialogHeader, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Calendar, MapPin, Users, Tag } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { Badge } from "@/components/ui/badge";
import { IEvent } from "./types";

interface EventCardProps {
  event: IEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card className="overflow-hidden hover:shadow-lg transition-shadow duration-300">
      <CardHeader className="p-0">
        <div className="relative h-48 w-full">
          <Image src={event.media[0].url} alt={event.eventName} layout="fill" objectFit="cover" />
        </div>
      </CardHeader>
      <CardContent className="p-4">
        <h2 className="text-xl font-bold mb-2">{event.eventName}</h2>
        <div className="space-y-2">
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Calendar size={20} className="mr-2" />
            <span>{event.eventDate.toLocaleDateString()}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <MapPin size={20} className="mr-2" />
            <span>{event.location.name}</span>
          </div>
          <div className="flex items-center text-gray-600 dark:text-gray-300">
            <Users size={20} className="mr-2" />
            <span>
              {event.attendees.length} / {event.maxAttendees} attendees
            </span>
          </div>
        </div>
      </CardContent>
      <CardFooter className="bg-gray-50 dark:bg-gray-700 p-4">
        <Dialog>
          <DialogTrigger asChild>
            <Button className="w-full">View Event Details</Button>
          </DialogTrigger>
          <DialogContent className="sm:max-w-[600px]">
            <DialogHeader>
              <DialogTitle className="text-2xl font-bold">{event.eventName}</DialogTitle>
            </DialogHeader>
            <div className="grid gap-4 py-4">
              <Carousel className="w-full max-w-xs mx-auto">
                <CarouselContent>
                  {event.media.map((item, index) => (
                    <CarouselItem key={index}>
                      <div className="relative h-48 w-full">
                        <Image
                          src={item.url}
                          alt={`Event image ${index + 1}`}
                          layout="fill"
                          objectFit="cover"
                          className="rounded-lg"
                        />
                      </div>
                    </CarouselItem>
                  ))}
                </CarouselContent>
                <CarouselPrevious />
                <CarouselNext />
              </Carousel>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Description:</span>
                <span className="col-span-3">{event.description}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Date:</span>
                <span className="col-span-3">{event.eventDate.toLocaleString()}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Location:</span>
                <span className="col-span-3">{event.location.name}</span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Attendees:</span>
                <span className="col-span-3">
                  {event.attendees.length} / {event.maxAttendees}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Categories:</span>
                <span className="col-span-3">
                  {event.categories.map((category, index) => (
                    <Badge key={index} variant="secondary" className="mr-2 mb-2">
                      <Tag size={14} className="mr-1" />
                      {category}
                    </Badge>
                  ))}
                </span>
              </div>
              <div className="grid grid-cols-4 items-center gap-4">
                <span className="font-bold">Status:</span>
                <span className="col-span-3">
                  <Badge variant={event.eventStatus === "upcoming" ? "default" : "secondary"}>
                    {event.eventStatus}
                  </Badge>
                </span>
              </div>
            </div>
          </DialogContent>
        </Dialog>
      </CardFooter>
    </Card>
  );
}
