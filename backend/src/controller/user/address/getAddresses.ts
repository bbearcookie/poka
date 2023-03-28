import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { isAdminOrOwner } from '@validator/function/auth';
import { selectUser } from '@service/user/select';
import { selectUserShippingAddresses } from '@service/shipping/address/select';
import { LoginToken } from '@type/user';

interface Params {
  userId: number;
}

const validator = [
  isLoggedIn,
  param('userId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('userId 는 숫자여야 해요.')
    .custom((value) => parseInt(value) > 0).withMessage('userId 가 정상적이지 않아요.'),
  validate,
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { userId } = req.params as unknown as Params;

  const [[user]] = await selectUser(userId);
  if (!user) return res.status(404).json({ message: '수정하려는 사용자의 데이터가 서버에 존재하지 않아요.' });

  // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
  if (!isAdminOrOwner(loggedUser, user.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

  const [addresses] = await selectUserShippingAddresses(userId);
  return res.status(200).json({ message: '해당 사용자의 배송지 목록을 조회했어요.', addresses });
  next();
}

// 사용자의 배송 주소 목록 조회
const getAddresses = [
  ...validator,
  controller
];

export default getAddresses;