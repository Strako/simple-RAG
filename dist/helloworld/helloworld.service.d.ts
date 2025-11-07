import { HttpService } from '@nestjs/axios';
import { Helloworld } from './entities';
import { Repository } from 'typeorm';
import { HelloworldResponseDto } from './dto';
import { Cache } from 'cache-manager';
export declare class HelloworldService {
    private readonly httpService;
    private readonly helloRepository;
    private readonly cacheManager;
    constructor(httpService: HttpService, helloRepository: Repository<Helloworld>, cacheManager: Cache);
    getHello(): Promise<HelloworldResponseDto>;
}
