import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { Payment } from '@type/shipping';

// 결제 정보 상세 조회
export const selectPaymentDetail = async (paymentId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT
      payment_id as paymentId,
      merchant_uid as merchantUID,
      imp_uid as impUID,
      amount,
      state
    FROM Payment
    WHERE payment_id=${con.escape(paymentId)}`;

    interface DataType extends Payment, RowDataPacket {}

    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}