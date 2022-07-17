import { Request, Response } from 'express';
import path from 'path';
import fs from 'fs/promises';
import { body, param } from 'express-validator';
import { validate } from '@util/validator';
import { getTimestampFilename } from '@util/multer';
import { createUploader } from '@util/multer';
import { GROUP_IMAGE_DIR } from '@util/fileDirectory';
import * as groupService from '@service/group.service';
import * as memberService from '@service/member.service';
import { FieldPacket } from 'mysql2';
const groupUploader = createUploader(GROUP_IMAGE_DIR);

// 그룹 목록 조회
export const getGroupList = {
  controller: async (req: Request, res: Response) => {
    try {
      const [groups] = await groupService.selectAllGroupList();
      return res.status(200).json({ message: '그룹 목록을 조회했습니다.', groups });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 그룹 상세 조회
export const getGroupDetail = {
  validator: [
    param('groupId').isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const groupId = Number(req.params.groupId);

    try {
      const [[group]] = await groupService.selectGroupDetail(groupId);
      const [members] = await memberService.selectAllMembersOfGroup(groupId);

      return res.status(200).json({ message: `${groupId}번 그룹의 상세 정보를 조회했습니다.`, ...group, members });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 그룹 데이터 추가
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
    const name = req.body.name as unknown as string;
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
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}