import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validate } from '@util/validator';
import * as memberService from '@service/member.service';

// 특정 그룹의 멤버 목록 조회
export const getMembersOfGroup = {
  validator: [
    param('groupId').isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const groupId = req.params.groupId as unknown as number;

    try {
      const [members] = await memberService.selectAllMembersOfGroup(groupId);
      return res.status(200).json({ message: `${groupId}번 그룹의 멤버 목록을 조회했습니다.`, members });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: '서버 문제로 오류가 발생했습니다.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}