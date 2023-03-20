import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { selectPhotoDetail } from '@service/photo/select';

type Params = {
  photocardId: number;
}

export const validator = [
  param('photocardId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('포토카드 ID는 숫자여야 해요.'),
  validate
]

// 포토카드 상세 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { photocardId } = req.params as unknown as Params;

  const [[photo]] = await selectPhotoDetail(photocardId);
  if (!photo) return res.status(404).json({ message: '해당 포토카드의 데이터가 서버에 존재하지 않아요.' });

  return res.status(200).json({ message: `${photocardId}번 포토카드의 상세 정보를 조회했습니다.`, ...photo });

  next();
}