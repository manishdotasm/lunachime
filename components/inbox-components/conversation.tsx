"use client";

import { useState } from "react";
import { ConversationTopBar } from "./conversation-top-bar";
import { ConversationBody } from "./conversation-body";
import { Input } from "@/components/ui/input";
import { Button } from "@/components/ui/button";
import { IConversation } from "@/models/conversation-schema";
import { IUser } from "@/models/user-schema";
import { IMessage } from "@/models/message-schema";
import { Send } from "lucide-react";
import { GroupDetailsSheet } from "./group-details-sheet";

interface ConversationProps {
  conversation: IConversation;
  currentUser: IUser;
  participants: IUser[];
  messages: IMessage[];
}

export function Conversation({ conversation, currentUser, participants, messages }: ConversationProps) {
  const [isGroupDetailsOpen, setIsGroupDetailsOpen] = useState(false);
  const [newMessage, setNewMessage] = useState("");

  const otherUser = participants.find((user) => user._id !== currentUser._id);

  const handleSendMessage = () => {
    // Implement send message logic here
    setNewMessage("");
  };

  return (
    <div className="flex flex-col h-screen">
      <ConversationTopBar
        conversation={conversation}
        otherUser={otherUser}
        onOpenGroupDetails={() => setIsGroupDetailsOpen(true)}
      />
      <ConversationBody messages={messages} currentUser={currentUser} participants={participants} />
      <div className="p-4 border-t">
        <div className="flex space-x-2">
          <Input
            placeholder="Type a message"
            value={newMessage}
            onChange={(e) => setNewMessage(e.target.value)}
            onKeyPress={(e) => e.key === "Enter" && handleSendMessage()}
          />
          <Button onClick={handleSendMessage}>
            <Send className="h-4 w-4" />
          </Button>
        </div>
      </div>
      <GroupDetailsSheet
        isOpen={isGroupDetailsOpen}
        onClose={() => setIsGroupDetailsOpen(false)}
        conversation={conversation}
        participants={participants}
        messages={messages}
      />
    </div>
  );
}
