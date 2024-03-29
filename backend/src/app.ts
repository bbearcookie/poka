import dotenv from 'dotenv';
dotenv.config(); // env 변수 사용

import ExpressConfig, { app } from '@config/express';
import RouteConfig from '@config/route';

ExpressConfig(); // express 기본 설정
RouteConfig(app); // 라우팅 설정

app.listen('5000', () => {
  console.log('5000 포트 실행');
});