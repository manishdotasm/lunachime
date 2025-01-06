"use client";

import { IConversation, IParticipant } from "@/models/conversation-schema";
import { useEffect, useState } from "react";
import Loader from "./Loader";
import { useSession } from "next-auth/react";
import Image from "next/image";
import placeholder from "@/public/placeholder.png";
import { IconPhoto } from "@tabler/icons-react";
import { Input } from "../ui/input";
import { Button } from "../ui/button";
import { IMessage } from "@/models/message-schema";
import MessageBox from "./MessageBox";
import { IUser } from "@/models/user-schema";

const ChatDetails = ({
  currentConversationId,
  currentUser,
}: {
  currentConversationId: string;
  currentUser: IUser | null;
}) => {
  const [loading, setLoading] = useState(true);
  const [conversation, setConversation] = useState<IConversation | null>(null);
  const [otherMembers, setOtherMembers] = useState<IParticipant[]>([]);
  const [text, setText] = useState("");
  const [messages, setMessages] = useState<IMessage[]>([]);

  const getConversationDetails = async () => {
    try {
      const res = await fetch(`/api/getSpecificConversation?conversationId=${currentConversationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setConversation(data);
      setOtherMembers(
        data.participants.filter((participant: IParticipant) => participant.userId !== String(currentUser?._id))
      );
      setLoading(false);
    } catch (error) {
      console.error("FAILED TO GET CONVERSATION DETAILS", error);
    }
  };

  useEffect(() => {
    getConversationDetails();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConversationId]);

  const sendText = async () => {
    try {
      const res = await fetch("/api/sendMessage", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          conversationId: currentConversationId,
          sender: String(currentUser?._id),
          content: text,
          media: [],
        }),
      });

      if (res.ok) setText("");

      setText("");
    } catch (error) {
      console.error("FAILED TO SEND MESSAGE", error);
    }
  };

  const LoadMessages = async () => {
    try {
      const res = await fetch(`/api/getMessages?conversationId=${currentConversationId}`, {
        method: "GET",
        headers: {
          "Content-Type": "application/json",
        },
      });
      const data = await res.json();
      setMessages(data);
    } catch (error) {
      console.error("FAILED TO GET MESSAGES", error);
    }
  };

  useEffect(() => {
    LoadMessages();
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentConversationId]);

  return loading ? (
    <Loader />
  ) : (
    <div className="chat-details">
      <div className="chat-header">
        {conversation?.isGroup ? (
          <div className="flex items-center gap-x-4">
            <Image
              className="profilePhoto"
              src={conversation?.groupImage || placeholder}
              alt="Group Photo"
              width={80}
              height={80}
            />
            <div className="text">
              <p>
                {conversation?.groupName} &#160; &#160; &#160; {conversation?.participants.length} members
              </p>
            </div>
          </div>
        ) : (
          <div className="flex items-center gap-x-4">
            <Image
              className="profilePhoto"
              src={otherMembers[0].avatar || placeholder}
              alt="Profile Picture"
              height={80}
              width={80}
            />
            <div className="text">
              <p>{otherMembers[0].name}</p>
            </div>
          </div>
        )}
      </div>

      <div className="chat-body">
        {messages.map((message, index) => (
          <MessageBox key={index} message={message} currentUser={currentUser} />
        ))}
      </div>

      <div className="send-message">
        <div className="prepare-message">
          <IconPhoto size={24} />
          <Input
            type="text"
            placeholder="Type a message..."
            value={text}
            onChange={(e) => setText(e.target.value)}
            required
            className="input-field"
          />
        </div>
        <Button onClick={sendText}></Button>
      </div>
    </div>
  );
};

export default ChatDetails;
