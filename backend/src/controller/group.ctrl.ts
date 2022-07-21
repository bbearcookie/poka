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
      if (!group) return res.status(404).json({ message: '해당 그룹의 데이터가 서버에 존재하지 않아요.' });

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

// 그룹 데이터 수정
export const putGroup = {
  uploader: groupUploader.single('image'),
  validator: [
    body('name').trim()
      .not().isEmpty().withMessage('이름이 비어있어요.')
      .isLength({ max: 20 }).withMessage('이름은 최대 20글자까지 입력할 수 있어요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const groupId = Number(req.params.groupId);
    const name = req.body.name as unknown as string;
    const file = req.file;

    try {
      let [[group]] = await groupService.selectGroupDetail(groupId);
      if (!group) return res.status(404).json({ message: '수정하려는 그룹을 찾지 못했어요.' });

      // 다운받은 이미지 파일 있으면
      let newFilename: string | undefined;
      if (file) {
        // 임시 다운로드 파일 이름 변경
        newFilename = getTimestampFilename(groupId.toString(), file.mimetype);
        try { fs.rename(file.path, path.join(file.destination, newFilename)) }
        catch (err) { console.error(err); }

        // 기존의 이미지 파일 삭제
        if (process.env.INIT_CWD) {
          try { fs.rm(path.join(process.env.INIT_CWD, GROUP_IMAGE_DIR, group.image_name)) }
          catch (err) { console.error(err); }
        }
      }

      await groupService.updateGroup(groupId, name, newFilename);
      return res.status(200).json({ message: '그룹 정보를 수정했어요.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 그룹 데이터 삭제
export const deleteGroup = {
  validator: [
    param('groupId').isNumeric().withMessage('그룹 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const groupId = Number(req.params.groupId);

    try {
      const [[group]] = await groupService.selectGroupDetail(groupId);
      if (!group) return res.status(404).json({ message: '해당 그룹의 데이터가 서버에 존재하지 않아요.' });

      // 기존의 이미지 파일 삭제
      if (process.env.INIT_CWD) {
        try { fs.rm(path.join(process.env.INIT_CWD, GROUP_IMAGE_DIR, group.image_name)) }
        catch (err) { console.error(err); }
      }

      await groupService.deleteGroup(groupId);
      return res.status(200).json({ message: `그룹 ${group.name} 을(를) 삭제했어요.` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}