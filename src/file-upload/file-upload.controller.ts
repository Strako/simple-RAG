import { Controller, Post, UseInterceptors, UploadedFile, HttpStatus } from '@nestjs/common';
import { FileUploadService } from './file-upload.service';
import { FileInterceptor } from '@nestjs/platform-express';
import { UploadFileResponseData } from './common/types';
import { ApiResponse } from '@nestjs/swagger';
import { UploadFileResponseDto } from './dto/upload-file-response.dto';

@Controller('file-upload')
export class FileUploadController {
  constructor(private readonly fileUploadService: FileUploadService) {}

  @Post('upload')
  @UseInterceptors(FileInterceptor('file'))
  @ApiResponse({
    status: HttpStatus.CREATED,
    type: UploadFileResponseDto,
  })
  uploadFile(@UploadedFile() file: Express.Multer.File): Promise<UploadFileResponseData> {
    return this.fileUploadService.handleFileUpload(file);
  }
}
