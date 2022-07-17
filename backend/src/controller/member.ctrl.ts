import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validate } from '@util/validator';
import * as groupService from '@service/group.service';
import * as memberService from '@service/member.service';

// 특정 그룹의 멤버 목록 조회
export const getMembersOfGroup = {
  validator: [
    param('groupId').isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const groupId = Number(req.params.groupId);

    try {
      const [members] = await memberService.selectAllMembersOfGroup(groupId);
      return res.status(200).json({ message: `${groupId}번 그룹의 멤버 목록을 조회했습니다.`, members });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 특정 그룹에 새 멤버 추가
export const postMember = {
  validator: [
    body('groupId')
      .isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
    body('name').trim()
      .not().isEmpty().withMessage('이름이 비어있어요.')
      .isLength({ max: 20 }).withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const groupId = Number(req.body.groupId);
    const name = req.body.name as unknown as string;

    try {
      const [[group]] = await groupService.selectGroupDetail(groupId);
      if (!group) return res.status(404).json({ message: '추가하려는 그룹을 찾지 못했어요.' });

      const memberId = await memberService.insertMember(groupId, name);
      return res.status(200).json({ message: `${group.name} 그룹에 새로운 멤버 ${name}을(를) 추가했어요.`, memberId });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 특정 멤버의 정보 수정
export const putMember = {
  validator: [
    param('memberId').isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
    body('name').trim()
      .not().isEmpty().withMessage('이름이 비어있어요.')
      .isLength({ max: 20 }).withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    try {
      const memberId = Number(req.params.memberId);
      const name = req.body.name as unknown as string;

      const [[member]] = await memberService.selectMemberDetail(memberId);
      if (!member) return res.status(404).json({ message: '수정하려는 멤버를 찾지 못했어요.' });

      await memberService.updateMember(memberId, name);
      return res.status(200).json({ message: `멤버 ${member.name}의 이름을 ${name}(으)로 변경했어요.` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}