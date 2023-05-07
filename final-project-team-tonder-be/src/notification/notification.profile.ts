import { SocketNotification } from './dto/socket-notification';
import { NotificationEntity } from './entities/notification.entity';
import { NotificationDto } from './dto/notification.dto';
import { createMap, Mapper } from '@automapper/core';
import { AutomapperProfile, InjectMapper } from '@automapper/nestjs';

export class NotificationProfile extends AutomapperProfile {
  constructor(@InjectMapper() mapper: Mapper) {
    super(mapper);
  }

  override get profile() {
    return (mapper) => {
      createMap(mapper, NotificationEntity, NotificationDto);
      createMap(mapper, NotificationEntity, SocketNotification);
    };
  }
}
