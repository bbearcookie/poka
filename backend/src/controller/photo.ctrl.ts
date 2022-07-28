import { Request, Response } from 'express';
import { body } from 'express-validator';
import fs from 'fs/promises';
import path from 'path';
import { validate, removeFiles } from '@util/validator';
import photoUploader, { PHOTO_IMAGE_DIR } from '@uploader/photo.uploader';
import * as photoService from '@service/photo.service';
import { getTimestampFilename } from '@util/multer';

// 포토카드 추가
export const postPhotos = {
  uploader: photoUploader('image[]'),
  validator: [
    body('groupId')
      .isNumeric().withMessage("그룹 ID는 숫자여야 해요.").bail()
      .custom((value: number, { req }) => value != 0).withMessage("그룹을 선택해주세요.").bail(),
    body('memberId')
      .isNumeric().withMessage("멤버 ID는 숫자여야 해요.").bail()
      .custom((value: number, { req }) => value != 0).withMessage("멤버를 선택해주세요.").bail(),
    body('name').isArray({ min: 1 }).withMessage('포토카드를 등록해주세요.'),
    body('name.*').trim()
      .notEmpty().withMessage('포토카드 이름이 비어있어요.').bail()
      .isString().withMessage('포토카드 이름은 문자열이어야 해요.').bail()
      .isLength({ min: 1, max: 100 }).withMessage('포토카드 이름은 최대 100글자까지 입력할 수 있어요.').bail(),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const groupId = Number(req.body.groupId);
    const memberId = Number(req.body.memberId);
    const name = req.body.name as unknown as string[];
    const files = req.files as Express.Multer.File[];

    try {
      let insertIds: number[] = [];

      try {
        insertIds = await photoService.insertPhotos(memberId, name);
      } catch (err) {
        removeFiles(files); // 데이터 추가 트랜잭션 처리중 에러 발생시 임시 파일 제거
        throw err;
      }

      // 임시 파일명 변경
      insertIds.forEach((insertId, idx) => {
        const file = files[idx];
        const newFilename = getTimestampFilename(insertId.toString(), file.mimetype);
        try { fs.rename(file.path, path.join(file.destination, newFilename)) }
        catch (err) { console.error(err); }
        photoService.updateImagename(insertId, newFilename);
      });

      return res.status(200).json({ message: '새로운 포토카드를 등록했어요.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}