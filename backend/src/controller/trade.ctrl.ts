import { NextFunction, Request, Response } from 'express';
import { body, oneOf, query, param } from 'express-validator';
import { validate, isLoggedIn, isAdminOrOwner, createResponseMessage } from '@util/validator';
import { UserType } from '@util/jwt';
import * as userService from '@service/user.service';
import * as photoService from '@service/photo.service';
import * as voucherService from '@service/voucher.service';
import * as tradeService from '@service/trade.service';

// 교환글 목록 조회
export const getTradeList = {
  validator: [
    oneOf([
      query('pageParam').not().exists(),
      query('pageParam').isNumeric()
    ]),
    query('filter').custom(value => {
      const filter = JSON.parse(value);
      if (isNaN(filter.groupId)) return false;
      if (isNaN(filter.memberId)) return false;
      return true;
    }).withMessage("검색 필터가 잘못되었어요."),
    validate
  ],
  filterType: {
    'groupId': 0 as number,
    'memberId': 0 as number
  },
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const itemPerPage = 10;
    const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0;
    const filter = JSON.parse(String(req.query.filter)) as typeof getTradeList.filterType;

    const trades = await tradeService.selectTradeList(filter.groupId, filter.memberId, itemPerPage, pageParam);
    return res.status(200).json({
      message: '거래글 목록을 조회했습니다.',
      trades,
      paging: {
        pageParam,
        hasNextPage: trades.length === itemPerPage
      }
    });
    next();
  }
}

