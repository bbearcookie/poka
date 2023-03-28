import { NextFunction, Request, Response } from 'express';
import { TradeItem } from '@type/trade';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { selectTradeDetail } from '@service/trade/select';
import { selectWantCardsOfTrade } from '@service/photo/select';
import { selectUserDetailByUserID } from '@service/user/select';

interface Params {
  tradeId: number;
}

const validator = [
  param('tradeId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('교환글 ID는 숫자여야 해요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { tradeId } = req.params as unknown as Params;

  const [[trade]] = await selectTradeDetail(tradeId);
  if (!trade) return res.status(404).json({ message: '조회하려는 교환글이 존재하지 않아요.' });

  const [[author]] = await selectUserDetailByUserID(trade.userId);
  if (!author) return res.status(404).json({ message: '작성자 정보가 존재하지 않아요.' });

  const [wantcards] = await selectWantCardsOfTrade(tradeId);

  const result: TradeItem = {
    ...trade,
    wantcards,
    author: {
      userId: author.userId,
      username: author.username,
      nickname: author.nickname,
      imageName: author.imageName
    }
  }

  return res.status(200).json({
    message: '교환글을 조회했어요.',
    ...result
  });

  next();
}

// 교환글 상세 조회
const getTradeDetail = [
  ...validator,
  controller
];

export default getTradeDetail;