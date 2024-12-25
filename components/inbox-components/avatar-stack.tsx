import { Avatar, AvatarFallback, AvatarImage } from "@/components/ui/avatar";

export function createAvatarStack(participants: { name: string; avatarUrl?: string }[] | null) {
  if (!participants || participants.length === 0) {
    return (
      <Avatar>
        <AvatarImage src="@/public/placeholder.png" />
        <AvatarFallback>JD</AvatarFallback>
      </Avatar>
    );
  }

  return participants.map((participant, index) => (
    <Avatar key={index} className={`-ml-2 border-2 border-white ${index === 0 ? "" : "-ml-2"}`}>
      <AvatarImage src={participant.avatarUrl || "@/public/placeholder.png"} alt="Avatar" />
      <AvatarFallback>{participant.name.slice(0, 2).toUpperCase()}</AvatarFallback>
    </Avatar>
  ));
}
