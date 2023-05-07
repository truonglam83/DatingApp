import { MatchDto } from './dto/match.dto';
import { MatchEntity } from 'src/match/entities/match.entity';
import { createMap, Mapper } from "@automapper/core";
import { AutomapperProfile, InjectMapper } from "@automapper/nestjs";



export class MatchProfile extends AutomapperProfile {
    constructor(@InjectMapper() mapper: Mapper) {
        super(mapper);
    }

    override get profile() {
        return (mapper) => {
            createMap(mapper, MatchEntity, MatchDto);
        };
    }
}
