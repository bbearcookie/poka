import { Express } from 'express';
import * as memberCtrl from '@controller/member.ctrl';

export default function(app: Express, baseURI: string) {
  app.get(`${baseURI}/:memberId`, memberCtrl.getMemberDetail.validator, memberCtrl.getMemberDetail.controller);
  app.post(`${baseURI}`, memberCtrl.postMember.validator, memberCtrl.postMember.controller);
  app.put(`${baseURI}/:memberId`, memberCtrl.putMember.validator, memberCtrl.putMember.controller);
  app.delete(`${baseURI}/:memberId`, memberCtrl.deleteMember.validator, memberCtrl.deleteMember.controller);
};