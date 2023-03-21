import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';

// 그룹 데이터 삭제
export const deleteGroup = async (groupId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    DELETE
    FROM GroupData
    WHERE group_id=${con.escape(groupId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}