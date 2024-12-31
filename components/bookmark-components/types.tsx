export interface IPost {
  _id: string;
  author: {
    id: string;
    name: string;
    avatar: string;
  };
  content: string;
  media: {
    url: string;
    type: string;
  }[];
  likes: string[];
  comments: {
    author: string;
    content: string;
    createdAt: Date;
    parentCommentId?: string;
  }[];
  shares: string[];
  visibility: string;
  tags: string[];
  location?: {
    name: string;
    coordinates?: {
      latitude: number;
      longitude: number;
    };
  };
  createdAt: Date;
  updatedAt: Date;
}

export interface IEvent {
  _id: string;
  creator: {
    id: string;
    name: string;
    avatar: string;
  };
  eventName: string;
  description: string;
  location: {
    name: string;
    latitude: number;
    longitude: number;
  };
  eventDate: Date;
  endDate?: Date;
  attendees: string[];
  maxAttendees: number;
  isPublic: boolean;
  eventStatus: "upcoming" | "ongoing" | "completed" | "cancelled";
  media: {
    url: string;
    type: "image" | "video" | "audio";
  }[];
  categories: string[];
  createdAt: Date;
  updatedAt: Date;
  isDeleted: boolean;
}
