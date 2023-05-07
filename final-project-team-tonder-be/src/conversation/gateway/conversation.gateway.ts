import {
  ConnectedSocket,
  MessageBody,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { MessageNoti } from 'src/notification/dto/notification.dto';

// @WebSocketGateway(+process.env.API_URL, {
@WebSocketGateway(9906, {
  cors: {
    origin: '*',
  },
})
export class ConversationGateway {
  @WebSocketServer()
  server: Server;

  @SubscribeMessage('conversation')
  async createConversation(@MessageBody() createConversation) {
    try {
    } catch (error) {}
  }
}
