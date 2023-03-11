import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { selectMemberDetail } from '@service/member/select';
import { deleteMember } from '@service/member/delete';

export const validator = [
  isAdmin,
  param('memberId').isNumeric().withMessage('멤버 ID는 숫자여야 해요.'),
  validate
]

// 멤버 데이터 삭제
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const memberId = Number(req.params.memberId);

  const [[member]] = await selectMemberDetail(memberId);
  if (!member) return res.status(404).json({ message: '삭제하려는 멤버를 찾지 못했어요.' });

  await deleteMember(memberId);
  return res.status(200).json({
    message: `멤버 ${member.name} 을(를) 삭제했어요.`,
    groupId: member.groupId,
    memberId: member.memberId
  });

  next();
}