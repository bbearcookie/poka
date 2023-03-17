import fs from 'fs/promises';
import path from 'path';
import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import imageUploader, { USER_IMAGE_DIR } from '@uploader/image.uploader';
import { isLoggedIn } from '@validator/middleware/auth';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { getTimestampFilename, removeFile } from '@util/multer';
import { selectUserDetailByUserID } from '@service/user/select';
import { updateUserProfile } from '@service/user/update';

export const uploader = imageUploader('image', USER_IMAGE_DIR)

export const validator = [
  isLoggedIn,
  param('userId')
    .isNumeric().withMessage('userId는 숫자여야 해요.')
    .custom((value) => parseInt(value) > 0).withMessage('userId가 정상적이지 않아요.'),
  body('nickname').trim()
    .not().isEmpty().withMessage('닉네임이 비어있어요.')
    .isLength({ max: 20 }).withMessage('닉네임은 최대 20글자까지 입력할 수 있어요.'),
  validate
]

// 사용자 프로필 변경
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const userId = Number(req.params.userId);
  const nickname = req.body.nickname as unknown as string;
  const file = req.file;

  const [[user]] = await selectUserDetailByUserID(userId);
  if (!user) {
    removeFile(file);
    return res.status(404).json({ message: '수정하려는 사용자의 데이터가 서버에 존재하지 않아요.' });
  }

  // 관리자이거나, 자기 자신의 정보에 대한 경우에만 수정 가능
  if (!isAdminOrOwner(loggedUser, user.userId)) {
    removeFile(file);
    return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });
  }

  let newFilename: string | undefined;
  if (file) {
    // 임시 다운로드 파일 이름 변경
    newFilename = getTimestampFilename(userId.toString(), file.mimetype);
    try { fs.rename(file.path, path.join(file.destination, newFilename)) }
    catch (err) { console.error(err); }

    // 기존의 이미지 파일 삭제
    if (process.env.INIT_CWD) {
      try { fs.rm(path.join(process.env.INIT_CWD, USER_IMAGE_DIR, user.imageName)) }
      catch (err) { console.error(err); }
    }
  }

  await updateUserProfile(userId, nickname, newFilename);
  return res.status(200).json({ message: '프로필 정보를 수정했어요.' });

  next();
}