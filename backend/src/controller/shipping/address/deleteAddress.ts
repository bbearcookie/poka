import { NextFunction, Request, Response } from 'express';
import { param } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginToken } from '@type/user';
import { selectShippingAddressDetail, selectUserShippingAddresses } from '@service/shipping/address/select';
import { deleteShippingAddress } from '@service/shipping/address/delete';
import { updateShippingAddressPrime } from '@service/shipping/address/update';

interface Params {
  addressId: number;
}

const validator = [
  isLoggedIn,
  param('addressId')
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('배송지 ID는 숫자여야 해요.'),
  validate
]

const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginToken;
  const { addressId } = req.params as unknown as Params;

  const [[address]] = await selectShippingAddressDetail(addressId);
  if (!address) return res.status(404).json({ message: '삭제하려는 배송지의 데이터가 서버에 존재하지 않아요.' });

  // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
  if (!isAdminOrOwner(loggedUser, address.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });
  await deleteShippingAddress(addressId);

  // 만약 배송자의 삭제로 인해서 기본 배송지가 사라진다면 기존의 배송지 중 하나를 기본 배송지로 설정
  const [addresses] = await selectUserShippingAddresses(address.userId);
  if (addresses.length > 0 && !addresses.find(item => item.prime)) {
    await updateShippingAddressPrime(addresses.find(item => item.prime === 0)?.addressId || 0, 1);
  }

  return res.status(200).json({ message: '배송지를 삭제했어요.' });
  next();
}

// 사용자 배송지 삭제
const deleteAddress = [
  ...validator,
  controller
];

export default deleteAddress;