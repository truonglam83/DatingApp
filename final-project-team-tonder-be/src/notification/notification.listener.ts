import { MessageNoti } from './dto/notification.dto';
import { NotificationGateway } from './../message/gateway/notification.gateway';
import { NotificationService } from './notification.service';
import { Injectable } from '@nestjs/common';
import { OnEvent } from '@nestjs/event-emitter';
import { CreateNotificationDto } from './dto/create-notification.dto';
import { SocketNotification } from './dto/socket-notification';

@Injectable()
export class NotificationListener {
  constructor(
    private readonly _notificationService: NotificationService,
    private readonly _notificationGateWay: NotificationGateway
  ) { }

  @OnEvent('notification', { async: true })
  async handleNotification(
    notification: CreateNotificationDto,
    messageNoti: SocketNotification[],
    receiverId: string
  ): Promise<void> {
    const data = await this._notificationService.createNoti(
      notification.userId,
      notification.matchedUser
    );
    let response: MessageNoti;
    if (data) {
      response = {
        fromUser: messageNoti,
        id: data.id,
        isSeen: data.isSeen,
        receiverId,
      };
      await this._notificationGateWay.createNotification(response);
    }
  }
}
