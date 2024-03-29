import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { selectMemberDetail } from '@service/member/select';
import { updateMember } from '@service/member/update';

interface Params {
  memberId: number;
}

interface Body {
  name: string;
}

const validator = [
  isAdmin,
  param('memberId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('멤버 ID는 숫자여야 해요.'),
  body('name')
    .trim()
    .not().isEmpty().withMessage('이름이 비어있어요.')
    .isLength({ max: 20 }).withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { memberId } = req.params as unknown as Params;
  const { name } = req.body as Body;

  const [[member]] = await selectMemberDetail(memberId);
  if (!member) return res.status(404).json({ message: '수정하려는 멤버를 찾지 못했어요.' });

  await updateMember(memberId, name);
  return res.status(200).json({
    message: `멤버 ${member.name}의 이름을 ${name}(으)로 변경했어요.`,
    groupId: member.groupId,
    memberId: member.memberId
  });

  next();
}

// 특정 멤버의 정보 수정
const putMember = [
  ...validator,
  controller
];

export default putMember;