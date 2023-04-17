import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import ImageUploader, { getPhotoImageDir } from '@uploader/image.uploader.new';
import { putFile, deleteFile } from '@util/s3';
import { getTimestampFilename } from '@util/multer';
import { isAdmin } from '@validator/middleware/auth';
import { selectPhotoDetail } from '@service/photo/select';
import { updatePhoto } from '@service/photo/update';

interface Params {
  photocardId: number;
}

interface Body {
  groupId: number;
  memberId: number;
  name: string;
}

const validator = [
  isAdmin,
  param('photocardId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('포토카드 ID는 숫자여야 해요.')
    .custom(v => v > 0).withMessage("포토카드 ID가 비정상적이에요.").bail(),
  body('groupId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage("그룹 ID는 숫자여야 해요.").bail()
    .custom(v => v > 0).withMessage("그룹을 선택해주세요.").bail(),
  body('memberId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage("멤버 ID는 숫자여야 해요.").bail()
    .custom(v => v > 0).withMessage("멤버를 선택해주세요.").bail(),
  body('name')
    .trim()
    .notEmpty().withMessage('포토카드 이름이 비어있어요.').bail()
    .isString().withMessage('포토카드 이름은 문자열이어야 해요.').bail()
    .isLength({ min: 1, max: 100 }).withMessage('포토카드 이름은 최대 100글자까지 입력할 수 있어요.').bail(),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { photocardId } = req.params as unknown as Params;
  const { groupId, memberId, name } = req.body as Body;
  const file = req.file;

  const [[photo]] = await selectPhotoDetail(photocardId);
  if (!photo) return res.status(404).json({ message: '해당 포토카드의 데이터가 서버에 존재하지 않아요.' });

  // 다운받은 이미지 파일 있으면 기존 이미지 삭제 후 새로운 이미지 업로드
  let newFilename: string | undefined;
  if (file) {
    newFilename = getTimestampFilename(photocardId.toString(), file.mimetype);
    deleteFile({ Key: getPhotoImageDir(photo.imageName) });
    await putFile({ Key: getPhotoImageDir(newFilename), Body: file.buffer });
  }

  await updatePhoto(photocardId, memberId, name, newFilename);
  return res.status(200).json({ message: '포토카드 정보를 수정했어요.' });

  next();
}

const uploader = new ImageUploader('image');

// 포토카드 데이터 수정
const putPhoto = [
  uploader.single(),
  uploader.errorHandler,
  ...validator,
  controller
];

export default putPhoto;