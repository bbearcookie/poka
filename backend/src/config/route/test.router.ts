import { Express } from 'express';
import * as testCtrl from '@controller/test.ctrl';

export default function(app: Express, baseURI: string) {
  app.get(`${baseURI}/one`, testCtrl.getOne);
  app.get(`${baseURI}/two`, testCtrl.getTwo);
  app.post(`${baseURI}/data`, testCtrl.postTestData);
  app.get(`${baseURI}/data/list`, testCtrl.getAllTestData);
};