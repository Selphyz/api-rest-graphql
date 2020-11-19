import { Module } from '@nestjs/common';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { Idea } from './ideas/idea.entity';

@Module({
  imports: [
    TypeOrmModule.forRoot({
      type: 'postgres',
      username: 'postgres',
      password: 'postgres',
      database: 'ideas',
      host: 'localhost',
      port: 5432,
      synchronize: true,
      logging: true,
      entities: ['./../src/**/*.entity.ts', './dist/**/*.entity.js'],
    }),
  ],
  controllers: [AppController],
  providers: [AppService],
})
export class AppModule {}
