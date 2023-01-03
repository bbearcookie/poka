import db from '@config/database';
import { ResultSetHeader, RowDataPacket } from 'mysql2';
import { WhereSQL } from '@util/database';
import { VoucherType } from '@type/voucher';
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
    SELECT V.voucher_id, V.state,
    P.photocard_id, P.name, P.image_name,
    M.member_id, M.name as member_name,
    G.group_id, G.name as group_name,
    U.username, U.nickname
    FROM Voucher as V
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    INNER JOIN User as U ON V.user_id=U.user_id `

    // 소유권 상태 조건
    if (filter['VOUCHER_STATE'] && filter['VOUCHER_STATE'] !== 'ALL') {
      where.push({
        query: `V.state = ${con.escape(filter['VOUCHER_STATE'].toLowerCase())}`,
        operator: 'AND'
      })
    }

    // 포토카드 이름 조건
    if (filter['PHOTO_NAME'].length > 0) {
      where.pushString('(');
      filter['PHOTO_NAME'].forEach((item, idx) => {
        where.push({
          query: `P.name LIKE ${con.escape(`%${item}%`)}`,
          operator: idx < filter['PHOTO_NAME'].length - 1 ? 'OR' : ''
        });
      });
      where.push({
        query: ')',
        operator: 'AND'
      });
    }

    // 사용자 아이디 조건
    if (filter['USER_NAME'].length > 0) {
      where.pushString('(');
      filter['USER_NAME'].forEach((item, idx) => {
        where.push({
          query: `U.username = ${con.escape(item)}`,
          operator: idx < filter['USER_NAME'].length - 1 ? 'OR' : ''
        });
      });
      where.push({
        query: ')',
        operator: 'AND'
      });
    }

    // 그룹ID 조건
    if (filter['GROUP_ID'].length > 0) {
      where.push({
        query: `G.group_id IN (${con.escape(filter['GROUP_ID'])})`,
        operator: 'AND'
      });
    }

    // 멤버ID 조건
    if (filter['MEMBER_ID'].length > 0) {
      where.push({
        query: `M.member_id IN (${con.escape(filter['MEMBER_ID'])})`,
        operator: 'AND'
      })
    }

    // 조건 처리
    sql += where.toString();
    sql += `ORDER BY voucher_id `;

    // 페이지 조건
    sql += `LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    interface DataType extends RowDataPacket {
      photocard_id: number;
      voucher_id: number;
      state: string;
      name: string;
      image_name: string;
      member_id: number;
      member_name: string;
      group_id: number;
      group_name: string;
      username: string;
      nickname: string;
    }

    return await con.query<DataType[]>(sql);
  } catch (err) {
    con.rollback();
    throw err;
  } finally {
    con.release();
  }
};

// 소유권 상세 조회
export const selectVoucherDetail = async (voucherId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT voucher_id, photocard_id, user_id, state
    FROM Voucher
    WHERE voucher_id=${con.escape(voucherId)}`;

    interface DataType extends RowDataPacket, VoucherType {
      
    }

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
    SELECT log_id, voucher_id, origin_user_id, dest_user_id, type, logged_time
    FROM VoucherLog
    WHERE voucher_id=${con.escape(voucherId)}
    ORDER BY logged_time DESC
    LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    interface DataType extends RowDataPacket {
      log_id: number;
      voucher_id: number;
      origin_user_id: number;
      dest_user_id: number;
      type: string;
      logged_time: string;
    }

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