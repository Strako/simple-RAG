"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.connectionSource = void 0;
const config_1 = require("@nestjs/config");
const dotenv_1 = require("dotenv");
const typeorm_1 = require("typeorm");
const envs_1 = require("./envs");
const path_1 = require("path");
(0, dotenv_1.config)({ path: '.env' });
const config = {
    type: 'postgres',
    host: `${envs_1.envs.postgresql.host}`,
    port: `${envs_1.envs.postgresql.port}`,
    username: `${envs_1.envs.postgresql.username}`,
    password: `${envs_1.envs.postgresql.password}`,
    database: `${envs_1.envs.postgresql.database}`,
    entities: [(0, path_1.join)(__dirname, '/../**/*.entity{.ts,.js}')],
    migrations: [(0, path_1.join)(__dirname, '/../migrations/*{.ts,.js}')],
    autoLoadEntities: true,
    synchronize: false,
};
exports.default = (0, config_1.registerAs)('typeorm', () => config);
exports.connectionSource = new typeorm_1.DataSource(config);
//# sourceMappingURL=typeorm.js.map