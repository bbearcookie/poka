import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

// 특정 그룹에 멤버 추가
export const insertMember = async (groupId: number, name: string) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    
    let sql = `
    INSERT INTO MemberData(
      group_id,
      name
    ) VALUES (
      ${con.escape(groupId)},
      ${con.escape(name)}
    )`;

    const [result] = await con.execute<ResultSetHeader>(sql);
    return result.insertId;
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}