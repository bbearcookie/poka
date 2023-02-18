import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { WhereSQL } from '@util/database';
import { VoucherType, VoucherSimpleType, VoucherLogType } from '@type/voucher';
import * as voucherCtrl from '@controller/voucher.ctrl';

// 소유권 목록 조회
export const selectVoucherList = async (
  itemPerPage: number = 20,
  pageParam: number,
  filter: typeof voucherCtrl.getAllVoucherList.filterType
) => {
  const con = await db.getConnection();

  try {
    const where = new WhereSQL();

    let sql = `
    SELECT V.voucher_id as voucherId, V.state,
    P.photocard_id as photocardId, P.name, P.image_name as imageName,
    M.member_id as memberId, M.name as memberName,
    G.group_id as groupId, G.name as groupName,
    U.username, U.nickname, U.user_id as userId
    FROM Voucher as V
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    INNER JOIN User as U ON V.user_id=U.user_id `

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

    interface DataType extends VoucherType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
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
    SELECT voucher_id as voucherId, photocard_id as photocardId, user_id as userId, state
    FROM Voucher `;

    if (Array.isArray(voucherId)) sql += `WHERE voucher_id IN (${con.escape(voucherId)})`;
    else sql += `WHERE voucher_id=${con.escape(voucherId)}`;

    interface DataType extends RowDataPacket, VoucherSimpleType {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 소유권 기록 상세 조회
export const selectVoucherLogDetail = async (
  voucherId: number,
  itemPerPage: number,
  pageParam: number
) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT log_id as logId, voucher_id as voucherId,
    origin_user_id as originUserId, dest_user_id as destUserId,
    type, logged_time as loggedTime
    FROM VoucherLog
    WHERE voucher_id=${con.escape(voucherId)}
    ORDER BY logged_time DESC
    LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    interface DataType extends VoucherLogType, RowDataPacket {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 사용자에게 소유권 발급
export const insertVouchers = async (
  userId: number,
  vouchers: {
    photocardId: number;
    amount: number;
}[]) => {
  const con = await db.getConnection();

  try {
    await con.beginTransaction();
    const insertIds = [];

    // 각 소유권의 발급 수량만큼 발급함
    for (let voucher of vouchers) {
      for (let i = 0; i < voucher.amount; i++) {
        let sql = `
        INSERT INTO Voucher (user_id, photocard_id)
        VALUES (${con.escape(userId)}, ${con.escape(voucher.photocardId)})`;

        let [result] = await con.execute(sql);
        insertIds.push((result as ResultSetHeader).insertId);
      }
    }

    // 발급 로그 작성
    for (let id of insertIds) {
      let sql = `
      INSERT INTO VoucherLog (type, voucher_id, origin_user_id)
      VALUES (${con.escape('issued')}, ${con.escape(id)}, ${con.escape(userId)})`;

      await con.execute(sql);
    }

    con.commit();
  }
  catch (err) {
    con.rollback;
    throw err;
  } finally {
    con.release();
  }
};

// 소유권 삭제
export const deleteVoucher = async (voucherId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `DELETE FROM Voucher WHERE voucher_id=${con.escape(voucherId)}`;
    return await con.execute(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}