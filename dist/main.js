"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const core_1 = require("@nestjs/core");
const app_module_1 = require("./app.module");
const common_1 = require("@nestjs/common");
const config_1 = require("@nestjs/config");
const config_2 = require("./config");
const helmet_1 = require("helmet");
const bodyParser = require("body-parser");
const helpers_1 = require("./common/helpers");
async function bootstrap() {
    const logger = new common_1.Logger('Main Metroflog');
    const app = await core_1.NestFactory.create(app_module_1.AppModule);
    const configService = app.get(config_1.ConfigService);
    app.use((0, helmet_1.default)());
    app.enableCors();
    (0, config_2.getVersion)();
    app.useGlobalPipes(new common_1.ValidationPipe({
        transform: true,
        whitelist: true,
        forbidNonWhitelisted: true,
    }));
    app.setGlobalPrefix('api');
    app.enableVersioning({
        type: common_1.VersioningType.URI,
    });
    app.use(bodyParser.json({ limit: `${helpers_1.MAX_RESUME_SIZE_IN_MB}mb` }));
    app.use(bodyParser.urlencoded({
        limit: `${helpers_1.MAX_RESUME_SIZE_IN_MB}mb`,
        extended: true,
    }));
    await (0, config_2.initSwagger)(app, configService);
    await app
        .listen(config_2.envs.port)
        .then(() => logger.log(`Server running on port ${config_2.envs.port}`));
}
bootstrap();
//# sourceMappingURL=main.js.map