import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { selectShippingAddressDetail } from '@service/shipping/address/select';
import { updateShippingAddressPrime, updateUserShippingAddressPrimeFalse } from '@service/shipping/address/update';

export const validator = [
  isLoggedIn,
  param('addressId')
    .isNumeric().withMessage('배송지 ID는 숫자여야 해요.')
    .custom((value) => parseInt(value) > 0).withMessage('배송지 ID가 정상적이지 않아요.'),
  validate
]

// 사용자 기본 배송지 변경
export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const addressId = Number(req.params.addressId);

  const [[address]] = await selectShippingAddressDetail(addressId);
  if (!address) return res.status(404).json({ message: '수정하려는 배송지의 데이터가 서버에 존재하지 않아요.' });

  // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
  if (!isAdminOrOwner(loggedUser, address.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

  await updateUserShippingAddressPrimeFalse(address.userId);
  await updateShippingAddressPrime(addressId, 1);
  return res.status(200).json({ message: '기본 배송지를 변경했어요.' });

  next();
}