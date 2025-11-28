import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HelloworldService } from './helloworld.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { HelloworldResponseDto } from './dto/helloworld-response.dto';
import { Public } from 'src/common/decorators';
@Controller({
  path: '/hello-world',
  version: '1',
})
@ApiTags('Helloworld')
export class HelloworldController {
  constructor(private readonly helloworldService: HelloworldService) {}
  @Public()
  @Get('hi')
  @ApiOperation({ summary: 'Hello world endpoint' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: HelloworldResponseDto,
  })
  getHello(): Promise<HelloworldResponseDto> {
    return this.helloworldService.getHello();
  }
}
