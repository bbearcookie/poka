import db from '@config/database';
import { ResultSetHeader } from 'mysql2';

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