import { NextFunction, Request, Response } from 'express';
import { body } from 'express-validator';
import { createResponseMessage } from '@validator/function/response';
import { selectUserDetailByUsername } from '@service/user/select';
import { insertUser } from '@service/user/insert';
import { validate } from '@validator/middleware/response';

interface Body {
  username: string;
  nickname: string;
  password: string;
  passwordCheck: string;
}

export const validator = [
  body('username')
    .trim().toLowerCase()
    .not().isEmpty().withMessage('아이디가 비어있어요.').bail()
    .isLength({ max: 30 }).withMessage('아이디는 최대 30글자까지 입력할 수 있어요.').bail()
    .custom(v => /[^A-Za-z0-9-_\.-]/.test(v) === false).withMessage('아이디는 영문자와 숫자 및 -_. 만 사용 가능해요.').bail(),
  body('nickname').trim()
    .not().isEmpty().withMessage('닉네임이 비어있어요.').bail()
    .isLength({ max: 20 }).withMessage('닉네임은 최대 20글자까지 입력할 수 있어요.').bail(),
  body('password')
    .not().isEmpty().withMessage('비밀번호가 비어있어요.').bail(),
  body('passwordCheck')
    .not().isEmpty().withMessage('비밀번호 확인이 비어있어요.').bail()
    .custom((value, { req }) => value === req.body.password).withMessage('비밀번호 확인이 일치하지 않아요.').bail(),
  validate
];

// 회원가입
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const { username, nickname, password, passwordCheck } = req.body as Body;

  const [[user]] = await selectUserDetailByUsername(username);
  if (user) return res.status(409).json(createResponseMessage("username", "이미 사용중인 아이디에요."));

  await insertUser(username, nickname, password);
  return res.status(200).json({ message: `${username} 아이디로 가입 성공했어요!` });
  next();
};