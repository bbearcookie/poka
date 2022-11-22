import { Express } from 'express';
import * as authCtrl from '@controller/auth.ctrl';

export default function(app: Express, baseURI: string) {
  app.post(`${baseURI}/signup`, authCtrl.postSignup.validator, authCtrl.postSignup.controller);
  app.post(`${baseURI}/login`, authCtrl.postLogin.validator, authCtrl.postLogin.controller);
  app.post(`${baseURI}/logout`, authCtrl.postLogout.controller);
  app.post(`${baseURI}/verify`, authCtrl.postVerify.controller);
}