import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { UserModule } from 'src/user/user.module';
import { UserEntity } from '../user/entities/user.entity';
import { LocationEntity } from './entities/location.entity';
import { LocationController } from './location.controller';
import { LocationProfile } from './location.profile';
import { LocationService } from './location.service';
import { MatchModule } from 'src/match/match.module';
import { MatchEntity } from 'src/match/entities/match.entity';

@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forFeature([UserEntity, LocationEntity]),
    UserModule,
    MatchModule,
  ],
  controllers: [LocationController],
  providers: [LocationService, LocationProfile],
})
export class LocationModule {}
