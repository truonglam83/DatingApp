import { AutoMap } from '@automapper/classes';

export class MessageDto {
  @AutoMap()
  id: string;

  @AutoMap()
  sender: string;

  @AutoMap()
  receiver: string;

  @AutoMap()
  isSeen: boolean;

  @AutoMap()
  content: string;

  @AutoMap()
  conversationId: string;
}
