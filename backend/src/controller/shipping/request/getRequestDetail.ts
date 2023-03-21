import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { selectShippingRequestDetail } from '@service/shipping/request/select';
import { selectShippingRequestVoucherIds } from '@service/voucher/select';

interface Params {
  requestId: number;
}

const validator = [
  param('requestId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('요청 ID는 숫자여야 해요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { requestId } = req.params as unknown as Params;

  // 배송 요청 상세 조회
  const [[shipping]] = await selectShippingRequestDetail(requestId);
  if (!shipping) return res.status(404).json({ message: '해당 배송 요청을 찾지 못했어요.' });

  // 요청한 소유권 목록 조회
  const [vouchers] = await selectShippingRequestVoucherIds(requestId);

  return res.status(200).json({
    message: '배송 요청 상세 정보를 조회했어요.',
    shipping,
    vouchers
  });
  next();
}

// 배송 요청 상세 조회
const getRequestDetail = [
  ...validator,
  controller
];

export default getRequestDetail;