import { Controller, Post, Body, HttpStatus } from '@nestjs/common';
import { QueriesService } from './queries.service';
import { SendQueryDto } from './dto/send-query.dto';
import { SendQueryResponseDto } from './dto/send-query-response.dto';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';

@Controller({
  path: '/queries',
  version: '1',
})
@ApiTags('Queries')
export class QueriesController {
  constructor(private readonly queriesService: QueriesService) {}

  @Post()
  @ApiOperation({ summary: 'Endpoint to send message completitions' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: SendQueryResponseDto,
  })
  send(@Body() createQueryDto: SendQueryDto): Promise<SendQueryResponseDto> {
    return this.queriesService.sendQuerie(createQueryDto);
  }
}
