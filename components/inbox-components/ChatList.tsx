"use client";

import React, { useEffect, useState } from "react";
import { Input } from "../ui/input";
import { IConversation } from "@/models/conversation-schema";
import Loader from "./Loader";
import ChatBox from "./ChatBox";
import { IUser } from "@/models/user-schema";

const ChatList = ({
  currentUser,
  currentConversationId,
}: {
  currentUser: IUser | null;
  currentConversationId: string;
}) => {
  const [loading, setLoading] = useState(true);
  const [conversations, setConversations] = useState<IConversation[]>([]);
  const [search, setSearch] = useState("");

  const getConversations = async () => {
    try {
      const res = await fetch(search !== "" ? `/api/searchConversation?search=${search}` : "/api/getConversation");
      const data = await res.json();
      setConversations(data);
      setLoading(false);
    } catch (error) {
      console.error("FAILED TO GET CONVERSATIONS", error);
    }
  };

  useEffect(() => {
    getConversations();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [search]);

  return loading ? (
    <Loader />
  ) : (
    <div className="chat-list">
      <Input placeholder="Search chat..." value={search} onChange={(e) => setSearch(e.target.value)} />

      <div className="chats">
        {conversations.map((conversation, index) => (
          <ChatBox
            conversation={conversation}
            key={index}
            currentUser={currentUser}
            currentConversationId={currentConversationId}
          />
        ))}
      </div>
    </div>
  );
};

export default ChatList;
