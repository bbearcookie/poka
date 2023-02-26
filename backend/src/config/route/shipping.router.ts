import { Express } from 'express';
import * as shippingCtrl from '@controller/shipping.ctrl';

export default function(app: Express, baseURI: string) {
  app.delete(`${baseURI}/address/:addressId`, shippingCtrl.deleteShippingAddress.validator, shippingCtrl.deleteShippingAddress.controller);
  app.put(`${baseURI}/address/:addressId`, shippingCtrl.putShippingAddress.validator, shippingCtrl.putShippingAddress.controller);
  app.patch(`${baseURI}/address/:addressId/prime`, shippingCtrl.patchShippingAddressPrime.validator, shippingCtrl.patchShippingAddressPrime.controller);
  app.post(`${baseURI}/request`, shippingCtrl.postShippingRequest.validator, shippingCtrl.postShippingRequest.controller);
  app.get(`${baseURI}/request/:requestId`, shippingCtrl.getShippingDetail.validator, shippingCtrl.getShippingDetail.controlller);
  app.delete(`${baseURI}/request/:requestId`, shippingCtrl.deleteShippingRequest.validator, shippingCtrl.deleteShippingRequest.controller);
}