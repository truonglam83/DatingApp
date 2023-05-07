import { MessageModule } from './../message/message.module';
import { UserModule } from 'src/user/user.module';
import { NotificationEntity } from './entities/notification.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { NotificationService } from './notification.service';
import { NotificationController } from './notification.controller';
import { NotificationListener } from './notification.listener';
import { NotificationProfile } from './notification.profile';

@Module({
  imports: [
    TypeOrmModule.forFeature([NotificationEntity]),
    UserModule,
    MessageModule,
  ],
  controllers: [NotificationController],
  providers: [NotificationService, NotificationListener, NotificationProfile],
  exports: [NotificationService, NotificationListener],
})
export class NotificationModule {}
