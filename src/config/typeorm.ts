import { registerAs } from '@nestjs/config';
import { config as dotenvConfig } from 'dotenv';
import { DataSource, DataSourceOptions } from 'typeorm';
import { envs } from './envs';
import { join } from 'path';

dotenvConfig({ path: '.env' });

const config = {
  type: 'postgres',
  host: `${envs.postgresql.host}`,
  port: `${envs.postgresql.port}`,
  username: `${envs.postgresql.username}`,
  password: `${envs.postgresql.password}`,
  database: `${envs.postgresql.database}`,
  entities: [join(__dirname, '/../**/*.entity{.ts,.js}')],
  migrations: [join(__dirname, '/../migrations/*{.ts,.js}')],
  autoLoadEntities: true,
  synchronize: false,
};

export default registerAs('typeorm', () => config);
export const connectionSource = new DataSource(config as DataSourceOptions);
