"use client";

import React, { useState } from "react";
import { Card, CardHeader, CardTitle, CardContent, CardFooter } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Textarea } from "@/components/ui/textarea";
import { IUser } from "@/models/user-schema";
import { Label } from "../ui/label";
import { TagsInput } from "react-tag-input-component";
import { toast } from "sonner";
import axios from "axios";
import FileUpload from "../ui/file-upload";
import { Checkbox } from "../ui/checkbox";
import { uploadToCloudinary } from "@/utilities/upload-to-cloudinary";

const PostForm = ({ user }: { user: IUser | null }) => {
  const [content, setContent] = useState<string>("");
  const [media, setMedia] = useState<File[] | null>(null);
  const [isPrivate, setIsPrivate] = useState<boolean>(false);
  const [tags, setTags] = useState<string[]>([]);
  const [isLoading, setIsLoading] = useState<boolean>(false);

  const onSubmit = async (event: React.MouseEvent) => {
    event.preventDefault();
    setIsLoading(true);
    const author = String(user?._id);
    if (!author || !media || !tags) {
      toast.error("Fill all the post-inputs.");
      return;
    }

    const mediaUrls = await Promise.all(media!.map((file) => uploadToCloudinary(file)));
    const visibility = isPrivate ? "private" : "public";

    const response = JSON.stringify({
      author,
      content,
      media: mediaUrls,
      visibility,
      tags,
    });

    axios
      .post("/api/post", response)
      .then(() => toast.success("Post created!"))
      .catch(() => toast.error("Error during post crafting!"))
      .finally(() => setIsLoading(false));
  };

  const handleCheckboxChange = (checked: boolean) => {
    setIsPrivate(checked);
  };

  return (
    <Card className="max-w-md mx-auto ">
      <CardHeader>
        <CardTitle>Create a Post</CardTitle>
      </CardHeader>
      <form>
        <CardContent className="space-y-4">
          <Textarea
            placeholder="What's on your mind?"
            value={content}
            onChange={(e) => setContent(e.target.value)}
            rows={4}
            disabled={isLoading}
          />

          <FileUpload setMedia={setMedia} />

          <div className="space-y-2">
            <Label htmlFor="input-57">Input with inner tags</Label>
            <TagsInput
              value={tags}
              onChange={setTags}
              name="tags"
              placeHolder="Enter tags"
              classNames={{
                input: "w-full min-w-[80px] focus-visible:outline-none shadow-none px-2 h-7",
                tag: "h-7 relative bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
              }}
              disabled={isLoading}
            />
          </div>

          <div className="flex items-center space-x-2">
            <Checkbox
              checked={isPrivate}
              onCheckedChange={(checked) => handleCheckboxChange(!!checked)}
              disabled={isLoading}
            />
            <label htmlFor="private-checkbox">Post privately</label>
          </div>
        </CardContent>
        <CardFooter>
          <Button onClick={onSubmit} className="w-full" disabled={isLoading}>
            Post
          </Button>
        </CardFooter>
      </form>
    </Card>
  );
};

export default PostForm;
