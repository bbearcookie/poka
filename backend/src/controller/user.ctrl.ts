import { NextFunction, Request, Response } from 'express';
import fs from 'fs/promises';
import path from 'path';
import { body, param } from 'express-validator';
import { validate, isLoggedIn } from '@util/validator';
import { UserType } from '@util/jwt';
import { removeFile } from '@util/multer';
import { getTimestampFilename } from '@util/multer';
import * as userService from '@service/user.service';
import imageUploader, { USER_IMAGE_DIR } from '@uploader/image.uploader';

// 사용자 상세 정보 조회
export const getUserDetail = {
  validator: [
    param('userId')
      .isNumeric().withMessage('user_id 는 숫자여야 해요.')
      .custom((value) => parseInt(value) > 0).withMessage('user_id 가 정상적이지 않아요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const userId = Number(req.params.userId);

    const [[user]] = await userService.selectUserDetailByUserID(userId);
    if (!user) return res.status(404).json({ message: '해당 사용자의 데이터가 서버에 존재하지 않아요.' });
    
    return res.status(200).json({
      message: '사용자 상세 정보를 조회했어요.',
      user_id: user.user_id,
      nickname: user.nickname,
      username: user.username,
      image_name: user.image_name
    });
    next();
  }
}

// 사용자 프로필 수정
export const putUserProfile = {
  uploader: imageUploader('image', USER_IMAGE_DIR),
  validator: [
    isLoggedIn,
    param('userId')
      .isNumeric().withMessage('user_id 는 숫자여야 해요.')
      .custom((value) => parseInt(value) > 0).withMessage('user_id 가 정상적이지 않아요.'),
    body('nickname').trim()
      .not().isEmpty().withMessage('닉네임이 비어있어요.')
      .isLength({ max: 20 }).withMessage('닉네임은 최대 20글자까지 입력할 수 있어요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as UserType;
    const userId = Number(req.params.userId);
    const nickname = req.body.nickname as unknown as string;
    const file = req.file;

    const [[user]] = await userService.selectUserDetailByUserID(userId);
    if (!user) {
      removeFile(file);
      return res.status(404).json({ message: '수정하려는 사용자의 데이터가 서버에 존재하지 않아요.' });
    }

    // 관리자이거나, 자기 자신의 정보에 대한 경우에만 수정 가능
    if (loggedUser.role !== 'admin' && user.user_id !== loggedUser.user_id) {
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
        try { fs.rm(path.join(process.env.INIT_CWD, USER_IMAGE_DIR, user.image_name)) }
        catch (err) { console.error(err); }
      }
    }

    await userService.updateUserProfile(userId, nickname, newFilename);
    return res.status(200).json({ message: '프로필 정보를 수정했어요.' });
    next();
  }
}