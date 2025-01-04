import { Home, Search, Calendar, Mail, Bell, SquarePen, LucideIcon, BookmarkCheck, User, Origami } from "lucide-react";

type Submenu = {
  href: string;
  label: string;
  active?: boolean;
};

type Menu = {
  href: string;
  label: string;
  active?: boolean;
  icon: LucideIcon;
  submenus?: Submenu[];
};

type Group = {
  groupLabel: string;
  menus: Menu[];
};

export function getMenuList(): Group[] {
  return [
    // Dashboard Group
    {
      groupLabel: "Dashboard",
      menus: [
        {
          href: "/home",
          label: "Home",
          icon: Home,
          submenus: [],
        },
        {
          href: "/search",
          label: "Search",
          icon: Search,
          submenus: [],
        },
      ],
    },

    // Content Group
    {
      groupLabel: "Content",
      menus: [
        {
          href: "/posts",
          label: "Posts",
          icon: SquarePen,
        },
        {
          href: "/events",
          label: "Events",
          icon: Calendar,
        },
        {
          href: "/create",
          label: "Create",
          icon: Origami,
        },
      ],
    },

    // Communication Group
    {
      groupLabel: "Communication",
      menus: [
        {
          href: "/inbox",
          label: "Inbox",
          icon: Mail,
        },
        {
          href: "/notifications",
          label: "Notifications",
          icon: Bell,
        },
      ],
    },

    // Settings Group
    {
      groupLabel: "Account",
      menus: [
        {
          href: "/bookmarks",
          label: "Bookmarks",
          icon: BookmarkCheck,
        },
        {
          href: "/profile",
          label: "Profile",
          icon: User,
        },
      ],
    },
  ];
}
