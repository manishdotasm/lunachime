"use client";

import { useRouter } from "next/navigation";
import { Select, SelectContent, SelectGroup, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { Label } from "../ui/label";

interface SortPostsProps {
  sortBy: string;
}

export function SortPosts({ sortBy }: SortPostsProps) {
  const router = useRouter();

  const handleSortChange = (value: string) => {
    router.push(`?sortBy=${value}`);
  };

  return (
    <div className="mb-4">
      <Label>Sort by</Label>
      <Select value={sortBy} onValueChange={handleSortChange}>
        <SelectTrigger className="w-[180px]">
          <SelectValue placeholder="Sort by" />
        </SelectTrigger>
        <SelectContent>
          <SelectGroup>
            <SelectItem value="recent">Recent</SelectItem>
            <SelectItem value="popular">Popular</SelectItem>
          </SelectGroup>
        </SelectContent>
      </Select>
    </div>
  );
}
