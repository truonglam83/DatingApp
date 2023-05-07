import { AutoMap } from '@automapper/classes';
import { ApiProperty } from '@nestjs/swagger';
import { IsOptional } from 'class-validator';
import { UserDto } from 'src/user/dto/user.dto';

export class LocationDto {
  @IsOptional()
  @AutoMap()
  id: string;

  @IsOptional()
  @AutoMap()
  @ApiProperty()
  distance: number;
}
