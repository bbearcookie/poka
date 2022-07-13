import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { body } from 'express-validator';
import { validate } from '@util/validator';
import { getTimestampFilename } from '@util/multer';
import { createUploader } from '@util/multer';
import { GROUP_IMAGE_DIR } from '@util/fileDirectory';
import * as groupService from '@service/group.service';
const groupUploader = createUploader(GROUP_IMAGE_DIR);

// 그룹 데이터 추가 API
export const postGroup = {
  uploader: groupUploader.single('image'),
  validator: [
    body('name').trim()
      .not().isEmpty().withMessage('이름이 비어있어요.')
      .isLength({ max: 20 }).withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
    body('image').not().exists().withMessage('업로드 된 이미지가 없어요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const { name } = req.body;
    const file = req.file;

    try {
      if (!file) throw new Error('이미지 파일 없음');

      // 그룹 생성
      const insertId = await groupService.insertGroup(name);
      const newFilename = getTimestampFilename(insertId.toString(), file.mimetype);

      // 임시 파일명 변경
      try { fs.rename(file.path, path.join(file.destination, newFilename)) }
      catch (err) { console.error(err); }
      groupService.updateImagename(insertId, newFilename);

      return res.status(200).json({ message: '새로운 그룹을 등록했습니다.' });
    } catch (err) {
      console.error(err);
      return res.status(500).send({ message: '서버 문제로 오류가 발생했습니다.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}