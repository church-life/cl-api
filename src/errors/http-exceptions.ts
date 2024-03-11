import {
  Catch,
  HttpException,
  Logger,
  type ArgumentsHost,
  type ExceptionFilter,
} from '@nestjs/common';
import { HttpAdapterHost } from '@nestjs/core';

import { codes, type ReturnErrorShape } from './utils';

@Catch(HttpException)
export class HttpExceptionsFilter implements ExceptionFilter {
  constructor(private readonly httpAdapterHost: HttpAdapterHost) {}

  private readonly logger = new Logger(HttpExceptionsFilter.name);

  catch(exception: HttpException, host: ArgumentsHost) {
    const { httpAdapter } = this.httpAdapterHost;

    const ctx = host.switchToHttp();

    const request = ctx.getRequest<Request>();
    const httpStatus = exception.getStatus();

    const responseBody: ReturnErrorShape = {
      message: exception.message,
      statusCode: httpStatus,
      errorCode: codes.SOMETHING_WENT_WRONG,
      path: request.url,
    };

    this.logger.error(exception);

    httpAdapter.reply(ctx.getResponse(), responseBody, httpStatus);
  }
}
