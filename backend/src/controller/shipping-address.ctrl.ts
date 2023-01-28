import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validate, isLoggedIn, isAdminOrOwner } from '@util/validator';
import { LoginTokenType } from '@type/user';
import * as userService from '@service/user.service';
import * as shippingAddressService from '@service/shipping-address.service';

export const AddressForm = {
  validator: [
    body('name').trim()
      .not().isEmpty().withMessage('배송지 이름이 비어있어요.').bail()
      .isLength({ max: 20 }).withMessage('배송지 이름은 최대 20글자까지 입력할 수 있어요.').bail(),
    body('recipient').trim()
      .not().isEmpty().withMessage('수령인 이름이 비어있어요.').bail()
      .isLength({ max: 20 }).withMessage('수령인 이름은 최대 20글자까지 입력할 수 있어요.').bail(),
    body('contact').trim()
      .not().isEmpty().withMessage('연락처가 비어있어요.').bail()
      .isLength({ max: 13 }).withMessage('연락처는 최대 13글자까지 입력할 수 있어요.').bail()
      .custom((value, { req }) => /(\d{2,3})-(\d{3,4})-(\d{4})/.test(value)).withMessage('연락처가 올바른 형태가 아니에요.').bail(),
    body('address').trim()
      .not().isEmpty().withMessage('주소가 비어있어요.').bail()
      .isLength({ max: 250 }).withMessage('주소는 최대 250글자까지 입력할 수 있어요.').bail(),
    body('address_detail').trim()
      .isLength({ max: 50 }).withMessage('상세 주소는 최대 50글자까지 입력할 수 있어요.').bail(),
    body('requirement').trim()
      .isLength({ max: 50 }).withMessage('배송 요청사항은 최대 50글자까지 입력할 수 있어요.').bail(),
  ],
  form: (req: Request) => {
    const name = req.body.name as unknown as string;
    const recipient = req.body.recipient as unknown as string;
    const contact = req.body.contact as unknown as string;
    const postcode = req.body.postcode as unknown as string;
    const address = req.body.address as unknown as string;
    const addressDetail = req.body.address_detail as unknown as string;
    const requirement = req.body.requirement as unknown as string;
    const prime = '';

    return { name, recipient, contact, postcode, address, addressDetail, requirement, prime };
  }
}

// 사용자 배송지 정보 목록 조회
export const getUserShippingAddress = {
  validator: [
    isLoggedIn,
    param('userId')
      .isNumeric().withMessage('user_id 는 숫자여야 해요.')
      .custom((value) => parseInt(value) > 0).withMessage('user_id 가 정상적이지 않아요.'),
    validate,
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as LoginTokenType;
    const userId = Number(req.params.userId);

    const [[user]] = await userService.selectUserDetailByUserID(userId);
    if (!user) return res.status(404).json({ message: '수정하려는 사용자의 데이터가 서버에 존재하지 않아요.' });

    // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
    if (!isAdminOrOwner(loggedUser, user.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

    const [addresses] = await shippingAddressService.selectUserShippingAddressList(userId);
    return res.status(200).json({ message: '해당 사용자의 배송지 목록을 조회했어요.', addresses });
    next();
  }
}

// 사용자 배송지 정보 추가
export const postShippingAddress = {
  validator: [
    isLoggedIn,
    ...AddressForm.validator,
    param('userId')
      .isNumeric().withMessage('user_id 는 숫자여야 해요.')
      .custom((value) => parseInt(value) > 0).withMessage('user_id 가 정상적이지 않아요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as LoginTokenType;
    const userId = Number(req.params.userId);
    const form = AddressForm.form(req);

    const [[user]] = await userService.selectUserDetailByUserID(userId);
    if (!user) return res.status(404).json({ message: '수정하려는 사용자의 데이터가 서버에 존재하지 않아요.' });

    // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
    if (!isAdminOrOwner(loggedUser, user.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

    // 이미 배송지를 10개 이상 저장한 상태면 추가 불가능
    const [addresses] = await shippingAddressService.selectUserShippingAddressList(userId);
    if (addresses.length >= 10) return res.status(400).json({ message: '배송지는 10개 까지만 추가할 수 있어요.' });

    form.prime = addresses.find(item => item.prime === 'true') ? 'false' : 'true';
    await shippingAddressService.insertShippingAddress(userId, { form });
    return res.status(200).json({ message: '새로운 배송지를 추가했어요.' });
    next();
  }
}

// 사용자 배송지 수정
export const putShippingAddress = {
  validator: [
    isLoggedIn,
    ...AddressForm.validator,
    param('addressId')
      .isNumeric().withMessage('배송지 ID는 숫자여야 해요.')
      .custom((value) => parseInt(value) > 0).withMessage('배송지 ID가 정상적이지 않아요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as LoginTokenType;
    const addressId = Number(req.params.addressId);
    const form = AddressForm.form(req);

    const [[address]] = await shippingAddressService.selectUserShippingAddressDetail(addressId);
    if (!address) return res.status(404).json({ message: '수정하려는 배송지의 데이터가 서버에 존재하지 않아요.' });

    // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
    if (!isAdminOrOwner(loggedUser, address.user_id)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

    await shippingAddressService.updateShippingAddress(addressId, { form });
    return res.status(200).json({ message: '배송지 정보를 수정했어요.' });
    next();
  }
}

// 사용자 기본 배송지 변경
export const patchShippingAddressPrime = {
  validator: [
    isLoggedIn,
    param('addressId')
      .isNumeric().withMessage('배송지 ID는 숫자여야 해요.')
      .custom((value) => parseInt(value) > 0).withMessage('배송지 ID가 정상적이지 않아요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as LoginTokenType;
    const addressId = Number(req.params.addressId);

    const [[address]] = await shippingAddressService.selectUserShippingAddressDetail(addressId);
    if (!address) return res.status(404).json({ message: '수정하려는 배송지의 데이터가 서버에 존재하지 않아요.' });

    // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
    if (!isAdminOrOwner(loggedUser, address.user_id)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

    await shippingAddressService.updateUserShippingAddressPrimeFalse(address.user_id);
    await shippingAddressService.updateShippingAddressPrime(addressId, 'true');
    return res.status(200).json({ message: '기본 배송지를 변경했어요.' });

    next();
  }
}

// 사용자 배송지 삭제
export const deleteShippingAddress = {
  validator: [
    isLoggedIn,
    param('addressId').isNumeric().withMessage('배송지 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as LoginTokenType;
    const addressId = Number(req.params.addressId);

    const [[address]] = await shippingAddressService.selectUserShippingAddressDetail(addressId);
    if (!address) return res.status(404).json({ message: '삭제하려는 배송지의 데이터가 서버에 존재하지 않아요.' });

    // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
    if (!isAdminOrOwner(loggedUser, address.user_id)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });
    await shippingAddressService.deleteShippingAddress(addressId);

    // 만약 배송자의 삭제로 인해서 기본 배송지가 사라진다면 기존의 배송지 중 하나를 기본 배송지로 설정
    const [addresses] = await shippingAddressService.selectUserShippingAddressList(address.user_id);
    if (addresses.length > 0 && !addresses.find(item => item.prime === 'true')) {
      await shippingAddressService.updateShippingAddressPrime(addresses.find(item => item.prime === 'false')?.address_id || 0, 'true');
    }

    return res.status(200).json({ message: '배송지를 삭제했어요.' });
    next();
  }
}