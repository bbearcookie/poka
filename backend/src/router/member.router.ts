import express from 'express';
import getMembers from '@controller/member/getMembers';
import getMember from '@controller/member/getMember';
import putMember from '@controller/member/putMember';
import deleteMember from '@controller/member/deleteMember';

const router = express.Router();

router.get('/', getMembers);
router.route('/:memberId')
  .get(getMember)
  .put(putMember)
  .delete(deleteMember)

export default router;