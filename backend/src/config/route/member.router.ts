import express from 'express';
import * as getMembers from '@controller/member/getMembers';
import * as getMember from '@controller/member/getMember';
import * as putMember from '@controller/member/putMember';
import * as deleteMember from '@controller/member/deleteMember';

const router = express.Router();

router.get('/', getMembers.controller);
router.route('/:memberId')
  .get(getMember.validator, getMember.controller)
  .put(putMember.validator, putMember.controller)
  .delete(deleteMember.validator, deleteMember.controller)

export default router;