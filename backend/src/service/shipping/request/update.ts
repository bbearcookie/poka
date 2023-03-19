import db from '@config/database';
import { ResultSetHeader } from 'mysql2';

// 발송 완료 처리
export const approveShippingRequest = async (requestId: number) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 소유권 상태 변경
    const updateVoucher = new Promise(async (resolve, reject) => {
      try {
        let sql;

        // 변경해야 할 소유권 ID 조회
        sql = `
        SELECT
          voucher_id as voucherId
        FROM ShippingRequestVoucher
        WHERE request_id=${con.escape(requestId)}`;

        interface VoucherIds { voucherId: number; }
        const [result] = await con.query<VoucherIds[] & ResultSetHeader>(sql);
        const voucherIds: number[] = result.map(v => v.voucherId);

        // 소유권 상태 변경
        sql = `
        UPDATE Voucher
        SET
          state='shipped'
        WHERE voucher_id IN (${con.escape(voucherIds)})`;

        resolve(await con.execute(sql));
      } catch (err) {
        reject(err);
      }
    });

    // 배송 요청 상태 변경
    const updateRequest = new Promise((resolve, reject) => {
      sql = `
      UPDATE ShippingRequest
      SET
        state='shipped'
      WHERE request_id=${con.escape(requestId)}`;

      con.execute(sql).then(resolve).catch(reject);
    });

    await Promise.all([updateVoucher, updateRequest]);
    con.commit();
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}