import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';

// 배송 요청 삭제
export const deleteShippingRequest = async (requestId: number, paymentId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    await con.beginTransaction();

    // 소유권 업데이트
    const updateVoucher = new Promise(async (resolve, reject) => {
      if (!con) return reject(new Error('connection is undefined'));

      try {
        // 배송 요청에 등록된 소유권 가져오기
        let sql = `
        SELECT
          voucher_id as voucherId
        FROM ShippingRequestVoucher
        WHERE request_id=${con.escape(requestId)}`;

        interface VoucherDataType {
          voucherId: number;
        }
        const [voucherData] = await con.query<VoucherDataType[] & ResultSetHeader>(sql);
        let voucherIds = voucherData.map(v => v.voucherId);

        // 배송 요청에 등록된 소유권을 이용 가능 상태로 변경
        sql = `
        UPDATE Voucher
        SET
          state='available'
        WHERE voucher_id IN (${con.escape(voucherIds)})`;
        await con.execute(sql);

        resolve('소유권 업데이트 성공');
      } catch (err) {
        reject(err);
      }
    });

    // 결제ID가 담긴 결제 정보 삭제
    const deletePayment = con.execute(`
      DELETE FROM Payment
      WHERE payment_id=${con.escape(paymentId)}`);

    // 배송 요청 삭제
    const deleteRequest = con.execute(`
      DELETE FROM ShippingRequest
      WHERE request_id=${con.escape(requestId)}`);

    await Promise.all([updateVoucher, deletePayment, deleteRequest]);
    con.commit();
  } catch (err) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
};
