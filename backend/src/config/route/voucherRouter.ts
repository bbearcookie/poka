import { Express } from 'express';
import * as voucherCtrl from '@controller/voucher.ctrl';

export default function(app: Express, baseURI: string) {
  app.post(`${baseURI}`, voucherCtrl.postVoucher.validator, voucherCtrl.postVoucher.controller);
  app.get(`${baseURI}`, voucherCtrl.getAllVoucherList.validator, voucherCtrl.getAllVoucherList.controller);
  app.get(`${baseURI}/:voucherId`, voucherCtrl.getVoucherDetail.validator, voucherCtrl.getVoucherDetail.controller);
};