"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.ExceptionsHandlerFilter = void 0;
const common_1 = require("@nestjs/common");
let ExceptionsHandlerFilter = class ExceptionsHandlerFilter {
    catch(exception, host) {
        const ctx = host.switchToHttp();
        const response = ctx.getResponse();
        const request = ctx.getRequest();
        const status = exception instanceof common_1.HttpException
            ? (exception['response']?.status ?? exception.getStatus())
            : common_1.HttpStatus.INTERNAL_SERVER_ERROR;
        const message = exception instanceof common_1.HttpException
            ? (exception['response']?.message ?? exception.message['error'])
            : exception['message'] ||
                exception['detail'] ||
                'Internal server error';
        const error = exception instanceof common_1.HttpException
            ? exception['response']?.error
            : exception['name'] || 'Error';
        const errors = exception instanceof common_1.HttpException
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
};
exports.ExceptionsHandlerFilter = ExceptionsHandlerFilter;
exports.ExceptionsHandlerFilter = ExceptionsHandlerFilter = __decorate([
    (0, common_1.Catch)()
], ExceptionsHandlerFilter);
//# sourceMappingURL=exception-handler-filter.js.map