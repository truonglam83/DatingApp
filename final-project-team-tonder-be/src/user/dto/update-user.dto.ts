import { AutoMap } from '@automapper/classes';
import {
  IsBoolean,
  IsEnum,
  IsNumber,
  IsOptional,
  IsString,
} from 'class-validator';
import { ConversationDto } from '../../conversation/dto/conversation.dto';
import { MatchDto } from '../../match/dto/match.dto';
import { NotificationDto } from '../../notification/dto/notification.dto';
import { PhotoDto } from '../../photo/dto/photo.dto';

export class UpdateUserDto {
  @IsOptional()
  @AutoMap()
  hobbies: string[];

  @IsOptional()
  @IsString()
  @AutoMap()
  name: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  avatar: string;

  @IsOptional()
  @AutoMap()
  gender: string;

  @IsOptional()
  @IsNumber()
  @AutoMap()
  age: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  bio: string;

  @IsOptional()
  @IsBoolean()
  @AutoMap()
  marriage: boolean;

  @IsOptional()
  @IsBoolean()
  @AutoMap()
  children: boolean;

  @IsOptional()
  @AutoMap()
  black_list: string[];

  @IsOptional()
  @AutoMap()
  reason: string;

  @IsOptional()
  @IsBoolean()
  @AutoMap()
  religion: boolean;

  @IsOptional()
  @AutoMap()
  alcohol: string;

  @IsOptional()
  @AutoMap()
  education: string;

  @AutoMap()
  photos: PhotoDto[];
}
