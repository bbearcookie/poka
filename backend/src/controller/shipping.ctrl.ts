import { NextFunction, Request, Response } from 'express';
import { body, param } from 'express-validator';
import { validate, isLoggedIn, isAdminOrOwner, createResponseMessage } from '@util/validator';
import { LoginTokenType } from '@type/user';
import { getToken, getPaymentData } from '@util/iamport';
import * as userService from '@service/user.service';
import * as shippingService from '@service/shipping.service';
import * as voucherService from '@service/voucher.service';
import * as paymentService from '@service/payment.service';

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

// 사용자 배송지 정보 목록 조회
export const getUserShippingAddress = {
  validator: [
    isLoggedIn,
    param('userId')
      .isNumeric().withMessage('userId 는 숫자여야 해요.')
      .custom((value) => parseInt(value) > 0).withMessage('userId 가 정상적이지 않아요.'),
    validate,
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as LoginTokenType;
    const userId = Number(req.params.userId);

    const [[user]] = await userService.selectUserDetailByUserID(userId);
    if (!user) return res.status(404).json({ message: '수정하려는 사용자의 데이터가 서버에 존재하지 않아요.' });

    // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
    if (!isAdminOrOwner(loggedUser, user.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

    const [addresses] = await shippingService.selectUserShippingAddressList(userId);
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
      .isNumeric().withMessage('userId 는 숫자여야 해요.')
      .custom((value) => parseInt(value) > 0).withMessage('userId 가 정상적이지 않아요.'),
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
    const [addresses] = await shippingService.selectUserShippingAddressList(userId);
    if (addresses.length >= 10) return res.status(400).json({ message: '배송지는 10개 까지만 추가할 수 있어요.' });

    form.prime = addresses.find(item => item.prime) ? 0 : 1;
    await shippingService.insertShippingAddress(userId, form);
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

    const [[address]] = await shippingService.selectUserShippingAddressDetail(addressId);
    if (!address) return res.status(404).json({ message: '수정하려는 배송지의 데이터가 서버에 존재하지 않아요.' });

    // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
    if (!isAdminOrOwner(loggedUser, address.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

    await shippingService.updateShippingAddress(addressId, form);
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

    const [[address]] = await shippingService.selectUserShippingAddressDetail(addressId);
    if (!address) return res.status(404).json({ message: '수정하려는 배송지의 데이터가 서버에 존재하지 않아요.' });

    // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
    if (!isAdminOrOwner(loggedUser, address.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

    await shippingService.updateUserShippingAddressPrimeFalse(address.userId);
    await shippingService.updateShippingAddressPrime(addressId, 1);
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

    const [[address]] = await shippingService.selectUserShippingAddressDetail(addressId);
    if (!address) return res.status(404).json({ message: '삭제하려는 배송지의 데이터가 서버에 존재하지 않아요.' });

    // 관리자이거나, 자기 자신의 정보에 대한 경우에만 접근 가능
    if (!isAdminOrOwner(loggedUser, address.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });
    await shippingService.deleteShippingAddress(addressId);

    // 만약 배송자의 삭제로 인해서 기본 배송지가 사라진다면 기존의 배송지 중 하나를 기본 배송지로 설정
    const [addresses] = await shippingService.selectUserShippingAddressList(address.userId);
    if (addresses.length > 0 && !addresses.find(item => item.prime)) {
      await shippingService.updateShippingAddressPrime(addresses.find(item => item.prime === 0)?.addressId || 0, 1);
    }

    return res.status(200).json({ message: '배송지를 삭제했어요.' });
    next();
  }
}

// 배송 요청 상세 조회
export const getShippingDetail = {
  validator: [
    param('requestId').isNumeric().withMessage('요청 ID는 숫자여야 해요.'),
    validate
  ],
  controlller: async (req: Request, res: Response, next: NextFunction) => {
    const requestId = Number(req.params.requestId);

    // 배송 요청 상세 조회
    const [[shipping]] = await shippingService.selectShippingRequestDetail(requestId);
    if (!shipping) return res.status(404).json({ message: '해당 배송 요청을 찾지 못했어요.' });

    // 요청한 소유권 목록 조회
    const [vouchers] = await shippingService.selectShippingRequestVoucherIds(requestId);

    return res.status(200).json({
      message: '배송 요청 상세 정보를 조회했어요.',
      shipping,
      vouchers
    });
    next();
  }
}

// 배송 요청 작성
export const postShippingRequest = {
  validator: [
    isLoggedIn,
    body('voucherIds').isArray({ min: 1 }).withMessage('소유권을 선택해주세요.'),
    ...AddressForm.validator,
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as LoginTokenType;
    const voucherIds = req.body.voucherIds as number[];
    const address = AddressForm.form(req);

    // 소유권 유효성 검사
    const [vouchers] = await voucherService.selectVoucherDetail(voucherIds);
    if (vouchers.length === 0) return res.status(404).json(createResponseMessage('voucherIds', '사용하려는 소유권을 찾지 못했어요.'));
    vouchers.forEach(voucher => {
      if (loggedUser.userId !== voucher.userId)
        return res.status(403).json(createResponseMessage('voucherIds', '당신의 소유권이 아니에요.'));
      if (voucher.state !== 'available')
        return res.status(403).json(createResponseMessage('voucherIds', '배송 요청하려는 소유권 중에 이용가능 상태가 아닌 소유권이 있어요.'));
    });

    // 배송 요청 생성.
    const requestId = await shippingService.insertShippingRequest(loggedUser.userId, voucherIds, address);
    return res.status(200).json({ message: '배송 요청글을 작성했어요. 이어서 배송비를 결제해주세요.', requestId });
    next();
  }
}

// 배송 요청 삭제
export const deleteShippingRequest = {
  validator: [
    isLoggedIn,
    param('requestId').isNumeric().withMessage('요청 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as LoginTokenType;
    const requestId = Number(req.params.requestId);
    
    // 배송 요청 관련 유효성 검사
    const [[shipping]] = await shippingService.selectShippingRequestDetail(requestId);
    if (!shipping) return res.status(404).json({ message: '해당 배송 요청을 찾지 못했어요.' });
    if (!isAdminOrOwner(loggedUser, shipping.userId)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });
    if (shipping.paymentState !== 'waiting') return res.status(403).json({ message: '아직 미결제 상태인 경우에만 삭제할 수 있어요.' });
    if (shipping.requestState !== 'waiting') return res.status(403).json({ message: '관리자가 이미 배송처리한 경우에는 삭제할 수 없어요.' });

    // TODO: 배송 요청 삭제
    await shippingService.deleteShippingRequest(requestId, shipping.paymentId);
    return res.status(200).json({ message: '배송 요청을 취소했어요.' });
    next(); 
  }
}

// 배송 요청의 결제 검증
export const postShippingRequestPayment = {
  validator: [
    param('requestId').isNumeric().withMessage('요청 ID는 숫자여야 해요.'),
    body('impUID').notEmpty().withMessage('impUID가 없어요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const requestId = Number(req.params.requestId);
    const impUID = req.body.impUID;

    // 배송 요청 정보
    const [[shipping]] = await shippingService.selectShippingRequestDetail(requestId);
    if (!shipping) return res.status(404).json({ message: '해당 배송 요청을 찾지 못했어요.' });
    
    // 포트원 액세스 토큰 발급
    const token = await getToken();

    // 결제 정보 조회
    const payment = await getPaymentData(impUID, token);
    if (!payment) return res.status(404).json({ message: '포트원 결제 정보를 찾지 못했어요.' });

    // 결제 금액이 일치하면 결제 완료 처리. 다르면 위조 처리.
    if (payment.amount === shipping.amount && payment.status === 'paid') {
      await paymentService.updatePaymentState(shipping.paymentId, 'paid');
      return res.status(200).json({ message: '배송비가 결제되었어요.' });
    } else {
      await paymentService.updatePaymentState(shipping.paymentId, 'forgeried');
      return res.status(200).json({ message: '위조된 결과가 확인되었어요.' });
    }

    next();
  }
}