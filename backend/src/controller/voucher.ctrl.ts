import { Request, Response } from 'express';
import * as voucherService from '@service/voucher.service';
import * as userService from '@service/user.service';
import * as photoService from '@service/photo.service';
import { query, body, param, oneOf } from 'express-validator';
import { validate, createResponseMessage } from '@util/validator';

// 전체 소유권 목록 조회
export const getAllVoucherList = {
  validator: [
    oneOf([ // pageParam은 undefined이거나 숫자여야 함.
      query('pageParam').not().exists(),
      query('pageParam').isNumeric()
    ]),
    query('filter').custom((value, { req }) => {
      const filter = JSON.parse(value);
      if (!Array.isArray(filter['PHOTO_NAME'])) return false;
      if (!Array.isArray(filter['USER_NAME'])) return false;
      if (!Array.isArray(filter['GROUP_ID'])) return false;
      if (!Array.isArray(filter['MEMBER_ID'])) return false;
      if (!['', 'ALL', 'AVAILABLE', 'TRADING', 'SHIPPING', 'SHIPPED'].includes(filter["VOUCHER_STATE"])) return false;
      return true;
    }).withMessage("검색 필터가 잘못되었어요."),
    validate
  ],
  filterType: {
    'PHOTO_NAME': [] as string[],
    'USER_NAME': [] as string[],
    'GROUP_ID': [] as number[],
    'MEMBER_ID': [] as number[],
    'VOUCHER_STATE': '' as '' | 'ALL' | 'AVAILABLE' | 'TRADING' | 'SHIPPING' | 'SHIPPED'
  },
  controller: async (req: Request, res: Response) => {
    const itemPerPage = 20;
    const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0;
    const filter = JSON.parse(String(req.query.filter));

    try {
      const [vouchers] = await voucherService.selectVoucherList(itemPerPage, pageParam, filter);
      return res.status(200).json({
        message: '소유권 목록을 조회했습니다.',
        vouchers,
        paging: {
          pageParam,
          hasNextPage: vouchers.length === itemPerPage
        }
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 사용자 개인의 소유권 목록 조회
export const getMineVoucherList = {
  
}

// 소유권 상세 조회
export const getVoucherDetail = {
  validator: [
    param('voucherId').isNumeric().withMessage('소유권 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const voucherId = Number(req.params.voucherId);

    try {
      const [[voucher]] = await voucherService.selectVoucherDetail(voucherId);
      if (!voucher) return res.status(404).json({ message: '해당 소유권의 데이터가 서버에 존재하지 않아요.' });
      const [[photo]] = await photoService.selectPhotoDetail(voucher.photocard_id);
      const [[user]] = await userService.selectUserDetailByUserID(voucher.user_id);

      return res.status(200).json({
        message: `${voucherId}번 소유권의 상세 정보를 조회했습니다.`,
        ...voucher,
        ...photo,
        user_id: user.user_id,
        username: user.username,
        nickname: user.nickname
      });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 소유권 발급
export const postVoucher = {
  validator: [
    body('username').trim().toLowerCase()
      .not().isEmpty().withMessage('아이디가 비어있어요.').bail(),
    body('vouchers').isArray({ min: 1 }).withMessage('발급할 소유권을 선택해주세요.'),
    body('vouchers.*.photocardId').isNumeric().withMessage('포토카드ID는 숫자여야 해요.').bail(),
    body('vouchers.*.amount')
      .isNumeric().withMessage('발급할 소유권의 수량은 숫자여야 해요.').bail()
      .custom((value, { req }) => Number(value) > 0 && Number(value) < 10).withMessage('발급할 소유권의 수량은 1개부터 9개까지 입력할 수 있어요.').bail(),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const username = req.body.username as unknown as string;
    const vouchers = req.body.vouchers;

    try {
      const [[user]] = await userService.selectUserDetailByUsername(username);
      if (!user) return res.status(404).json(createResponseMessage("username", "가입되지 않은 사용자에요."));
      await voucherService.insertVouchers(user.user_id, vouchers);
      return res.status(200).json({ message: `${user.username} 사용자에게 소유권을 발급했어요.` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}