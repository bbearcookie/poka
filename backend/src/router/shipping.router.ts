import express from 'express';
import * as putAddress from '@controller/shipping/address/putAddress';
import * as deleteAddress from '@controller/shipping/address/deleteAddress';
import * as patchAddressPrime from '@controller/shipping/address/patchAddressPrime';

import * as getRequests from '@controller/shipping/request/getRequests';
import * as postRequest from '@controller/shipping/request/postRequest';
import * as deleteRequest from '@controller/shipping/request/deleteRequest';
import * as getRequestDetail from '@controller/shipping/request/getRequestDetail';

import * as postPayment from '@controller/shipping/payment/postPayment';
import * as postRefund from '@controller/shipping/payment/postRefund';

const router = express.Router();

router.route('/address/:addressId')
  .put(putAddress.validator, putAddress.controller)
  .delete(deleteAddress.validator, deleteAddress.controller);

router.patch('/address/:addressId/prime', patchAddressPrime.validator, patchAddressPrime.controller);

router.route('/request')
  .get(getRequests.validator, getRequests.controller)
  .post(postRequest.validator, postRequest.controller);

router.route('/request/:requestId')
  .get(getRequestDetail.validator, getRequestDetail.controller)
  .delete(deleteRequest.validator, deleteRequest.controller);

router.post('/request/:requestId/payment', postPayment.validator, postPayment.controller);
router.post('/request/:requestId/refund', postRefund.validator, postRefund.controller);


export default router;