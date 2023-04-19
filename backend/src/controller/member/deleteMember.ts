import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isRootAdmin } from '@validator/middleware/auth';
import { getPhotoImageDir } from '@uploader/image.uploader';
import { deleteFile } from '@util/s3';
import { selectMemberDetail } from '@service/member/select';
import { selectPhotoImagenameOfMember } from '@service/photo/select';
import { deleteMember as deleteMemberService } from '@service/member/delete';

interface Params {
  memberId: number;
}

const validator = [
  isRootAdmin,
  param('memberId')
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('멤버 ID는 숫자여야 해요.'),
  validate,
];

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { memberId } = req.params as unknown as Params;

  const [[member]] = await selectMemberDetail(memberId);
  if (!member) return res.status(404).json({ message: '삭제하려는 멤버를 찾지 못했어요.' });

  // 해당 멤버의 포토카드 이미지 파일 삭제
  const [photos] = await selectPhotoImagenameOfMember(memberId);
  photos.forEach(p => {
    deleteFile({ Key: getPhotoImageDir(p.imageName) });
  });

  await deleteMemberService(memberId);
  return res.status(200).json({
    message: `멤버 ${member.name} 을(를) 삭제했어요.`,
    groupId: member.groupId,
    memberId: member.memberId
  });

  next();
};

// 멤버 데이터 삭제
const deleteMember = [...validator, controller];

export default deleteMember;
