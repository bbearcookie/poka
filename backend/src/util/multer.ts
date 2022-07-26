import multer, { MulterError } from 'multer';
import fs from 'fs/promises';
import fsAsync from 'fs';

export const GROUP_IMAGE_DIR = 'public/image/group';

// 파일의 mimetype에 따른 확장자를 반환하는 함수
export function getExtension(mimetype: string) {
  if (mimetype === 'image/jpeg') return 'jpg';
  if (mimetype === 'image/png') return 'png';

  return '';
}

// (파일 이름_timestamp.확장자) 문자열을 반환하는 함수
export function getTimestampFilename(filename: string, mimetype: string) {
  return `${filename}_${Date.now()}.${getExtension(mimetype)}`;
}

// 다운 받은 임시 파일을 삭제할 때 사용하는 함수
export function removeFile(path: string | undefined) {
  if (typeof path === 'undefined') return;

  try { fs.rm(path); }
  catch (err) { throw err; }
}

// 특정 디렉터리에 파일을 저장하는 stoarage 속성을 반환하는 함수
export function getStoarage(dir: string) {
  return multer.diskStorage({
    // 파일이 저장될 디렉토리 경로 지정
    destination: async (req, file, callback) => {

      // 디렉토리가 아직 없으면 생성함
      await fs.access(dir, fsAsync.constants.F_OK).catch(async () => {
        try {
          await fs.mkdir(dir, { recursive: true });
        } catch (err) {
          console.error(err);
        }
      });

      // 파일이 저장될 디렉토리 지정
      callback(null, dir);
    },

    // 저장될 파일 이름 지정
    filename: (req, file, callback) => {
      let ext = getExtension(file.mimetype);
      callback(null, `temp_${Date.now()}.${ext}`);
    }
  });
}