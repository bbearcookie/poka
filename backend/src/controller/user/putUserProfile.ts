import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import ImageUploader, { getUserImageDir } from '@uploader/image.uploader';
import { isLoggedIn } from '@validator/middleware/auth';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { getTimestampFilename } from '@util/filename';
import { selectUser } from '@service/user/select';
import { updateUserProfile } from '@service/user/update';
import { putFile, deleteFile } from '@util/s3';

interface Params {
  userId: number;
}

interface Body {
  nickname: string;
}

const validator = [
  isLoggedIn,
  param('userId')
    .customSanitizer(v => Number(v))
    .isNumeric()
    .withMessage('userId는 숫자여야 해요.')
    .custom(value => parseInt(value) > 0)
    .withMessage('userId가 정상적이지 않아요.'),
  body('nickname')
    .trim()
    .not()
    .isEmpty()
    .withMessage('닉네임이 비어있어요.')
    .isLength({ max: 20 })
    .withMessage('닉네임은 최대 20글자까지 입력할 수 있어요.'),
  validate,
];

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { userId } = req.params as unknown as Params;
  const { nickname } = req.body as Body;
  const file = req.file;

  const [[user]] = await selectUser(userId);
  if (!user) return res.status(404).json({ message: '수정하려는 사용자의 데이터가 서버에 존재하지 않아요.' });

  // 관리자이거나, 자기 자신의 정보에 대한 경우에만 수정 가능
  if (!isAdminOrOwner(loggedUser, user.userId))
    return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

  // 다운받은 이미지 파일 있으면 기존 이미지 삭제 후 새로운 이미지 업로드
  let newFilename: string | undefined;
  if (file) {
    newFilename = getTimestampFilename(userId.toString(), file.mimetype);
    deleteFile({ Key: getUserImageDir(user.imageName) });
    await putFile({ Key: getUserImageDir(newFilename), Body: file.buffer });
  }

  await updateUserProfile(userId, nickname, newFilename);
  return res.status(200).json({ message: '프로필 정보를 수정했어요.' });

  next();
};

const uploader = new ImageUploader('image');

// 사용자 프로필 변경
const putUserProfile = [uploader.single(), uploader.errorHandler, ...validator, controller];

export default putUserProfile;
