import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

// 그룹 데이터 추가
export const insertGroup = async (name: string) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    
    let sql = `
    INSERT INTO GroupData(name)
    VALUES (${con.escape(name)})`;

    const [result] = await con.execute<ResultSetHeader>(sql);
    return result.insertId;
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
};