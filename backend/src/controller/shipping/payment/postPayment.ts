import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { getToken, getPaymentData } from '@util/iamport';
import { selectShippingRequestDetail } from '@service/shipping/request/select';
import { updatePaymentimpUID, updatePaymentState } from '@service/shipping/payment/update';

export const validator = [
  param('requestId').isNumeric().withMessage('요청 ID는 숫자여야 해요.'),
  body('impUID').notEmpty().withMessage('impUID가 없어요.'),
  validate
]

// 배송 요청의 결제 검증 후 완료 처리
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const requestId = Number(req.params.requestId);
  const impUID = req.body.impUID;

  // 배송 요청 정보
  const [[shipping]] = await selectShippingRequestDetail(requestId);
  if (!shipping) return res.status(404).json({ message: '해당 배송 요청을 찾지 못했어요.' });
  
  // 포트원 액세스 토큰 발급
  const token = await getToken();

  // 결제 정보 조회
  const payment = await getPaymentData(impUID, token);
  if (!payment) return res.status(404).json({ message: '포트원 결제 정보를 찾지 못했어요.' });

  // impUID를 DB에 저장
  await updatePaymentimpUID(shipping.paymentId, impUID);

  // 결제 금액이 일치하면 결제 완료 처리. 다르면 위조 처리.
  if (payment.amount === shipping.amount && payment.status === 'paid') {
    await updatePaymentState(shipping.paymentId, 'paid');
    return res.status(200).json({ message: '배송비가 결제되었어요.' });
  } else {
    await updatePaymentState(shipping.paymentId, 'forgeried');
    return res.status(200).json({ message: '위조된 결과가 확인되었어요.' });
  }

  next();
}