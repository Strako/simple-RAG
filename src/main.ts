import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { Logger, ValidationPipe, VersioningType } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { getVersion, initSwagger, envs } from './config';
import helmet from 'helmet';
import * as bodyParser from 'body-parser';
import { MAX_RESUME_SIZE_IN_MB } from './common/helpers';

async function bootstrap() {
  const logger = new Logger('Main Simple-Rag');
  const app = await NestFactory.create(AppModule);
  const configService = app.get(ConfigService);

  app.use(helmet());
  app.enableCors();

  getVersion();

  app.useGlobalPipes(
    new ValidationPipe({
      transform: true,
      whitelist: true,
      forbidNonWhitelisted: true,
    }),
  );
  app.setGlobalPrefix('api');
  app.enableVersioning({
    type: VersioningType.URI,
  });

  app.use(bodyParser.json({ limit: `${MAX_RESUME_SIZE_IN_MB}mb` }));
  app.use(
    bodyParser.urlencoded({
      limit: `${MAX_RESUME_SIZE_IN_MB}mb`,
      extended: true,
    }),
  );

  await initSwagger(app, configService);

  await app.listen(envs.port).then(() => logger.log(`Server running on port ${envs.port}`));
}
bootstrap();
