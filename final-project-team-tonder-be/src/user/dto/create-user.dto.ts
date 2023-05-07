import { BaseDto } from './../../common/baseDto';
import { AutoMap } from '@automapper/classes';
import { IsEmail, IsEnum, IsNotEmpty, IsNumber } from 'class-validator';

import { ApiProperty } from '@nestjs/swagger';

export class CreateUserDto extends BaseDto {
  @IsNotEmpty()
  @ApiProperty()
  @AutoMap()
  name: string;

  @IsEmail()
  @AutoMap()
  @ApiProperty()
  email: string;

  @AutoMap()
  @ApiProperty()
  age: string;

  @AutoMap()
  @ApiProperty()
  gender: string;

  @AutoMap()
  isPhoneConfirmed: boolean;

  @AutoMap()
  phone: string;
}
