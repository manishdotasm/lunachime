import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IMessage } from "@/models/message-schema";
import { IUser } from "@/models/user-schema";
import { format } from "date-fns";
import { Key } from "react";

interface ConversationBodyProps {
  messages: IMessage[];
  currentUser: IUser;
  participants: IUser[];
}

export function ConversationBody({ messages, currentUser, participants }: ConversationBodyProps) {
  const getUser = (userId: string) => participants.find((user) => user._id === userId);

  return (
    <ScrollArea className="flex-1 p-4">
      {messages.map((message, index) => {
        const isCurrentUser = message.sender === currentUser._id;
        const sender = getUser(message.sender);
        const showAvatar = index === 0 || messages[index - 1].sender !== message.sender;

        return (
          <div key={index} className={`flex mb-4 ${isCurrentUser ? "justify-end" : "justify-start"}`}>
            {!isCurrentUser && showAvatar && (
              <Avatar className="h-8 w-8 mr-2">
                <AvatarImage src={sender?.profilePicture} />
                <AvatarFallback>{sender?.firstName?.slice(0, 1)}</AvatarFallback>
              </Avatar>
            )}
            <div
              className={`max-w-[70%] ${
                isCurrentUser ? "bg-primary text-primary-foreground" : "bg-secondary"
              } rounded-lg p-3`}
            >
              {!isCurrentUser && <p className="text-xs font-semibold mb-1">{sender?.firstName}</p>}
              <p>{message.content}</p>
              {message.media &&
                message.media.map((media: { type: string; url: string | undefined }, index: Key | null | undefined) => (
                  <div key={index} className="mt-2">
                    {media.type.startsWith("image") ? (
                      // eslint-disable-next-line @next/next/no-img-element
                      <img src={media.url} alt="Media" className="max-w-full rounded" />
                    ) : (
                      <video src={media.url} controls className="max-w-full rounded" />
                    )}
                  </div>
                ))}
              <p className="text-xs mt-1 opacity-70">{format(new Date(message.createdAt), "HH:mm")}</p>
            </div>
          </div>
        );
      })}
    </ScrollArea>
  );
}
