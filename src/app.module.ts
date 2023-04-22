import { CacheModule, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { ClientOpts } from 'redis';
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/users/users.module';
import { HttpExceptionFilter } from './commons/filter/http-exception.filter';
import { GqlThrottlerGuard } from './commons/guards/gql.throttler.guard';
import { configOptions } from './config/config';
import { ormOption } from './config/typeorm.config';
import { DynamicGqlModule } from './dynamic-gql.module';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    UserModule,
    AuthModule,
    DynamicGqlModule.forRoot(),
    TypeOrmModule.forRoot(ormOption),
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 5,
    }),
    CacheModule.register<ClientOpts>({
      store: redisStore,
      isGlobal: true,
      host: process.env.HOST,
      port: 6379,
      ttl: 120,
    }),
  ],
  providers: [
    {
      provide: 'NODE_ENV',
      useValue: ENV,
    },
    {
      provide: APP_GUARD,
      useClass: GqlThrottlerGuard,
    },
    {
      provide: APP_FILTER,
      useClass: HttpExceptionFilter,
    },
    Logger,
  ],
})
export class AppModule {}
