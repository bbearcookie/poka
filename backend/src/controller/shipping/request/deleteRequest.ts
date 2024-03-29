import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { selectShippingRequestDetail } from '@service/shipping/request/select';
import { deleteShippingRequest } from '@service/shipping/request/delete';
import { selectShippingRequestVoucherIds } from '@service/voucher/select';

interface Params {
  requestId: number;
}

const validator = [
  isLoggedIn,
  param('requestId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('요청 ID는 숫자여야 해요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { requestId } = req.params as unknown as Params;
  
  // 배송 요청 관련 유효성 검사
  const [[shipping]] = await selectShippingRequestDetail(requestId);
  if (!shipping) return res.status(404).json({ message: '해당 배송 요청을 찾지 못했어요.' });
  if (!isAdminOrOwner(loggedUser, shipping.author.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });
  if (shipping.payment.state !== 'waiting') return res.status(400).json({ message: '아직 미결제 상태인 경우에만 삭제할 수 있어요.' });
  if (shipping.state !== 'waiting') return res.status(400).json({ message: '관리자가 이미 배송처리한 경우에는 삭제할 수 없어요.' });

  const [vouchers] = await selectShippingRequestVoucherIds(requestId);

  // 배송 요청 삭제
  await deleteShippingRequest(requestId, shipping.payment.paymentId);
  return res.status(200).json({
    message: '배송 요청을 취소했어요.',
    voucherIds: vouchers.length > 0 ? vouchers.map(v => v.voucherId) : []
  });
  
  next();
}

// 배송 요청 삭제
const deleteRequest = [
  ...validator,
  controller
];

export default deleteRequest;