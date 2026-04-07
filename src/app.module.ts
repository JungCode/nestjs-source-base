import { Module } from '@nestjs/common';

import { DatabaseModule } from './common/module/database/database.module';
import { BaseGraphQLModule } from './common/module/graphql';
import { AuthModule } from './features/auth/app.module';

@Module({
  imports: [DatabaseModule, BaseGraphQLModule.forFeatureModules([AuthModule])],
})
export class AppModule {}
