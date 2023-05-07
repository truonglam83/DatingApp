import { MessageDto } from './../message/dto/message.dto';
import { MessageEntity } from 'src/message/entities/message.entity';
import { ConversationDto } from 'src/conversation/dto/conversation.dto';
import { ConversationEntity } from './entities/conversation.entity';
import {
  Mapper,
  MappingProfile,
  createMap,
  forMember,
  mapFrom,
} from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

export class ConversationProfile extends AutomapperProfile {
  constructor(@InjectMapper() _mapper: Mapper) {
    super(_mapper);
  }

  override get profile(): MappingProfile {
    return (_mapper) => {
      createMap(
        _mapper,
        ConversationEntity,
        ConversationDto,

        forMember(
          (destination) => destination.message,
          mapFrom((source) =>
            (source.message || []).map((item) =>
              this.mapper.map(item, MessageEntity, MessageDto)
            )
          )
        )
      );
      createMap(_mapper, ConversationEntity, ConversationDto)
    };
  }
}
