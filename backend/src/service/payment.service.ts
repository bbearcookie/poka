import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { PaymentStateType } from '@type/shipping'; 

// 결제 정보 상태 변경
export const updatePaymentState = async (paymentId: number, state: PaymentStateType) => {
  const con = await db.getConnection();

  try {
    let sql = `UPDATE Payment set state=${con.escape(state)} WHERE payment_id=${con.escape(paymentId)}`;
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}