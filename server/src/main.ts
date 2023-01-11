import { NestFactory } from '@nestjs/core';
import AppModule from './app.module';
import { ConfigService } from '@nestjs/config';
import { SwaggerModule, DocumentBuilder } from '@nestjs/swagger';

const bootstrap = async () => {
  const app = await NestFactory.create(AppModule);

  app.enableCors();

  const configService = app.get<ConfigService>(ConfigService);

  const docConfig = new DocumentBuilder()
    .setTitle('AREA API')
    .setVersion('1.0')
    .addBearerAuth()
    .build();

  const document = SwaggerModule.createDocument(app, docConfig);

  if (configService.get<string>('SWAGGER_DOC') === 'true')
    SwaggerModule.setup('api', app, document);

  await app.listen(configService.get<number>('APP_PORT'));
};

bootstrap();
