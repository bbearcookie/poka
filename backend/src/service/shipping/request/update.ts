import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

// 발송 완료 처리
export const approveShippingRequest = async (requestId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    await con.beginTransaction();

    // 소유권 상태 변경
    const updateVoucher = new Promise(async (resolve, reject) => {
      if (!con) throw new Error('undefined db connection');

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
      if (!con) return reject(new Error('undefined db connection'));

      let sql = `
      UPDATE ShippingRequest
      SET
        state='shipped'
      WHERE request_id=${con.escape(requestId)}`;

      con.execute(sql).then(resolve).catch(reject);
    });

    await Promise.all([updateVoucher, updateRequest]);
    con.commit();
  } catch (err) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}