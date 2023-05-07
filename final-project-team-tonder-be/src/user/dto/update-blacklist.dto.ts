import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";

export class UpdateBlackList {
  @IsOptional()
  @AutoMap()
  @ApiProperty()

  id: string

}
