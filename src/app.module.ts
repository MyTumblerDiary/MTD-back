import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { Module } from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { TypeOrmModule } from '@nestjs/typeorm';
import { AuthModule } from './apis/auth/auth.module';
import { UserModule } from './apis/users/users.module';
import { configOptions } from './config/config';
import { ormOption } from './config/typeorm.config';

const ENV = process.env.NODE_ENV;

@Module({
  imports: [
    ConfigModule.forRoot(configOptions),
    UserModule,
    AuthModule,
    GraphQLModule.forRoot<ApolloDriverConfig>({
      driver: ApolloDriver,
      autoSchemaFile: 'src/commons/graphql/schema.gql',
      context: ({ req, res }) => ({ req, res }),
    }),
    TypeOrmModule.forRoot(ormOption),
  ],
  providers: [
    {
      provide: 'NODE_ENV',
      useValue: ENV,
    },
  ],
})
export class AppModule {}
