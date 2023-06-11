import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule, Logger } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { APP_FILTER } from '@nestjs/core';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';
import { Request, Response } from 'express';
import { Connection } from 'mysql2';
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
            plugins:
              configService.get('NODE_ENV') === 'dev'
                ? [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
                : null,
            context: ({
              req,
              res,
              connection,
            }: {
              req: Request;
              res: Response;
              connection: Connection;
            }) => {
              if (req) {
                const user = req.headers.authorization;
                return { req, res, user };
              } else {
                return { connection };
              }
            },
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
