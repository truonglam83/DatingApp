import { Injectable } from '@nestjs/common';
import { EntitySubscriberInterface, EventSubscriber, InsertEvent, SoftRemoveEvent, UpdateEvent } from 'typeorm';

@Injectable()
@EventSubscriber()
export class Subscriber implements EntitySubscriberInterface {
    beforeInsert(event: InsertEvent<any>) {
        if (event?.entity) {
            event.entity.createdAt = new Date(new Date().toUTCString());
        }
    }
    beforeUpdate(event: UpdateEvent<any>) {
        if (event?.entity) {
            event.entity.updatedAt = new Date(new Date().toUTCString());
        }
    }
    beforeSoftRemove(event: SoftRemoveEvent<any>) {
        if (event?.entity) {
            event.entity.deletedAt = new Date(new Date().toUTCString());
        }
    }
}

