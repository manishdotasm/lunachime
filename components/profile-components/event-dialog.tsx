import { Dialog, DialogContent, DialogTitle, DialogTrigger } from "@/components/ui/dialog";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { Calendar, MapPin, Users, Share2, Edit, LogOut } from "lucide-react";
import { IEvent } from "@/models/event-schema";
import { Carousel, CarouselContent, CarouselItem, CarouselNext, CarouselPrevious } from "@/components/ui/carousel";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";

interface EventDialogProps {
  event: IEvent;
  children: React.ReactNode;
}

export function EventDialog({ event, children }: EventDialogProps) {
  return (
    <Dialog>
      <DialogTrigger asChild>{children}</DialogTrigger>{" "}
      <VisuallyHidden>
        <DialogTitle></DialogTitle>
      </VisuallyHidden>
      <DialogContent className="sm:max-w-[425px]">
        <div className="space-y-4">
          {/* Event Creator Info */}
          <div className="flex items-center gap-4">
            <Avatar className="w-10 h-10">
              <AvatarImage src={event.creator.avatar || "/placeholder.svg"} />
              <AvatarFallback>
                {event.creator.name[0]}
                {event.creator.name[1]}
              </AvatarFallback>
            </Avatar>
            <div>
              <p className="font-medium">{event.creator.name}</p>
              <p className="text-sm text-gray-500">
                Created on{" "}
                {new Date(event.createdAt).toLocaleDateString("en-US", {
                  month: "long",
                  day: "numeric",
                  year: "numeric",
                })}
              </p>
            </div>
          </div>

          {/* Event Media Carousel */}
          {event.media.length > 0 && (
            <Carousel className="w-full">
              <CarouselContent>
                {event.media.map((mediaItem, index) => (
                  <CarouselItem key={index}>
                    {mediaItem.type === "video" ? (
                      <video controls className="rounded-lg w-full object-cover" src={mediaItem.url} />
                    ) : mediaItem.type === "audio" ? (
                      <audio controls className="w-full">
                        <source src={mediaItem.url} type="audio/mpeg" />
                        Your browser does not support the audio element.
                      </audio>
                    ) : (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img
                        src={mediaItem.url}
                        alt={`Event media ${index + 1}`}
                        className="rounded-lg w-full object-cover"
                      />
                    )}
                  </CarouselItem>
                ))}
              </CarouselContent>
              <CarouselPrevious />
              <CarouselNext />
            </Carousel>
          )}

          {/* Event Details */}
          <div className="space-y-2">
            <h3 className="text-lg font-semibold">{event.eventName}</h3>
            <p className="text-gray-600">{event.description}</p>
            <div className="flex items-center text-gray-600">
              <Calendar className="h-5 w-5 mr-2" />
              <p>
                {new Date(event.eventDate).toLocaleDateString("en-US", {
                  weekday: "long",
                  year: "numeric",
                  month: "long",
                  day: "numeric",
                  hour: "numeric",
                  minute: "numeric",
                })}
              </p>
            </div>
            {event.endDate && (
              <div className="flex items-center text-gray-600">
                <Calendar className="h-5 w-5 mr-2" />
                <p>
                  Ends on{" "}
                  {new Date(event.endDate).toLocaleDateString("en-US", {
                    weekday: "long",
                    year: "numeric",
                    month: "long",
                    day: "numeric",
                    hour: "numeric",
                    minute: "numeric",
                  })}
                </p>
              </div>
            )}
            <div className="flex items-center text-gray-600">
              <MapPin className="h-5 w-5 mr-2" />
              <p>{event.location.name}</p>
            </div>
            <div className="flex items-center text-gray-600">
              <Users className="h-5 w-5 mr-2" />
              <p>
                {event.attendees.length}/{event.maxAttendees} attendees
              </p>
            </div>
          </div>

          {/* Action Buttons */}
          <div className="flex justify-end space-x-2">
            <Button variant="ghost">
              <Share2 className="h-5 w-5 mr-2" />
              Share
            </Button>
            {event.creator.id === "currentUserId" ? ( // Replace with actual user ID check
              <Button variant="outline">
                <Edit className="h-5 w-5 mr-2" />
                Manage Event
              </Button>
            ) : (
              <Button variant="outline">
                <LogOut className="h-5 w-5 mr-2" />
                Leave Event
              </Button>
            )}
          </div>
        </div>
      </DialogContent>
    </Dialog>
  );
}
