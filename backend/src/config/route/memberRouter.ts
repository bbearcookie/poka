import { Express } from 'express';
import * as memberCtrl from '@controller/member.ctrl';

export default function(app: Express, baseURI: string) {
  app.post(`${baseURI}`, memberCtrl.postMember.validator, memberCtrl.postMember.controller);
  app.put(`${baseURI}/:memberId`, memberCtrl.putMember.validator, memberCtrl.putMember.controller);
};