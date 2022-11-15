import { Express } from 'express';
import * as userCtrl from '@controller/user.ctrl';

export default function(app: Express, baseURI: string) {
  app.get(`${baseURI}/:userId`, userCtrl.getUserDetail.validator, userCtrl.getUserDetail.controller);
  app.put(
    `${baseURI}/:userId/profile`,
    userCtrl.putUserProfile.uploader.single,
    userCtrl.putUserProfile.uploader.errorHandler,
    userCtrl.putUserProfile.validator,
    userCtrl.putUserProfile.controller
  );
  app.get(`${baseURI}/:userId/shipping-address`, userCtrl.getUserShippingAddress.validator, userCtrl.getUserShippingAddress.controller);
  app.post(`${baseURI}/:userId/shipping-address`, userCtrl.postShippingAddress.validator, userCtrl.postShippingAddress.controller);
}