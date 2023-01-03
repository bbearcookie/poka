import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// 교환글 작성
export const writeTrade = async ({ userId, voucherId, amount, wantPhotocardIds }:
  { userId: number; voucherId: number; amount: number; wantPhotocardIds: number[]; }
) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql = '';

    // 소유권 상태를 trading으로 변경
    sql = `
    UPDATE Voucher
    SET state=${con.escape('trading')}
    WHERE voucher_id=${con.escape(voucherId)}`
    await con.execute(sql);

    // 교환글 작성
    sql = `
    INSERT INTO Trade (user_id, voucher_id, amount)
    VALUES (${con.escape(userId)}, ${con.escape(voucherId)}, ${con.escape(amount)})`
    const [result] = await con.execute(sql);
    const tradeId = (result as ResultSetHeader).insertId;

    // 교환글이 원하는 포토카드 정보 작성
    for (let photoId of wantPhotocardIds) {
      sql = `
      INSERT INTO TradeWantcard (trade_id, photocard_id)
      VALUES (${con.escape(tradeId)}, ${con.escape(photoId)})`;
      await con.execute(sql);
    }

    con.commit();
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}