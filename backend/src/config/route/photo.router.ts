import express from 'express';
import * as getPhotos from '@controller/photo/getPhotos';
import * as getPhotoDetail from '@controller/photo/getPhotoDetail';
import * as postPhotos from '@controller/photo/postPhotos';
import * as putPhoto from '@controller/photo/putPhoto';
import * as deletePhoto from '@controller/photo/deletePhoto';

const router = express.Router();

router.route('/')
  .get(getPhotos.validator, getPhotos.controller)
  .post(
    postPhotos.uploader.array,
    postPhotos.uploader.errorHandler,
    postPhotos.validator,
    postPhotos.controller);

router.route('/:photocardId')
  .get(getPhotoDetail.validator, getPhotoDetail.controller)
  .put(
    putPhoto.uploader.single,
    putPhoto.uploader.errorHandler,
    putPhoto.validator,
    putPhoto.controller)
  .delete(deletePhoto.validator, deletePhoto.controller);

export default router;