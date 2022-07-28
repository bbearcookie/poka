import { Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '@util/validator';
import photoUploader, { PHOTO_IMAGE_DIR } from '@uploader/photo.uploader';

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
    body('name.*').trim().notEmpty().withMessage('포토카드 이름이 비어있어요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const groupId = Number(req.body.groupId);
    const memberId = Number(req.body.memberId);
    const name = req.body.name;

    try {
      console.log(req.body);
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}