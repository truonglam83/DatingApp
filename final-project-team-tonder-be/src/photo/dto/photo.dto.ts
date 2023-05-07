import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";
import { IsOptional } from "class-validator";
import { BaseDto } from "../../common/baseDto";

export class PhotoDto {
    @IsOptional()
    @ApiProperty()
    @AutoMap()
    id: string;

    @IsOptional()
    @ApiProperty()
    @AutoMap()
    isFavorite: boolean;

    @IsOptional()
    @ApiProperty()
    @AutoMap()
    link: string;
}
