import express from 'express';
import putAddress from '@controller/shipping/address/putAddress';
import deleteAddress from '@controller/shipping/address/deleteAddress';
import patchAddressPrime from '@controller/shipping/address/patchAddressPrime';

import getRequests from '@controller/shipping/request/getRequests';
import postRequest from '@controller/shipping/request/postRequest';
import deleteRequest from '@controller/shipping/request/deleteRequest';
import getRequestDetail from '@controller/shipping/request/getRequestDetail';
import postApprove from '@controller/shipping/request/postApprove';

import postPayment from '@controller/shipping/payment/postPayment';
import postRefund from '@controller/shipping/payment/postRefund';

const router = express.Router();

router.route('/address/:addressId')
  .put(putAddress)
  .delete(deleteAddress);

router.patch('/address/:addressId/prime', patchAddressPrime);

router.route('/request')
  .get(getRequests)
  .post(postRequest);

router.route('/request/:requestId')
  .get(getRequestDetail)
  .delete(deleteRequest);

router.post('/request/:requestId/payment', postPayment);
router.post('/request/:requestId/refund', postRefund);
router.post('/request/:requestId/approve', postApprove);

export default router;