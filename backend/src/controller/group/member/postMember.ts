import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { selectGroupDetail } from '@service/group/select';
import { insertMember } from '@service/member/insert';

interface Params {
  groupId: number;
}

interface Body {
  name: string;
}

const validator = [
  isAdmin,
  param('groupId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
  body('name')
    .trim()
    .notEmpty().withMessage('이름이 비어있어요.')
    .isLength({ max: 20 }).withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { groupId } = req.params as unknown as Params;
  const { name } = req.body as Body;

  const [[group]] = await selectGroupDetail(groupId);
  if (!group) return res.status(404).json({ message: '추가하려는 그룹을 찾지 못했어요.' });

  const memberId = await insertMember(groupId, name);
  return res.status(200).json({ message: `${group.name} 그룹에 새로운 멤버 ${name}을(를) 추가했어요.`, memberId });
  next();
}

// 그룹에 새 멤버 추가
const postMember = [
  ...validator,
  controller
];

export default postMember;