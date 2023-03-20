import fs from 'fs/promises';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import imageUploader from '@uploader/image.uploader';
import { getTimestampFilename } from '@util/multer';
import { GROUP_IMAGE_DIR } from '@uploader/image.uploader';
import { isAdmin } from '@validator/middleware/auth';
import { selectGroupDetail } from '@service/group/select';
import { updateGroup } from '@service/group/update';

interface Params {
  groupId: number;
}

interface Body {
  name: string;
}

export const uploader = imageUploader('image', GROUP_IMAGE_DIR);

export const validator = [
  isAdmin,
  param('groupId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
  body('name')
    .trim()
    .not().isEmpty().withMessage('이름이 비어있어요.')
    .isLength({ max: 20 }).withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
  validate
]

// 그룹 데이터 수정
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { groupId } = req.params as unknown as Params;
  const { name } = req.body as Body;
  const file = req.file;

  let [[group]] = await selectGroupDetail(groupId);
  if (!group) return res.status(404).json({ message: '수정하려는 그룹을 찾지 못했어요.' });

  // 다운받은 이미지 파일 있으면
  let newFilename: string | undefined;
  if (file) {
    // 임시 다운로드 파일 이름 변경
    newFilename = getTimestampFilename(groupId.toString(), file.mimetype);
    try { fs.rename(file.path, path.join(file.destination, newFilename)) }
    catch (err) { console.error(err); }

    // 기존의 이미지 파일 삭제
    if (process.env.INIT_CWD) {
      try { fs.rm(path.join(process.env.INIT_CWD, GROUP_IMAGE_DIR, group.imageName)) }
      catch (err) { console.error(err); }
    }
  }

  await updateGroup(groupId, name, newFilename);
  return res.status(200).json({ message: '그룹 정보를 수정했어요.' });

  next();
}