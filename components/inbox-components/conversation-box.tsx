import { Card, CardContent } from "@/components/ui/card";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IConversation } from "@/models/conversation-schema";
import { createAvatarStack } from "./avatar-stack";
import { useEffect, useState } from "react";
import axios from "axios";

export function ConversationCard({ conversation }: { conversation: IConversation }) {
  const isGroup = conversation.isGroup;
  const [participantDetails, setParticipantDetails] = useState<{ name: string; avatarUrl?: string }[] | null>(null);

  useEffect(() => {
    const response = axios.get("/api/getParticipants", { params: { participantIds: conversation.participants } });
    response.then((res) => {
      setParticipantDetails(res.data);
    });
  }, [conversation.participants, isGroup]);

  let groupAvatar;
  let participantNames: string[] = [];

  if (participantDetails) {
    participantNames = participantDetails.map((p) => p.name);

    groupAvatar = isGroup ? (
      <div className="flex -space-x-2">{createAvatarStack(participantDetails)}</div>
    ) : (
      <Avatar>
        <AvatarImage
          src={participantDetails[0]?.avatarUrl || "@/public/placeholder.png"}
          alt={participantDetails[0]?.name || "Participant"}
        />
        <AvatarFallback>{participantDetails[0]?.name?.slice(0, 2).toUpperCase() || "JD"}</AvatarFallback>
      </Avatar>
    );
  } else {
    groupAvatar = (
      <Avatar>
        <AvatarImage src="@/public/placeholder.png" alt="Placeholder" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
  }

  return (
    <Card className="mb-2 hover:bg-accent cursor-pointer transition-colors">
      <CardContent className="p-4">
        <div className="flex items-center space-x-4">
          {groupAvatar}
          <div className="flex-1 space-y-1">
            <div className="flex items-center justify-between">
              <p className="text-sm font-medium leading-none">
                {conversation.groupName || participantNames.join(", ") || "Direct Chat"}
              </p>
              <p className="text-xs text-muted-foreground">
                {new Date(conversation.lastMessageDate).toLocaleTimeString()}
              </p>
            </div>
            <p className="text-xs text-muted-foreground line-clamp-1">{conversation.lastMessage}</p>
          </div>
        </div>
      </CardContent>
    </Card>
  );
}

export default ConversationCard;
