import db from '@config/database';
import produce from 'immer';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';
import { WhereSQL } from '@util/database';
import { ShippingRequestDetail, ShippingRequestItem } from '@type/shipping';
import { FilterType } from '@controller/shipping/request/getRequests';

// 배송 요청 목록 조회
export const selectShippingRequests = async (
  itemPerPage: number,
  pageParam: number,
  filter: FilterType
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();
    const where = new WhereSQL();

    let sql = `
    SELECT
      R.request_id as requestId,
      R.state as state,
      R.written_time as writtenTime,
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
      JSON_OBJECT(
        'amount', 
        (SELECT count(*)
        FROM ShippingRequestVoucher as V
        WHERE V.request_id=R.request_id)
      ) as voucher
    FROM ShippingRequest as R
    INNER JOIN Payment as P ON R.payment_id=P.payment_id
    INNER JOIN User as U ON R.user_id=U.user_id `;

    // 사용자 아이디 조건
    if (filter.userNames.length > 0) {
      where.push({
        query: `U.username IN (${con.escape(filter.userNames)})`,
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

    // 배송 요청 목록 가져오기
    let [requests] = await con.query<ShippingRequestItem[] & ResultSetHeader>(sql);

    // 각 배송 요청에 등록된 첫 번째 소유권의 포토카드 이미지 가져오기
    const loadVouchers = requests.map(r => (
      new Promise<ShippingRequestItem>(async (resolve, reject) => {
        if (!con) throw new Error('undefined connection');

        try {
          let sql = `
          SELECT
            name,
            image_name as imageName
          FROM ShippingRequestVoucher as RV
          INNER JOIN Voucher as V ON RV.voucher_id=V.voucher_id
          INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
          WHERE RV.request_id=${con.escape(r.requestId)}
          ORDER BY V.voucher_id`;

          interface Voucher { name: string; imageName: string; };
          const [[voucher]] = await con.query<Voucher[] & ResultSetHeader>(sql);

          resolve(produce(r, draft => {
            draft.voucher.represent = voucher;
          }));
        } catch (err) {
          reject(err);
        }
      })
    ));

    return await Promise.all(loadVouchers);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}

// 배송 요청 상세 조회
export const selectShippingRequestDetail = async (
  requestId: number
) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    SELECT
      R.request_id as requestId,
      R.state as state,
      R.written_time as writtenTime,
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

    return await con.query<ShippingRequestDetail[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}