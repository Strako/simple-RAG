import { ExceptionFilter, ArgumentsHost, HttpException } from '@nestjs/common';
export declare class ExceptionsHandlerFilter implements ExceptionFilter {
    catch(exception: HttpException, host: ArgumentsHost): void;
}
