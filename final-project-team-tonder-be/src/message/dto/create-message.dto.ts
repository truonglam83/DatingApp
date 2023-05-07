import { BaseDto } from './../../common/baseDto';
import { AutoMap } from '@automapper/classes';

export class CreateMessageDto {
  @AutoMap()
  id: string;

  @AutoMap()
  sender: string;

  @AutoMap()
  receiver: string;

  @AutoMap()
  content: string;

  @AutoMap()
  conversationId: string;

  @AutoMap()
  type: string;


}
