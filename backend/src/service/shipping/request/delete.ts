import db from '@config/database';
import { RowDataPacket } from 'mysql2';

// 배송 요청 삭제
export const deleteShippingRequest = async (requestId: number, paymentId: number) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 배송 요청에 등록된 소유권 가져오기
    sql = `
    SELECT voucher_id as voucherId
    FROM ShippingRequestVoucher
    WHERE request_id=${con.escape(requestId)}`;
    
    interface VoucherDataType extends RowDataPacket { voucherId: number; }
    const [voucherData] = await con.query<VoucherDataType[]>(sql);
    let voucherIds = voucherData.map(v => v.voucherId);

    // 배송 요청에 등록된 소유권을 이용 가능 상태로 변경
    sql = `
    UPDATE Voucher
    SET state='available'
    WHERE voucher_id IN (${con.escape(voucherIds)})`
    await con.execute(sql);

    // 결제ID가 담긴 결제 정보 삭제
    sql = `DELETE FROM Payment WHERE payment_id=${con.escape(paymentId)}`;
    await con.execute(sql);

    // 배송 요청 삭제
    sql = `DELETE FROM ShippingRequest WHERE request_id=${con.escape(requestId)}`;
    await con.execute(sql);

    con.commit();
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}