import {
  ArgumentsHost,
  Catch,
  HttpException,
  HttpStatus,
  Logger,
} from '@nestjs/common';
import type { GqlExceptionFilter } from '@nestjs/graphql';
import type { GraphQLFormattedError } from 'graphql';
import { GraphQLError } from 'graphql';
import { QueryFailedError } from 'typeorm';

import { APP_ENV } from '@/common/constants';
import { config } from '@/config';

const DEFAULT_ERROR_CODES: Record<number, string> = {
  400: 'BAD_REQUEST',
  401: 'UNAUTHORIZED',
  403: 'FORBIDDEN',
  404: 'NOT_FOUND',
  409: 'CONFLICT',
  410: 'GONE',
  429: 'TOO_MANY_REQUESTS',
  500: 'INTERNAL_SERVER_ERROR',
};

const PG_ERROR_CODES: Record<string, { code: string; status: number }> = {
  '23502': { code: 'BAD_REQUEST', status: HttpStatus.BAD_REQUEST }, // not null violation
  '23503': { code: 'CONFLICT', status: HttpStatus.CONFLICT }, // foreign key violation
  '23505': { code: 'CONFLICT', status: HttpStatus.CONFLICT }, // unique violation
};

interface GraphQLExtensions {
  code: string;
  messages: string[];
  originalError?: HttpException | Error;
  statusCode: number;
}

const defaultInternalServerError = 'Something went wrong';

@Catch()
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(
    exception: HttpException | QueryFailedError | Error,
    host: ArgumentsHost,
  ) {
    let message: string = defaultInternalServerError;
    let messages: string[] = [];
    let statusCode: number = HttpStatus.INTERNAL_SERVER_ERROR;
    let code: string = DEFAULT_ERROR_CODES[HttpStatus.INTERNAL_SERVER_ERROR];

    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (typeof response === 'object') {
        const rawMessage =
          response['message' as keyof typeof response] ?? exception.message;

        // ✅ always init messages early
        messages = Array.isArray(rawMessage) ? rawMessage : [rawMessage];
        message = messages[0];
        code = response['code' as keyof typeof response];
      } else {
        message = response;
        messages = [response];
      }

      statusCode = exception.getStatus();
    } else if (exception instanceof QueryFailedError) {
      // ✅ Handle TypeORM DB errors (safety net khi race condition)
      // eslint-disable-next-line @typescript-eslint/no-explicit-any
      const pgCode = (exception.driverError as any)?.code as string;
      const pgError = PG_ERROR_CODES[pgCode];

      if (pgError) {
        statusCode = pgError.status;
        code = pgError.code;

        // Extract field name from detail: "Key (email)=(t@gmail.com) already exists."
        // eslint-disable-next-line @typescript-eslint/no-explicit-any
        const detail = (exception.driverError as any)?.detail as string;
        const match = detail?.match(/Key \((.+?)\)=/);
        message = match
          ? `${match[1]} already exists`
          : 'Resource already exists';
        messages = [message];
      } else {
        message = defaultInternalServerError;
        messages = [message];
      }
    } else {
      message = defaultInternalServerError;
      messages = [message];
    }

    message = message?.replaceAll(/^(\w+\.)+(\w+)/g, '$2');
    messages = messages.map((m) => m?.replaceAll(/^(\w+\.)+(\w+)/g, '$2'));
    code ??= DEFAULT_ERROR_CODES[statusCode];

    const extensions = {
      code,
      messages,
      originalError: exception,
      statusCode,
    } satisfies GraphQLExtensions;

    const contextType = host.getType();

    // If the request came from REST
    if (contextType === 'http') {
      const response = host.switchToHttp().getResponse();
      return response.status(statusCode).send({
        code,
        message,
        messages,
        statusCode,
      });
    }

    // If the request came from GraphQL
    return new GraphQLError(message, { extensions });
  }
}

const logger = new Logger('GraphQLFormatError', { timestamp: true });

export const graphqlFormatError = (error: GraphQLFormattedError) => {
  if (!error.extensions?.statusCode) {
    switch (error.extensions?.code) {
      case 'BAD_REQUEST':
      case 'BAD_USER_INPUT':
      case 'GRAPHQL_PARSE_FAILED':
      case 'GRAPHQL_VALIDATION_FAILED': {
        delete error.extensions?.stacktrace;
        error.extensions.statusCode = HttpStatus.BAD_REQUEST;

        return config.app.env === APP_ENV.PRODUCTION
          ? {
              code: error.extensions.code,
              message: defaultInternalServerError,
              messages: [defaultInternalServerError],
              statusCode: error.extensions.statusCode,
            }
          : error;
      }
    }
  }

  const extensions = (error.extensions ?? {}) as unknown as GraphQLExtensions;
  const statusCode =
    extensions.statusCode ??
    (extensions.originalError instanceof HttpException
      ? extensions.originalError.getStatus()
      : HttpStatus.INTERNAL_SERVER_ERROR);

  if (statusCode === HttpStatus.INTERNAL_SERVER_ERROR) {
    const exception = extensions.originalError ?? error;

    if (exception instanceof Error) {
      logger.error(exception.message, exception.stack);
    } else {
      logger.error(exception);
    }

    return {
      code: extensions.code,
      message: defaultInternalServerError,
      messages: [defaultInternalServerError],
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    code: extensions.code,
    message: error.message,
    messages: extensions.messages ?? [error.message],
    statusCode,
  };
};
