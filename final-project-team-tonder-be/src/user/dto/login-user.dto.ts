import { BaseDto } from './../../common/baseDto';
import { AutoMap } from "@automapper/classes";
import { ApiProperty } from "@nestjs/swagger";

export class LoginDto {

    @AutoMap()
    id: string;

    @AutoMap()
    @ApiProperty()
    phone: string;

    @AutoMap()
    email: string;

    @AutoMap()
    name: string;

    @AutoMap()
    isPhoneConfirmed: boolean;

    accessToken?: string;

}
