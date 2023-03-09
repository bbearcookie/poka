import { NextFunction, Request, Response } from 'express';
import { query, body, param, oneOf } from 'express-validator';
import fs from 'fs/promises';
import path from 'path';
import { isAdmin } from '@util/validator/middleware/auth';
import { validate } from '@util/validator/middleware/response';
import { removeFile } from '@util/multer';
import imageUploader, { PHOTO_IMAGE_DIR } from '@uploader/image.uploader';
import * as photoService from '@service/photo.service';
import { getTimestampFilename } from '@util/multer';

// 포토카드 목록 조회
export const getPhotoList = {
  validator: [
    oneOf([ // pageParam은 undefined이거나 숫자여야 함.
      query('pageParam').not().exists(),
      query('pageParam').isNumeric()
    ]),
    query('filter').customSanitizer((value) => {
      try { return JSON.parse(value); }
      catch (err) { return undefined; }
    }),
    query('filter.photoName').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
    query('filter.groupId').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
    query('filter.memberId').isArray().withMessage('검색 필터가 잘못되었어요.').bail(),
    validate
  ],
  filterType: {
    'photoName': [] as string[],
    'groupId': [] as number[],
    'memberId': [] as number[]
  },
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const itemPerPage = 20; // 페이지당 보여줄 내용 갯수
    const pageParam = req.query.pageParam ? Number(req.query.pageParam) : 0; // 페이지 번호
    const filter = req.query.filter as unknown as typeof getPhotoList.filterType; // 검색 조건

    const [photos] = await photoService.selectPhotoList(itemPerPage, pageParam, filter);
    return res.status(200).json({
      message: '포토카드 목록을 조회했습니다.',
      photos,
      paging: {
        pageParam,
        hasNextPage: photos.length === itemPerPage
      }
    });
    next();
  }
}

// 포토카드 상세 조회
export const getPhotoDetail = {
  validator: [
    param('photocardId').isNumeric().withMessage('포토카드 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const photocardId = Number(req.params.photocardId);

    const [[photo]] = await photoService.selectPhotoDetail(photocardId);
    if (!photo) return res.status(404).json({ message: '해당 포토카드의 데이터가 서버에 존재하지 않아요.' });

    return res.status(200).json({ message: `${photocardId}번 포토카드의 상세 정보를 조회했습니다.`, ...photo });
    next();
  }
}

// 포토카드 추가
export const postPhotos = {
  uploader: imageUploader('image[]', PHOTO_IMAGE_DIR),
  validator: [
    isAdmin,
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
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const groupId = Number(req.body.groupId);
    const memberId = Number(req.body.memberId);
    const name = req.body.name as unknown as string[];
    const files = req.files as Express.Multer.File[];

    try {
      let insertIds = await photoService.insertPhotos(memberId, name);

      // 임시 파일명 변경
      insertIds.forEach((insertId, idx) => {
        const file = files[idx];
        const newFilename = getTimestampFilename(insertId.toString(), file.mimetype);
        try { fs.rename(file.path, path.join(file.destination, newFilename)) }
        catch (err) { console.error(err); }
        photoService.updateImagename(insertId, newFilename);
      });
    } catch (err) {
      removeFile(files); // 데이터 추가 트랜잭션 처리중 에러 발생시 임시 파일 제거
      throw err;
    }

    return res.status(200).json({ message: '새로운 포토카드를 등록했어요.' });
    next();
  }
}

// 포토카드 데이터 수정
export const putPhoto = {
  uploader: imageUploader('image', PHOTO_IMAGE_DIR),
  validator: [
    isAdmin,
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
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const photocardId = Number(req.params.photocardId);
    const groupId = Number(req.body.groupId);
    const memberId = Number(req.body.memberId);
    const name = req.body.name as unknown as string;
    const file = req.file;

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
        try { fs.rm(path.join(process.env.INIT_CWD, PHOTO_IMAGE_DIR, photo.imageName)) }
        catch (err) { console.error(err); }
      }
    }

    await photoService.updatePhoto(photocardId, memberId, name, newFilename);
    return res.status(200).json({ message: '포토카드 정보를 수정했어요.' });
    next();
  }
}

// 포토카드 데이터 삭제
export const deletePhoto = {
  validator: [
    isAdmin,
    param('photocardId').isNumeric().withMessage('포토카드 ID는 숫자여야 해요.'),
    validate
  ],
  controller: async (req: Request, res: Response, next: NextFunction) => {
    const photocardId = Number(req.params.photocardId);

    const [[photo]] = await photoService.selectPhotoDetail(photocardId);
    if (!photo) return res.status(404).json({ message: '해당 포토카드의 데이터가 서버에 존재하지 않아요.' });

    // 기존의 이미지 파일 삭제
    if (process.env.INIT_CWD) {
      try { fs.rm(path.join(process.env.INIT_CWD, PHOTO_IMAGE_DIR, photo.imageName)) }
      catch (err) { console.error(err); }
    }

    await photoService.deletePhoto(photocardId);
    return res.status(200).json({ message: `포토카드 ${photo.name} 을(를) 삭제했어요.` });
    next();
  }
}