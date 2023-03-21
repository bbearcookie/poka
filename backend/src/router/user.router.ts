import express from 'express';
import getUserDetail from '@controller/user/getUserDetail';
import putUserProfile from '@controller/user/putUserProfile';
import getAddresses from '@controller/user/address/getAddresses';
import postAddress from '@controller/user/address/postAddress';
import getTradeHistory from '@controller/user/trade/getTradeHistory';

const router = express.Router();

router.get('/:userId', getUserDetail);
router.put('/:userId/profile', putUserProfile);
router.get('/:userId/trade-history', getTradeHistory);

router.route('/:userId/shipping-address')
  .get(getAddresses)
  .post(postAddress);

export default router;