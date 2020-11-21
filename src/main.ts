import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger } from '@nestjs/common';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  app.enableCors();
  const options = new DocumentBuilder()
    .setTitle('Api Mixta')
    .setDescription('Description de la API')
    .setVersion('1.0')
    .addTag('Mix')
    .build();
  const document = SwaggerModule.createDocument(app, options);
  SwaggerModule.setup('api', app, document);
  await app.listen(PORT);
  Logger.log(`Server on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
