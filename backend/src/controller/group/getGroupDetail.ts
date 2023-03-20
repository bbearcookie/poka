import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { selectGroupDetail } from '@service/group/select';
import { selectMembersOfGroup } from '@service/member/select';

interface Params {
  groupId: number;
}

export const validator = [
  param('groupId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
  validate
]

// 그룹 상세 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { groupId } = req.params as unknown as Params;
  const [[group]] = await selectGroupDetail(groupId);
  if (!group) return res.status(404).json({ message: '해당 그룹의 데이터가 서버에 존재하지 않아요.' });

  const [members] = await selectMembersOfGroup(groupId);
  return res.status(200).json({ message: `${groupId}번 그룹의 상세 정보를 조회했습니다.`, ...group, members });
  next();
}