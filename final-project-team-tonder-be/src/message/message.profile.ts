import { MessageDto } from './dto/message.dto';
import { MessageEntity } from 'src/message/entities/message.entity';
import { createMap, Mapper, MappingProfile } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { CreateMessageDto } from './dto/create-message.dto';

export class MessageProfile extends AutomapperProfile {
    constructor(@InjectMapper() _mapper: Mapper) {
        super(_mapper);
    };

    override get profile(): MappingProfile {
        return (_mapper) => {
            createMap(_mapper, MessageEntity, MessageDto);
            createMap(_mapper, MessageEntity, CreateMessageDto);

        }
    };
};