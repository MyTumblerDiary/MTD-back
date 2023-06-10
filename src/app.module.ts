import { CacheModule, Logger, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_FILTER, APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './apis/auth/auth.module';
import { CloudAwsModule } from './apis/clouds/aws/cloud-aws.module';
import { EmailModule } from './apis/emails/email.module';
import { FranchisesModule } from './apis/franchises/franchises.module';
import { StoresModule } from './apis/stores/stores.module';
import { TumblerRecordsModule } from './apis/tumbler-records/tumbler-records.module';
import { UserModule } from './apis/users/users.module';
import { GqlExceptionFilter } from './commons/filter/gql-exception.filter';
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
    StoresModule,
    FranchisesModule,
    CloudAwsModule,
    DynamicGqlModule.forRoot(),
    TypeOrmModule.forRoot(ormOption),
    ThrottlerModule.forRoot({
      ttl: 1,
      limit: 10,
    }),
    CacheModule.register({
      store: redisStore,
      isGlobal: true,
      host: process.env.REDIS_HOST,
      port: parseInt(process.env.REDIS_PORT),
      ttl: 120,
    }),
    TumblerRecordsModule,
    EmailModule,
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
      useClass: GqlExceptionFilter,
    },
    Logger,
  ],
})
export class AppModule {}
