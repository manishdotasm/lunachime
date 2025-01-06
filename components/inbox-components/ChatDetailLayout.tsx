"use client";

import { IUser } from "@/models/user-schema";
import ChatDetails from "./ChatDetails";
import ChatList from "./ChatList";
import { useParams } from "next/navigation";

const ChatDetailLayout = ({ user }: { user: IUser | null }) => {
  const { conversationId } = useParams();

  return (
    <div className="main-container">
      <div className="w-1/3 max-lg:hidden">
        <ChatList currentUser={user} currentConversationId={conversationId as string} />
      </div>
      <div className="w-2/3 max-lg:w-full">
        <ChatDetails currentConversationId={conversationId as string} currentUser={user} />
      </div>
    </div>
  );
};

export default ChatDetailLayout;
