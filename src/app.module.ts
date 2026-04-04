import { Module } from '@nestjs/common';

import { AuthModule } from './features/auth/app.module';
import { BaseGraphQLModule } from './module/graphql';

@Module({
  imports: [BaseGraphQLModule.forFeatureModules([AuthModule])],
})
export class AppModule {}
