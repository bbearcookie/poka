import multer from 'multer';
import { MulterError } from 'multer';
import { getStoarage } from '@util/multer';
import { Request, Response, NextFunction } from 'express';
export const GROUP_IMAGE_DIR = 'public/image/group';

const uploader = multer({
  storage: getStoarage(GROUP_IMAGE_DIR),
  limits: {
    fileSize: 5 * 1024 * 1024
  },
  fileFilter: (req, file, callback) => {
    const acceptable = ['image/jpeg', 'image/png'];

    if (acceptable.includes(file.mimetype)) callback(null, true);
    else callback(new Error(".jpg, .png 파일만 업로드할 수 있어요."));
  }
});

export default (fieldName: string) => ({
  // 싱글 파일 업로더
  single: uploader.single(fieldName),
  // 다중 파일 업로더
  array: uploader.array(fieldName),
  // 파일 유효성 검사 실패시 에러 응답
  errorHandler: async (err: MulterError | Error, req: Request, res: Response, next: NextFunction) => {
    if (err instanceof MulterError) {
      switch (err.code) {
        case "LIMIT_FILE_SIZE":
          const TEXT = '5MB 이하의 파일만 업로드할 수 있어요.'
          return res.status(413).json({
            message: TEXT,
            errors: [{
              param: fieldName,
              message: TEXT
            }]
          });
      }
    } else {
      return res.status(400).json({
        message: err.message,
        errors: [{
          param: fieldName,
          message: err.message
        }]
      })
    }
    
    next();
  }
});