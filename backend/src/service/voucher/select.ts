import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { WhereSQL } from '@util/database';
import { VoucherItem } from '@type/voucher';
import { FilterType } from '@controller/voucher/getVouchers';

// 소유권 목록 조회
export const selectVouchers = async (
  itemPerPage: number,
  pageParam: number,
  filter: FilterType
) => {
  const con = await db.getConnection();

  try {
    const where = new WhereSQL();

    let sql = `
    SELECT
      JSON_OBJECT(
        'voucherId', V.voucher_id,
        'state', V.state,
        'createdTime', V.created_time
      ) as voucher,
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
    if (filter.photoName.length > 0) {
      where.pushString('(');
      filter.photoName.forEach((item, idx) => {
        where.push({
          query: `P.name LIKE ${con.escape(`%${item}%`)}`,
          operator: idx < filter.photoName.length - 1 ? 'OR' : ''
        });
      });
      where.push({
        query: ')',
        operator: 'AND'
      });
    }

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

    // 그룹ID 조건
    if (filter.groupId.length > 0) {
      where.push({
        query: `G.group_id IN (${con.escape(filter.groupId)})`,
        operator: 'AND'
      });
    }

    // 멤버ID 조건
    if (filter.memberId.length > 0) {
      where.push({
        query: `M.member_id IN (${con.escape(filter.memberId)})`,
        operator: 'AND'
      })
    }

    // 소유권 제외 조건
    if (filter.excludeVoucherId.length > 0) {
      where.push({
        query: `V.voucher_id NOT IN (${con.escape(filter.excludeVoucherId)})`,
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

    return await con.query<(VoucherItem & RowDataPacket)[]>(sql);
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
};

// 소유권 상세 조회
export const selectVoucherDetail = async (voucherId: number | number[]) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT
      JSON_OBJECT(
        'voucherId', V.voucher_id,
        'state', V.state,
        'createdTime', V.created_time
      ) as voucher,
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

    return await con.query<(VoucherItem & RowDataPacket)[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 특정 교환글이 원하는 포토카드 중에서 사용자가 소지한 소유권 조회
export const selectHaveVouchersOfTrade = async (userId: number, photoIds: number[]) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT
      JSON_OBJECT(
        'voucherId', V.voucher_id,
        'state', V.state,
        'createdTime', V.created_time
      ) as voucher,
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

    return await con.query<(VoucherItem & RowDataPacket)[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 배송 요청이 원하는 소유권 정보 조회
export const selectShippingRequestVoucherIds = async (requestId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT
      JSON_OBJECT(
        'voucherId', V.voucher_id,
        'state', V.state,
        'createdTime', V.created_time
      ) as voucher,
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

    return await con.query<(VoucherItem & RowDataPacket)[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}