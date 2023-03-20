import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';

// 사용자 프로필 수정
export const updateUserProfile = async (userId: number, nickname: string, imageName: string | undefined) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    UPDATE User
    SET nickname=${con.escape(nickname)} `;
    if (imageName) sql += `, image_name=${con.escape(imageName)} `;
    sql += `WHERE user_id=${con.escape(userId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}