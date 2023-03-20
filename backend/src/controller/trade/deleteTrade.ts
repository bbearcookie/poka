import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { selectTradeDetail } from '@service/trade/select';
import { deleteTrade } from '@service/trade/delete';

interface Params {
  tradeId: number;
}

export const validator = [
  isLoggedIn,
  param('tradeId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('교환글 ID는 숫자여야 해요.'),
  validate
]

// 교환글 삭제
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { tradeId } = req.params as unknown as Params;

  const [[trade]] = await selectTradeDetail(tradeId);
  if (!trade) return res.status(404).json({ message: '삭제하려는 교환글이 존재하지 않아요.' });
  if (trade.state !== 'trading') return res.status(400).json({ message: '이미 교환이 완료된 교환글은 삭제할 수 없어요.' });
  if (!isAdminOrOwner(loggedUser, trade.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

  await deleteTrade(trade.tradeId, trade.voucherId);
  return res.status(200).json({ message: '교환글을 삭제했어요.' });

  next();
}