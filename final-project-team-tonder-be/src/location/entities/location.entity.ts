import { Column, Entity, OneToOne, JoinColumn } from 'typeorm';
import { BaseEntity } from '../../common/baseEntity';
import { UserEntity } from '../../user/entities/user.entity';
import { AutoMap } from '@automapper/classes';

@Entity({ synchronize: false, name: 'location' })
export class LocationEntity extends BaseEntity {
  @Column('decimal', { precision: 10, scale: 6 })
  @AutoMap()
  latitude: number;

  @Column('decimal', { precision: 10, scale: 6 })
  @AutoMap()
  longitude: number;

  @Column()
  @AutoMap()
  userId: string;

  @OneToOne(() => UserEntity)
  @JoinColumn({ referencedColumnName: 'id', name: 'user_id' })
  user: UserEntity;
}
