import { NextFunction, Request, Response } from 'express';
import { param, body } from 'express-validator';
import { validate } from '@validator/middleware/response';
import { isLoggedIn } from '@validator/middleware/auth';
import { isAdminOrOwner } from '@validator/function/auth';
import { LoginTokenType } from '@type/user';
import { selectUserDetailByUserID } from '@service/user/select';
import { selectUserShippingAddresses } from '@service/shipping-address/select';
import { insertUserShippingAddress } from '@service/shipping-address/insert';

export const AddressForm = {
  validator: [
    body('address.name').trim()
      .not().isEmpty().withMessage('배송지 이름이 비어있어요.').bail()
      .isLength({ max: 20 }).withMessage('배송지 이름은 최대 20글자까지 입력할 수 있어요.').bail(),
    body('address.recipient').trim()
      .not().isEmpty().withMessage('수령인 이름이 비어있어요.').bail()
      .isLength({ max: 20 }).withMessage('수령인 이름은 최대 20글자까지 입력할 수 있어요.').bail(),
    body('address.contact').trim()
      .not().isEmpty().withMessage('연락처가 비어있어요.').bail()
      .isLength({ max: 13 }).withMessage('연락처는 최대 13글자까지 입력할 수 있어요.').bail()
      .custom((value, { req }) => /(\d{2,3})-(\d{3,4})-(\d{4})/.test(value)).withMessage('연락처가 올바른 형태가 아니에요.').bail(),
    body('address.address').trim()
      .not().isEmpty().withMessage('주소가 비어있어요.').bail()
      .isLength({ max: 250 }).withMessage('주소는 최대 250글자까지 입력할 수 있어요.').bail(),
    body('address.addressDetail').trim()
      .isLength({ max: 50 }).withMessage('상세 주소는 최대 50글자까지 입력할 수 있어요.').bail(),
    body('address.requirement').trim()
      .isLength({ max: 50 }).withMessage('배송 요청사항은 최대 50글자까지 입력할 수 있어요.').bail(),
  ],
  form: (req: Request) => {
    const name = req.body.address.name as unknown as string;
    const recipient = req.body.address.recipient as unknown as string;
    const contact = req.body.address.contact as unknown as string;
    const postcode = req.body.address.postcode as unknown as string;
    const address = req.body.address.address as unknown as string;
    const addressDetail = req.body.address.addressDetail as unknown as string;
    const requirement = req.body.address.requirement as unknown as string;
    const prime = 0;

    return { name, recipient, contact, postcode, address, addressDetail, requirement, prime };
  }
}

export type AddressFormType = {
  name: string;
  recipient: string;
  contact: string;
  postcode: string;
  address: string;
  addressDetail: string;
  requirement: string;
  prime: number;
}

export const validator = [
  isLoggedIn,
  ...AddressForm.validator,
  param('userId')
    .isNumeric().withMessage('userId 는 숫자여야 해요.')
    .custom((value) => parseInt(value) > 0).withMessage('userId 가 정상적이지 않아요.'),
  validate
]

export const controller = async (req: Request, res: Response, next: NextFunction) => {
  const loggedUser = req.user as LoginTokenType;
  const userId = Number(req.params.userId);
  const form = AddressForm.form(req);

  const [[user]] = await selectUserDetailByUserID(userId);
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