
import db from '@config/database';
import { TradeType } from '@type/trade';

// 교환글 수정
export const updateTrade = async ({
  trade, voucherId, amount, wantPhotocardIds
}: {
  trade: TradeType;
  voucherId: number;
  amount: number;
  wantPhotocardIds: number[];
}) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 기존 소유권 상태를 available로 변경
    sql = `
    UPDATE Voucher
    SET state=${con.escape('available')}
    WHERE voucher_id=${con.escape(trade.voucherId)}`
    await con.execute(sql);

    // 기존 wantPhotocard 모두 제거
    sql = `DELETE FROM TradeWantcard WHERE trade_id=${trade.tradeId}`
    await con.execute(sql);

    // 새로운 소유권 사용상태 변경
    sql = `
    UPDATE Voucher
    SET state=${con.escape('trading')}
    WHERE voucher_id=${con.escape(voucherId)}`
    await con.execute(sql);

    // 교환글 수정
    sql = `
    UPDATE Trade
    SET voucher_id=${con.escape(voucherId)}
    WHERE trade_id=${con.escape(trade.tradeId)}`
    await con.execute(sql);

    // 교환글이 원하는 포토카드 정보 작성
    for (let photoId of wantPhotocardIds) {
      sql = `
      INSERT INTO TradeWantcard (trade_id, photocard_id)
      VALUES (${con.escape(trade.tradeId)}, ${con.escape(photoId)})`;
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

// 교환 진행
export const exchangeTrade = async ({
  trade, userId, voucherIds
}: {
  trade: TradeType;
  userId: number;
  voucherIds: number[];
}) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 교환글 상태 변경, 교환일 변경
    sql = 
    `UPDATE Trade
    SET state='traded', traded_time=now()
    WHERE trade_id=${con.escape(trade.tradeId)}`;
    await con.execute(sql);

    // 교환글의 소유권 변경
    sql = `
    UPDATE Voucher
    SET user_id=${userId}, state='available'
    WHERE voucher_id=${con.escape(trade.voucherId)}`;
    await con.execute(sql);

    sql = `
    INSERT INTO VoucherLog (voucher_id, origin_user_id, dest_user_id, type)
    VALUES (${con.escape(trade.voucherId)}, ${con.escape(trade.userId)}, ${con.escape(userId)}, 'traded')`;
    await con.execute(sql);

    // 사용자의 소유권 변경
    for (let voucherId of voucherIds) {
      sql = `
      UPDATE Voucher
      SET user_id=${trade.userId}, state='available'
      WHERE voucher_id=${con.escape(voucherId)}`;
      await con.execute(sql);

      sql = `
      INSERT INTO VoucherLog (voucher_id, origin_user_id, dest_user_id, type)
      VALUES (${con.escape(voucherId)}, ${con.escape(trade.userId)}, ${con.escape(userId)}, 'traded')`;
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