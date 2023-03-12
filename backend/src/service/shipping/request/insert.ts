import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { makeSalt } from '@util/encrypt';

// 배송 요청 작성
export const insertShippingRequest = async (
  userId: number,
  voucherIds: number[],
  address: {
    recipient: string;
    contact: string;
    postcode: string;
    address: string;
    addressDetail: string;
    requirement: string;
  }
) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    let sql;

    // 중복되지 않은 결제 UID 생성
    let merchantUID;
    while (1) {
      merchantUID = makeSalt(20);
      sql = `SELECT payment_id as paymentId FROM Payment WHERE merchant_uid=${con.escape(merchantUID)}`;
      const [[payment]] = await con.query<RowDataPacket[]>(sql);
      if (!payment) break; // 생성한 결제 UID가 중복되지 않는다면 반복문 종료
    }

    // 결제 정보 생성
    sql = `
    INSERT INTO Payment (merchant_uid, amount)
    VALUES (${con.escape(merchantUID)}, ${100})`;
    const [payment] = await con.execute(sql);
    const paymentId = (payment as ResultSetHeader).insertId;

    // 배송 요청 생성
    sql = `
    INSERT INTO ShippingRequest (
      user_id, payment_id,
      recipient, contact, postcode, address, address_detail, requirement
    ) VALUES (
      ${con.escape(userId)}, ${con.escape(paymentId)}, ${con.escape(address.recipient)}, ${con.escape(address.contact)}, 
      ${con.escape(address.postcode)}, ${con.escape(address.address)}, ${con.escape(address.addressDetail)}, ${con.escape(address.requirement)}
    )`
    const [request] = await con.execute(sql);
    const requestId = (request as ResultSetHeader).insertId;

    // 소유권 관련 처리
    for (let voucherId of voucherIds) {
      // 소유권 상태 배송대기 상태로 변경.
      sql = `
      UPDATE Voucher
      SET state='shipping'
      WHERE voucher_id=${con.escape(voucherId)}`;
      await con.execute(sql);

      // 배송 요청하는 소유권 정보 생성
      sql = `
      INSERT INTO ShippingRequestVoucher (request_id, voucher_id)
      VALUES (${con.escape(requestId)}, ${con.escape(voucherId)})`
      await con.execute(sql);
    }

    con.commit();
    return requestId;
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
}