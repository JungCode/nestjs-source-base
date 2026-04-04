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
  type: 'postgres',
  url: config.db.url,
  entities: [join(__dirname, './entities/*.entity.{ts,js}')],
  migrations: [join(__dirname, './migrations/*.{ts,js}')],
  subscribers: isTypeormCLI ? [] : [join(__dirname, './subscribers/*.{ts,js}')],
  synchronize: false,
  migrationsRun: false,
  namingStrategy: new SnakeNamingStrategy(),
  poolSize: 15,
  logger:
    config.db.logEnable === 'true'
      ? new CustomLogger(['query', 'error'])
      : undefined,
} satisfies DataSourceOptions;

export default new DataSource(dataSourceConfig);
