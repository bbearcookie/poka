import db from '@config/database';
import { ResultSetHeader } from 'mysql2';
import { getTimestampFilename } from '@util/multer';

// 그룹 데이터 추가
export const insertGroup = async (name: string) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();

    let sql = `
    INSERT INTO GroupData (name)
    VALUES (${con.escape(name)})`;

    const [result] = await con.execute(sql);
    const insertId = (result as ResultSetHeader).insertId;

    con.commit();
    return insertId;
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
};

// 그룹 이미지 파일 이름 변경 적용
export const updateImagename = async (groupId: number, imageName: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE GroupData
    SET image_name=(${con.escape(imageName)})
    WHERE group_id=${groupId}`;

    await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }

};