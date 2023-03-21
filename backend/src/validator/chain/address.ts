import { body } from 'express-validator';
import { Address } from '@type/shipping';

export type AddressForm = Pick<Address,
  'name' |
  'recipient' |
  'contact' |
  'postcode' |
  'address' |
  'addressDetail' |
  'requirement' |
  'prime'
>;

export const AddressFormValidator = [
  body('address.name')
    .trim()
    .not().isEmpty().withMessage('배송지 이름이 비어있어요.').bail()
    .isLength({ max: 20 }).withMessage('배송지 이름은 최대 20글자까지 입력할 수 있어요.').bail(),
  body('address.recipient')
    .trim()
    .not().isEmpty().withMessage('수령인 이름이 비어있어요.').bail()
    .isLength({ max: 20 }).withMessage('수령인 이름은 최대 20글자까지 입력할 수 있어요.').bail(),
  body('address.contact')
    .trim()
    .not().isEmpty().withMessage('연락처가 비어있어요.').bail()
    .isLength({ max: 13 }).withMessage('연락처는 최대 13글자까지 입력할 수 있어요.').bail()
    .custom(v => /(\d{2,3})-(\d{3,4})-(\d{4})/.test(v)).withMessage('연락처가 올바른 형태가 아니에요.').bail(),
  body('address.address')
    .trim()
    .not().isEmpty().withMessage('주소가 비어있어요.').bail()
    .isLength({ max: 250 }).withMessage('주소는 최대 250글자까지 입력할 수 있어요.').bail(),
  body('address.addressDetail')
    .trim()
    .isLength({ max: 50 }).withMessage('상세 주소는 최대 50글자까지 입력할 수 있어요.').bail(),
  body('address.requirement')
    .trim()
    .isLength({ max: 50 }).withMessage('배송 요청사항은 최대 50글자까지 입력할 수 있어요.').bail(),
  body('address.prime')
    .default(0)
    .customSanitizer(v => Number(v))
    .isNumeric().withMessage('기본 배송지 여부는 숫자여야 해요.')
];