import { AutoMap } from '@automapper/classes';
import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';
import { UserEntity } from '../../user/entities/user.entity';

@Entity({ synchronize: false, name: 'match' })
export class MatchEntity extends BaseEntity {
  @Column({ type: 'uuid' })
  @AutoMap()
  userId: string;

  @Column({ nullable: true, type: 'uuid' })
  @AutoMap()
  matchedUser: string;

  @Column({ nullable: true, default: false })
  @AutoMap()
  isMatch: boolean;

  @ManyToOne(() => UserEntity, (user) => user.toMatch)
  @JoinColumn({ name: 'matched_user' })
  @AutoMap()
  toUser?: UserEntity;

  @ManyToOne(() => UserEntity, (user) => user.fromMatch)
  @JoinColumn({ name: 'user_id' })
  @AutoMap()
  fromUser?: UserEntity;
}
