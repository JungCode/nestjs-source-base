import type { ApolloServerPlugin } from '@apollo/server';
import { ApolloServerPluginLandingPageLocalDefault } from '@apollo/server/plugin/landingPage/default';
import type { ApolloDriverConfig } from '@nestjs/apollo';
import { ApolloDriver } from '@nestjs/apollo';
import type { DynamicModule, Type } from '@nestjs/common';
import { GraphQLModule } from '@nestjs/graphql';

import { APP_ENV } from '@/common/constants';
import { config } from '@/config';

export class BaseGraphQLModule {
  static forFeatureModules(features: Type<any>[]): DynamicModule {
    return {
      imports: [
        GraphQLModule.forRootAsync<ApolloDriverConfig>({
          driver: ApolloDriver,
          useFactory: () => ({
            autoSchemaFile: true,

            // ------ GraphQL Playground ------
            playground: false,
            plugins: [
              config.app.env === APP_ENV.PRODUCTION
                ? undefined
                : ApolloServerPluginLandingPageLocalDefault({ embed: true }),
            ].filter(Boolean) as ApolloServerPlugin[],
          }),
        }),

        ...features,
      ],
      module: BaseGraphQLModule,
    };
  }
}
