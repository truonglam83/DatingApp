import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
export class UserRadiusDto {
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
  radius: number;
}
