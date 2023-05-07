import { NotificationModule } from './../notification/notification.module';
import { UserModule } from './../user/user.module';
import { MatchEntity } from 'src/match/entities/match.entity';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Module } from '@nestjs/common';
import { MatchService } from './match.service';
import { MatchController } from './match.controller';
import { MatchProfile } from './match.profile';
import { EventEmitterModule } from '@nestjs/event-emitter';
@Module({
  imports: [
    TypeOrmModule.forFeature([MatchEntity]),
    UserModule,
    NotificationModule,
    EventEmitterModule.forRoot(),
  ],
  controllers: [MatchController],
  providers: [MatchService, MatchProfile],
  exports: [MatchService],
})
export class MatchModule {}
