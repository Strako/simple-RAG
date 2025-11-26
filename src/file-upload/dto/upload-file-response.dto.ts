import { ApiProperty } from '@nestjs/swagger';
import { UploadFileResponseData } from '../common/types';

export class UploadFileResponseDto {
  @ApiProperty()
  success: boolean;

  @ApiProperty()
  message: string;

  @ApiProperty()
  filepath: string;

  @ApiProperty()
  namespace: string;

  constructor(uploadFileResponseData: UploadFileResponseData) {
    this.success = uploadFileResponseData.success;
    this.message = uploadFileResponseData.message;
    this.filepath = uploadFileResponseData.filepath;
    this.namespace = uploadFileResponseData.namespace;
  }
}
