import { Express, NextFunction, Request, Response } from 'express';
import authRouter from '@config/route/auth.router';
import userRouter from '@config/route/user.router';
import groupRouter from '@config/route/group.router';
import memberRouter from '@config/route/member.router';
// import photoRouter from '@config/route/photo.router';
// import voucherRouter from '@config/route/voucher.router';
// import shippingRouter from '@config/route/shipping.router';
// import tradeRouter from '@config/route/trade.router';

export default function(app: Express) {
  app.use('/api/auth', authRouter);
  app.use('/api/user', userRouter);
  app.use('/api/group', groupRouter);
  app.use('/api/member', memberRouter);

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

// export default function(app: Express) {
//   photoRouter(app, '/api/photo');
//   voucherRouter(app, '/api/voucher');
//   shippingRouter(app, '/api/shipping');
//   tradeRouter(app, '/api/trade');
// };