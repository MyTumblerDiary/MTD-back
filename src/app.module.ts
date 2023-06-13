import { CacheModule, Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { APP_GUARD } from '@nestjs/core';
import { ThrottlerModule } from '@nestjs/throttler';
import { TypeOrmModule } from '@nestjs/typeorm';
import * as redisStore from 'cache-manager-redis-store';
import { AuthModule } from './applications/auth/auth.module';
import { EmailModule } from './applications/emails/email.module';
import { FranchisesModule } from './applications/franchises/franchises.module';
import { StoresModule } from './applications/stores/stores.module';
import { TumblerRecordsModule } from './applications/tumbler-records/tumbler-records.module';
import { UserModule } from './applications/users/users.module';
import { CloudAwsModule } from './infrastructures/clouds/aws/cloud-aws.module';
import { ormOption } from './infrastructures/database/config/typeorm.config';
import { configOptions } from './infrastructures/env-config/env-config';
import { DynamicGqlModule } from './infrastructures/graphql/dynamic-gql.module';
import { GqlThrottlerGuard } from './infrastructures/graphql/guards/gql.throttler.guard';
import { HealthCheckController } from './presentations/controllers/health-check.controller';

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
      port: Number(process.env.REDIS_PORT),
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
  ],
  controllers: [HealthCheckController],
})
export class AppModule {}
