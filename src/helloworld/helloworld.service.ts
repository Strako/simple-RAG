import { HttpService } from '@nestjs/axios';
import { Inject, Injectable } from '@nestjs/common';
import { Helloworld } from './entities';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CACHE_MANAGER } from '@nestjs/cache-manager';
import { HelloworldResponseDto } from './dto';
import { Cache } from 'cache-manager';
@Injectable()
export class HelloworldService {
  constructor(
    private readonly httpService: HttpService,
    @InjectRepository(Helloworld)
    private readonly helloRepository: Repository<Helloworld>,
    @Inject(CACHE_MANAGER) private readonly cacheManager: Cache,
  ) {}

  async getHello(): Promise<HelloworldResponseDto> {
    const greeting = await this.helloRepository
      .createQueryBuilder('hello')
      .getOne();

    const result = new HelloworldResponseDto(greeting?.description ?? 'Hi');

    return result;
  }
}
