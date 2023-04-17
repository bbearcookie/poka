import db from '@config/database';
import { PoolConnection } from 'mysql2/promise';
import { ResultSetHeader } from 'mysql2';
import { WhereSQL, parseJsonObject } from '@util/database';
import { VoucherItem } from '@type/voucher';
import { FilterType } from '@controller/voucher/getVouchers';

// 소유권 목록 조회
export const selectVouchers = async (
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
      V.voucher_id as voucherId,
      V.state as state,
      V.created_time as createdTime,
      JSON_OBJECT(
        'photocardId', P.photocard_id,
        'name', P.name,
        'imageName', P.image_name,
        'groupData', JSON_OBJECT(
          'groupId', G.group_id,
          'name', G.name
        ),
        'memberData', JSON_OBJECT(
          'memberId', M.member_id,
          'name', M.name
        )
      ) as photo,
      JSON_OBJECT(
        'userId', U.user_id,
        'username', U.username,
        'nickname', U.nickname,
        'imageName', U.image_name
      ) as owner
    FROM Voucher as V
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    INNER JOIN User as U ON V.user_id=U.user_id `;

    // 소유권 상태 조건
    if (filter.voucherState && filter.voucherState !== 'all') {
      where.push({
        query: `V.state = ${con.escape(filter.voucherState.toLowerCase())}`,
        operator: 'AND'
      })
    }

    // 포토카드 이름 조건
    if (filter.photoNames.length > 0) {
      where.pushString('(');
      filter.photoNames.forEach((item, idx) => {
        if (!con) throw new Error('undefined db connection');

        where.push({
          query: `P.name LIKE ${con.escape(`%${item}%`)}`,
          operator: idx < filter.photoNames.length - 1 ? 'OR' : ''
        });
      });
      where.push({
        query: ')',
        operator: 'AND'
      });
    }

    // 사용자 아이디 조건
    if (filter.userNames.length > 0) {
      where.pushString('(');
      filter.userNames.forEach((item, idx) => {
        if (!con) throw new Error('undefined db connection');

        where.push({
          query: `U.username = ${con.escape(item)}`,
          operator: idx < filter.userNames.length - 1 ? 'OR' : ''
        });
      });
      where.push({
        query: ')',
        operator: 'AND'
      });
    }

    // 그룹ID 조건
    if (filter.groupIds.length > 0) {
      where.push({
        query: `G.group_id IN (${con.escape(filter.groupIds)})`,
        operator: 'AND'
      });
    }

    // 멤버ID 조건
    if (filter.memberIds.length > 0) {
      where.push({
        query: `M.member_id IN (${con.escape(filter.memberIds)})`,
        operator: 'AND'
      })
    }

    // 소유권 제외 조건
    if (filter.excludeVoucherIds.length > 0) {
      where.push({
        query: `V.voucher_id NOT IN (${con.escape(filter.excludeVoucherIds)})`,
        operator: 'AND'
      });
    }

    // 조건 처리
    sql += where.toString();
    sql += `
    ORDER BY FIELD(state, 'available', 'trading', 'shipping', 'shipped') ASC,
    V.photocard_id, 
    V.voucher_id DESC `;

    // 페이지 조건
    sql += `LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    let result = await con.query<VoucherItem[] & ResultSetHeader>(sql);
    result[0] = parseJsonObject(result[0], 'photo', 'owner') as VoucherItem[] & ResultSetHeader;
    return result;
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
};

// 소유권 상세 조회
export const selectVoucherDetail = async (voucherId: number | number[]) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    SELECT
      V.voucher_id as voucherId,
      V.state as state,
      V.created_time as createdTime,
      JSON_OBJECT(
        'photocardId', P.photocard_id,
        'name', P.name,
        'imageName', P.image_name,
        'groupData', JSON_OBJECT(
          'groupId', G.group_id,
          'name', G.name
        ),
        'memberData', JSON_OBJECT(
          'memberId', M.member_id,
          'name', M.name
        )
      ) as photo,
      JSON_OBJECT(
        'userId', U.user_id,
        'username', U.username,
        'nickname', U.nickname,
        'imageName', U.image_name
      ) as owner
    FROM Voucher as V
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    INNER JOIN User as U ON V.user_id=U.user_id `;

    if (Array.isArray(voucherId)) sql += `WHERE voucher_id IN (${con.escape(voucherId)})`;
    else sql += `WHERE voucher_id=${con.escape(voucherId)}`;

    let result = await con.query<VoucherItem[] & ResultSetHeader>(sql);
    result[0] = parseJsonObject(result[0], 'photo', 'owner') as VoucherItem[] & ResultSetHeader;
    return result;
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}

// 특정 교환글이 원하는 포토카드 중에서 사용자가 소지한 소유권 조회
export const selectHaveVouchersOfTrade = async (userId: number, photoIds: number[]) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
      SELECT
      V.voucher_id as voucherId,
      V.state as state,
      V.created_time as createdTime,
      JSON_OBJECT(
        'photocardId', P.photocard_id,
        'name', P.name,
        'imageName', P.image_name,
        'groupData', JSON_OBJECT(
          'groupId', G.group_id,
          'name', G.name
        ),
        'memberData', JSON_OBJECT(
          'memberId', M.member_id,
          'name', M.name
        )
      ) as photo,
      JSON_OBJECT(
        'userId', U.user_id,
        'username', U.username,
        'nickname', U.nickname,
        'imageName', U.image_name
      ) as owner
    FROM Voucher as V
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    INNER JOIN User as U ON V.user_id=U.user_id
    WHERE V.photocard_id IN (${con.escape(photoIds)})
    AND V.user_id=${con.escape(userId)}
    AND V.state='available'
    GROUP BY P.photocard_id`;

    let result = await con.query<VoucherItem[] & ResultSetHeader>(sql);
    result[0] = parseJsonObject(result[0], 'photo', 'owner') as VoucherItem[] & ResultSetHeader;
    return result;
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}

// 배송 요청이 원하는 소유권 정보 조회
export const selectShippingRequestVoucherIds = async (requestId: number) => {
  let con: PoolConnection | undefined;

  try {
    con = await db.getConnection();

    let sql = `
    SELECT
      V.voucher_id as voucherId,
      V.state as state,
      V.created_time as createdTime,
      JSON_OBJECT(
        'photocardId', P.photocard_id,
        'name', P.name,
        'imageName', P.image_name,
        'groupData', JSON_OBJECT(
          'groupId', G.group_id,
          'name', G.name
        ),
        'memberData', JSON_OBJECT(
          'memberId', M.member_id,
          'name', M.name
        )
      ) as photo,
      JSON_OBJECT(
        'userId', U.user_id,
        'username', U.username,
        'nickname', U.nickname,
        'imageName', U.image_name
      ) as owner
    FROM ShippingRequestVoucher as R
    INNER JOIN Voucher as V ON R.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    INNER JOIN User as U ON V.user_id=U.user_id
    WHERE R.request_id=${con.escape(requestId)}`;

    let result = await con.query<VoucherItem[] & ResultSetHeader>(sql);
    result[0] = parseJsonObject(result[0], 'photo', 'owner') as VoucherItem[] & ResultSetHeader;
    return result;
  } catch (err) {
    throw err;
  } finally {
    con?.release();
  }
}