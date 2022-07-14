import { Express } from 'express';
import * as groupCtrl from '@controller/group.ctrl';

export default function(app: Express, baseURI: string) {
  app.get(`${baseURI}`, groupCtrl.getGroupList.controller);
  app.post(`${baseURI}`, groupCtrl.postGroup.uploader, groupCtrl.postGroup.validator, groupCtrl.postGroup.controller);
};