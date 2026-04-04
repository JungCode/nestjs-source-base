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

interface GraphQLExtensions {
  code: string;
  originalError?: HttpException | Error;
  statusCode: number;
}

const defaultInternalServerError: string = 'Something went wrong';

interface GraphQLExtensions {
  code: string;
  originalError?: HttpException | Error;
  statusCode: number;
}

@Catch(HttpException)
export class HttpExceptionFilter implements GqlExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    let message: string;
    let statusCode: number;
    let code: string;

    if (exception instanceof HttpException) {
      const response = exception.getResponse();

      if (typeof response === 'object') {
        message =
          response['message' as keyof typeof response] ?? exception.message;

        // Process default message of ValidationPipe in NestJS
        message = Array.isArray(message) ? message.join('\n') : message;
        code = response['code' as keyof typeof response];
      } else {
        message = response;
      }

      statusCode = exception.getStatus();
    } else {
      message = defaultInternalServerError;
      statusCode = HttpStatus.INTERNAL_SERVER_ERROR;
    }

    message = message?.replaceAll(/^(\w+\.)+(\w+)/g, '$2');
    code ??= DEFAULT_ERROR_CODES[statusCode];

    const extensions = {
      code,
      originalError: exception,
      statusCode,
    } satisfies GraphQLExtensions;

    const contextType = host.getType();

    // Nếu request đến từ REST (REST API)
    if (contextType === 'http') {
      const response = host.switchToHttp().getResponse();
      return response.status(statusCode).send({
        code,
        message,
        statusCode,
      });
    }

    // Nếu request đến từ GraphQL
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
      statusCode: HttpStatus.INTERNAL_SERVER_ERROR,
    };
  }

  return {
    code: extensions.code,
    message: error.message,
    statusCode,
  };
};
