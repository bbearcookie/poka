import express from 'express';
import getGroups from '@controller/group/getGroups';
import postGroup from '@controller/group/postGroup';
import putGroup from '@controller/group/putGroup';
import getGroupDetail from '@controller/group/getGroupDetail';
import deleteGroup from '@controller/group/deleteGroup';
import postMember from '@controller/group/member/postMember';

const router = express.Router();

router.route('/')
  .get(getGroups)
  .post(postGroup)

router.route('/:groupId')
  .get(getGroupDetail)
  .put(putGroup)
  .delete(deleteGroup);
  
router.post('/:groupId/member', postMember);

export default router;