// 교환글 상세 조회
export const getTradeDetail = {
  validator: [
    param('tradeId').isNumeric().withMessage('교환글 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const tradeId = Number(req.params.tradeId);

    const [[trade]] = await tradeService.selectTradeDetail(tradeId);
    if (!trade) return res.status(404).json({ message: '조회하려는 교환글이 존재하지 않아요.' });
    const [wantcards] = await tradeService.selectWantCardsOfTrade(tradeId);

    return res.status(200).json({
      message: '교환글을 조회했어요.',
      wantcards,
      ...trade
    });
    next();
  }
}

// 교환글 작성
export const postTrade = {
  validator: [
    isLoggedIn,
    body('haveVoucherId')
      .isNumeric().withMessage('소유권 ID는 숫자여야 해요.').bail()
      .custom((value) => Number(value) > 0).withMessage('등록할 소유권을 선택해주세요.').bail(),
    body('wantPhotocardIds')
      .not().isEmpty().withMessage('받을 포토카드를 선택해주세요.').bail()
      .isArray({ max: 10 }).withMessage('받을 포토카드의 종류는 최대 10종류까지 선택할 수 있어요.').bail(),
    body('amount')
      .isNumeric().withMessage('수량은 숫자여야 해요.')
      .custom((value) => Number(value) > 0).withMessage('받을 포토카드의 수량을 입력해주세요.').bail()
      .custom((value, { req }) => Number(value) <= req.body.wantPhotocardIds.length).withMessage('수량은 받을 포토카드로 선택한 종류의 갯수를 초과할 수 없어요.').bail(),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as UserType;
    const amount = req.body.amount as number;
    const haveVoucherId = req.body.haveVoucherId as number;
    const wantPhotocardIds = req.body.wantPhotocardIds as number[];

    // 사용자 정보 확인
    const [[user]] = await userService.selectUserDetailByUserID(loggedUser.user_id);
    if (!user) return res.status(404).json({ message: '로그인한 사용자의 정보가 올바르지 않아요.' });

    // 소유권 정보 확인
    const [[voucher]] = await voucherService.selectVoucherDetail(haveVoucherId);
    if (!voucher) return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 존재하지 않아요.'));
    if (voucher.state !== 'available') return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 이용 가능한 상태가 아니에요.'));
    if (voucher.user_id !== user.user_id) return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 당신의 것이 아니에요.'));

    // 받을 포토카드와 일치하는 소유권은 사용 불가능
    for (let photoId of wantPhotocardIds) {
      const [[photo]] = await photoService.selectPhotoDetail(photoId);
      if (!photo) return res.status(404).json(createResponseMessage('wantPhotocardIds', '받을 포토카드의 정보가 올바르지 않아요.'));
      if (photo.photocard_id === voucher.photocard_id) return res.status(400).json(createResponseMessage('wantPhotocardIds', '받을 포토카드는 등록할 소유권과 같은 종류일 수 없어요.'));
    }

    // 교환글 작성
    await tradeService.writeTrade({
      userId: loggedUser.user_id,
      voucherId: haveVoucherId,
      amount,
      wantPhotocardIds
    });

    return res.status(200).json({ message: '교환글을 작성했어요.' });
    next();
  }
}

// 교환글 수정
export const putTrade = {
  validator: [
    param('tradeId').isNumeric().withMessage('교환글 ID는 숫자여야 해요.'),
    ...postTrade.validator,
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as UserType;
    const tradeId = Number(req.params.tradeId);
    const amount = req.body.amount as number;
    const haveVoucherId = req.body.haveVoucherId as number;
    const wantPhotocardIds = req.body.wantPhotocardIds as number[];

    // 사용자 정보 확인
    const [[user]] = await userService.selectUserDetailByUserID(loggedUser.user_id);
    if (!user) return res.status(404).json({ message: '로그인한 사용자의 정보가 올바르지 않아요.' });

    // 교환글 정보 확인
    const [[trade]] = await tradeService.selectTradeDetail(tradeId);
    if (!trade) return res.status(404).json({ message: '삭제하려는 교환글이 존재하지 않아요.' });
    if (trade.state !== 'trading') return res.status(400).json({ message: '이미 교환이 완료된 교환글은 삭제할 수 없어요.' });
    if (!isAdminOrOwner(loggedUser, trade.user_id)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

    // 소유권 정보 확인
    const [[voucher]] = await voucherService.selectVoucherDetail(haveVoucherId);
    if (!voucher) return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 존재하지 않아요.'));
    if (voucher.state !== 'available' && voucher.voucher_id !== trade.voucher_id) return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 이용 가능한 상태가 아니에요.'));
    if (voucher.user_id !== user.user_id) return res.status(404).json(createResponseMessage('haveVoucherId', '사용하려는 소유권이 당신의 것이 아니에요.'));

    // 받을 포토카드와 일치하는 소유권은 사용 불가능
    for (let photoId of wantPhotocardIds) {
      const [[photo]] = await photoService.selectPhotoDetail(photoId);
      if (!photo) return res.status(404).json(createResponseMessage('wantPhotocardIds', '받을 포토카드의 정보가 올바르지 않아요.'));
      if (photo.photocard_id === voucher.photocard_id) return res.status(400).json(createResponseMessage('wantPhotocardIds', '받을 포토카드는 등록할 소유권과 같은 종류일 수 없어요.'));
    }

    // 교환글 수정
    await tradeService.putTrade({
      trade,
      voucherId: haveVoucherId,
      amount,
      wantPhotocardIds
    });

    return res.status(200).json({ message: '교환글을 수정했어요.' });
    next();
  }
}

// 교환글 삭제
export const deleteTrade = {
  validator: [
    isLoggedIn,
    param('tradeId').isNumeric().withMessage('교환글 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const loggedUser = req.user as UserType;
    const tradeId = Number(req.params.tradeId);

    const [[trade]] = await tradeService.selectTradeDetail(tradeId);
    if (!trade) return res.status(404).json({ message: '삭제하려는 교환글이 존재하지 않아요.' });
    if (trade.state !== 'trading') return res.status(400).json({ message: '이미 교환이 완료된 교환글은 삭제할 수 없어요.' });
    if (!isAdminOrOwner(loggedUser, trade.user_id)) return res.status(403).json({ message: '해당 기능을 사용할 권한이 없어요.' });

    await tradeService.deleteTrade(trade);
    return res.status(200).json({ message: '교환글을 삭제했어요.' });

    next();
  }
}