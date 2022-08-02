import { Request, Response } from 'express';
import { query, body, param, oneOf } from 'express-validator';
import fs from 'fs/promises';
import path from 'path';
import { validate, removeFiles } from '@util/validator';
import photoUploader, { PHOTO_IMAGE_DIR } from '@uploader/photo.uploader';
import * as photoService from '@service/photo.service';
import { getTimestampFilename } from '@util/multer';

// 포토카드 목록 조회
export const getPhotoList = {
  validator: [
    // pageParam은 undefined이거나 숫자여야 함.
    oneOf([
      query("pageParam").not().exists(),
      query("pageParam").isNumeric()
    ]),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const limit = req.query.limit ? Number(req.query.limit) : 0;
    const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0;

    try {
      const [photos] = await photoService.selectPhotoList(limit, pageParam);
      return res.status(200).json({ message: '포토카드 목록을 조회했습니다.', photos, pageParam });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 포토카드 상세 조회
export const getPhotoDetail = {
  validator: [
    param('photocardId').isNumeric().withMessage('포토카드 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const photocardId = Number(req.params.photocardId);

    try {
      const [[photo]] = await photoService.selectPhotoDetail(photocardId);
      if (!photo) return res.status(404).json({ message: '해당 포토카드의 데이터가 서버에 존재하지 않아요.' });

      return res.status(200).json({ message: `${photocardId}번 포토카드의 상세 정보를 조회했습니다.`, ...photo });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 포토카드 추가
export const postPhotos = {
  uploader: photoUploader('image[]'),
  validator: [
    body('groupId')
      .isNumeric().withMessage("그룹 ID는 숫자여야 해요.").bail()
      .custom((value: number, { req }) => value != 0).withMessage("그룹을 선택해주세요.").bail(),
    body('memberId')
      .isNumeric().withMessage("멤버 ID는 숫자여야 해요.").bail()
      .custom((value: number, { req }) => value != 0).withMessage("멤버를 선택해주세요.").bail(),
    body('name').isArray({ min: 1 }).withMessage('포토카드를 등록해주세요.'),
    body('name.*').trim()
      .notEmpty().withMessage('포토카드 이름이 비어있어요.').bail()
      .isString().withMessage('포토카드 이름은 문자열이어야 해요.').bail()
      .isLength({ min: 1, max: 100 }).withMessage('포토카드 이름은 최대 100글자까지 입력할 수 있어요.').bail(),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const groupId = Number(req.body.groupId);
    const memberId = Number(req.body.memberId);
    const name = req.body.name as unknown as string[];
    const files = req.files as Express.Multer.File[];

    try {
      let insertIds: number[] = [];

      try {
        insertIds = await photoService.insertPhotos(memberId, name);
      } catch (err) {
        removeFiles(files); // 데이터 추가 트랜잭션 처리중 에러 발생시 임시 파일 제거
        throw err;
      }

      // 임시 파일명 변경
      insertIds.forEach((insertId, idx) => {
        const file = files[idx];
        const newFilename = getTimestampFilename(insertId.toString(), file.mimetype);
        try { fs.rename(file.path, path.join(file.destination, newFilename)) }
        catch (err) { console.error(err); }
        photoService.updateImagename(insertId, newFilename);
      });

      return res.status(200).json({ message: '새로운 포토카드를 등록했어요.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 포토카드 데이터 수정
export const putPhoto = {
  uploader: photoUploader("image"),
  validator: [
    param('photocardId').isNumeric().withMessage('포토카드 ID는 숫자여야 해요.'),
    body('groupId')
      .isNumeric().withMessage("그룹 ID는 숫자여야 해요.").bail()
      .custom((value: number, { req }) => value != 0).withMessage("그룹을 선택해주세요.").bail(),
    body('memberId')
      .isNumeric().withMessage("멤버 ID는 숫자여야 해요.").bail()
      .custom((value: number, { req }) => value != 0).withMessage("멤버를 선택해주세요.").bail(),
    body('name').trim()
      .notEmpty().withMessage('포토카드 이름이 비어있어요.').bail()
      .isString().withMessage('포토카드 이름은 문자열이어야 해요.').bail()
      .isLength({ min: 1, max: 100 }).withMessage('포토카드 이름은 최대 100글자까지 입력할 수 있어요.').bail(),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const photocardId = Number(req.params.photocardId);
    const groupId = Number(req.body.groupId);
    const memberId = Number(req.body.memberId);
    const name = req.body.name as unknown as string;
    const file = req.file;

    try {
      const [[photo]] = await photoService.selectPhotoDetail(photocardId);
      if (!photo) return res.status(404).json({ message: '해당 포토카드의 데이터가 서버에 존재하지 않아요.' });

      let newFilename: string | undefined;
      if (file) {
        // 임시 다운로드 파일 이름 변경
        newFilename = getTimestampFilename(photocardId.toString(), file.mimetype);
        try { fs.rename(file.path, path.join(file.destination, newFilename)) }
        catch (err) { console.error(err); }

        // 기존의 이미지 파일 삭제
        if (process.env.INIT_CWD) {
          try { fs.rm(path.join(process.env.INIT_CWD, PHOTO_IMAGE_DIR, photo.image_name)) }
          catch (err) { console.error(err); }
        }
      }

      await photoService.updatePhoto(photocardId, memberId, name, newFilename);
      return res.status(200).json({ message: '포토카드 정보를 수정했어요.' });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }

    return res.status(501).json({ message: 'Not Implemented' });
  }
}

// 포토카드 데이터 삭제
export const deletePhoto = {
  validator: [
    param('photocardId').isNumeric().withMessage('포토카드 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response) => {
    const photocardId = Number(req.params.photocardId);

    try {
      const [[photo]] = await photoService.selectPhotoDetail(photocardId);
      if (!photo) return res.status(404).json({ message: '해당 포토카드의 데이터가 서버에 존재하지 않아요.' });

      // 기존의 이미지 파일 삭제
      if (process.env.INIT_CWD) {
        try { fs.rm(path.join(process.env.INIT_CWD, PHOTO_IMAGE_DIR, photo.image_name)) }
        catch (err) { console.error(err); }
      }

      await photoService.deletePhoto(photocardId);
      return res.status(200).json({ message: `포토카드 ${photo.name} 을(를) 삭제했어요.` });
    } catch (err) {
      console.error(err);
      return res.status(500).json({ message: '서버 문제로 오류가 발생했어요.' });
    }
    
    return res.status(501).json({ message: 'Not Implemented' });
  }
}