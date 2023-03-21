import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';

// 그룹 데이터 수정
export const updateGroup = async (
  groupId: number,
  name: string,
  imageName: string | undefined
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    
    let sql = `
    UPDATE GroupData
    SET name=${con.escape(name)} `;
    if (imageName) sql += `, image_name=${con.escape(imageName)} `;
    sql += `WHERE group_id=${con.escape(groupId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
};

// 그룹 이미지 파일 이름 변경 적용
export const updateImagename = async (
  groupId: number,
  imageName: string
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    UPDATE GroupData
    SET image_name=${con.escape(imageName)}
    WHERE group_id=${con.escape(groupId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
};