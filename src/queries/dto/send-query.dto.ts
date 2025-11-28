import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';

export class SendQueryDto {
  @ApiProperty({ example: 'What is the main purpose of the file', required: true })
  @IsString()
  @IsNotEmpty()
  querie: string;

  @ApiProperty({ example: '1764345362979-example', required: true })
  @IsString()
  @IsNotEmpty()
  namespace: string;
}
