import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';

// 포토카드 데이터 삭제
export const deletePhoto = async (photocardId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    DELETE FROM Photocard
    WHERE photocard_id=${con.escape(photocardId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}