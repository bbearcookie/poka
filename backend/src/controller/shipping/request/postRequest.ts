import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { createResponseMessage } from '@validator/function/response';
import { LoginTokenType } from '@type/user';
import { AddressForm } from '@controller/user/address/postAddress';
import { selectVoucherDetail } from '@service/voucher/select';
import { insertShippingRequest } from '@service/shipping/request/insert';

export const validator = [
  isLoggedIn,
  body('voucherIds').isArray({ min: 1 }).withMessage('소유권을 선택해주세요.'),
  ...AddressForm.validator,
  validate
]

// 배송 요청 작성
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginTokenType;
  const voucherIds = req.body.voucherIds as number[];
  const address = AddressForm.form(req);

  // 소유권 유효성 검사
  const [vouchers] = await selectVoucherDetail(voucherIds);
  if (vouchers.length === 0) return res.status(404).json(createResponseMessage('voucherIds', '사용하려는 소유권을 찾지 못했어요.'));
  vouchers.forEach(voucher => {
    if (loggedUser.userId !== voucher.userId)
      return res.status(403).json(createResponseMessage('voucherIds', '당신의 소유권이 아니에요.'));
    if (voucher.state !== 'available')
      return res.status(403).json(createResponseMessage('voucherIds', '배송 요청하려는 소유권 중에 이용가능 상태가 아닌 소유권이 있어요.'));
  });

  // 배송 요청 생성
  const requestId = await insertShippingRequest(loggedUser.userId, voucherIds, address);
  return res.status(200).json({ message: '배송 요청글을 작성했어요. 이어서 배송비를 결제해주세요.', requestId });
  next();
}