export interface IUser {
  distance?: number;
  age: string;
  alcohol: string;
  avatar: string | null;
  bio: string;
  children: boolean;
  education: string;
  gender: string;
  hobbies: string[];
  photos: string[];
  id: string;
  marriage: boolean;
  name: string;
  phone: string;
  reason: string;
  religion: boolean;
  latitude: number;
  longitude: number;
}

export interface IUserImage {
  avatar: {
    file: {
      thumbUrl: string;
      size: number;
    };
  };
  name: string;
  birthday: {
    $d: Date;
  };
}

export interface IMatchUser {
  userId: string;
  matchedUser: string;
  isMatch: boolean
}
export interface IUserNoti {
  fromUser: {
    id: string;
    name: string;
    avatar: string;
  }[];
  id: string;
  isSeen: boolean;
  receiverId?: string;
}

export interface INoti {
  fromUser: {
    id: string;
    name: string;
    avatar: string;
  };
  id: string;
  isSeen: boolean;
  receiverId?: string;
}

export interface IUserMatch {
  id: string;
  name: string;
  avatar: string;
}
