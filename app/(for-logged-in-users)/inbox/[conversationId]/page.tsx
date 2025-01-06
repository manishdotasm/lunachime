import getCurrentUser from "@/actions/getCurrentUser";
import ChatDetailLayout from "@/components/inbox-components/ChatDetailLayout";

const IndividualConversation = async () => {
  const currentUser = await getCurrentUser();
  return (
    <>
      <ChatDetailLayout user={currentUser} />
    </>
  );
};

export default IndividualConversation;
