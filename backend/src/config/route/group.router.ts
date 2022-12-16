import { Express } from 'express';
import * as groupCtrl from '@controller/group.ctrl';
import * as memberCtrl from '@controller/member.ctrl';

export default function(app: Express, baseURI: string) {
  app.get(`${baseURI}`, groupCtrl.getGroupList.controller);
  app.get(`${baseURI}/:groupId`, groupCtrl.getGroupDetail.validator, groupCtrl.getGroupDetail.controller);
  app.put(
    `${baseURI}/:groupId`,
    groupCtrl.putGroup.uploader.single,
    groupCtrl.putGroup.uploader.errorHandler,
    groupCtrl.putGroup.validator,
    groupCtrl.putGroup.controller
  );
  app.post(
    `${baseURI}`,
    groupCtrl.postGroup.uploader.single,
    groupCtrl.postGroup.uploader.errorHandler,
    groupCtrl.postGroup.validator,
    groupCtrl.postGroup.controller
  );
  app.post(`${baseURI}/:groupId/member`, memberCtrl.postMember.validator, memberCtrl.postMember.controller);
  app.delete(`${baseURI}/:groupId`, groupCtrl.deleteGroup.validator, groupCtrl.deleteGroup.controller);
};