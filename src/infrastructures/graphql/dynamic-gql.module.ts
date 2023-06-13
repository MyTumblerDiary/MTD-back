import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Request, Response } from 'express';
import * as path from 'path';
import { GqlExceptionFilter } from './filter/gql-exception.filter';

export class DynamicGqlModule {
  static forRoot(): DynamicModule {
    return {
      module: DynamicGqlModule,
      imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          inject: [ConfigService],
          driver: ApolloDriver,
          useFactory: async (configService: ConfigService) => ({
            autoSchemaFile: path.join(
              process.cwd(),
              'src/infrastructures/graphql/schema.gql',
            ),
            driver: ApolloDriver,
            playground: false,
            plugins: [
              ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ],
            context: ({ req, res }: { req: Request; res: Response }) => ({
              req,
              res,
            }),
          }),
        }),
      ],
      providers: [
        {
          provide: APP_FILTER,
          useClass: GqlExceptionFilter,
        },
        Logger,
      ],
    };
  }
}
