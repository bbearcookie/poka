import fs from 'fs/promises';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { PHOTO_IMAGE_DIR } from '@uploader/image.uploader';
import { selectPhotoDetail } from '@service/photo/select';
import { deletePhoto } from '@service/photo/delete';

export const validator = [
  isAdmin,
  param('photocardId').isNumeric().withMessage('포토카드 ID는 숫자여야 해요.'),
  validate
]

// 포토카드 데이터 삭제
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const photocardId = Number(req.params.photocardId);

  const [[photo]] = await selectPhotoDetail(photocardId);
  if (!photo) return res.status(404).json({ message: '해당 포토카드의 데이터가 서버에 존재하지 않아요.' });

  // 기존의 이미지 파일 삭제
  if (process.env.INIT_CWD) {
    try { fs.rm(path.join(process.env.INIT_CWD, PHOTO_IMAGE_DIR, photo.imageName)) }
    catch (err) { console.error(err); }
  }

  await deletePhoto(photocardId);
  return res.status(200).json({ message: `포토카드 ${photo.name} 을(를) 삭제했어요.` });
  next();
}