import { Column, Entity, JoinColumn, ManyToOne, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';
import { UserEntity } from '../../user/entities/user.entity';
import { MessageEntity } from '../../message/entities/message.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ synchronize: false, name: 'conversation' })
export class ConversationEntity extends BaseEntity {
  @Column()
  @AutoMap()
  userId: string;

  @Column()
  @AutoMap()
  receiver: string;

  @ManyToOne(() => UserEntity, (user) => user.toConversation)
  @JoinColumn({ name: 'receiver' })
  toUser?: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.fromConversation)
  @JoinColumn({ name: 'user_id' })
  fromUser?: UserEntity;

  @OneToMany(() => MessageEntity, (message) => message.chat)
  message?: MessageEntity[];
}
