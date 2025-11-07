"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.conenctionSource = exports.postgresqlConfig = void 0;
const typeorm_1 = require("typeorm");
const enums_1 = require("../common/enums");
const common_1 = require("@nestjs/common");
const envs_1 = require("./envs");
const logger = new common_1.Logger('PostgreSQL Config');
exports.postgresqlConfig = {
    type: 'postgres',
    host: envs_1.envs.postgresql.host,
    port: envs_1.envs.postgresql.port,
    username: envs_1.envs.postgresql.username,
    password: envs_1.envs.postgresql.password,
    database: envs_1.envs.postgresql.database,
    synchronize: false,
    migrationsRun: true,
    logging: envs_1.envs.nodeEnv === enums_1.NODE_ENV.DEVELOP ? true : envs_1.envs.postgresql.log === 'true',
    entities: [__dirname + '/../**/*.entity.{ts,js}'],
    migrations: [__dirname + '/../migrations/**/*.{ts,js}'],
    extra: {
        decimalNumbers: true,
        supportBigNumbers: true,
        bigNumberStrings: false,
    },
    useUTC: true,
    ssl: envs_1.envs.nodeEnv === enums_1.NODE_ENV.DEVELOP ? false : { rejectUnauthorized: false },
};
exports.conenctionSource = new typeorm_1.DataSource(exports.postgresqlConfig);
exports.conenctionSource
    .initialize()
    .then(() => {
    logger.log('Database has been initialized');
})
    .catch((err) => {
    logger.error('Error during database initialization:', err);
});
//# sourceMappingURL=db-config.js.map