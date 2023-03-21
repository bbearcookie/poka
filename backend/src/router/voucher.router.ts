import express from 'express';
import getVouchers from '@controller/voucher/getVouchers';
import getVoucherDetail from '@controller/voucher/getVoucherDetail';
import deleteVoucher from '@controller/voucher/deleteVoucher';
import postVoucher from '@controller/voucher/postVoucher';
import getVoucherLogDetail from '@controller/voucher/log/getVoucherLogDetail';
import getTradeDetailByVoucherId from '@controller/voucher/trade/getTradeDetailByVoucherId';

const router = express.Router();

router.route('/')
  .get(getVouchers)
  .post(postVoucher);

router.route('/:voucherId')
  .get(getVoucherDetail)
  .delete(deleteVoucher);

router.get('/:voucherId/log', getVoucherLogDetail);
router.get('/:voucherId/trade', getTradeDetailByVoucherId);

export default router;