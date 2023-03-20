import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';
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
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    await con.beginTransaction();

    // 중복되지 않은 결제 UID 생성
    let merchantUID;
    while (1) {
      merchantUID = makeSalt(20);

      let sql = `
      SELECT
        payment_id as paymentId
      FROM Payment
      WHERE merchant_uid=${con.escape(merchantUID)}`;

      const [[payment]] = await con.query<object[] & ResultSetHeader>(sql);
      if (!payment) break; // 생성한 결제 UID가 중복되지 않는다면 반복문 종료
    }

    // 결제 정보 생성
    let sql = `
    INSERT INTO Payment(
      merchant_uid,
      amount
    ) VALUES (
      ${con.escape(merchantUID)},
      ${100}
    )`;
    const [payment] = await con.execute<ResultSetHeader>(sql);

    // 배송 요청 생성
    sql = `
    INSERT INTO ShippingRequest(
      user_id,
      payment_id,
      recipient,
      contact,
      postcode,
      address,
      address_detail,
      requirement
    ) VALUES (
      ${con.escape(userId)},
      ${con.escape(payment.insertId)},
      ${con.escape(address.recipient)},
      ${con.escape(address.contact)}, 
      ${con.escape(address.postcode)},
      ${con.escape(address.address)},
      ${con.escape(address.addressDetail)},
      ${con.escape(address.requirement)}
    )`
    const [request] = await con.execute<ResultSetHeader>(sql);

    // 소유권 관련 처리
    const updateVouchers = voucherIds.map(voucherId => (
      new Promise((resolve, reject) => {

        // 소유권 상태 배송대기 상태로 변경.
        const updateVoucher = new Promise((resolve, reject) => {
          if (!con) return reject(new Error('undefined connection'));

          let sql = `
          UPDATE Voucher
          SET
            state='shipping'
          WHERE voucher_id=${con.escape(voucherId)}`;

          con.execute(sql).then(resolve).catch(reject);
        });

        // 배송 요청하는 소유권 정보 생성
        const insertRequestVoucher = new Promise((resolve, reject) => {
          if (!con) return reject(new Error('undefined connection'));

          let sql = `
          INSERT INTO ShippingRequestVoucher(
            request_id,
            voucher_id
          ) VALUES (
            ${con.escape(request.insertId)},
            ${con.escape(voucherId)}
          )`;

          con.execute(sql).then(resolve).catch(reject);
        });

        Promise.all([updateVoucher, insertRequestVoucher]).then(resolve).catch(reject);
      })
    ));

    await Promise.all(updateVouchers);
    con.commit();
    return request.insertId;
  } catch (err) {
    con?.rollback();
    throw err;
  } finally {
    con?.release();
  }
}