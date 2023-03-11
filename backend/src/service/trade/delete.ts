import db from '@config/database';
import { TradeType } from '@type/trade';

// 교환글 삭제
export const deleteTrade = async (trade: TradeType) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 소유권 상태 변경
    sql = `
    UPDATE Voucher
    SET state='available'
    WHERE voucher_id=${con.escape(trade.voucherId)}`;
    await con.execute(sql);

    // 교환글 삭제
    sql = `DELETE FROM Trade WHERE trade_id=${con.escape(trade.tradeId)}`;
    await con.execute(sql);

    con.commit();
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}