import { Column, Entity, JoinColumn, ManyToOne } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';
import { UserEntity } from '../../user/entities/user.entity';
import { AutoMap } from '@automapper/classes';
@Entity({ synchronize: false, name: 'photos' })
export class PhotoEntity extends BaseEntity {
  @Column({ nullable: true })
  @AutoMap()
  link: string;

  @Column({ nullable: true, default: false })
  @AutoMap()
  isFavorite: boolean;

  @Column({ type: 'uuid' })
  @AutoMap()
  userId: string;

  @ManyToOne(() => UserEntity, (user) => user.photos)
  @JoinColumn({ name: 'user_id' })
  user: UserEntity;
}
