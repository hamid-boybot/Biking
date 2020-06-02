import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';
import 'reflect-metadata';
import { ValidationPipe } from '@nestjs/common';
import * as config from 'config';
import { useContainer } from 'class-validator';

async function bootstrap() {
  const serverConfig = config.get('server');

  const app = await NestFactory.create(AppModule);

  app.enableCors();

  app.useGlobalPipes(new ValidationPipe({ validateCustomDecorators: true }));
  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  const options = new DocumentBuilder()
    .setTitle('Letsgo API')
    .setDescription('The API of the marketplace bourkabi')
    .setVersion('0.1')
    .addTag('letsgo')
    .addBearerAuth({ type: 'apiKey', in: 'header', name: 'Authorization' })
    .setContact('BASSAM Hamid', 'hamid.bassam@uha.fr', 'okok')
    .build();

  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);

  const port = process.env.PORT || serverConfig.port;
  await app.listen(port);
}
bootstrap();
