import db from '@config/database';
import { PaymentStateType } from '@type/payment';

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

// 결제 정보 impUID 변경
export const updatePaymentimpUID = async (paymentId: number, impUID: string) => {
  const con = await db.getConnection();

  try {
    let sql = `
    UPDATE Payment
    SET imp_uid=${con.escape(impUID)}
    WHERE payment_id=${con.escape(paymentId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}