"use strict";
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.AppModule = void 0;
const cache_manager_1 = require("@nestjs/cache-manager");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const core_1 = require("@nestjs/core");
const jwt_1 = require("@nestjs/jwt");
const dist_1 = require("@nestjs/throttler/dist");
const typeorm_1 = require("@nestjs/typeorm");
const exception_handler_filter_1 = require("./common/filters/exception-handler-filter");
const helpers_1 = require("./common/helpers");
const db_config_1 = require("./config/db-config");
const schedule_1 = require("@nestjs/schedule");
const helloworld_module_1 = require("./helloworld/helloworld.module");
const typeorm_2 = require("./config/typeorm");
let AppModule = class AppModule {
};
exports.AppModule = AppModule;
exports.AppModule = AppModule = __decorate([
    (0, common_1.Module)({
        imports: [
            config_1.ConfigModule.forRoot({
                isGlobal: true,
                load: [typeorm_2.default],
            }),
            cache_manager_1.CacheModule.register({
                isGlobal: true,
            }),
            config_1.ConfigModule.forRoot({
                isGlobal: true,
            }),
            typeorm_1.TypeOrmModule.forRoot(db_config_1.postgresqlConfig),
            dist_1.ThrottlerModule.forRoot([
                {
                    ttl: helpers_1.ONE_MINUTE_TO_MS,
                    limit: helpers_1.MAX_REQUEST_BY_MINUTE,
                },
            ]),
            helloworld_module_1.HellowordModule,
            jwt_1.JwtModule,
            schedule_1.ScheduleModule.forRoot(),
        ],
        controllers: [],
        providers: [
            {
                provide: core_1.APP_GUARD,
                useClass: dist_1.ThrottlerGuard,
            },
            {
                provide: core_1.APP_FILTER,
                useClass: exception_handler_filter_1.ExceptionsHandlerFilter,
            },
        ],
    })
], AppModule);
//# sourceMappingURL=app.module.js.map