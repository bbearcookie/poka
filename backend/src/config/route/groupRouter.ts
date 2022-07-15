import { Express } from 'express';
import * as groupCtrl from '@controller/group.ctrl';
import * as memberCtrl from '@controller/member.ctrl';

export default function(app: Express, baseURI: string) {
  app.get(`${baseURI}`, groupCtrl.getGroupList.controller);
  app.get(`${baseURI}/:groupId`, groupCtrl.getGroupDetail.validator, groupCtrl.getGroupDetail.controller);
  app.get(`${baseURI}/:groupId/member`, memberCtrl.getMembersOfGroup.validator, memberCtrl.getMembersOfGroup.controller);
  app.post(`${baseURI}`, groupCtrl.postGroup.uploader, groupCtrl.postGroup.validator, groupCtrl.postGroup.controller);
};