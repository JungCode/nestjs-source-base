import { Global, Module } from '@nestjs/common';
import { getDataSourceToken, TypeOrmModule } from '@nestjs/typeorm';

import { dataSourceConfig } from '@/db/data-source';

@Global()
@Module({
  exports: [TypeOrmModule],
  imports: [
    TypeOrmModule.forRoot({
      ...dataSourceConfig,
      autoLoadEntities: true,
      migrations: [],
    }),
  ],
  providers: [
    {
      provide: 'TYPEORM_DATA_SOURCE',
      useExisting: getDataSourceToken(dataSourceConfig),
    },
  ],
})
export class DatabaseModule {}
