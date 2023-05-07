import { AutoMap } from '@automapper/classes';
import { MessageDto } from '../../message/dto/message.dto';

export class ConversationDto {
  @AutoMap()
  id: string;

  @AutoMap()
  userId: string;

  @AutoMap()
  receiver: string;

  @AutoMap()
  message: MessageDto[];

  @AutoMap()
  createdAt?: Date;

  @AutoMap()
  updatedAt?: Date;

  @AutoMap()
  deletedAt?: Date;
}
