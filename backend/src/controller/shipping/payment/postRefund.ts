import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { getToken, refundPayment } from '@util/iamport';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { selectShippingRequestDetail } from '@service/shipping/request/select';
import { selectPaymentDetail } from '@service/shipping/payment/select';
import { updatePaymentState } from '@service/shipping/payment/update';

interface Params {
  requestId: number;
}

export const validator = [
  isLoggedIn,
  param('requestId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('요청 ID는 숫자여야 해요.'),
  validate
]

// 배송비 환불
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { requestId } = req.params as unknown as Params;

  // 배송 요청 정보
  const [[shipping]] = await selectShippingRequestDetail(requestId);
  if (!shipping) return res.status(404).json({ message: '해당 배송 요청을 찾지 못했어요.' });
  if (!isAdminOrOwner(loggedUser, shipping.author.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });
  if (shipping.state !== 'waiting') return res.status(400).json({ message: '관리자가 이미 배송 처리한 경우에는 취소할 수 없어요.' });

  // 포트원 액세스 토큰 발급
  const token = await getToken();

  // 결제 정보 확인
  const [[payment]] = await selectPaymentDetail(shipping.payment.paymentId);
  if (!payment) return res.status(404).json({ message: '해당 결제 정보를 찾지 못했어요.' });

  // 포트원 환불 요청
  const refundData = await refundPayment(payment.impUID, shipping.payment.amount, '배송 요청 취소', token);
  if (!refundData.response) return res.status(400).json({ message: refundData.message });

  // 결제 상태 변경
  await updatePaymentState(payment.paymentId, 'waiting');
  return res.status(200).json({ message: '결제 금액이 환불되었어요.' });
  next();
}