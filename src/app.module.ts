import { CacheModule } from '@nestjs/cache-manager';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { JwtModule } from '@nestjs/jwt';
import { ThrottlerGuard, ThrottlerModule } from '@nestjs/throttler/dist';
import { TypeOrmModule } from '@nestjs/typeorm';
import { ExceptionsHandlerFilter } from './common/filters/exception-handler-filter';
import { MAX_REQUEST_BY_MINUTE, ONE_MINUTE_TO_MS } from './common/helpers';
import { postgresqlConfig } from './config/db-config';
import { ScheduleModule } from '@nestjs/schedule';
import { HellowordModule } from './helloworld/helloworld.module';
import typeorm from './config/typeorm';
import { HealthModule } from './health/health.module';
import { FileUploadModule } from './file-upload/file-upload.module';

@Module({
  imports: [
    ConfigModule.forRoot({
      isGlobal: true,
      load: [typeorm],
    }),
    CacheModule.register({
      isGlobal: true,
    }),
    ConfigModule.forRoot({
      isGlobal: true,
    }),
    TypeOrmModule.forRoot(postgresqlConfig),
    ThrottlerModule.forRoot([
      {
        ttl: ONE_MINUTE_TO_MS,
        limit: MAX_REQUEST_BY_MINUTE,
      },
    ]),
    HellowordModule,
    HealthModule,
    JwtModule,
    ScheduleModule.forRoot(),
    FileUploadModule,
  ],

  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: ThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: ExceptionsHandlerFilter,
    },
  ],
})
export class AppModule {}
