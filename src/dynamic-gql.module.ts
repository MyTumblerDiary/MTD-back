import { ApolloDriver, ApolloDriverConfig } from '@nestjs/apollo';
import { DynamicModule } from '@nestjs/common';
import * as path from 'path';
import { ConfigService } from '@nestjs/config';
import { GraphQLModule } from '@nestjs/graphql';
import { ApolloServerPluginLandingPageLocalDefault } from 'apollo-server-core';

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
              'src/commons/graphql/schema.gql',
            ),
            driver: ApolloDriver,
            playground: false,
            plugins:
              configService.get('NODE_ENV') === 'dev'
                ? [ApolloServerPluginLandingPageLocalDefault({ embed: true })]
                : null,
            context: ({ req, res, connection }) => {
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
    };
  }
}
