import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HealthResponseDto } from './dto';
import { Cache } from 'cache-manager';
import { OK_RESPONSE } from 'src/common/helpers';
@Injectable()
export class HealthService {
  constructor(
    private readonly httpService: HttpService,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getStatus(): Promise<HealthResponseDto> {
    return { message: OK_RESPONSE };
  }
}
