import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { isAdmin, validate } from '@util/validator';
import * as groupService from '@service/group.service';
import * as memberService from '@service/member.service';

// 모든 멤버 목록 조회
export const getAllMemberList = {
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const [members] = await memberService.selectAllMemberList();
    return res.status(200).json({ message: `모든 멤버 목록을 조회했습니다.`, members });
    next();
  }
}

// 멤버 상세 정보 조회
export const getMemberDetail = {
  validator: [
    param('memberId').isNumeric().withMessage('멤버 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const memberId = Number(req.params.memberId);

    const [[member]] = await memberService.selectMemberDetail(memberId);
    if (!member) return res.status(404).json({ message: '해당 멤버의 데이터가 서버에 존재하지 않아요.' });

    const [[group]] = await groupService.selectGroupDetail(member.groupId);

    return res.status(200).json({
      message: `${memberId}번 멤버의 상세 정보를 조회했습니다.`,
      groupName: group?.name,
      ...member
    });
    next();
  }
}

// 특정 그룹에 새 멤버 추가
export const postMember = {
  validator: [
    isAdmin,
    param('groupId')
      .isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
    body('name').trim()
      .not().isEmpty().withMessage('이름이 비어있어요.')
      .isLength({ max: 20 }).withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const groupId = Number(req.params.groupId);
    const name = req.body.name as unknown as string;

    const [[group]] = await groupService.selectGroupDetail(groupId);
    if (!group) return res.status(404).json({ message: '추가하려는 그룹을 찾지 못했어요.' });

    const memberId = await memberService.insertMember(groupId, name);
    return res.status(200).json({ message: `${group.name} 그룹에 새로운 멤버 ${name}을(를) 추가했어요.`, memberId });
    next();
  }
}

// 특정 멤버의 정보 수정
export const putMember = {
  validator: [
    isAdmin,
    param('memberId').isNumeric().withMessage('멤버 ID는 숫자여야 해요.'),
    body('name').trim()
      .not().isEmpty().withMessage('이름이 비어있어요.')
      .isLength({ max: 20 }).withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const memberId = Number(req.params.memberId);
    const name = req.body.name as unknown as string;

    const [[member]] = await memberService.selectMemberDetail(memberId);
    if (!member) return res.status(404).json({ message: '수정하려는 멤버를 찾지 못했어요.' });

    await memberService.updateMember(memberId, name);
    return res.status(200).json({
      message: `멤버 ${member.name}의 이름을 ${name}(으)로 변경했어요.`,
      groupId: member.groupId,
      memberId: member.memberId
    });
    next();
  }
}

// 멤버 데이터 삭제
export const deleteMember = {
  validator: [
    isAdmin,
    param('memberId').isNumeric().withMessage('멤버 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const memberId = Number(req.params.memberId);

    const [[member]] = await memberService.selectMemberDetail(memberId);
    if (!member) return res.status(404).json({ message: '삭제하려는 멤버를 찾지 못했어요.' });

    await memberService.deleteMember(memberId);
    return res.status(200).json({
      message: `멤버 ${member.name} 을(를) 삭제했어요.`,
      groupId: member.groupId,
      memberId: member.memberId
    });
    next();
  }
}