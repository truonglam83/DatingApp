import { UseGuards } from '@nestjs/common';
import { JwtService } from '@nestjs/jwt';
import { InjectRepository } from '@nestjs/typeorm';
import {
  ConnectedSocket,
  MessageBody,
  OnGatewayConnection,
  OnGatewayDisconnect,
  SubscribeMessage,
  WebSocketGateway,
  WebSocketServer,
} from '@nestjs/websockets';
import { Server, Socket } from 'socket.io';
import { WsJwtGuard } from 'src/auth/guard/ws-jwt.guard';
import { ConversationEntity } from 'src/conversation/entities/conversation.entity';
import { Repository } from 'typeorm';
import { MessageService } from '../message.service';
import { HttpExceptionFilter } from './../../exceptions/http-exception.filter';

@WebSocketGateway({
  cors: {
    origin: '*',
  },
})
export class MessageGateway
  implements OnGatewayConnection, OnGatewayDisconnect
{
  @WebSocketServer()
  server: Server;
  constructor(
    @InjectRepository(ConversationEntity)
    private _conversationRepo: Repository<ConversationEntity>,
    private readonly _messageService: MessageService,
    private readonly _jwtService: JwtService
  ) {}

  private onlineUsers: { [key: string]: string } = {};
  private listOnRoom: { [key: string]: string } = {};

  async handleConnection(client: Socket): Promise<void> {
    try {
      const { token, room }: any = client.handshake.query;
      const user = this._jwtService.verify(token, {
        secret: process.env.JWT_SECRET,
      });
      const userId = user.id;
      this.onlineUsers[user.id] = client.id;
      this.server.emit('onlineUsers', Object.keys(this.onlineUsers));

      const conversation = await this._conversationRepo
        .createQueryBuilder('conversation')
        .where(
          '((conversation.user_id = :userId AND conversation.id = :room) OR (conversation.receiver = :userId AND conversation.id = :room))',
          { userId, room }
        )
        .getOne();

      client.join(room);

      if (!conversation) {
        return;
        // throw new HttpExceptionFilter();
      }
    } catch (error) {
      this.handleDisconnect(client);
      return;
    }
  }

  handleDisconnect(socket: Socket): void {
    const user = Object.keys(this.onlineUsers).find(
      (key) => this.onlineUsers[key] === socket.id
    );
    if (user) {
      const { room }: any = socket.handshake.query;
      socket.leave(room);
      delete this.onlineUsers[user];
    }
  }

  @UseGuards(WsJwtGuard)
  @SubscribeMessage('sendMessage')
  async handleSendMessage(
    @MessageBody() message,
    @ConnectedSocket() client
  ): Promise<any> {
    try {
      const { room } = client.handshake.query;
      this.server.to(room).emit(`recMessage`, message);
      this.server.emit('fetchingMessage');
      // Update the message flag to mark it as read
      const { receiver } = message;

      const senderSocketId = this.onlineUsers[receiver];

      if (message.type === 'text') {
        const result = await this._messageService.createMessage(null, message);

        // Handle is seen message
        if (senderSocketId) {
          const acknowledgement = {
            messageId: result.id,
            roomId: room,
            read: true,
          };
          this.server
            .to(senderSocketId)
            .emit('acknowledgement', acknowledgement);
          await this._messageService.updateMessageFlag(result.id, receiver);
        }

        return result;
      }
    } catch (err) {
      throw new HttpExceptionFilter();
    }
  }
}
