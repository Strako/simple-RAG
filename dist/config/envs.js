"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.envs = void 0;
const dotenv = require("dotenv");
const joi = require("joi");
const enums_1 = require("../common/enums");
const helpers_1 = require("../common/helpers");
dotenv.config();
const envsSchema = joi
    .object({
    PORT: joi.number().required(),
    NODE_ENV: joi.string().valid(enums_1.NODE_ENV.DEVELOP, enums_1.NODE_ENV.QA, enums_1.NODE_ENV.PROD, enums_1.NODE_ENV.TEST).required(),
    POSTGRES_HOST: joi.string().required(),
    POSTGRES_PORT: joi.number().required(),
    POSTGRES_USERNAME: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_DATABASE: joi.string().required(),
    POSTGRES_LOG: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
})
    .unknown(true);
let envVars = {
    PORT: helpers_1.ZERO,
    NODE_ENV: 'test',
    POSTGRES_USERNAME: '',
    POSTGRES_PASSWORD: '',
    POSTGRES_HOST: '',
    POSTGRES_PORT: helpers_1.ZERO,
    POSTGRES_DATABASE: '',
    POSTGRES_LOG: '',
    JWT_SECRET: '',
    JWT_EXPIRES_IN: '',
};
if (process.env.NODE_ENV !== enums_1.NODE_ENV.TEST) {
    const { error, value } = envsSchema.validate(process.env);
    if (error) {
        throw new Error(`Config validation error: ${error.message}`);
    }
    envVars = value;
}
exports.envs = {
    port: envVars.PORT,
    nodeEnv: envVars.NODE_ENV,
    postgresql: {
        username: envVars.POSTGRES_USERNAME,
        password: envVars.POSTGRES_PASSWORD,
        host: envVars.POSTGRES_HOST,
        port: envVars.POSTGRES_PORT,
        database: envVars.POSTGRES_DATABASE,
        log: envVars.POSTGRES_LOG,
    },
    jwt: {
        secret: envVars.JWT_SECRET,
        expiresIn: envVars.JWT_EXPIRES_IN,
    },
};
//# sourceMappingURL=envs.js.map