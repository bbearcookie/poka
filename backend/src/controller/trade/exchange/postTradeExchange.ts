import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { LoginToken } from '@type/user';
import { selectTradeDetail } from '@service/trade/select';
import { selectVoucherDetail } from '@service/voucher/select';
import { exchangeTrade } from '@service/trade/update';

export const validator = [
  isLoggedIn,
  param('tradeId').isNumeric().withMessage('교환글 ID는 숫자여야 해요.').bail(),
  body('vouchers').isArray({ min: 1 }).withMessage('교환할 소유권을 선택해주세요.').bail(),
  body('vouchers.*')
    .isNumeric().withMessage('소유권 ID는 숫자여야 해요.').bail(),
  validate
]

// 교환
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const tradeId = Number(req.params.tradeId);
  const vouchers = req.body.vouchers as number[];

  // 교환글 확인
  const [[trade]] = await selectTradeDetail(tradeId);
  if (!trade) return res.status(404).json({ message: '해당 교환글이 존재하지 않아요.' });
  if (trade.state !== 'trading') return res.status(400).json({ message: '이미 교환이 완료된 교환글이에요.' });
  if (trade.userId === loggedUser.userId) return res.status(403).json({ message: '자신이 작성한 교환글이에요.' });
  if (vouchers.length !== trade.amount) return res.status(403).json({ message: `사용할 소유권을 ${trade.amount}개 선택해주세요.` });

  // 교환글 소유권 확인
  const [[voucher]] = await selectVoucherDetail(trade.voucherId);
  if (!voucher) return res.status(404).json({ message: '교환글의 소유권이 존재하지 않아요.' });
  if (voucher.owner.userId !== trade.userId) return res.status(404).json({ message: '교환글의 작성자가 소유권의 실 소유주가 아니에요.' });
  
  // 소유권 확인
  for (let voucherId of vouchers) {
    const [[voucher]] = await selectVoucherDetail(voucherId);
    if (!trade) return res.status(404).json({ message: '사용하려는 소유권이 존재하지 않아요.' });
    if (voucher.owner.userId !== loggedUser.userId) return res.status(403).json({ message: '사용하려는 소유권이 당신의 것이 아니에요.' });
    if (voucher.state !== 'available') return res.status(400).json({ message: '사용하려는 소유권이 교환 가능한 상태가 아니에요.' });
  }

  // 교환 진행
  await exchangeTrade({
    tradeId: trade.tradeId,
    voucherId: trade.voucherId,
    userId: loggedUser.userId,
    voucherIds: vouchers
  });

  return res.status(200).json({ message: '교환이 완료되었어요.' });
  next();
}