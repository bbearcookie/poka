import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { createResponseMessage } from '@validator/function/response';
import { validate } from '@validator/middleware/response';
import { encryptText } from '@util/encrypt';
import { verifyToken, createLoginToken } from '@validator/function/auth';
import * as userService from '@service/user.service';
import { LoginTokenPayloadType } from '@type/user';

// 회원가입
export const postSignup = {
  validator: [
    body('username').trim().toLowerCase()
      .not().isEmpty().withMessage('아이디가 비어있어요.').bail()
      .isLength({ max: 30 }).withMessage('아이디는 최대 30글자까지 입력할 수 있어요.').bail()
      .custom((value, { req }) => /[^A-Za-z0-9-_\.-]/.test(value) === false).withMessage('아이디는 영문자와 숫자 및 -_. 만 사용 가능해요.').bail(),
    body('nickname').trim()
      .not().isEmpty().withMessage('닉네임이 비어있어요.').bail()
      .isLength({ max: 20 }).withMessage('닉네임은 최대 20글자까지 입력할 수 있어요.').bail(),
    body('password')
      .not().isEmpty().withMessage('비밀번호가 비어있어요.').bail(),
    body('passwordCheck')
      .not().isEmpty().withMessage('비밀번호 확인이 비어있어요.').bail()
      .custom((value, { req }) => value === req.body.password).withMessage('비밀번호 확인이 일치하지 않아요.').bail(),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username as unknown as string;
    const nickname = req.body.nickname as unknown as string;
    const password = req.body.password as unknown as string;
    const passwordCheck = req.body.passwordCheck as unknown as string;

    const [[user]] = await userService.selectUserDetailByUsername(username);
    if (user) return res.status(409).json(createResponseMessage("username", "이미 사용중인 아이디에요."));

    await userService.insertUser(username, nickname, password);
    return res.status(200).json({ message: `${username} 아이디로 가입 성공했어요!` });
    next();
  }
}

// 로그인
export const postLogin = {
  validator: [
    body('username').trim().toLowerCase()
      .not().isEmpty().withMessage('아이디가 비어있어요.').bail(),
    body('password')
      .not().isEmpty().withMessage('비밀번호가 비어있어요.').bail(),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const username = req.body.username as unknown as string;
    const password = req.body.password as unknown as string;

    const [[user]] = await userService.selectUserDetailByUsername(username);
    if (!user) return res.status(409).json(createResponseMessage("username", "가입되지 않은 아이디에요."));

    const encryptedPassword = encryptText(password, user.salt);
    if (user.password !== encryptedPassword) return res.status(409).json(createResponseMessage("password", "비밀번호가 일치하지 않아요."));

    const payload: LoginTokenPayloadType = {
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
}

// 로그아웃
export const postLogout = {
  controller: (req: Request, res: Response, next: NextFunction) => {
    res.clearCookie('accessToken');
    return res.status(200).json({ message: "로그아웃 완료" });
    next();
  }
}

// 토큰 검증
export const postVerify = {
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const accessToken = req.cookies.accessToken;

    try {
      const payload = verifyToken(accessToken);
      return res.status(200).json({ message: '로그인 인증 성공', user: payload });
    } catch (err) {
      return res.status(401).json({ message: '로그인 인증 실패' });
    }
    
    next();
  }
}