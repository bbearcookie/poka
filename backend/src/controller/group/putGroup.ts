import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import ImageUploader, { getGroupImageDir } from '@uploader/image.uploader';
import { getTimestampFilename } from '@util/filename';
import { isAdmin } from '@validator/middleware/auth';
import { selectGroupDetail } from '@service/group/select';
import { updateGroup } from '@service/group/update';
import { putFile, deleteFile } from '@util/s3';

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
    .isNumeric()
    .withMessage('그룹 ID는 숫자여야 해요.'),
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('이름이 비어있어요.')
    .isLength({ max: 20 })
    .withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
  validate,
];

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { groupId } = req.params as unknown as Params;
  const { name } = req.body as Body;
  const file = req.file;

  let [[group]] = await selectGroupDetail(groupId);
  if (!group) return res.status(404).json({ message: '수정하려는 그룹을 찾지 못했어요.' });

  // 다운받은 이미지 파일 있으면 기존 이미지 삭제 후 새로운 이미지 업로드
  let newFilename: string | undefined;
  if (file) {
    newFilename = getTimestampFilename(groupId.toString(), file.mimetype);
    deleteFile({ Key: getGroupImageDir(group.imageName) });
    await putFile({ Key: getGroupImageDir(newFilename), Body: file.buffer });
  }

  await updateGroup(groupId, name, newFilename);
  return res.status(200).json({ message: '그룹 정보를 수정했어요.' });

  next();
};

const uploader = new ImageUploader('image');

// 그룹 데이터 수정
const putGroup = [uploader.single(), uploader.errorHandler, ...validator, controller];

export default putGroup;
