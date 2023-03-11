import db from '@config/database';
import { ResultSetHeader } from 'mysql2';

// 사용자에게 소유권 발급
export const insertVouchers = async (
  userId: number,
  vouchers: {
    photocardId: number;
    amount: number;
  }[]
) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    const insertIds = [];

    // 각 소유권의 발급 수량만큼 발급함
    for (let voucher of vouchers) {
      for (let i = 0; i < voucher.amount; i++) {
        let sql = `
        INSERT INTO Voucher (user_id, photocard_id)
        VALUES (${con.escape(userId)}, ${con.escape(voucher.photocardId)})`;

        let [result] = await con.execute(sql);
        insertIds.push((result as ResultSetHeader).insertId);
      }
    }

    // 발급 로그 작성
    for (let id of insertIds) {
      let sql = `
      INSERT INTO VoucherLog (type, voucher_id, origin_user_id)
      VALUES (${con.escape('issued')}, ${con.escape(id)}, ${con.escape(userId)})`;

      await con.execute(sql);
    }

    con.commit();
  }
  catch (err) {
    con.rollback;
    throw err;
  } finally {
    con.release();
  }
};