import {
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server } from 'socket.io';
import { MessageNoti } from 'src/notification/dto/notification.dto';

// @WebSocketGateway(+process.env.API_URL, {
@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class NotificationGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('createNotification')
  async createNotification(@MessageBody() message: MessageNoti) {
    this.server.emit('noti', message);
  }
}
