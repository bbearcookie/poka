import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { selectTradeDetail } from '@service/trade/select';
import { selectWantCardsOfTrade } from '@service/photo/select';

interface Params {
  tradeId: number;
}

export const validator = [
  param('tradeId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('교환글 ID는 숫자여야 해요.'),
  validate
]

// 교환글 상세 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { tradeId } = req.params as unknown as Params;

  const [[trade]] = await selectTradeDetail(tradeId);
  if (!trade) return res.status(404).json({ message: '조회하려는 교환글이 존재하지 않아요.' });
  const [wantcards] = await selectWantCardsOfTrade(tradeId);

  return res.status(200).json({
    message: '교환글을 조회했어요.',
    wantcards,
    ...trade
  });

  next();
}