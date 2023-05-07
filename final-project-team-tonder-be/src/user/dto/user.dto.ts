import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { BaseDto } from '../../common/baseDto';
import { ConversationDto } from '../../conversation/dto/conversation.dto';
import { MatchDto } from '../../match/dto/match.dto';
import { NotificationDto } from '../../notification/dto/notification.dto';
import { PhotoDto } from '../../photo/dto/photo.dto';

export class UserDto extends BaseDto {
  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty()
  phone: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty()
  email: string;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  hobbies: string[];

  @AutoMap()
  isPhoneConfirmed: boolean;

  @IsString()
  @AutoMap()
  @ApiProperty()
  name: string;

  @IsString()
  @AutoMap()
  @ApiProperty()
  avatar: string;

  @AutoMap()
  @ApiProperty()
  gender: string;

  @AutoMap()
  @ApiProperty()
  age: string;

  @IsOptional()
  @IsString()
  @AutoMap()
  @ApiProperty()
  bio: string;

  @IsOptional()
  @IsBoolean()
  @AutoMap()
  @ApiProperty()
  marriage: boolean;

  @IsOptional()
  @IsBoolean()
  @AutoMap()
  @ApiProperty()
  children: boolean;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  blackList: string[];

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  reason: string;

  @IsOptional()
  @IsBoolean()
  @AutoMap()
  @ApiProperty()
  religion: boolean;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  alcohol: string;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  education: string;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  photos: PhotoDto[];

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  toNotification: NotificationDto[];

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  fromNotification: NotificationDto[];

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  toMatch: MatchDto[];

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  fromMatch: MatchDto[];

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  toConversation: ConversationDto[];

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  fromConversation: ConversationDto[];

  @IsOptional()
  @ApiProperty()
  @AutoMap()
  distance?: number;
}
