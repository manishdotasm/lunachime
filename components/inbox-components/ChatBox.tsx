import { IConversation, IParticipant } from "@/models/conversation-schema";
import { IUser } from "@/models/user-schema";
import Image from "next/image";
import placeholder from "@/public/placeholder.png";
import { format } from "date-fns";
import { useRouter } from "next/navigation";
import { use, useEffect, useState } from "react";
import { IMessage } from "@/models/message-schema";

const ChatBox = ({
  conversation,
  currentUser,
  currentConversationId,
}: {
  conversation: IConversation;
  currentUser: IUser | null;
  currentConversationId: string;
}) => {
  const [messages, setMessages] = useState<IMessage[]>([]);

  useEffect(() => {
    const getMessages = async () => {
      try {
        const res = await fetch(`/api/getMessages?conversationId=${conversation._id}`);
        const data = await res.json();
        setMessages(data);
      } catch (error) {
        console.error("FAILED TO GET MESSAGES", error);
      }
    };
    getMessages();
  }, [conversation._id]);

  const otherMembers: IParticipant[] = conversation?.participants.filter(
    (participant) => participant.userId !== String(currentUser?._id)
  );

  const otherMemberName = otherMembers[0].name;

  const lastMessageObject: IMessage = messages[messages.length - 1];
  const lastMessage: string = lastMessageObject?.content;
  const seen = true;

  const router = useRouter();

  return (
    <div
      className={`chat-box flex items-center  ${String(conversation._id) === currentConversationId ? "bg-blue-2" : ""}`}
      onClick={() => router.push(`/inbox/${String(conversation?._id)}`)}
    >
      <div className="chat-info flex items-center">
        {conversation.isGroup ? (
          <Image
            src={conversation?.groupImage || placeholder}
            alt="Group Image"
            className="profilePhoto"
            height={80}
            width={80}
          />
        ) : (
          <Image
            src={otherMembers[0].avatar || placeholder}
            alt="Other Person"
            className="profilePhoto"
            height={80}
            width={80}
          />
        )}

        <div className="flex flex-col gap-1">
          {conversation.isGroup ? (
            <p className="text-base-bold">{conversation.groupName}</p>
          ) : (
            <p className="text-base-bold">{otherMemberName}</p>
          )}

          {!lastMessage && <p className="text-small-bold">Started a chat</p>}
          {lastMessage && (
            <p className={`last-message ${seen ? "text-small-medium text-grey-3" : "text-small-bold"}`}>
              {lastMessage}
            </p>
          )}
        </div>
      </div>

      <p className="text-base-light text-grey-3">
        {!lastMessage
          ? format(new Date(conversation?.createdAt), "p")
          : format(new Date(conversation?.lastMessageDate), "p")}
      </p>
    </div>
  );
};

export default ChatBox;
