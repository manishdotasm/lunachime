import { IMessage, ISender } from "@/models/message-schema";
import { IUser } from "@/models/user-schema";
import Image from "next/image";
import placeholder from "@/public/placeholder.png";
import { format } from "date-fns";

const MessageBox = ({ message, currentUser }: { message: IMessage; currentUser: IUser | null }) => {
  const sender: ISender = message.sender;

  return sender.userId !== String(currentUser?._id) ? (
    <div className="message-box">
      <Image src={sender.avatar || placeholder} alt="Sender" height={40} width={40} className="profilePhoto" />
      <div className="message-info">
        <p className="text-small-bold">
          {sender.name} &#160; &#183 &#160; {format(new Date(message.createdAt), "p")}
        </p>
        <p className="text-body">{message.content}</p>
      </div>
    </div>
  ) : (
    <div className="message-box justify-end">
      <div className="message-info items-end">
        <p className="text-small-bold">{format(new Date(message.createdAt), "p")}</p>
        <p className="message-text-sender">{message.content}</p>
      </div>
    </div>
  );
};

export default MessageBox;
