import express from 'express';
import cookieParser from 'cookie-parser';
import cors from 'cors';
import path from 'path';
import { LoginToken } from '@type/user';

// 로그인 정보를 req.user 데이터를 넣기 위해 정의해줌
declare global {
  namespace Express {
    interface Request {
      user?: LoginToken;
    }
  }
}

export const app = express();
require('express-async-errors'); // 비동기로 발생한 오류를 express가 잡을 수 있게 하여 공통 에러 핸들러에서 처리하도록 함.

// 기본 설정 함수
export default function () {
  app.use(express.json()); // express 4.16 버전부터는 body-parser가 내장되었음
  app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded 형태의 데이터 파싱 가능하게 설정
  app.use(cookieParser()); // 브라우저의 쿠키를 파싱 가능하도록 설정
  if (process.env.INIT_CWD) app.use(express.static(path.join(process.env.INIT_CWD, '/public'))); // 정적 파일들 기본 폴더 설정

  const whitelist: string[] = [];
  process.env.CLIENT_LOCALHOST_URL && whitelist.push(process.env.CLIENT_LOCALHOST_URL);
  process.env.CLIENT_NETLIFY_URL && whitelist.push(process.env.CLIENT_NETLIFY_URL);

  app.use(
    cors({
      origin: (origin, callback) => {
        if (origin && whitelist.indexOf(origin) !== -1) callback(null, true);
        else callback(null, false);
      },
      credentials: true
    })
  );
}
