import ExpressConfig, { app } from '@config/express';
import RouteConfig from '@config/route/route';
import { Request, Response } from 'express';

ExpressConfig(); // express 기본 설정
RouteConfig(app); // 라우팅 설정

app.get('/', (req: Request, res: Response) => {
  res.send('welcome to index page');
});

app.listen('5000', () => {
  console.log('5000 포트 실행');
});