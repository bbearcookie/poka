import { Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validate, isLoggedIn } from '@util/validator';
import { UserType } from '@util/jwt';
import * as userService from '@service/user.service';

// 사용자 상세 정보 조회
export const getUserDetail = {
  validator: [
    isLoggedIn,
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const loggedUser = req.user as UserType;

    try {
      const [[user]] = await userService.selectUserDetailByUserID(loggedUser.user_id);
      if (loggedUser.role !== 'admin' &&
          user.user_id !== loggedUser.user_id) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });
      

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}