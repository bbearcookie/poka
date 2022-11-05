import { Express } from 'express';
import * as userCtrl from '@controller/user.ctrl';

export default function(app: Express, baseURI: string) {
  app.get(`${baseURI}/:userId`, userCtrl.getUserDetail.validator, userCtrl.getUserDetail.controller);
}