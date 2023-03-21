import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { PaymentState } from '@type/shipping';

// 결제 정보 상태 변경
export const updatePaymentState = async (paymentId: number, state: PaymentState) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    UPDATE Payment
    SET
      state=${con.escape(state)}
    WHERE payment_id=${con.escape(paymentId)}`;
    
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}

// 결제 정보 impUID 변경
export const updatePaymentimpUID = async (paymentId: number, impUID: string) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    UPDATE Payment
    SET
      imp_uid=${con.escape(impUID)}
    WHERE payment_id=${con.escape(paymentId)}`;

    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}