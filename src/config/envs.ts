/* eslint-disable @typescript-eslint/no-unsafe-assignment */
import * as dotenv from 'dotenv';

import * as joi from 'joi';
import { NODE_ENV } from '../common/enums';
import { ZERO } from '../common/helpers';

dotenv.config();

interface EnvVars {
  POSTGRES_HOST: string;
  POSTGRES_PORT: number;
  POSTGRES_USERNAME: string;
  POSTGRES_PASSWORD: string;
  POSTGRES_DATABASE: string;
  POSTGRES_LOG: string;
  PORT: number;
  NODE_ENV: string;
  JWT_SECRET: string;
  JWT_EXPIRES_IN: string;
  PINECONE_API_KEY: string;
  PINECONE_ENVIRONMENT: string;
  PINECONE_INDEX_NAME: string;
  GROQ_API_KEY: string;
}

const envsSchema = joi
  .object({
    PORT: joi.number().required(),
    NODE_ENV: joi.string().valid(NODE_ENV.DEVELOP, NODE_ENV.QA, NODE_ENV.PROD, NODE_ENV.TEST).required(),
    POSTGRES_HOST: joi.string().required(),
    POSTGRES_PORT: joi.number().required(),
    POSTGRES_USERNAME: joi.string().required(),
    POSTGRES_PASSWORD: joi.string().required(),
    POSTGRES_DATABASE: joi.string().required(),
    POSTGRES_LOG: joi.string().required(),
    JWT_SECRET: joi.string().required(),
    JWT_EXPIRES_IN: joi.string().required(),
    PINECONE_API_KEY: joi.string().required(),
    PINECONE_ENVIRONMENT: joi.string().required(),
    PINECONE_INDEX_NAME: joi.string().required(),
    GROQ_API_KEY: joi.string().required(),
  })
  .unknown(true);

let envVars: EnvVars = {
  PORT: ZERO,
  NODE_ENV: 'test',
  POSTGRES_USERNAME: '',
  POSTGRES_PASSWORD: '',
  POSTGRES_HOST: '',
  POSTGRES_PORT: ZERO,
  POSTGRES_DATABASE: '',
  POSTGRES_LOG: '',
  JWT_SECRET: '',
  JWT_EXPIRES_IN: '',
  PINECONE_API_KEY: '',
  PINECONE_ENVIRONMENT: '',
  PINECONE_INDEX_NAME: '',
  GROQ_API_KEY: '',
};

if (process.env.NODE_ENV !== NODE_ENV.TEST) {
  const { error, value } = envsSchema.validate(process.env);

  if (error) {
    throw new Error(`Config validation error: ${error.message}`);
  }

  envVars = value;
}

export const envs = {
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
  pinecone: {
    apiKey: envVars.PINECONE_API_KEY,
    enviroment: envVars.PINECONE_ENVIRONMENT,
    indexName: envVars.PINECONE_INDEX_NAME,
  },
  groq: {
    apiKey: envVars.GROQ_API_KEY,
  },
};
