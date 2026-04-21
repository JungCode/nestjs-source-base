import { Module } from '@nestjs/common';

import { IsUniqueModule } from './common/module/custom/unique.module';
import { DatabaseModule } from './common/module/database/database.module';
import { BaseGraphQLModule } from './common/module/graphql';
import { AuthModule } from './features/auth';

@Module({
  imports: [
    DatabaseModule,
    IsUniqueModule,

    // system
    BaseGraphQLModule.forFeatureModules([AuthModule]),
  ],
})
export class AppModule {}
