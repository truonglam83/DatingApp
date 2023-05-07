import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';
import { Mapper, createMap } from '@automapper/core';
import { PhotoEntity } from './entities/photo.entity';
import { PhotoDto } from './dto/photo.dto';
export class PhotoProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, PhotoEntity, PhotoDto);
    };
  }
}
