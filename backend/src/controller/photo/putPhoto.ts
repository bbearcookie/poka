import fs from 'fs/promises';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import imageUploader, { PHOTO_IMAGE_DIR } from '@uploader/image.uploader';
import { isAdmin } from '@validator/middleware/auth';
import { getTimestampFilename, removeFile } from '@util/multer';
import { selectPhotoDetail } from '@service/photo/select';
import { updatePhoto } from '@service/photo/update';

interface Params {
  photocardId: number;
}

interface Body {
  groupId: number;
  memberId: number;
  name: string;
}

const validator = [
  isAdmin,
  param('photocardId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('포토카드 ID는 숫자여야 해요.')
    .custom(v => v > 0).withMessage("포토카드 ID가 비정상적이에요.").bail(),
  body('groupId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage("그룹 ID는 숫자여야 해요.").bail()
    .custom(v => v > 0).withMessage("그룹을 선택해주세요.").bail(),
  body('memberId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage("멤버 ID는 숫자여야 해요.").bail()
    .custom(v => v > 0).withMessage("멤버를 선택해주세요.").bail(),
  body('name')
    .trim()
    .notEmpty().withMessage('포토카드 이름이 비어있어요.').bail()
    .isString().withMessage('포토카드 이름은 문자열이어야 해요.').bail()
    .isLength({ min: 1, max: 100 }).withMessage('포토카드 이름은 최대 100글자까지 입력할 수 있어요.').bail(),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { photocardId } = req.params as unknown as Params;
  const { groupId, memberId, name } = req.body as Body;
  const file = req.file;

  const [[photo]] = await selectPhotoDetail(photocardId);
  if (!photo) return res.status(404).json({ message: '해당 포토카드의 데이터가 서버에 존재하지 않아요.' });

  let newFilename: string | undefined;
  if (file) {
    // 임시 다운로드 파일 이름 변경
    newFilename = getTimestampFilename(photocardId.toString(), file.mimetype);
    try { fs.rename(file.path, path.join(file.destination, newFilename)) }
    catch (err) { console.error(err); }

    // 기존의 이미지 파일 삭제
    if (process.env.INIT_CWD) {
      try { fs.rm(path.join(process.env.INIT_CWD, PHOTO_IMAGE_DIR, photo.imageName)) }
      catch (err) { console.error(err); }
    }
  }

  await updatePhoto(photocardId, memberId, name, newFilename);
  return res.status(200).json({ message: '포토카드 정보를 수정했어요.' });

  next();
}

const uploader = imageUploader('image', PHOTO_IMAGE_DIR);

// 포토카드 데이터 수정
const putPhoto = [
  uploader.single,
  uploader.errorHandler,
  ...validator,
  controller
];

export default putPhoto;