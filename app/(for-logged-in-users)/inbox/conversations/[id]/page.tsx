import { getConversationbyId } from "@/actions/getConversationbyId";
import getCurrentUser from "@/actions/getCurrentUser";
import { getMessagesbyConversationId } from "@/actions/getMessagesbyConversationId";
import { getParticipantsbyConversationId } from "@/actions/getParticipantsbyConversationId";
import { Conversation } from "@/components/inbox-components/conversation";

export default async function ConversationPage({ params }: { params: { id: string } }) {
  const conversation = await getConversationbyId(params.id);
  const currentUser = await getCurrentUser();
  const messages = await getMessagesbyConversationId(params.id);
  const participants = await getParticipantsbyConversationId(params.id);

  if (!conversation || !currentUser) {
    return <div>Loading...</div>;
  }

  return (
    <Conversation
      conversation={conversation}
      currentUser={currentUser}
      participants={participants!}
      messages={messages!}
    />
  );
}
