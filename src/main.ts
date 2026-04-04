import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import type { NestFastifyApplication } from '@nestjs/platform-fastify';
import { FastifyAdapter } from '@nestjs/platform-fastify';
import { useContainer } from 'class-validator';

import { HttpExceptionFilter } from '@/common/exception-filters';
import { config } from '@/config';

import { version } from '../package.json';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create<NestFastifyApplication>(
    AppModule,
    new FastifyAdapter(),
    {
      cors: { origin: true },
      rawBody: true,
    },
  );

  useContainer(app.select(AppModule), { fallbackOnErrors: true });

  app.useGlobalFilters(new HttpExceptionFilter());

  await app.listen(config.app.port, '0.0.0.0');

  Logger.log(
    `🚀  API Server version: ${version} running on port ${config.app.port}`,
    'Bootstrap',
  );
}

bootstrap().catch((error) => console.error(error));
