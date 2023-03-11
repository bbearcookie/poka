import express from 'express';
import * as getGroups from '@controller/group/getGroups';
import * as getGroupDetail from '@controller/group/getGroupDetail';
import * as postGroup from '@controller/group/postGroup';
import * as putGroup from '@controller/group/putGroup';
import * as deleteGroup from '@controller/group/deleteGroup';
import * as postMember from '@controller/member/postMember';

const router = express.Router();

router.route('/')
  .get(getGroups.validator, getGroups.controller)
  .post(
    postGroup.uploader.single,
    postGroup.uploader.errorHandler,
    postGroup.validator,
    postGroup.controller);

router.route('/:groupId')
  .get(getGroupDetail.validator, getGroupDetail.controller)
  .put(
    putGroup.uploader.single,
    putGroup.uploader.errorHandler,
    putGroup.validator,
    putGroup.controller)
  .delete(deleteGroup.validator, deleteGroup.controller);
  
router.post('/:groupId/member', postMember.validator, postMember.controller);

export default router;