import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

// 교환글 작성
export const writeTrade = async ({
  userId,
  voucherId,
  amount,
  wantPhotocardIds
}: {
  userId: number;
  voucherId: number;
  amount: number;
  wantPhotocardIds: number[];
}) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    await con.beginTransaction();

    // 교환글 작성
    let sql = `
    INSERT INTO Trade(
      user_id,
      voucher_id,
      amount
    ) VALUES (
      ${con.escape(userId)},
      ${con.escape(voucherId)},
      ${con.escape(amount)}
    )`
    const [result] = await con.execute<ResultSetHeader>(sql);

    // 소유권 상태를 trading으로 변경
    const updateVoucher = new Promise((resolve, reject) => {
      if (!con) return reject(new Error('undefined db connection'));

      let sql = `
      UPDATE Voucher
      SET
        state=${con.escape('trading')}
      WHERE voucher_id=${con.escape(voucherId)}`

      con.execute(sql).then(resolve).catch(reject);
    });

    // 교환글이 원하는 포토카드 정보 작성
    const insertWantcards = wantPhotocardIds.map(photocardId => (
      new Promise((resolve, reject) => {
        if (!con) return reject(new Error('undefined db connection'));

        let sql = `
        INSERT INTO TradeWantcard(
          trade_id,
          photocard_id
        ) VALUES (
          ${con.escape(result.insertId)},
          ${con.escape(photocardId)}
        )`;

        con.execute(sql).then(resolve).catch(reject);
      })
    ));

    await Promise.all([updateVoucher, ...insertWantcards]);
    con.commit();
  } catch (err) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}