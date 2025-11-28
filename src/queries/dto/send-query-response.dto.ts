import { IsBoolean, IsOptional, IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { EXAMPLE_QUERIE_RESPONSE } from '../common/constants';
import { SendQueryRepsonseObject } from '../common/interfaces';

export class SendQueryResponseDto {
  @ApiProperty({ example: true, required: true })
  @IsBoolean()
  success: boolean;

  @ApiProperty({ example: EXAMPLE_QUERIE_RESPONSE, required: false })
  @IsOptional()
  @IsString()
  completition?: string;

  constructor(response: SendQueryRepsonseObject) {
    this.success = response.success;
    this.completition = response.completition ?? undefined;
  }
}
