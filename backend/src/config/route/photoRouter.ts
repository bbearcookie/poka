import { Express } from 'express';
import * as photoCtrl from '@controller/photo.ctrl';

export default function(app: Express, baseURI: string) {
  app.post(`${baseURI}/multiple`,
    photoCtrl.postPhotos.uploader.array,
    photoCtrl.postPhotos.uploader.errorHandler,
    photoCtrl.postPhotos.validator,
    photoCtrl.postPhotos.controller
  );
};