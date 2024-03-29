import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { selectTradeDetailByVoucherID } from '@service/trade/select';

interface Params {
  voucherId: number;
}

const validator = [
  param('voucherId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('소유권 ID는 숫자여야 해요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { voucherId } = req.params as unknown as Params;

  const [[trade]] = await selectTradeDetailByVoucherID(voucherId);
  if (!trade) return res.status(404).json({ message: '해당 소유권으로 작성된 교환글이 존재하지 않아요.' });

  return res.status(200).json({ message: '교환글을 조회했어요.', ...trade });
  next();
}

// 특정 소유권으로 등록된 교환글 중 아직 성사되지 않은 글을 조회함
const getTradeDetailByVoucherId = [
  ...validator,
  controller
];

export default getTradeDetailByVoucherId;