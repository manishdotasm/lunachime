import { Card, CardContent } from "@/components/ui/card";
import { Users, Calendar, MapPin } from "lucide-react";

import { EventDialog } from "./event-dialog";
import { useEffect, useState } from "react";
import { IEvent } from "@/models/event-schema";
import axios from "axios";

export function EventList({ eventIDs }: { eventIDs: string[] | undefined }) {
  const [events, setEvents] = useState<IEvent[]>([]);

  useEffect(() => {
    const fetchEvents = async () => {
      const res = await axios.get("/api/events", { params: { eventIDs } });
      setEvents(res.data);
    };
    fetchEvents();
  }, [eventIDs]);

  return (
    <div className="grid gap-4 mt-4">
      {events?.map((event, index) => (
        <EventDialog key={index} event={event}>
          <Card className="cursor-pointer hover:shadow-lg transition-shadow">
            <CardContent className="p-6">
              <div className="flex items-center justify-between">
                <div>
                  <h3 className="text-lg font-semibold mb-1">{event.eventName}</h3>
                  <p className="text-gray-600 flex items-center">
                    <Calendar className="h-4 w-4 mr-2" />
                    {new Date(event.eventDate).toLocaleDateString("en-US", {
                      month: "short",
                      day: "numeric",
                      year: "numeric",
                    })}
                  </p>
                  <p className="text-gray-600 flex items-center mt-1">
                    <MapPin className="h-4 w-4 mr-2" />
                    {event.location.name}
                  </p>
                </div>
              </div>
              <div className="mt-4">
                <p className="text-sm text-gray-600 flex items-center">
                  <Users className="h-4 w-4 mr-2" />
                  {event.attendees.length} attendees
                </p>
              </div>
            </CardContent>
          </Card>
        </EventDialog>
      ))}
    </div>
  );
}
