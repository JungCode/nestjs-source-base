import { Module } from '@nestjs/common';

import { AuthModule } from './features/auth/app.module';
import { BaseGraphQLModule } from './common/module/graphql';
import { DatabaseModule } from './common/module/database/database.module';

@Module({
  imports: [DatabaseModule, BaseGraphQLModule.forFeatureModules([AuthModule])],
})
export class AppModule {}
