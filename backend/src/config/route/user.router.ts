import { Express } from 'express';
import * as userCtrl from '@controller/user.ctrl';
import * as shippingAddressCtrl from '@controller/shipping-address.ctrl';

export default function(app: Express, baseURI: string) {
  app.get(`${baseURI}/:userId`, userCtrl.getUserDetail.validator, userCtrl.getUserDetail.controller);
  app.put(
    `${baseURI}/:userId/profile`,
    userCtrl.putUserProfile.uploader.single,
    userCtrl.putUserProfile.uploader.errorHandler,
    userCtrl.putUserProfile.validator,
    userCtrl.putUserProfile.controller
  );
  app.get(`${baseURI}/:userId/shipping-address`, shippingAddressCtrl.getUserShippingAddress.validator, shippingAddressCtrl.getUserShippingAddress.controller);
  app.post(`${baseURI}/:userId/shipping-address`, shippingAddressCtrl.postShippingAddress.validator, shippingAddressCtrl.postShippingAddress.controller);
}