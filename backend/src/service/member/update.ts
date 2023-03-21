import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';

// 멤버 정보 수정
export const updateMember = async (memberId: number, name: string) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    UPDATE MemberData
    SET name=${con.escape(name)}
    WHERE member_id=${con.escape(memberId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}