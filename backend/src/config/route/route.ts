import { Express, NextFunction, Request, Response } from 'express';
import groupRouter from '@config/route/group.router';
import memberRouter from '@config/route/member.router';
import photoRouter from '@config/route/photo.router';
import authRouter from '@config/route/auth.router';
import userRouter from '@config/route/user.router';
import voucherRouter from '@config/route/voucher.router';
import shippingAddressRouter from './shipping-address.router';

export default function(app: Express) {
  groupRouter(app, '/api/group');
  memberRouter(app, '/api/member');
  photoRouter(app, '/api/photo');
  authRouter(app, '/api/auth');
  userRouter(app, '/api/user');
  voucherRouter(app, '/api/voucher');
  shippingAddressRouter(app, '/api/shipping-address');

  // 미들웨어가 response 응답을 하지 않으면 실행
  app.use('*', (req: Request, res: Response) => {
    return res.status(501).json({ message: 'Not Implemented' });
  });

  // 미들웨어에서 에러를 발생시키면 실행
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
  });
};