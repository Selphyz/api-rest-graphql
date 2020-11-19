import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import 'dotenv';
import { Logger } from '@nestjs/common';

const PORT = process.env.PORT || 4000;

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  await app.listen(PORT);
  Logger.log(`Server on http://localhost:${PORT}`, 'Bootstrap');
}
bootstrap();
