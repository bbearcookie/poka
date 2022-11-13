import { NextFunction, Request, Response } from 'express';
import * as TestService from '@service/test.service';

export const getOne = async (req: Request, res: Response, next: NextFunction) => {
  res.json({message: "one!"});
  next();
};

export const getTwo = async (req: Request, res: Response, next: NextFunction) => {
  res.json({message: "two!"});
  next();
}

export const postTestData = async (req: Request, res: Response, next: NextFunction) => {
  const { author, content } = req.body;

  const result = await TestService.saveData(author, content);
  return res.send(result);
  next();
}

export const getAllTestData = async (req: Request, res: Response, next: NextFunction) => {
  const list = await TestService.selectAllData();
  return res.send(list);
  next();
};