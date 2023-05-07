import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { TypeOrmModule } from '@nestjs/typeorm';
import { BaseEntity } from '../common/baseEntity';
import { AuthModule } from './../auth/auth.module';
import { UserEntity } from './entities/user.entity';
import { UserController } from './user.controller';
import { UserProfile } from './user.profile';
import { UserService } from './user.service';
import { FirebaseModule } from '../common/firebase/firebase.module';
@Module({
  imports: [
    ConfigModule.forRoot({}),
    TypeOrmModule.forFeature([UserEntity, BaseEntity]),
    AuthModule,
    FirebaseModule,
  ],
  controllers: [UserController],
  providers: [UserService, UserProfile],
  exports: [UserService],
})
export class UserModule {}
