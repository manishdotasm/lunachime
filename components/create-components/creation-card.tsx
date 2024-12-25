import { CalendarIcon } from "@radix-ui/react-icons";
import { FlameKindling, Origami } from "lucide-react";
import { IconAnalyze } from "@tabler/icons-react";
import { BentoCard, BentoGrid } from "../ui/bento-grid";

const features = [
  {
    Icon: IconAnalyze,
    name: "Get Inpiration",
    description: "Gather some inspiration from your feed.",
    href: "/home",
    cta: "Go home",
    className: "col-span-3 lg:col-span-1",
    background: <div></div>,
  },
  {
    Icon: Origami,
    name: "Create Post",
    description: "Create a post for the world to see, or just your followers.",
    href: "/create/post",
    cta: "Create Post",
    className: "col-span-3 lg:col-span-2 border-2 border-gray-300",
    background: <div></div>,
  },
  {
    Icon: CalendarIcon,
    name: "Events",
    description: "Create an event like a sports competition or a campfire gathering for people to join and have fun.",
    href: "/create/event",
    cta: "Create Event",
    className: "col-span-3 lg:col-span-2 border-2 border-gray-300",
    background: <div></div>,
  },
  {
    Icon: FlameKindling,
    name: "See Events",
    description: "Use the calendar to filter your files by date.",
    className: "col-span-3 lg:col-span-1 ",
    href: "/events",
    cta: "Visit Events",
    background: <div></div>,
  },
];

export function CreationCards() {
  return (
    <BentoGrid>
      {features.map((feature, idx) => (
        <BentoCard key={idx} {...feature} />
      ))}
    </BentoGrid>
  );
}
