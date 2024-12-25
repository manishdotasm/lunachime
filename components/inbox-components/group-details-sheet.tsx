import { Sheet, SheetContent, SheetHeader, SheetTitle } from "@/components/ui/sheet";
import { ScrollArea } from "@/components/ui/scroll-area";
import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";
import { IConversation } from "@/models/conversation-schema";
import { IUser } from "@/models/user-schema";
import { IMessage } from "@/models/message-schema";

interface GroupDetailsSheetProps {
  isOpen: boolean;
  onClose: () => void;
  conversation: IConversation;
  participants: IUser[];
  messages: IMessage[];
}

export function GroupDetailsSheet({ isOpen, onClose, conversation, participants, messages }: GroupDetailsSheetProps) {
  const mediaMessages = messages.filter((message) => message.media && message.media.length > 0);

  return (
    <Sheet open={isOpen} onOpenChange={onClose}>
      <SheetContent className="w-[400px] sm:w-[540px]">
        <SheetHeader>
          <SheetTitle>{conversation.isGroup ? conversation.groupName : "Conversation Details"}</SheetTitle>
        </SheetHeader>
        <ScrollArea className="h-[calc(100vh-120px)] mt-6">
          {conversation.isGroup && (
            <>
              <h3 className="font-semibold mb-2">Group Description</h3>
              <p className="text-sm mb-6">{conversation.groupDescription || "No description available."}</p>
            </>
          )}

          <h3 className="font-semibold mb-2">Participants</h3>
          <div className="space-y-4 mb-6">
            {participants.map((user, index) => (
              <div key={index} className="flex items-center space-x-3">
                <Avatar>
                  <AvatarImage src={user.profilePicture} />
                  <AvatarFallback>{user.firstName?.slice(0, 1)}</AvatarFallback>
                </Avatar>
                <div>
                  <p className="font-medium">{`${user.firstName} ${user.lastName}`}</p>
                  <p className="text-sm text-muted-foreground">{user.status}</p>
                </div>
              </div>
            ))}
          </div>

          <h3 className="font-semibold mb-2">Shared Media</h3>
          <div className="grid grid-cols-3 gap-2 mb-6">
            {mediaMessages.slice(0, 9).map((message, index) => (
              <div key={index} className="aspect-square overflow-hidden rounded">
                {message.media && message.media[0].type.startsWith("image") ? (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img src={message.media[0].url} alt="Shared media" className="w-full h-full object-cover" />
                ) : (
                  <video src={message.media && message.media[0].url} className="w-full h-full object-cover" />
                )}
              </div>
            ))}
          </div>

          <h3 className="font-semibold mb-2">Group Settings</h3>
          <div className="space-y-2">
            <p className="text-sm">Muted: {conversation.isMuted ? "Yes" : "No"}</p>
            <p className="text-sm">Archived: {conversation.isArchived ? "Yes" : "No"}</p>
            <p className="text-sm">Pinned Messages: {conversation.pinnedMessages.length}</p>
          </div>
        </ScrollArea>
      </SheetContent>
    </Sheet>
  );
}
