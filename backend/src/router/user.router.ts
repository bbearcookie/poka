import express from 'express';
import * as getUserDetail from '@controller/user/getUserDetail';
import * as putUserProfile from '@controller/user/putUserProfile';
import * as getAddresses from '@controller/user/address/getAddresses';
import * as postAddress from '@controller/user/address/postAddress';
import * as getTradeHistory from '@controller/user/trade/getTradeHistory';

const router = express.Router();
router.get('/:userId', getUserDetail.validator, getUserDetail.controller);
router.put('/:userId/profile',
  putUserProfile.uploader.single,
  putUserProfile.uploader.errorHandler,
  putUserProfile.validator,
  putUserProfile.controller
);
router.route('/:userId/shipping-address')
  .get(getAddresses.validator, getAddresses.controller)
  .post(postAddress.validator, postAddress.controller);
router.get('/:userId/trade-history', getTradeHistory.validator, getTradeHistory.controller);

export default router;