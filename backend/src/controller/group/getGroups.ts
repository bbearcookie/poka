import { NextFunction, Request, Response } from 'express';
import { selectGroups } from '@service/group/select';

// 그룹 목록 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const [groups] = await selectGroups();
  return res.status(200).json({ message: '그룹 목록을 조회했습니다.', groups });
  next();
}