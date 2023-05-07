import { ValidationPipe } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ServiceAccount } from 'firebase-admin';
import { AppModule } from './app.module';
import { HttpExceptionFilter } from './exceptions/http-exception.filter';
async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  const PORT = process.env.PORT || 1000;

  const config = new DocumentBuilder()
    .setTitle('Tonder project')
    .setDescription('The users API description')
    .setVersion('1.0')
    .addTag('Tonder')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.useGlobalPipes(new ValidationPipe());

  app.useGlobalFilters(new HttpExceptionFilter());

  app.enableCors();

  await app.listen(PORT, () => {
    console.log(`Listening on port: http://localhost:${PORT}`);
  });
}
bootstrap();
