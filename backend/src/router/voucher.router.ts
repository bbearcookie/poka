import express from 'express';
import * as getVouchers from '@controller/voucher/getVouchers';
import * as getVoucherDetail from '@controller/voucher/getVoucherDetail';
import * as deleteVoucher from '@controller/voucher/deleteVoucher';
import * as postVoucher from '@controller/voucher/postVoucher';
import * as getVoucherLogDetail from '@controller/voucher/log/getVoucherLogDetail';
import * as getTradeDetailByVoucherId from '@controller/voucher/trade/getTradeDetailByVoucherId';

const router = express.Router();

router.route('/')
  .get(getVouchers.validator, getVouchers.controller)
  .post(postVoucher.validator, postVoucher.controller);

router.route('/:voucherId')
  .get(getVoucherDetail.validator, getVoucherDetail.controller)
  .delete(deleteVoucher.validator, deleteVoucher.controller);

router.get('/:voucherId/log', getVoucherLogDetail.validator, getVoucherLogDetail.controller);

router.get('/:voucherId/trade', getTradeDetailByVoucherId.validator, getTradeDetailByVoucherId.controller);

export default router;