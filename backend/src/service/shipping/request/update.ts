import db from '@config/database';
import { selectShippingRequestDetail } from './select';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

// 배송 요청 발송 처리
export const approveShippingRequest = async (requestId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    await con.beginTransaction();

    const [[request]] = await selectShippingRequestDetail(requestId);

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

    // 소유권 관련 작업
    const updateVoucher = new Promise(async (resolve, reject) => {
      if (!con) throw new Error('undefined db connection');

      // 변경해야 할 소유권 ID 조회
      const loadVoucherIds = () =>
        new Promise<number[]>((resolve, reject) => {
          if (!con) throw new Error('undefined db connection');

          let sql = `
          SELECT
            voucher_id as voucherId
          FROM ShippingRequestVoucher
          WHERE request_id=${con.escape(requestId)}`;

          interface VoucherIds {
            voucherId: number;
          }

          con
            .query<VoucherIds[] & ResultSetHeader>(sql)
            .then(data => resolve(data[0].map(v => v.voucherId)))
            .catch(reject);
        });

      // 소유권 상태 변경
      const updateVoucherState = (voucherIds: number[]) =>
        new Promise((resolve, reject) => {
          if (!con) throw new Error('undefined db connection');

          let sql = `
          UPDATE Voucher
          SET
            state='shipped'
          WHERE voucher_id IN (${con.escape(voucherIds)})`;

          con.execute(sql).then(resolve).catch(reject);
        });

      // 소유권 기록 작성
      const insertLogs = (voucherIds: number[]) =>
        voucherIds.map(
          voucherId =>
            new Promise((resolve, reject) => {
              if (!con) throw new Error('undefined db connection');

              let sql = `
              INSERT INTO VoucherLog(
                voucher_id,
                origin_user_id,
                type
              ) VALUES (
                ${con.escape(voucherId)},
                ${con.escape(request.author.userId)},
                'shipped'
              )`;

              con.execute(sql).then(resolve).catch(reject);
            })
        );

      const voucherIds = await loadVoucherIds();
      Promise.all([updateVoucherState(voucherIds), insertLogs(voucherIds)])
        .then(resolve)
        .catch(reject);
    });

    await Promise.all([updateRequest, updateVoucher]);

    con.commit();
  } catch (err) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
};
