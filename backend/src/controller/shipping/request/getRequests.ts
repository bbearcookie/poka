import { NextFunction, Request, Response } from 'express';
import { validate } from '@validator/middleware/response';
import { havePageParam } from '@validator/chain/page';
import { selectShippingRequests } from '@service/shipping/request/select';

export const validator = [
  ...havePageParam,
  validate
]

// 배송 요청 목록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 5; // 페이지당 보여줄 내용 갯수
  const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0; // 페이지 번호

  const [shippings] = await selectShippingRequests(itemPerPage, pageParam);

  return res.status(200).json({
    message: '배송 요청 목록을 조회했어요.',
    shippings,
    paging: {
      pageParam,
      hasNextPage: shippings.length === itemPerPage
    }
  });
  next();
}