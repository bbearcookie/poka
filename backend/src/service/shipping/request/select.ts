import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { ShippingRequestType, ShippingListItemType } from '@type/shipping';

// 배송 요청 목록 조회
export const selectShippingRequests = async (itemPerPage: number, pageParam: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT R.request_id as requestId, R.state as requestState, P.state as paymentState, 
    U.user_id as userId, U.username, U.nickname, U.image_name as userImageName,
    R.written_time as writtenTime,
      (SELECT count(*)
      FROM ShippingRequestVoucher as V
      WHERE V.request_id=R.request_id) as voucherAmount
    FROM ShippingRequest as R
    INNER JOIN Payment as P ON R.payment_id=P.payment_id
    INNER JOIN User as U ON R.user_id=U.user_id
    ORDER BY R.written_time DESC
    LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    interface DataType extends ShippingListItemType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 배송 요청 상세 조회
export const selectShippingRequestDetail = async (requestId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT R.request_id as requestId, R.state as requestState,
    R.recipient, R.contact, R.postcode, R.address, R.address_detail as addressDetail,
    R.requirement, R.written_time as writtenTime,
    U.username, U.nickname, U.image_name as userImageName,
    P.payment_id as paymentId, P.merchant_uid as merchantUID, P.amount, P.state as paymentState
    FROM ShippingRequest as R
    INNER JOIN User as U ON R.user_id=U.user_id
    INNER JOIN Payment as P ON R.payment_id=P.payment_id
    WHERE R.request_id=${con.escape(requestId)}`;

    interface DataType extends ShippingRequestType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}