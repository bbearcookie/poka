import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { WhereSQL } from '@util/database';
import { ShippingRequestDetail, ShippingRequestItem } from '@type/shipping';
import { FilterType } from '@controller/shipping/request/getRequests';
import { UserType } from '@type/user';

// 배송 요청 목록 조회
export const selectShippingRequests = async (
  itemPerPage: number,
  pageParam: number,
  filter: FilterType
) => {
  const con = await db.getConnection();

  try {
    const where = new WhereSQL();
    let sql;

    sql = `
    SELECT
      JSON_OBJECT(
        'requestId', R.request_id,
        'state', R.state,
        'writtenTime', R.written_time
      ) as request,
      JSON_OBJECT(
        'recipient', R.recipient,
        'contact', R.contact,
        'postcode', R.postcode,
        'address', R.address,
        'addressDetail', R.address_detail,
        'requirement', R.requirement
      ) as address,
      JSON_OBJECT(
        'state', P.state
      ) as payment,
      JSON_OBJECT(
        'userId', U.user_id,
        'username', U.username,
        'nickname', U.nickname,
        'imageName', U.image_name
      ) as author,
      (SELECT count(*)
      FROM ShippingRequestVoucher as V
      WHERE V.request_id=R.request_id) as voucherAmount
    FROM ShippingRequest as R
    INNER JOIN Payment as P ON R.payment_id=P.payment_id
    INNER JOIN User as U ON R.user_id=U.user_id `;

    // 사용자 아이디 조건
    if (filter.userName.length > 0) {
      where.push({
        query: `U.username IN (${con.escape(filter.userName)})`,
        operator: 'AND'
      });
    }

    // 배송 상태 조건
    if (filter.shippingState && filter.shippingState !== 'all') {
      where.push({
        query: `R.state=${con.escape(filter.shippingState)}`,
        operator: 'AND'
      });
    }

    // 결제 상태 조건
    if (filter.paymentState && filter.paymentState !== 'all') {
      where.push({
        query: `P.state=${con.escape(filter.paymentState)}`,
        operator: 'AND'
      });
    }

    sql += where.toString();
    sql += `ORDER BY R.written_time DESC
    LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    return await con.query<(ShippingRequestItem & RowDataPacket)[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 배송 요청 상세 조회
export const selectShippingRequestDetail = async (
  requestId: number
) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT
      JSON_OBJECT(
        'requestId', R.request_id,
        'state', R.state,
        'writtenTime', R.written_time
      ) as request,
      JSON_OBJECT(
        'recipient', R.recipient,
        'contact', R.contact,
        'postcode', R.postcode,
        'address', R.address,
        'addressDetail', R.address_detail,
        'requirement', R.requirement
      ) as address,
      JSON_OBJECT(
        'paymentId', P.payment_id,
        'merchantUID', P.merchant_uid,
        'impUID', P.imp_uid,
        'amount', P.amount,
        'state', P.state
      ) as payment,
      JSON_OBJECT(
        'userId', U.user_id,
        'username', U.username,
        'nickname', U.nickname,
        'imageName', U.image_name
      ) as author
    FROM ShippingRequest as R
    INNER JOIN User as U ON R.user_id=U.user_id
    INNER JOIN Payment as P ON R.payment_id=P.payment_id
    WHERE R.request_id=${con.escape(requestId)}`;

    return await con.query<(ShippingRequestDetail & RowDataPacket)[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}