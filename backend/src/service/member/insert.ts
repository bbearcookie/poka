import db from '@config/database';
import { ResultSetHeader } from 'mysql2';

// 특정 그룹에 멤버 추가
export const insertMember = async (groupId: number, name: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    INSERT INTO MemberData (group_id, name)
    VALUES (${con.escape(groupId)}, ${con.escape(name)})`

    const [result] = await con.execute(sql);
    const insertId = (result as ResultSetHeader).insertId;

    return insertId;
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}