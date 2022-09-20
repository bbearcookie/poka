import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';

// 사용자에게 소유권 발급
export const insertVouchers = async (
  userId: number,
  vouchers: {
    photocardId: number;
    amount: number;
  }[]) => {
    const con = await db.getConnection();

    try {
      await con.beginTransaction();

      // 각 소유권의 발급 수량만큼 발급함
      for (let voucher of vouchers) {
        for (let i = 0; i < voucher.amount; i++) {
          let sql = `
          INSERT INTO Voucher (user_id, photocard_id)
          VALUES (${con.escape(userId)}, ${con.escape(voucher.photocardId)})`;
          await con.execute(sql);
        }
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