import { Express } from 'express';
import testRouter from '@config/route/test.router';
import groupRouter from '@config/route/group.router';
import memberRouter from '@config/route/member.router';
import photoRouter from '@config/route/photo.router';
import authRouter from '@config/route/auth.router';
import userRouter from '@config/route/user.router';
import voucherRouter from '@config/route/voucher.router';

export default function(app: Express) {
  testRouter(app, '/api/test');
  groupRouter(app, '/api/group');
  memberRouter(app, '/api/member');
  photoRouter(app, '/api/photo');
  authRouter(app, '/api/auth');
  userRouter(app, '/api/user');
  voucherRouter(app, '/api/voucher');
};