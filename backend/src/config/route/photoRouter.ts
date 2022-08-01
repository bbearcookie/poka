import { Express } from 'express';
import * as photoCtrl from '@controller/photo.ctrl';

export default function(app: Express, baseURI: string) {
  app.get(`${baseURI}`, photoCtrl.getPhotoList.controller);
  app.get(`${baseURI}/:photocardId`, photoCtrl.getPhotoDetail.validator, photoCtrl.getPhotoDetail.controller);
  app.post(`${baseURI}/multiple`,
    photoCtrl.postPhotos.uploader.array,
    photoCtrl.postPhotos.uploader.errorHandler,
    photoCtrl.postPhotos.validator,
    photoCtrl.postPhotos.controller
  );
  app.delete(`${baseURI}/:photocardId`, photoCtrl.deletePhoto.validator, photoCtrl.deletePhoto.controller);
};