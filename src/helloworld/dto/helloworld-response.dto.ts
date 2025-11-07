import { IsString } from '@nestjs/class-validator';
import { ApiProperty } from '@nestjs/swagger';
export class HelloworldResponseDto {
  @ApiProperty({ example: 'Hello', required: true })
  @IsString()
  response: string;

  constructor(response: string) {
    this.response = response ?? 'Hello World';
  }
}
