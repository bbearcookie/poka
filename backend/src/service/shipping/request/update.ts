import db from '@config/database';
import { RowDataPacket } from 'mysql2';

// 발송 완료 처리
export const approveShippingRequest = async (requestId: number) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 소유권 상태 변경
    sql =
    `SELECT voucher_id
    FROM ShippingRequestVoucher
    WHERE request_id=${con.escape(requestId)}`;

    let [voucherIds] = await con.query(sql);
    voucherIds = ((voucherIds) as RowDataPacket[]).map(v => v.voucher_id);

    sql =
    `UPDATE Voucher
    SET state='shipped'
    WHERE voucher_id IN (${con.escape(voucherIds)})`;
    await con.execute(sql);

    // 배송 요청 상태 변경
    sql =
    `UPDATE ShippingRequest
    SET state='shipped'
    WHERE request_id=${con.escape(requestId)}`;
    await con.execute(sql);

    con.commit();
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}