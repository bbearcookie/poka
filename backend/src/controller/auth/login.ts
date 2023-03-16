import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { createResponseMessage } from '@validator/function/response';
import { encryptText } from '@util/encrypt';
import { createLoginToken } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { selectUserDetailByUsername } from '@service/user/select';

export const validator = [
  body('username').trim().toLowerCase()
    .not().isEmpty().withMessage('아이디가 비어있어요.').bail(),
  body('password')
    .not().isEmpty().withMessage('비밀번호가 비어있어요.').bail(),
  validate
]

// 로그인
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const username = req.body.username as unknown as string;
  const password = req.body.password as unknown as string;

  const [[user]] = await selectUserDetailByUsername(username);
  if (!user) return res.status(409).json(createResponseMessage("username", "가입되지 않은 아이디에요."));

  const encryptedPassword = encryptText(password, user.salt);
  if (user.password !== encryptedPassword) return res.status(409).json(createResponseMessage("password", "비밀번호가 일치하지 않아요."));

  const payload = {
    userId: user.userId,
    username: user.username,
    role: user.role,
    strategy: user.strategy
  };
  
  const accessToken = createLoginToken(payload);
  res.cookie('accessToken', accessToken, { httpOnly: true });

  return res.status(200).json({ message: '로그인 성공!', user: payload });
  next();
}