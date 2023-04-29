import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';

// 교환글 삭제
export const deleteTrade = async (tradeId: number, voucherId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    await con.beginTransaction();

    // 소유권 상태 변경
    const updateVoucher = con.execute(`
      UPDATE Voucher
      SET
        state='available'
      WHERE voucher_id=${con.escape(voucherId)}
    `);

    // 교환글 삭제
    const deleteTrade = con.execute(`
      DELETE FROM Trade
      WHERE trade_id=${con.escape(tradeId)}
    `);

    await Promise.all([updateVoucher, deleteTrade]);
    con.commit();
  } catch (err) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
};
