import { DataSource, DataSourceOptions } from 'typeorm';
import { NODE_ENV } from '../common/enums';
import { Logger } from '@nestjs/common';
import { envs } from './envs';

const logger = new Logger('PostgreSQL Config');

export const postgresqlConfig: DataSourceOptions = {
  type: 'postgres',
  host: envs.postgresql.host,
  port: envs.postgresql.port,
  username: envs.postgresql.username,
  password: envs.postgresql.password,
  database: envs.postgresql.database,
  synchronize: false,
  migrationsRun: true,
  logging: envs.nodeEnv === NODE_ENV.DEVELOP ? true : envs.postgresql.log === 'true',
  entities: [__dirname + '/../**/*.entity.{ts,js}'],
  migrations: [__dirname + '/../migrations/**/*.{ts,js}'],
  extra: {
    decimalNumbers: true,
    supportBigNumbers: true,
    bigNumberStrings: false,
  },
  useUTC: true,
  ssl: envs.nodeEnv === NODE_ENV.DEVELOP ? false : { rejectUnauthorized: false },
};

export const conenctionSource = new DataSource(postgresqlConfig);

conenctionSource
  .initialize()
  .then(() => {
    logger.log('Database has been initialized');
  })
  .catch((err) => {
    logger.error('Error during database initialization:', err);
  });
