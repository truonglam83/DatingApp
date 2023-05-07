import { Module } from "@nestjs/common";
import { TypeOrmModule } from "@nestjs/typeorm";
import { ConfigModule, ConfigService } from "@nestjs/config";
import { SnakeNamingStrategy } from "src/common/snake-naming.strategy";
import { join } from "path";
import { UserEntity } from "../user/entities/user.entity";
import { LocationEntity } from "../location/entities/location.entity";
import { PhotoEntity } from "../photo/entities/photo.entity";
import { ConversationEntity } from "../conversation/entities/conversation.entity";
import { MatchEntity } from "../match/entities/match.entity";
import { NotificationEntity } from "../notification/entities/notification.entity";
import { MessageEntity } from "../message/entities/message.entity";

const entitiesPath = join(
  __dirname,
  "..",
  "**",
  "entities",
  "*.entity.{ts,js}"
);

@Module({
  imports: [
    TypeOrmModule.forRootAsync({
      imports: [ConfigModule],
      inject: [ConfigService],
      useFactory: (configService: ConfigService) => ({
        type: "postgres",
        host: configService.get("POSTGRES_HOST"),
        port: configService.get("POSTGRES_PORT"),
        username: configService.get("POSTGRES_USER"),
        password: configService.get("POSTGRES_PASSWORD"),
        database: configService.get("POSTGRES_DB"),
        entities: [
          UserEntity,
          LocationEntity,
          PhotoEntity,
          ConversationEntity,
          MatchEntity,
          NotificationEntity,
          MessageEntity,
        ],
        namingStrategy: new SnakeNamingStrategy(),
        logging: true
      }),
    }),
  ],
})
export class DatabaseModule { }
