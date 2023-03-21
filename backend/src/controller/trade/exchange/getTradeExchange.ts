import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { LoginToken } from '@type/user';
import { isLoggedIn } from '@validator/middleware/auth';
import { selectTradeDetail } from '@service/trade/select';
import { selectWantCardsOfTrade } from '@service/photo/select';
import { selectHaveVouchersOfTrade } from '@service/voucher/select';

interface Params {
  tradeId: number;
}

const validator = [
  isLoggedIn,
  param('tradeId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('교환글 ID는 숫자여야 해요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { tradeId } = req.params as unknown as Params;

  // 교환글 확인
  const [[trade]] = await selectTradeDetail(tradeId);
  if (!trade) return res.status(404).json({ message: '해당 교환글이 존재하지 않아요.' });
  if (trade.state !== 'trading') return res.status(400).json({ message: '이미 교환이 완료된 교환글이에요.' });
  if (trade.userId === loggedUser.userId) return res.status(403).json({ message: '자신이 작성한 교환글이에요.' });

  // 교환글이 원하는 포토카드 확인
  const [wantcards] = (await selectWantCardsOfTrade(tradeId));
  const wantcardIds = wantcards.map(item => item.photocardId);

  // 사용자가 소유한 교환 가능 소유권 확인
  const [vouchers] = await selectHaveVouchersOfTrade(loggedUser.userId, wantcardIds);
  if (vouchers.length < trade.amount) return res.status(400).json({ message: '보유하고 있는 조건에 맞는 소유권이 부족해요.' });

  return res.status(200).json({ message: '교환 가능한 소유권을 조회했어요.', vouchers });
  next();
}

// 로그인 한 사용자가 가지고 있는 소유권 중에서 해당 교환글과 교환이 가능한 소유권 조회
const getTradeExchange = [
  ...validator,
  controller
]

export default getTradeExchange;