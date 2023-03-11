import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { selectUserDetailByUserID } from '@service/user/selectDetail';

export const validator = [
  param('userId')
    .isNumeric().withMessage('userId는 숫자여야 해요.')
    .custom((value) => parseInt(value) > 0).withMessage('userId가 정상적이지 않아요.'),
  validate
]

export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const userId = Number(req.params.userId);

  const [[user]] = await selectUserDetailByUserID(userId);
  if (!user) return res.status(404).json({ message: '해당 사용자의 데이터가 서버에 존재하지 않아요.' });
  
  return res.status(200).json({
    message: '사용자 상세 정보를 조회했어요.',
    userId: user.userId,
    nickname: user.nickname,
    username: user.username,
    imageName: user.imageName
  });

  next();
}