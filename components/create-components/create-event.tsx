"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { Input } from "@/components/ui/input";
import { Checkbox } from "@/components/ui/checkbox";
import { Label } from "@/components/ui/label";
import { TagsInput } from "react-tag-input-component";
import { toast } from "sonner";
import axios from "axios";
import { IUser } from "@/models/user-schema";
import { Dialog, DialogContent, DialogFooter, DialogHeader, DialogTitle } from "../ui/dialog";
import { VisuallyHidden } from "@radix-ui/react-visually-hidden";
import EventMap from "../ui/map-selector";
import { uploadToCloudinary } from "@/utilities/upload-to-cloudinary";
import FileUpload from "../ui/file-upload";

const EventForm = ({ user }: { user: IUser | null }) => {
  const [eventName, setEventName] = useState<string>("");
  const [description, setDescription] = useState<string>("");
  const [eventDate, setEventDate] = useState<string>("");
  const [endDate, setEndDate] = useState<string>("");
  const [location, setLocation] = useState<{ latitude: number; longitude: number }>({
    latitude: 0,
    longitude: 0,
  });
  const [isDialogOpen, setIsDialogOpen] = useState<boolean>(false);
  const [isPublic, setIsPublic] = useState<boolean>(true);
  const [categories, setCategories] = useState<string[]>([]);
  const [media, setMedia] = useState<File[] | null>(null); // Store media files
  const [isLoading, setIsLoading] = useState<boolean>(false);
  const [attendees, setAttendees] = useState<number>(10);

  // Handle file uploads
  const handleFileUpload = (files: File[]) => {
    setMedia(files); // Store the files in state
  };

  // Handle form submission
  const handleSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);

    const creator = String(user?._id);

    if (!creator || !eventName || !description || !eventDate || !categories.length) {
      toast.error("Please fill in all required fields.");
      setIsLoading(false);
      return;
    }

    const mediaUrls = await Promise.all(media!.map((file) => uploadToCloudinary(file)));

    const eventData = {
      creator: creator,
      eventName: eventName,
      description: description,
      eventDate: eventDate,
      endDate: endDate || "",
      maxAttendees: String(attendees),
      isPublic: String(isPublic),
      categories: JSON.stringify(categories),
      location: location,
      media: mediaUrls,
    };

    try {
      await axios.post("/api/event", eventData);
      toast.success("Event created successfully!");
      // eslint-disable-next-line @typescript-eslint/no-unused-vars
    } catch (error) {
      toast.error("Failed to create event.");
      setIsLoading(false);
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <Card className="max-w-md mx-auto sm:max-w-lg lg:max-w-2xl xl:max-w-3xl ">
      <CardHeader>
        <CardTitle>Create an Event</CardTitle>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <div>
            <Label htmlFor="eventName">Event Name</Label>
            <Input
              id="eventName"
              value={eventName}
              onChange={(e) => setEventName(e.target.value)}
              placeholder="Enter event name"
              disabled={isLoading}
              required
            />
          </div>

          <div>
            <Label htmlFor="description">Description</Label>
            <Textarea
              id="description"
              value={description}
              onChange={(e) => setDescription(e.target.value)}
              placeholder="Describe the event"
              rows={4}
              disabled={isLoading}
              required
            />
          </div>

          <div className="flex flex-col sm:flex-row sm:justify-between gap-x-2">
            <div className="w-full sm:w-1/2">
              <Label htmlFor="eventDate">Event Date</Label>
              <Input
                type="datetime-local"
                id="eventDate"
                value={eventDate}
                onChange={(e) => setEventDate(e.target.value)}
                disabled={isLoading}
                required
              />
            </div>

            <div className="w-full sm:w-1/2">
              <Label htmlFor="endDate">End Date</Label>
              <Input
                type="datetime-local"
                id="endDate"
                value={endDate}
                onChange={(e) => setEndDate(e.target.value)}
                disabled={isLoading}
              />
            </div>
          </div>

          <div className="w-full">
            <Label htmlFor="maxAttendees">Max Attendees</Label>
            <Input
              type="number"
              id="maxAttendees"
              value={attendees}
              onChange={(e) => setAttendees(parseInt(e.target.value, 10))}
              placeholder="Enter max attendees"
              disabled={isLoading}
              required
            />
          </div>

          <div className="space-y-2">
            <Label htmlFor="categories">Categories</Label>
            <TagsInput
              value={categories}
              onChange={setCategories}
              name="categories"
              placeHolder="Enter categories"
              classNames={{
                input: "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
                tag: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
              }}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox checked={isPublic} onCheckedChange={(checked) => setIsPublic(!!checked)} disabled={isLoading} />
            <label htmlFor="isPublic">Make event public</label>
          </div>

          <div>
            <Label className="mr-2">Location</Label>
            <Button onClick={() => setIsDialogOpen(true)} disabled={isLoading} variant={"outline"}>
              Select Location
            </Button>
          </div>

          <div>
            <Label>Media</Label>
            <FileUpload setMedia={handleFileUpload} />
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={handleSubmit} className="w-full">
            Create Event
          </Button>
        </CardFooter>
      </form>

      {/* Map Selector Dialog */}
      <Dialog open={isDialogOpen} onOpenChange={setIsDialogOpen}>
        <VisuallyHidden>
          <DialogTitle></DialogTitle>
        </VisuallyHidden>
        <DialogContent>
          <DialogHeader>
            <h3>Select Event Location</h3>
          </DialogHeader>
          <EventMap
            markerPosition={[location.latitude, location.longitude]}
            setMarkerPosition={(latLng) => setLocation({ latitude: latLng[0], longitude: latLng[1] })}
            allowPointerMove={!isLoading}
          />
          <DialogFooter>
            <Button
              onClick={(e) => {
                e.preventDefault();
                setIsDialogOpen(false);
              }}
            >
              Close
            </Button>
          </DialogFooter>
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default EventForm;
