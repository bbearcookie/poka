import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { selectUser } from '@service/user/select';
import { selectUserShippingAddresses } from '@service/shipping/address/select';
import { insertUserShippingAddress } from '@service/shipping/address/insert';
import { AddressForm, AddressFormValidator } from '@validator/chain/address';

interface Params {
  userId: number;
}

interface Body {
  address: AddressForm;
}

const validator = [
  isLoggedIn,
  ...AddressFormValidator,
  param('userId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('userId 는 숫자여야 해요.')
    .custom((value) => parseInt(value) > 0).withMessage('userId 가 정상적이지 않아요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { userId } = req.params as unknown as Params;
  const { address: form } = req.body as Body;

  const [[user]] = await selectUser(userId);
  if (!user) return res.status(404).json({ message: '수정하려는 사용자의 데이터가 서버에 존재하지 않아요.' });

  // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
  if (!isAdminOrOwner(loggedUser, user.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

  // 이미 배송지를 10개 이상 저장한 상태면 추가 불가능
  const [addresses] = await selectUserShippingAddresses(userId);
  if (addresses.length >= 10) return res.status(400).json({ message: '배송지는 10개 까지만 추가할 수 있어요.' });

  form.prime = addresses.find(item => item.prime) ? 0 : 1;
  await insertUserShippingAddress(userId, form);
  return res.status(200).json({ message: '새로운 배송지를 추가했어요.' });
  
  next();
}

// 사용자의 새로운 배송 정보 추가
const postAddress = [
  ...validator,
  controller
];

export default postAddress;