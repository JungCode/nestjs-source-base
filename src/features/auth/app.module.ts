import { Module } from '@nestjs/common';

import { AppService } from './core/app.service';
import { AppResolver } from './resolvers/app.resolver';

@Module({
  exports: [AppService],
  providers: [AppResolver, AppService],
})
export class AuthModule {}
