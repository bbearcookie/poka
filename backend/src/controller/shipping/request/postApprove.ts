import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { selectShippingRequestDetail } from '@service/shipping/request/select';
import { approveShippingRequest } from '@service/shipping/request/update';
import { isAdmin } from '@validator/middleware/auth';

export const validator = [
  isAdmin,
  param('requestId').isNumeric().withMessage('요청 ID는 숫자여야 해요.'),
  validate
]

// 발송 완료 처리
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const requestId = Number(req.params.requestId);

  const [[shipping]] = await selectShippingRequestDetail(requestId);
  if (!shipping) return res.status(404).json({ message: '해당 배송 요청을 찾지 못했어요.' });
  if (shipping.paymentState !== 'paid') return res.status(403).json({ message: '아직 결제되지 않은 배송 요청은 발송 완료할 수 없어요.' });
  if (shipping.requestState === 'shipped') return res.status(403).json({ message: '이미 완료 처리된 요청이에요.' });

  // 발송 완료 처리
  await approveShippingRequest(requestId);

  return res.status(200).json({ message: '발송 완료 처리 되었어요.' });
  next();
}