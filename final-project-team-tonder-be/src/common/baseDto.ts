import { AutoMap } from '@automapper/classes';
import { IsOptional, IsString } from 'class-validator';
import { Column, Entity, PrimaryGeneratedColumn } from 'typeorm';

@Entity()
export class BaseDto {
  @IsOptional()
  @IsString()
  @AutoMap()
  id: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  createdAt: Date;

  @AutoMap()
  updatedAt: Date;

  @IsOptional()
  @IsString()
  @AutoMap()
  deletedAt: Date;
}
