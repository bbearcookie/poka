import fs from 'fs/promises';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { check, body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import ImageUploader, { getPhotoImageDir } from '@uploader/image.uploader.new';
import { putFile, deleteFile } from '@util/s3';
import { isAdmin } from '@validator/middleware/auth';
import { getTimestampFilename, removeFile } from '@util/multer';
import { insertPhotos } from '@service/photo/insert';
import { updateImagename } from '@service/photo/update';

interface Body {
  groupId: number;
  memberId: number;
  names: string[];
}

const validator = [
  isAdmin,
  body('groupId')
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('그룹 ID는 숫자여야 해요.')
    .bail()
    .custom(v => v > 0)
    .withMessage('그룹을 선택해주세요.')
    .bail(),
  body('memberId')
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('멤버 ID는 숫자여야 해요.')
    .bail()
    .custom(v => v > 0)
    .withMessage('멤버를 선택해주세요.')
    .bail(),
  body('names').isArray({ min: 1 }).withMessage('포토카드를 등록해주세요.').bail(),
  body('names.*')
    .trim()
    .notEmpty()
    .withMessage('포토카드 이름이 비어있어요.')
    .bail()
    .isString()
    .withMessage('포토카드 이름은 문자열이어야 해요.')
    .bail()
    .isLength({ min: 1, max: 100 })
    .withMessage('포토카드 이름은 최대 100글자까지 입력할 수 있어요.')
    .bail(),
  validate,
];

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { groupId, memberId, names } = req.body as Body;
  const files = req.files as Express.Multer.File[];

  // DB에 포토카드 데이터 생성
  const insertIds = await insertPhotos(memberId, names);

  // 이미지 파일 관련 병렬 처리
  const imagePromises = insertIds.map(
    (photocardId, i) =>
      new Promise((resolve, reject) => {
        const file = files[i];
        const newFilename = getTimestampFilename(photocardId.toString(), file.mimetype);

        // S3에 이미지 파일 업로드
        const putFilePromise = new Promise((resolve, reject) => {
          putFile({ Key: getPhotoImageDir(newFilename), Body: file.buffer })
            .then(resolve)
            .catch(reject);
        });

        // DB에 이미지 파일 이름 저장
        const updateDBPromise = new Promise((resolve, reject) => {
          updateImagename(photocardId, newFilename).then(resolve).catch(reject);
        });

        Promise.all([putFilePromise, updateDBPromise]).then(resolve).catch(reject);
      })
  );
  await Promise.all([...imagePromises]);

  return res.status(200).json({ message: '새로운 포토카드를 등록했어요.' });
  next();
};

const uploader = new ImageUploader('images[]');

// 포토카드 추가
const postPhotos = [uploader.array(), uploader.errorHandler, ...validator, controller];

export default postPhotos;
