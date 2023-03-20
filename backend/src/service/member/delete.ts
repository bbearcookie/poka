import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';

// 멤버 데이터 삭제
export const deleteMember = async (memberId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    
    let sql = `
    DELETE FROM MemberData
    WHERE member_id=${con.escape(memberId)}`;
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}