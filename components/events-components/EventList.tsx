"use client";

import { useState, useEffect, useCallback } from "react";
import { useInView } from "react-intersection-observer";
import EventCard from "./EventCard";
import { Button } from "@/components/ui/button";
import { IEvent } from "@/models/event-schema";

interface EventListProps {
  initialEvents: IEvent[];
  sortBy: "recent" | "popular";
}

export default function EventList({ initialEvents, sortBy }: EventListProps) {
  const [events, setEvents] = useState<IEvent[]>(initialEvents);
  const [page, setPage] = useState(2); // Start from page 2 as we already have initial events
  const [loading, setLoading] = useState(false);
  const [hasMore, setHasMore] = useState(true);
  const { ref, inView } = useInView();

  const fetchMoreEvents = useCallback(async () => {
    if (loading || !hasMore) {
      return;
    }
    setLoading(true);
    try {
      const response = await fetch(`/api/getevents?page=${page}&sortBy=${sortBy}`);
      if (!response.ok) {
        throw new Error("Failed to fetch events");
      }
      const newEvents = await response.json();
      if (newEvents.length === 0) {
        setHasMore(false); // No more events to load
      } else {
        setEvents((prevEvents) => [...prevEvents, ...newEvents]);
        setPage((prevPage) => prevPage + 1);
      }
    } catch (error) {
      console.error("Error fetching events:", error);
    } finally {
      setLoading(false); // Reset loading state
    }
  }, [page, sortBy, loading, hasMore]);

  useEffect(() => {
    setEvents(initialEvents);
    setPage(2);
    setHasMore(true);
  }, [sortBy, initialEvents]);

  useEffect(() => {
    if (inView && hasMore && !loading) {
      fetchMoreEvents();
    }
  }, [inView, hasMore, loading, fetchMoreEvents]);

  return (
    <div className="max-w-2xl mx-auto">
      <div className="space-y-4">
        {events.map((event, index) => (
          <EventCard key={index} event={event} />
        ))}
      </div>
      <div ref={ref} className="flex justify-center mt-4">
        {loading && <p>Loading more events...</p>}
        {!loading && hasMore && (
          <Button onClick={fetchMoreEvents} disabled={loading}>
            Load More
          </Button>
        )}
        {!hasMore && <p>No more events to load</p>}
      </div>
    </div>
  );
}
