import 'reflect-metadata';

import { join } from 'node:path/posix';

import type { DataSourceOptions, Logger, QueryRunner } from 'typeorm';
import { AdvancedConsoleLogger, DataSource } from 'typeorm';
import { SnakeNamingStrategy } from 'typeorm-naming-strategies';

import { config } from '@/config';

class CustomLogger extends AdvancedConsoleLogger implements Logger {
  logQuery(query: string, parameters?: unknown[], queryRunner?: QueryRunner) {
    if (query === 'SELECT 1') return;
    super.logQuery(query, parameters, queryRunner);
  }
}

const isTypeormCLI = config.db.typeormCli === 'true';

export const dataSourceConfig = {
  entities: [join(__dirname, './entities/*.entity.{ts,js}')],
  logger:
    config.db.logEnable === 'true'
      ? new CustomLogger(['query', 'error'])
      : undefined,
  migrations: [join(__dirname, './migrations/*.{ts,js}')],
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
  poolSize: 15,
  subscribers: isTypeormCLI ? [] : [join(__dirname, './subscribers/*.{ts,js}')],
  synchronize: false,
  type: 'postgres',
  url: config.db.url,
} satisfies DataSourceOptions;

export default new DataSource(dataSourceConfig);
