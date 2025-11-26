import { BadRequestException, Injectable } from '@nestjs/common';
import { FIFTY_MB, ONE_KB } from 'src/common/helpers';
import { getNameSpace, ingest } from './common/utils';
import { UploadFileResponseDto } from './dto/upload-file-response.dto';
import { UploadFileResponseData } from './common/types';

@Injectable()
export class FileUploadService {
  async handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException('no file uploaded');
    }

    const allowedMimeTypes = ['application/pdf'];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException('Invalid file type, upload a .pdf');
    }

    const maxSize = FIFTY_MB * ONE_KB * ONE_KB;
    if (file.size > maxSize) {
      throw new BadRequestException('File is too large!');
    }
    const filepath = file.path;
    const namespace = getNameSpace(filepath);

    const result = await ingest(filepath, namespace);

    const response: UploadFileResponseData = {
      success: result.success,
      message: result.message,
      filepath,
      namespace,
    };

    return new UploadFileResponseDto(response);
  }
}
