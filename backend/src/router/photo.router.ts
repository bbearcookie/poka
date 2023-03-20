import express from 'express';
import getPhotos from '@controller/photo/getPhotos';
import getPhotoDetail from '@controller/photo/getPhotoDetail';
import postPhotos from '@controller/photo/postPhotos';
import putPhoto from '@controller/photo/putPhoto';
import deletePhoto from '@controller/photo/deletePhoto';

const router = express.Router();

router.route('/')
  .get(getPhotos)
  .post(postPhotos);

router.route('/:photocardId')
  .get(getPhotoDetail)
  .put(putPhoto)
  .delete(deletePhoto);

export default router;