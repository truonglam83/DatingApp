import { Column, Entity, ManyToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ synchronize: false, name: 'notification' })
export class NotificationEntity extends BaseEntity {
  @Column({ nullable: true, default: false })
  isSeen: boolean;

  @Column({ nullable: true })
  message: string;

  @Column({ type: 'uuid' })
  userId: string;

  @Column({ type: 'uuid' })
  matchedUser: string;

  @ManyToOne(() => UserEntity, (user) => user.toNotification)
  @JoinColumn({ name: 'user_id' })
  toUser: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.fromNotification)
  @JoinColumn({ name: 'matched_user' })
  fromUser: UserEntity;
}
