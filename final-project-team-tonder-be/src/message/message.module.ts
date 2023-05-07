/* eslint-disable prettier/prettier */
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { JwtModule } from '@nestjs/jwt';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { FirebaseModule } from 'src/common/firebase/firebase.module';
import { ConversationEntity } from 'src/conversation/entities/conversation.entity';
import { MessageEntity } from './entities/message.entity';
import { MessageGateway } from './gateway/message.gateway';
import { NotificationGateway } from './gateway/notification.gateway';
import { MessageController } from './message.controller';
import { MessageProfile } from './message.profile';
import { MessageService } from './message.service';

@Module({
  imports: [
    ConfigModule.forRoot(),
    TypeOrmModule.forFeature([MessageEntity, ConversationEntity]),
    AuthModule,
    JwtModule,
    FirebaseModule,
  ],
  controllers: [MessageController],
  providers: [
    MessageService,
    MessageGateway,
    NotificationGateway,
    MessageProfile,
  ],
  exports: [MessageService, MessageGateway, NotificationGateway],
})
export class MessageModule {}
