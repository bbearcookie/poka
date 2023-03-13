import db from '@config/database';
import { RowDataPacket } from 'mysql2';
import { WhereSQL } from '@util/database';
import { TradeStateType, TradeType, TradeListItemType } from '@type/trade';
import { FilterType } from '@controller/trade/getTrades';

// 교환글 목록 조회
export const selectTrades = async (itemPerPage: number, pageParam: number, filter: FilterType) => {
  const con = await db.getConnection();

  try {
    let sql;
    const where = new WhereSQL();

    sql = `
    SELECT T.trade_id as tradeId, T.user_id as userId, T.voucher_id as voucherId,
    T.state, T.amount, T.written_time as writtenTime, T.traded_time as tradedTime,
    P.photocard_id as photocardId, M.member_id as memberId,
    P.name as photoName, M.name as memberName, G.name as groupName, P.image_name as imageName
    FROM Trade as T
    INNER JOIN Voucher as V ON T.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id `;

    // 그룹ID 조건
    if (filter.groupId > 0) {
      where.push({
        query: `M.group_id=${con.escape(filter.groupId)}`,
        operator: 'AND'
      });
    }

    // 멤버ID 조건
    if (filter.memberId > 0) {
      where.push({
        query: `M.member_id=${con.escape(filter.memberId)}`,
        operator: 'AND'
      });
    }

    // 작성자 ID 조건
    if (filter.excludeUserId !== 0) {
      where.push({
        query: `NOT T.user_id=${con.escape(filter.excludeUserId)}`,
        operator: 'AND'
      });
    }

    // 거래글 상태 조건
    if (filter.state) {
      where.push({
        query: `T.state=${con.escape(filter.state)}`,
        operator: 'AND'
      });
    }

    // 조건 처리
    sql += where.toString();
    sql += `ORDER BY written_time DESC `;

    // 페이지 조건
    sql += `LIMIT ${con.escape(itemPerPage)} OFFSET ${con.escape(pageParam * itemPerPage)}`;

    interface TradeDataType extends RowDataPacket, TradeType {}
    const [trades] = await con.query<TradeDataType[]>(sql);

    for (let i = 0; i < trades.length; i++) {
      sql = `
      SELECT M.member_id as memberId, M.name
      FROM TradeWantcard as T
      INNER JOIN Photocard as P ON T.photocard_id=P.photocard_id
      INNER JOIN MemberData as M ON P.member_id=M.member_id
      WHERE T.trade_id=${con.escape(trades[i].tradeId)}
      GROUP BY M.name`
      
      interface WantMemberType extends RowDataPacket {
        memberId: number;
        name: string;
      }

      const [wantMembers] = await con.query<WantMemberType[]>(sql);
      trades[i] = { ...trades[i], wantMembers }
    }

    return trades as TradeListItemType[];
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 교환글 상세 조회
export const selectTradeDetail = async (tradeId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT T.trade_id as tradeId, T.user_id as userId, T.voucher_id as voucherId,
    T.state, T.amount, T.written_time as writtenTime, T.traded_time as tradedTime,
    P.photocard_id as photocardId, M.member_id as memberId,
    P.name as photoName, M.name as memberName, G.name as groupName, P.image_name as imageName
    FROM Trade as T
    INNER JOIN Voucher as V ON T.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE T.trade_id=${con.escape(tradeId)}`;

    interface DataType extends RowDataPacket, TradeType {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}

// 소유권 ID를 가지고 아직 성사되지 않은 교환글 상세 조회
export const selectTradeDetailByVoucherID = async (voucherId: number) => {
  const con = await db.getConnection();

  try {
    let sql = `
    SELECT T.trade_id as tradeId, T.user_id as userId, T.voucher_id as voucherId,
    T.state, T.amount, T.written_time as writtenTime, T.traded_time as tradedTime,
    P.photocard_id as photocardId, M.member_id as memberId,
    P.name as photoName, M.name as memberName, G.name as groupName, P.image_name as imageName
    FROM Trade as T
    INNER JOIN Voucher as V ON T.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE T.voucher_id=${con.escape(voucherId)} AND T.state='trading'
    ORDER BY T.written_time DESC`;

    interface DataType extends RowDataPacket, TradeType {}
    return await con.query<DataType[]>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}