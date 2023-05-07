import { IsBoolean, IsOptional, IsString } from 'class-validator';

import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { PhotoDto } from '../../photo/dto/photo.dto';

export class UserProfileDto {
  @IsString()
  @AutoMap()
  @ApiProperty()
  id: string;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  hobbies: string[];

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
  latitude: number;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  longitude: number;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  distance: number;
}
