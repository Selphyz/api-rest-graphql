import { Module } from '@nestjs/common';
import { APP_FILTER, APP_INTERCEPTOR } from '@nestjs/core';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { IdeasModule } from './ideas/ideas.module';
import { HttpErrorFilter } from './shared/http-error.filter';
import { LoggingInterceptor } from './shared/logging.interceptor';

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
    IdeasModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: HttpErrorFilter,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggingInterceptor,
    },
  ],
})
export class AppModule {}
