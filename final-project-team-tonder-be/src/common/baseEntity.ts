import { AutoMap } from '@automapper/classes';
import {
  PrimaryGeneratedColumn,
  CreateDateColumn,
  UpdateDateColumn,
  DeleteDateColumn,
} from 'typeorm';

export class BaseEntity {
  @PrimaryGeneratedColumn('uuid')
  @AutoMap()
  id: string;

  @CreateDateColumn()
  @AutoMap()
  createdAt?: Date;

  @UpdateDateColumn()
  @AutoMap()
  updatedAt?: Date;

  @DeleteDateColumn()
  @AutoMap()
  deletedAt?: Date;
}
