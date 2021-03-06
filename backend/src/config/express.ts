import express from 'express';
import cors from 'cors';
import path from 'path';

export const app = express();
export const router = express.Router();

// 기본 설정 함수
export default function() {
  app.use(express.json()); // express 4.16 버전부터는 body-parser가 내장되었음
  app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded 형태의 데이터 파싱 가능하게 설정
  if (process.env.INIT_CWD) {
    app.use(express.static(path.join(process.env.INIT_CWD, "/public"))); // 정적 파일들 기본 폴더 설정
  }

  const originList: string[] = [];
  if (process.env.CLIENT_SERVER_URL)
    originList.push(process.env.CLIENT_SERVER_URL);
  if (process.env.CLIENT_SERVER_URL_WITH_WWW)
    originList.push(process.env.CLIENT_SERVER_URL_WITH_WWW);
    
  const corsOptions = {
    origin: (origin: any, callback: any) => {
      if (originList.indexOf(origin) !== -1) {
        callback(null, true);
      } else {
        callback(null, false);
      }
    },
    credentials: true
  }
  app.use(cors(corsOptions));
};