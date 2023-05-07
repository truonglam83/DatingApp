import { AutoMap } from '@automapper/classes';
import { SocketNotification } from './socket-notification';
export class NotificationDto {
  @AutoMap()
  id: string;
  @AutoMap()
  isSeen: boolean;
  @AutoMap()
  message: string;
  @AutoMap()
  userId: string;
  @AutoMap()
  matchedUser: string;
}

export class MessageNoti {
  fromUser: SocketNotification[];
  id: string;
  isSeen: boolean;
  receiverId?: string;
}
