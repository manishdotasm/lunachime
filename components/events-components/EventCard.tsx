import Image from "next/image";
import { Card, CardContent, CardFooter, CardHeader } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users } from "lucide-react";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { IEvent } from "@/models/event-schema";

interface EventCardProps {
  event: IEvent;
}

export default function EventCard({ event }: EventCardProps) {
  return (
    <Card>
      <CardHeader>
        <div className="flex items-center space-x-4">
          <Avatar>
            <AvatarImage src={event.creator.avatar} alt={event.creator.name} />
            <AvatarFallback>{event.creator.name.charAt(0)}</AvatarFallback>
          </Avatar>
          <div>
            <h3 className="font-semibold">{event.creator.name}</h3>
            <p className="text-sm text-gray-500">{new Date(event.createdAt).toLocaleDateString()}</p>
          </div>
        </div>
      </CardHeader>
      <CardContent>
        <h2 className="text-xl font-bold mb-2">{event.eventName}</h2>
        <p className="mb-4">{event.description}</p>
        {event.media && event.media.length > 0 && (
          <Carousel className="w-full max-w-xs mx-auto">
            <CarouselContent>
              {event.media.map((media, index) => (
                <CarouselItem key={index}>
                  <div className="p-1">
                    <Image
                      src={media.url}
                      alt={`Event media ${index}`}
                      width={300}
                      height={200}
                      className="rounded-lg object-cover w-full h-[200px]"
                    />
                  </div>
                </CarouselItem>
              ))}
            </CarouselContent>
            <CarouselPrevious />
            <CarouselNext />
          </Carousel>
        )}
        <div className="mt-4 space-y-2">
          <div className="flex items-center space-x-2">
            <Calendar className="w-4 h-4" />
            <p>{new Date(event.eventDate).toLocaleDateString()}</p>
          </div>
          <div className="flex items-center space-x-2">
            <MapPin className="w-4 h-4" />
            <p>{event.location.name}</p>
          </div>
          <div className="flex items-center space-x-2">
            <Users className="w-4 h-4" />
            <p>
              {event.attendees.length} / {event.maxAttendees} attendees
            </p>
          </div>
        </div>
      </CardContent>
      <CardFooter className="flex justify-between">
        <Button variant="ghost" size="sm">
          <Users className="w-4 h-4 mr-2" />
          {event.attendees.length}
        </Button>
        <Button variant="ghost" size="sm">
          <MapPin className="w-4 h-4 mr-2" />
          {event.location.name}
        </Button>
      </CardFooter>
    </Card>
  );
}
