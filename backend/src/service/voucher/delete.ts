import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';

// 소유권 삭제
export const deleteVoucher = async (voucherId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    DELETE FROM Voucher
    WHERE voucher_id=${con.escape(voucherId)}`;
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}