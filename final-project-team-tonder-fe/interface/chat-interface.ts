import { StaticImageData } from 'next/image';

export interface IMatchedUser {
  id: string;
  name: string;
  avatar: string | null | StaticImageData;
}

export interface IChatList {
  conversationId: string;
  user: {
    id: string;
    name: string;
    avatar: string;
  };
  infoLastMess: {
    content: string;
    createdAt: string;
    type: string;
  };
}

export interface IChatContent {
  content: string;
  conversationId: string;
  createdAt?: string;
  deletedAt?: null;
  id: string;
  isSeen: false;
  receiver: string;
  sender: string;
  updatedAt?: string;
  type: string;
}

export interface IConversation {
  conversation_id: string;
  id: string;
  userId: string;
  receiver: string;
  createdAt?: string;
  updatedAt?: string;
  deletedAt?: string;
}

export interface IMessage {
  sender: string | undefined;
  receiver: string;
  content: string;
  conversationId: string | string[] | undefined;
  type: string;
}
