import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';
import { ConversationEntity } from '../../conversation/entities/conversation.entity';
import { AutoMap } from '@automapper/classes';
@Entity({ synchronize: false, name: 'message' })
export class MessageEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  @AutoMap()
  sender: string;

  @Column({ type: 'uuid' })
  @AutoMap()
  receiver: string;

  @Column({ nullable: true, default: false })
  @AutoMap()
  isSeen: boolean;

  @Column()
  @AutoMap()
  content: string;

  @Column({ type: 'uuid' })
  @AutoMap()
  conversationId: string;

  @Column()
  @AutoMap()
  type: string;

  @ManyToOne(() => ConversationEntity, (conversation) => conversation.message)
  @JoinColumn({ name: 'conversation_id' })
  chat: ConversationEntity;
}
