import { HelloworldService } from './helloworld.service';
import { HelloworldResponseDto } from './dto/helloworld-response.dto';
export declare class HelloworldController {
    private readonly helloworldService;
    constructor(helloworldService: HelloworldService);
    getHello(): Promise<HelloworldResponseDto>;
}
