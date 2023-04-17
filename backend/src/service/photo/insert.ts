import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

// 포토카드 데이터 추가
export const insertPhotos = async (
  memberId: number,
  names: string[]
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    await con.beginTransaction();
    
    const insertIds: number[] = [];

    for (let name of names) {
      let sql = `
      INSERT INTO Photocard(
        member_id,
        name
      ) VALUES (
        ${con.escape(memberId)},
        ${con.escape(name)}
      )`;

      const [result] = await con.execute<ResultSetHeader>(sql);
      insertIds.push(result.insertId);
    }

    con.commit();
    return insertIds;
  } catch (err) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
};