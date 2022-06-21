import express, { Request, Response } from 'express';

const app = express();
app.use(express.json()); // express 4.16 버전부터는 body-parser가 내장되었음
app.use(express.urlencoded({ extended: true })); // application/x-www-form-urlencoded 형태의 데이터 파싱 가능하게 설정

app.get('/', (req: Request, res: Response) => {
  res.send('welcome to index page');
});

app.listen('5000', () => {
  console.log('5000 포트 실행')
});