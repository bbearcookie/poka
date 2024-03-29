import { NextFunction, Request, Response } from 'express';
import { selectMembers } from '@service/member/select';

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const [members] = await selectMembers();
  return res.status(200).json({ message: `모든 멤버 목록을 조회했습니다.`, members });
  next();
}

// 모든 멤버 목록 조회
const getMembers = [
  controller
];

export default getMembers;