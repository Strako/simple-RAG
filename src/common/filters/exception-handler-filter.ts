/* eslint-disable operator-linebreak */
import {
  ExceptionFilter,
  Catch,
  ArgumentsHost,
  HttpException,
  HttpStatus,
} from '@nestjs/common';
import { Response } from 'express';

@Catch()
export class ExceptionsHandlerFilter implements ExceptionFilter {
  catch(exception: HttpException, host: ArgumentsHost) {
    const ctx = host.switchToHttp();
    const response = ctx.getResponse<Response>();
    const request = ctx.getRequest<Request>();

    const status =
      exception instanceof HttpException
        ? (exception['response']?.status ?? exception.getStatus())
        : HttpStatus.INTERNAL_SERVER_ERROR;

    const message =
      exception instanceof HttpException
        ? (exception['response']?.message ?? exception.message['error'])
        : exception['message'] ||
          exception['detail'] ||
          'Internal server error';

    const error =
      exception instanceof HttpException
        ? exception['response']?.error
        : exception['name'] || 'Error';
    const errors =
      exception instanceof HttpException
        ? exception['response']?.errors
        : undefined;

    response.status(status).json({
      message,
      error,
      errors,
      statusCode: status,
      path: `[${request.method}] ${request.url}`,
      timestamp: new Date().toISOString(),
    });
  }
}
