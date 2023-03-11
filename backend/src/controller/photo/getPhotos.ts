import { NextFunction, Request, Response } from 'express';
import { query } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { havePageParam } from '@validator/chain/page';
import { filterSanitizer } from '@validator/chain/filter';
import { selectPhotos } from '@service/photo/select';

export type FilterType = {
  photoName: string[];
  groupId: number[];
  memberId: number[];
}

export const validator = [
  ...havePageParam,
  ...filterSanitizer,
  query('filter.photoName').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.groupId').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
  query('filter.memberId').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
  validate
]

// 포토카드 목록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const itemPerPage = 20; // 페이지당 보여줄 내용 갯수
  const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0; // 페이지 번호
  const filter = req.query.filter as unknown as FilterType; // 검색 조건

  const [photos] = await selectPhotos(itemPerPage, pageParam, filter);
  return res.status(200).json({
    message: '포토카드 목록을 조회했습니다.',
    photos,
    paging: {
      pageParam,
      hasNextPage: photos.length === itemPerPage
    }
  });

  next();
}