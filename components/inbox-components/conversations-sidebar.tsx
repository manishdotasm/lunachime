"use client";

import * as React from "react";
import { Search } from "lucide-react";

import { Input } from "@/components/ui/input";
import { ScrollArea } from "@/components/ui/scroll-area";
import ConversationCard from "./conversation-box";
import { IConversation } from "@/models/conversation-schema";

export function ConversationSidebar({ conversations }: { conversations: IConversation[] | null }) {
  const [filter, setFilter] = React.useState("");

  const filteredConversations = conversations?.filter(
    (conversation) =>
      conversation?.groupName?.toLowerCase().includes(filter.toLowerCase()) ||
      conversation?.lastMessage?.toLowerCase().includes(filter.toLowerCase())
  );

  return (
    <div className="w-80 border-r ">
      <div className="border-b px-4 py-2">
        <div className="relative">
          <Search className="absolute left-2 top-1/2 h-4 w-4 -translate-y-1/2 transform text-muted-foreground" />
          <Input
            type="text"
            placeholder="Search conversations..."
            value={filter}
            onChange={(e) => setFilter(e.target.value)}
            className="pl-8"
          />
        </div>
      </div>
      <div className="h-[calc(100vh-5rem)] px-4">
        <ScrollArea>
          {filteredConversations?.map((conversation) => (
            <ConversationCard key={conversation.id} conversation={conversation} />
          ))}
        </ScrollArea>
      </div>
    </div>
  );
}
