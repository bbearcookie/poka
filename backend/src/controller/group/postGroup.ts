import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import ImageUploader, { getGroupImageDir } from '@uploader/image.uploader.new';
import { getTimestampFilename } from '@util/multer';
import { isAdmin } from '@validator/middleware/auth';
import { insertGroup } from '@service/group/insert';
import { updateImagename } from '@service/group/update';
import { putFile } from '@util/s3';

interface Body {
  name: string;
}

const validator = [
  isAdmin,
  body('name')
    .trim()
    .not()
    .isEmpty()
    .withMessage('이름이 비어있어요.')
    .isLength({ max: 20 })
    .withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
  body('image').not().exists().withMessage('업로드 된 이미지가 없어요.'),
  validate,
];

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { name } = req.body as Body;
  const file = req.file;
  if (!file) throw new Error('이미지 파일 없음');

  // 그룹 생성
  const insertId = await insertGroup(name);
  const newFilename = getTimestampFilename(insertId.toString(), file.mimetype);

  // 이미지 파일 저장
  await putFile({ Key: getGroupImageDir(newFilename), Body: file.buffer });
  updateImagename(insertId, newFilename);
  return res.status(200).json({ message: '새로운 그룹을 등록했어요.' });

  next();
};

const uploader = new ImageUploader('image');

// 그룹 데이터 추가
const postGroup = [uploader.single(), uploader.errorHandler, ...validator, controller];

export default postGroup;
