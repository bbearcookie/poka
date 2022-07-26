import { Request, Response } from 'express';
import { validate } from '@util/validator';

// 포토카드 추가
export const postPhotos = {
  validator: [
    
    validate
  ],
  controller: async (req: Request, res: Response) => {
    try {

    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}