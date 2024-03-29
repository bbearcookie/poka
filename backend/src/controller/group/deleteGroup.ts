import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isRootAdmin } from '@validator/middleware/auth';
import { getGroupImageDir } from '@uploader/image.uploader';
import { deleteFile } from '@util/s3';
import { selectGroupDetail } from '@service/group/select';
import { deleteGroup as deleteGroupService } from '@service/group/delete';
import { selectMembersOfGroup } from '@service/member/select';

interface Params {
  groupId: number;
}

const validator = [
  isRootAdmin,
  param('groupId')
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('그룹 ID는 숫자여야 해요.'),
  validate,
];

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { groupId } = req.params as unknown as Params;

  const [[group]] = await selectGroupDetail(groupId);
  if (!group) return res.status(404).json({ message: '해당 그룹의 데이터가 서버에 존재하지 않아요.' });

  const [members] = await selectMembersOfGroup(groupId);
  if (members.length > 0) return res.status(400).json({ message: '해당 그룹의 멤버를 먼저 지워주세요.' });

  // 기존의 이미지 파일 삭제
  deleteFile({ Key: getGroupImageDir(group.imageName) });
  await deleteGroupService(groupId);

  return res.status(200).json({ message: `그룹 ${group.name} 을(를) 삭제했어요.` });
  next();
};

// 그룹 데이터 삭제
const deleteGroup = [...validator, controller];

export default deleteGroup;
