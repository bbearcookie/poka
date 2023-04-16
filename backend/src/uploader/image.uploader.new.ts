import { Request, Response, NextFunction } from 'express';
import multer, { Multer, MulterError } from 'multer';
import { createResponseMessage } from '@validator/function/response';

export function getGroupImageDir(fileName: string) {
  return `image/group/${fileName}`;
}

class ImageUploader {
  fieldName: string;
  multer: Multer;

  constructor(fieldName: string) {
    this.fieldName = fieldName;
    this.multer = multer({
      storage: multer.memoryStorage(),
      limits: {
        fileSize: 5 * 1024 * 1024,
      },
      fileFilter: (req, file, callback) => {
        const acceptable = ['image/jpeg', 'image/png'];

        if (!acceptable.includes(file.mimetype))
          callback(new FilterError('NOT_ACCEPTABLE', '.jpg, .png 파일만 업로드할 수 있어요.'));

        callback(null, true);
      },
    });
  }

  single = () => this.multer.single(this.fieldName); // 싱글 파일 업로더
  array = () => this.multer.array(this.fieldName); // 다중 파일 업로더
  fields = () => this.multer.fields([{ name: this.fieldName }]); // 다중 파일 업로더

  errorHandler = (err: Error, req: Request, res: Response, next: NextFunction) => {
    if (isExceedLimitSize(err))
      return res.status(413).json(createResponseMessage(this.fieldName, '5MB 이하의 파일만 업로드할 수 있어요.'));

    if (isNotAcceptable(err)) return res.status(413).json(createResponseMessage(this.fieldName, err.message));
    return res.status(400).json(createResponseMessage(this.fieldName, err.message));

    // 파일의 용량이 초과했는지 확인
    function isExceedLimitSize(err: MulterError | Error) {
      if (err instanceof MulterError && err.code === 'LIMIT_FILE_SIZE') return true;
      return false;
    }

    // 파일이 받을 수 없는 확장자인지 체크
    function isNotAcceptable(err: FilterError | Error) {
      if (err instanceof FilterError && err.code === 'NOT_ACCEPTABLE') return true;
      return false;
    }
  };
}

export default ImageUploader;

type CodeType = 'NOT_ACCEPTABLE';
class FilterError extends Error {
  code: CodeType;

  constructor(code: CodeType, message: string) {
    super(message);
    this.code = code;
  }
}
