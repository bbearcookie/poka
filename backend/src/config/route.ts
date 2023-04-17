import { Express, NextFunction, Request, Response } from 'express';
import authRouter from '@router/auth.router';
import userRouter from '@router/user.router';
import groupRouter from '@router/group.router';
import memberRouter from '@router/member.router';
import photoRouter from '@router/photo.router';
import voucherRouter from '@router/voucher.router';
import tradeRouter from '@router/trade.router';
import shippingRouter from '@router/shipping.router';

export default function (app: Express) {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/group', groupRouter);
  app.use('/api/member', memberRouter);
  app.use('/api/photo', photoRouter);
  app.use('/api/voucher', voucherRouter);
  app.use('/api/trade', tradeRouter);
  app.use('/api/shipping', shippingRouter);

  // 미들웨어가 response 응답을 하지 않으면 실행
  app.use('*', (req: Request, res: Response) => {
    return res.status(501).json({ message: 'Not Implemented' });
  });

  // 미들웨어에서 에러를 발생시키면 실행
  app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
    console.error(err);
    return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
  });
}
