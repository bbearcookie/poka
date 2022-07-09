import { Request, Response } from 'express';
import * as TestService from '@service/test.service';

export const getOne = async (req: Request, res: Response) => {
  res.send("one!");
};

export const getTwo = async (req: Request, res: Response) => {
  res.send("two!");
}

export const postTestData = async (req: Request, res: Response) => {
  const { name, content } = req.body;

  try {
    const result = await TestService.saveData(name, content);
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.send(err);
  }

  return res.status(501).json({ message: 'Not Implemented' });
}

export const getAllTestData = async (req: Request, res: Response) => {
  try {
    const result = await TestService.selectAllData();
    return res.send(result);
  } catch (err) {
    console.error(err);
    return res.status(500).send("서버 문제로 오류가 발생했습니다.");
  }

  return res.status(501).json({ message: 'Not Implemented' });
};