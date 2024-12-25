import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { Button } from "@/components/ui/button";
import { IConversation } from "@/models/conversation-schema";
import { IUser } from "@/models/user-schema";
import { Info, Phone, Video } from "lucide-react";

interface ConversationTopBarProps {
  conversation: IConversation;
  otherUser?: IUser;
  onOpenGroupDetails: () => void;
}

export function ConversationTopBar({ conversation, otherUser, onOpenGroupDetails }: ConversationTopBarProps) {
  const isGroup = conversation.isGroup;

  return (
    <div className="flex items-center justify-between p-4 border-b">
      <div className="flex items-center space-x-3">
        <Avatar className="h-10 w-10">
          <AvatarImage src={isGroup ? conversation.groupImage : otherUser?.profilePicture} />
          <AvatarFallback>
            {isGroup ? conversation.groupName?.slice(0, 2).toUpperCase() : otherUser?.firstName?.slice(0, 1)}
          </AvatarFallback>
        </Avatar>
        <div>
          <h2 className="text-lg font-semibold">
            {isGroup ? conversation.groupName : `${otherUser?.firstName} ${otherUser?.lastName}`}
          </h2>
          <p className="text-sm text-muted-foreground">
            {isGroup ? `${conversation.participants.length} members` : otherUser?.status}
          </p>
        </div>
      </div>
      <div className="flex space-x-2">
        <Button variant="ghost" size="icon">
          <Phone className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon">
          <Video className="h-5 w-5" />
        </Button>
        <Button variant="ghost" size="icon" onClick={onOpenGroupDetails}>
          <Info className="h-5 w-5" />
        </Button>
      </div>
    </div>
  );
}
