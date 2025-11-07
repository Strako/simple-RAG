import { INestApplication } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
export declare function initSwagger(app: INestApplication, configService: ConfigService): Promise<void>;
