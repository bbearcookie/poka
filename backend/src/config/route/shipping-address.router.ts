import { Express } from 'express';
import * as shippingAddressCtrl from '@controller/shipping-address.ctrl';

export default function(app: Express, baseURI: string) {
  app.delete(`${baseURI}/:id`, shippingAddressCtrl.deleteShippingAddress.validator, shippingAddressCtrl.deleteShippingAddress.controller);
}