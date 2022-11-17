import { Express } from 'express';
import * as shippingAddressCtrl from '@controller/shipping-address.ctrl';

export default function(app: Express, baseURI: string) {
  app.delete(`${baseURI}/:addressId`, shippingAddressCtrl.deleteShippingAddress.validator, shippingAddressCtrl.deleteShippingAddress.controller);
  app.put(`${baseURI}/:addressId`, shippingAddressCtrl.putShippingAddress.validator, shippingAddressCtrl.putShippingAddress.controller);
}