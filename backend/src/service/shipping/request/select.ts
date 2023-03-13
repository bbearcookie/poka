import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { WhereSQL } from '@util/database';
import { ShippingRequestType, ShippingListItemType } from '@type/shipping';
import { FilterType } from '@controller/shipping/request/getRequests';

// 배송 요청 목록 조회
export const selectShippingRequests = async (
  itemPerPage: number,
  pageParam: number,
  filter: FilterType
) => {
  const con = await db.getConnection();

  try {
    const where = new WhereSQL();

    let sql = `
    SELECT R.request_id as requestId, R.state as requestState, P.state as paymentState, 
    U.user_id as userId, U.username, U.nickname, U.image_name as userImageName,
    R.written_time as writtenTime,
      (SELECT count(*)
      FROM ShippingRequestVoucher as V
      WHERE V.request_id=R.request_id) as voucherAmount
    FROM ShippingRequest as R
    INNER JOIN Payment as P ON R.payment_id=P.payment_id
    INNER JOIN User as U ON R.user_id=U.user_id `;

    // 사용자 아이디 조건
    if (filter.userName.length > 0) {
      where.pushString('(');
      filter.userName.forEach((item, idx) => {
        where.push({
          query: `U.username = ${con.escape(item)}`,
          operator: idx < filter.userName.length - 1 ? 'OR' : ''
        });
      });
      where.push({
        query: ')',
        operator: 'AND'
      });
    }

    // 배송 상태 조건
    if (filter.shippingState && filter.shippingState !== 'all') {
      where.push({
        query: `R.state = ${con.escape(filter.shippingState.toLowerCase())}`,
        operator: 'AND'
      });
    }

    // 결제 상태 조건
    if (filter.paymentState && filter.paymentState !== 'all') {
      where.push({
        query: `P.state = ${con.escape(filter.paymentState.toLowerCase())}`,
        operator: 'AND'
      });
    }

    sql += where.toString();
    sql += `
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