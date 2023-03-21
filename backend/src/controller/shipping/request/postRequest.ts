import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { createResponseMessage } from '@validator/function/response';
import { LoginToken } from '@type/user';
import { AddressForm, AddressFormValidator } from '@validator/chain/address';
import { selectVoucherDetail } from '@service/voucher/select';
import { insertShippingRequest } from '@service/shipping/request/insert';

interface Body {
  address: AddressForm;
  voucherIds: number[];
}

const validator = [
  isLoggedIn,
  ...AddressFormValidator,
  body('voucherIds')
    .isArray({ min: 1 }).withMessage('소유권을 선택해주세요.'),
  body('voucherIds.*')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('소유권 ID는 숫자여야 해요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { address, voucherIds } = req.body as Body;

  // 소유권 유효성 검사
  const [vouchers] = await selectVoucherDetail(voucherIds);
  if (vouchers.length === 0) return res.status(404).json(createResponseMessage('voucherIds', '사용하려는 소유권을 찾지 못했어요.'));
  vouchers.forEach(voucher => {
    if (loggedUser.userId !== voucher.owner.userId)
      return res.status(403).json(createResponseMessage('voucherIds', '당신의 소유권이 아니에요.'));
    if (voucher.state !== 'available')
      return res.status(403).json(createResponseMessage('voucherIds', '배송 요청하려는 소유권 중에 이용가능 상태가 아닌 소유권이 있어요.'));
  });

  // 배송 요청 생성
  const requestId = await insertShippingRequest(loggedUser.userId, voucherIds, address);
  return res.status(200).json({ message: '배송 요청글을 작성했어요. 이어서 배송비를 결제해주세요.', requestId });
  next();
}

// 배송 요청 작성
const postRequest = [
  ...validator,
  controller
];

export default postRequest;