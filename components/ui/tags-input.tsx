// eslint-disable-next-line @typescript-eslint/ban-ts-comment
//@ts-nocheck

"use client";

import { Label } from "@/components/ui/label";
import { Tag, TagInput } from "emblor";
import { Dispatch, SetStateAction, useState } from "react";

interface InputDemoProps {
  tags: Tag[];
  setTags: Dispatch<SetStateAction<Tag[]>>;
}

const TagsInputBetter: React.FC<InputDemoProps> = ({ tags, setTags }) => {
  const [activeTagIndex, setActiveTagIndex] = useState<number | null>(null);

  return (
    <div className="space-y-2">
      <Label htmlFor="input-56">Input with tags</Label>
      <TagInput
        id="input-56"
        tags={tags}
        setTags={setTags}
        placeholder="Add a tag"
        styleClasses={{
          tagList: {
            container: "gap-1",
          },
          input:
            "rounded-lg transition-shadow placeholder:text-muted-foreground/70 focus-visible:border-ring focus-visible:outline-none focus-visible:ring-[3px] focus-visible:ring-ring/20",
          tag: {
            body: "relative h-7 bg-background border border-input hover:bg-background rounded-md font-medium text-xs ps-2 pe-7",
            closeButton:
              "absolute -inset-y-px -end-px p-0 rounded-s-none rounded-e-lg flex size-7 transition-colors outline-0 focus-visible:outline focus-visible:outline-2 focus-visible:outline-ring/70 text-muted-foreground/80 hover:text-foreground",
          },
        }}
        activeTagIndex={activeTagIndex}
        setActiveTagIndex={setActiveTagIndex}
        inlineTags={false}
        inputFieldPosition="top"
      />
      <p className="mt-2 text-xs text-muted-foreground" role="region" aria-live="polite">
        Built with{" "}
        <a
          className="underline hover:text-foreground"
          href="https://github.com/JaleelB/emblor"
          target="_blank"
          rel="noopener nofollow"
        >
          emblor
        </a>
      </p>
    </div>
  );
};

export default TagsInputBetter;
