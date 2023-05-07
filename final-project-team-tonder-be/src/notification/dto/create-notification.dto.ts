import { AutoMap } from '@automapper/classes';

export class CreateNotificationDto {
  @AutoMap()
  id: string;
  @AutoMap()
  userId: string;
  @AutoMap()
  matchedUser: string;
  @AutoMap()
  isSeen: boolean;
}
