import fs from 'fs/promises';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isAdmin } from '@validator/middleware/auth';
import { selectGroupDetail } from '@service/group/select';
import { deleteGroup } from '@service/group.service';
import { GROUP_IMAGE_DIR } from '@uploader/image.uploader';

export const validator = [
  isAdmin,
  param('groupId').isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
  validate
]

// 그룹 데이터 삭제
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const groupId = Number(req.params.groupId);

  const [[group]] = await selectGroupDetail(groupId);
  if (!group) return res.status(404).json({ message: '해당 그룹의 데이터가 서버에 존재하지 않아요.' });

  // 기존의 이미지 파일 삭제
  if (process.env.INIT_CWD) {
    try { fs.rm(path.join(process.env.INIT_CWD, GROUP_IMAGE_DIR, group.imageName)) }
    catch (err) { console.error(err); }
  }

  await deleteGroup(groupId);
  return res.status(200).json({ message: `그룹 ${group.name} 을(를) 삭제했어요.` });
  next();
}