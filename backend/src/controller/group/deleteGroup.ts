import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { selectGroupDetail } from '@service/group/select';
import { deleteGroup as deleteGroupService } from '@service/group/delete';
import { getGroupImageDir } from '@uploader/image.uploader.new';
import { deleteFile } from '@util/s3';

interface Params {
  groupId: number;
}

const validator = [
  isAdmin,
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

  // 기존의 이미지 파일 삭제
  deleteFile({ Key: getGroupImageDir(group.imageName) });
  await deleteGroupService(groupId);

  return res.status(200).json({ message: `그룹 ${group.name} 을(를) 삭제했어요.` });
  next();
};

// 그룹 데이터 삭제
const deleteGroup = [...validator, controller];

export default deleteGroup;
