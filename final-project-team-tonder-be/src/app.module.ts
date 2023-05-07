import { DatabaseModule } from './database/database.module';

import { classes } from '@automapper/classes';
import { AutomapperModule } from '@automapper/nestjs';
import * as Joi from '@hapi/joi';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AuthModule } from './auth/auth.module';
import { Subscriber } from './common/entity.subscriber';
import { ConversationModule } from './conversation/conversation.module';
import { LocationModule } from './location/location.module';
import { MatchModule } from './match/match.module';
import { MessageModule } from './message/message.module';
import { NotificationModule } from './notification/notification.module';
import { PhotoModule } from './photo/photo.module';
import { UserModule } from './user/user.module';
import { FirebaseModule } from './common/firebase/firebase.module';
import './timezone';

@Module({
  imports: [
    ConfigModule.forRoot({
      validationSchema: Joi.object({
        POSTGRES_HOST: Joi.string().required(),
        POSTGRES_PORT: Joi.number().required(),
        POSTGRES_USER: Joi.string().required(),
        POSTGRES_PASSWORD: Joi.string().required(),
        POSTGRES_DB: Joi.string().required(),
        PORT: Joi.number(),
      }),
    }),
    DatabaseModule,
    FirebaseModule,
    LocationModule,
    PhotoModule,
    UserModule,
    NotificationModule,
    MatchModule,
    ConversationModule,
    MessageModule,
    AutomapperModule.forRoot({
      strategyInitializer: classes(),
    }),
    AuthModule,
  ],
  providers: [Subscriber],
})
export class AppModule { }
