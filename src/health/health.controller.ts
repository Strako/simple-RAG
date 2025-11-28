import { Controller, Get, HttpStatus } from '@nestjs/common';
import { HealthService } from './health.service';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { Public } from 'src/common/decorators';
import { HealthResponseDto } from './dto/health-response.dto';
@Controller({
  path: '/health',
  version: '1',
})
@ApiTags('Status')
export class HealthController {
  constructor(private readonly healtService: HealthService) {}
  @Public()
  @Get('status')
  @ApiOperation({ summary: 'Status of the app' })
  @ApiResponse({
    status: HttpStatus.OK,
    type: HealthResponseDto,
  })
  getHello(): Promise<HealthResponseDto> {
    return this.healtService.getStatus();
  }
}
