import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from 'src/auth/auth.module';
import { MessageModule } from './../message/message.module';
import { ConversationController } from './conversation.controller';
import { ConversationProfile } from './conversation.profile';
import { ConversationService } from './conversation.service';
import { ConversationEntity } from './entities/conversation.entity';
import { UserModule } from 'src/user/user.module';

@Module({
  imports: [
    TypeOrmModule.forFeature([ConversationEntity]),
    MessageModule,
    AuthModule,
    UserModule,
  ],
  controllers: [ConversationController],
  providers: [ConversationService, ConversationProfile],
  exports: [],
})
export class ConversationModule {}
