import { AutoMap } from '@automapper/classes';
import { AfterInsert, AfterLoad, Column, Entity, OneToMany } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';
import { ConversationEntity } from '../../conversation/entities/conversation.entity';
import { MatchEntity } from '../../match/entities/match.entity';
import { NotificationEntity } from '../../notification/entities/notification.entity';
import { PhotoEntity } from '../../photo/entities/photo.entity';

@Entity({ synchronize: true, name: 'user' })
export class UserEntity extends BaseEntity {
  @Column({ nullable: true, unique: true })
  @AutoMap()
  phone: string;

  @Column({ nullable: true, default: false })
  @AutoMap()
  isPhoneConfirmed: boolean;

  @Column({ nullable: true, unique: true })
  @AutoMap()
  email: string;

  @Column({ type: 'json', nullable: true })
  @AutoMap()
  hobbies: string[];

  @Column({ nullable: true })
  @AutoMap()
  name: string;

  @Column({ nullable: true })
  @AutoMap()
  avatar: string;

  @Column({ nullable: true })
  @AutoMap()
  gender: string;

  @Column({ nullable: true })
  @AutoMap()
  age: string;

  @Column({ nullable: true })
  @AutoMap()
  bio: string;

  @Column({ nullable: true })
  @AutoMap()
  marriage: boolean;

  @Column({ nullable: true })
  @AutoMap()
  children: boolean;

  @Column({
    type: 'json',
    nullable: true,
  })
  @AutoMap()
  black_list: string[];


  @Column({ nullable: true })
  @AutoMap()
  reason: string;

  @Column({ nullable: true })
  @AutoMap()
  religion: boolean;

  @Column({
    nullable: true,
  })
  @AutoMap()
  @Column({ nullable: true })
  alcohol: string;

  @Column({ nullable: true })
  @AutoMap()
  education: string;

  @OneToMany(() => PhotoEntity, (photos) => photos.user)
  photos: PhotoEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.toUser)
  toNotification?: NotificationEntity[];

  @OneToMany(() => NotificationEntity, (notification) => notification.fromUser)
  fromNotification?: NotificationEntity[];

  @OneToMany(() => MatchEntity, (match) => match.toUser, { cascade: true })
  toMatch?: MatchEntity[];

  @OneToMany(() => MatchEntity, (match) => match.fromUser)
  fromMatch?: MatchEntity[];

  @OneToMany(() => ConversationEntity, (conversation) => conversation.toUser)
  toConversation?: ConversationEntity[];

  @OneToMany(() => ConversationEntity, (conversation) => conversation.fromUser)
  fromConversation?: ConversationEntity[];
}
