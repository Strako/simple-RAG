import { BadRequestException, Injectable } from '@nestjs/common';
import { ALLOWED_TYPES, FIFTY_MB, FILE_TOO_LARGE, INVALID_FILE, NO_FILE, ONE_KB } from 'src/common/helpers';
import { deleteFile, getNameSpace, ingest } from './common/utils';
import { UploadFileResponseDto } from './dto/upload-file-response.dto';
import { UploadFileResponseData } from './common/types';

@Injectable()
export class FileUploadService {
  async handleFileUpload(file: Express.Multer.File) {
    if (!file) {
      throw new BadRequestException(NO_FILE);
    }

    const allowedMimeTypes = [ALLOWED_TYPES];
    if (!allowedMimeTypes.includes(file.mimetype)) {
      throw new BadRequestException(INVALID_FILE);
    }

    const maxSize = FIFTY_MB * ONE_KB * ONE_KB;
    if (file.size > maxSize) {
      throw new BadRequestException(FILE_TOO_LARGE);
    }

    const filepath = file.path;
    const namespace = getNameSpace(filepath);

    const result = await ingest(filepath, namespace);
    if (result.success) {
      deleteFile(filepath);
    }
    const response: UploadFileResponseData = {
      success: result.success,
      message: result.message,
      filepath,
      namespace,
    };

    return new UploadFileResponseDto(response);
  }
}
