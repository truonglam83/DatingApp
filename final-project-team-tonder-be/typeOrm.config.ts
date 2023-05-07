
import { SnakeNamingStrategy } from './src/common/snake-naming.strategy';
import { DataSource } from 'typeorm';
import { ConfigService } from '@nestjs/config';
import { config } from 'dotenv';
config();

const configService = new ConfigService();

export default new DataSource({
  type: 'postgres',
  host: configService.get('POSTGRES_HOST'),
  port: configService.get('POSTGRES_PORT'),
  username: configService.get('POSTGRES_USER'),
  password: configService.get('POSTGRES_PASSWORD'),
  database: configService.get('POSTGRES_DB'),
  entities: ['src/**/entities/*.entity.{ts,js}'],

  migrations: ['migrations/*.ts'],
  namingStrategy: new SnakeNamingStrategy()
});
