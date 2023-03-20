import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { selectMemberDetail } from '@service/member/select';
import { selectGroupDetail } from '@service/group/select';

interface Params {
  memberId: number;
}

export const validator = [
  param('memberId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('멤버 ID는 숫자여야 해요.'),
  validate
]

// 멤버 상세 정보 조회
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { memberId } = req.params as unknown as Params;

  const [[member]] = await selectMemberDetail(memberId);
  if (!member) return res.status(404).json({ message: '해당 멤버의 데이터가 서버에 존재하지 않아요.' });

  const [[group]] = await selectGroupDetail(member.groupId);

  return res.status(200).json({
    message: `${memberId}번 멤버의 상세 정보를 조회했습니다.`,
    groupName: group?.name,
    ...member
  });

  next();
}