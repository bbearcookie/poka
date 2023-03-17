import db from '@config/database';
import { ResultSetHeader } from 'mysql2';
import { WhereSQL } from '@util/database';
import { TradeDetail, TradeItem, WantMember } from '@type/trade';
import { FilterType } from '@controller/trade/getTrades';

// 교환글 목록 조회
// TODO: wantMembers 데이터 넣어야함
export const selectTrades = async (
  itemPerPage: number,
  pageParam: number,
  filter: FilterType
) => {
  const con = await db.getConnection();

  try {
    const where = new WhereSQL();

    let sql = `
    SELECT
      T.trade_id as tradeId,
      T.state as state,
      T.amount as amount,
      T.written_time as writtenTime,
      T.traded_time as tradedTime,
      T.user_id as userId,
      T.voucher_id as voucherId,
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
      ) as photo
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

    const [trades] = await con.query<TradeDetail[] & ResultSetHeader>(sql);
    const result: TradeItem[] = []

    for (let i = 0; i < trades.length; i++) {
      let sql = `
      SELECT M.member_id as memberId, M.name
      FROM TradeWantcard as T
      INNER JOIN Photocard as P ON T.photocard_id=P.photocard_id
      INNER JOIN MemberData as M ON P.member_id=M.member_id
      WHERE T.trade_id=${con.escape(trades[i].tradeId)}
      GROUP BY M.name`

      const [wantMembers] = await con.query<WantMember[] & ResultSetHeader>(sql);
      result[i] = { ...trades[i], wantMembers };
    }

    return result;

    // const [trades] = await con.query<TradeDetail[] & ResultSetHeader>(sql);

    // for (let i = 0; i < trades.length; i++) {
    //   sql = `
    //   SELECT M.member_id as memberId, M.name
    //   FROM TradeWantcard as T
    //   INNER JOIN Photocard as P ON T.photocard_id=P.photocard_id
    //   INNER JOIN MemberData as M ON P.member_id=M.member_id
    //   WHERE T.trade_id=${con.escape(trades[i].tradeId)}
    //   GROUP BY M.name`
      
    //   interface WantMemberType extends RowDataPacket {
    //     memberId: number;
    //     name: string;
    //   }

    //   const [wantMembers] = await con.query<WantMemberType[]>(sql);
    //   trades[i] = { ...trades[i], wantMembers }
    // }

    // return trades as TradeListItemType[];
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
    SELECT
      T.trade_id as tradeId,
      T.state as state,
      T.amount as amount,
      T.written_time as writtenTime,
      T.traded_time as tradedTime,
      T.user_id as userId,
      T.voucher_id as voucherId,
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
      ) as photo
    FROM Trade as T
    INNER JOIN Voucher as V ON T.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE T.trade_id=${con.escape(tradeId)}`;

    return await con.query<TradeDetail[] & ResultSetHeader>(sql);
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
    SELECT
      T.trade_id as tradeId,
      T.state as state,
      T.amount as amount,
      T.written_time as writtenTime,
      T.traded_time as tradedTime,
      T.user_id as userId,
      T.voucher_id as voucherId,
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
      ) as photo
    FROM Trade as T
    INNER JOIN Voucher as V ON T.voucher_id=V.voucher_id
    INNER JOIN Photocard as P ON V.photocard_id=P.photocard_id
    INNER JOIN MemberData as M ON P.member_id=M.member_id
    INNER JOIN GroupData as G ON M.group_id=G.group_id
    WHERE T.voucher_id=${con.escape(voucherId)} AND T.state='trading'
    ORDER BY T.written_time DESC`;

    return await con.query<TradeDetail[] & ResultSetHeader>(sql);
  } catch (err) {
    throw err;
  } finally {
    con.release();
  }
}