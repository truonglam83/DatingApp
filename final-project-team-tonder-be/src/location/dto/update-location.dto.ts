import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty, IsNumber, IsNumberString } from "class-validator";
import { BaseDto } from "src/common/baseDto";
import { UserEntity } from "src/user/entities/user.entity";

export class UpdateLocationDto extends BaseDto {
  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  latitude: number;

  @IsNotEmpty()
  @AutoMap()
  @ApiProperty()
  @IsNumber()
  longitude: number;

  @AutoMap()
  @ApiProperty()
  userId: string;

  @AutoMap()
  user: UserEntity;
}
